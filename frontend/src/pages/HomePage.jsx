import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Helmet } from 'react-helmet-async';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

    };
    fetchData();
  }, []);

  
  return (
    <div>
      <Helmet>
        <title>Ecommerce</title>
      </Helmet>

      <Row className="custom-carousel-container">
      <Col sm={9}>
        <Carousel className='carousel'>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/banner1.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/banner2.png"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/banner3.png"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/banner4.png"
              alt="Fourth slide"
            />
          </Carousel.Item>
        </Carousel>
      </Col>
      
      <Col sm={3} className="side-images">
        <div className="image-box-wrapper">
          <Link to="/search?category=Boots">
            <img src="/images/boots.png" alt="Placeholder 1" />
          </Link>
          <Link to="/search?category=Outdoors">
            <img src="/images/outdoors.png" alt="Placeholder 2" />
          </Link>
          <Link to="/search?category=Sneakers">
            <img src="/images/sneakers.png" alt="Placeholder 3" />
          </Link>
        </div>
      </Col>
      
    </Row>

    {loading ? (
          <LoadingBox/>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
        <Row className='mx-lg-5 my-5'>
         <h2>Featured Products</h2>
         <div className="products">
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
         </div>
     </Row>
     )}
    </div>
  );
}