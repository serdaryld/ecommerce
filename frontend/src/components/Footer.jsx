import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookSquare } from 'react-icons/fa';
import { RiTwitterXLine } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";



export default function Footer() {
  return (
    <footer className="footer mt-auto py-5">
      <Container>
        <Row className="justify-content-center mb-4">
          <Col className="text-center">
            <h4>ecommerce.com</h4>
          </Col>
        </Row>
        
        <Row className="justify-content-center mb-3">
          <Col md="auto">
            <ul className="list-inline">
              <li className="list-inline-item mx-3">
                <a href="#" className="text-white">HOME</a>
              </li>
              <li className="list-inline-item mx-3">
                <a href="#" className="text-white">ABOUT</a>
              </li>
              <li className="list-inline-item mx-3">
                <a href="#" className="text-white">PRODUCTS</a>
              </li>
              <li className="list-inline-item mx-3">
                <a href="#" className="text-white">BLOG</a>
              </li>
              <li className="list-inline-item mx-3">
                <a href="#" className="text-white">FAQ</a>
              </li>
              <li className="list-inline-item mx-3">
                <a href="#" className="text-white">CONTACT</a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md="auto">
            <ul className="list-inline social-icons">
              <li className="list-inline-item mx-3">
                <a href="https://www.twitter.com" className="text-white">
                  <RiTwitterXLine />
                </a>
              </li>
              <li className="list-inline-item mx-3">
                <a href="https://www.facebook.com" className="text-white">
                  <FaFacebookSquare />
                </a>
              </li>
              <li className="list-inline-item mx-3">
                <a href="https://www.instagram.com" className="text-white">
                  <BsInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-4">
            <p className="mb-0 text-muted">
              Copyright &copy;2024 All rights reserved 
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

