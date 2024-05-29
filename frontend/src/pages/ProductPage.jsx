import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import Form from 'react-bootstrap/Form';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../store';
import { Helmet } from 'react-helmet-async';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductPage() {
  
  const params = useParams();
  const { slug } = params;
  const navigate = useNavigate();

  let reviewsRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedSize, setSelectedSize] = useState(40);

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
  useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      toast.error('Please enter comment and rating');
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/products/${product._id}/reviews`,
        { rating, comment, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Review submitted successfully');
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      dispatch({ type: 'REFRESH_PRODUCT', payload: product });
      window.scrollTo({
        behavior: 'smooth',
        top: reviewsRef.current.offsetTop,
      });
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'CREATE_FAIL' });
    }
  };
   
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
   
  
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>

      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className='product-page-info'>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item className='product-page-info'>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating> 
              <span className='number-of-reviews'>{product.numReviews} reviews</span> 
            </ListGroup.Item>
            <ListGroup.Item className='product-page-info'>
              <p>{product.description}</p>
            </ListGroup.Item>
            <ListGroup.Item className="product-page-info">
              <div className="size-selection">
                <h5>Select Size</h5>
                <div className="size-options">
                  {[37, 38, 39, 40, 41, 42, 43, 44].map((size) => (
                    <div
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3} className='mt-1'>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
       <Col md={6} className="my-5">
        <h3 ref={reviewsRef}>Reviews</h3>
        <div className="mb-3">
          {product.reviews.length === 0 && (
            <p>There is no review</p>
          )}
        </div>
        <ListGroup>
          {product.reviews.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Rating rating={review.rating}></Rating>
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Card className="write-comment-container">
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <Rating rating={rating} onClick={setRating} isEditable={true} size="large" />              
            
                <Form.Control
                  as="textarea"
                  placeholder="Share your experience..."
                  value={comment}
                  className="write-comment-input"
                  onChange={(e) => setComment(e.target.value)}
                />

              <div className="mb-3">
                <Button disabled={loadingCreateReview} type="submit">
                  Submit
                </Button>
                {loadingCreateReview && <LoadingBox></LoadingBox>}
              </div>
            </form>
          ) : (
            <MessageBox>
              Please{' '}
              <Link to={`/login?redirect=/product/${product.slug}`}>
                login
              </Link>{' '}
              to write a review
            </MessageBox>
          )}
        </Card>
       </Col>
      </Row>
    </div>
  );
}
