import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../store';
import Container from 'react-bootstrap/Container';

export default function PaymentMethodPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Container className="small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h2 className="mt-5 mb-4">Payment Method</h2>
        <Form onSubmit={submitHandler}>
          <Card className="mb-3">
            <Card.Body >
              <Form.Check
                type="radio"
                id="PayPal"
                label={
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/paypal-logo.png"
                      alt="PayPal"
                      style={{ height: '50px', marginLeft: '20px' }}
                    />
                  </div>
                }
                value="PayPal"
                checked={paymentMethodName === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Form.Check
                type="radio"
                id="Mastercard"
                label={
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/mastercard-logo.webp"
                      alt="Mastercard"
                      style={{ height: '50px', marginLeft: '20px' }}
                    />
                  </div>
                }
                value="Mastercard"
                checked={paymentMethodName === 'Mastercard'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Card.Body>
          </Card>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
