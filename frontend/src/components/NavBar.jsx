import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { useContext } from 'react';
import { Store } from '../store';
import { IoBagOutline, IoBag } from "react-icons/io5";
import SearchBox from './SearchBox';

export default function CustomNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const logoutHandler = () => {
    ctxDispatch({ type: 'USER_LOGOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/login';
  };

  return (
    <Navbar expand="lg" className={`navbar ${scrolled ? 'navbar-dark' : 'navbar-light'}`}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand><span className='logo'>ECOMMERCE</span></Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox scrolled={scrolled} />
          <Nav className="me-auto w-100 justify-content-end">
            <Link to="/cart" className="nav-link">
                  {cart.cartItems.length > 0
                    ? <IoBag className='cart'/>
                    : <IoBagOutline className='cart'/>}
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
            <NavDropdown
            title={userInfo.name}
            id="basic-nav-dropdown"
            className={userInfo.isAdmin ?
               (scrolled ? 'admin-dropdown-dark' : 'admin-dropdown-light') : ''}
            >
              <LinkContainer to="/profile">
                <NavDropdown.Item>User Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/orderhistory">
                <NavDropdown.Item>Order History</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              {userInfo.isAdmin && (
              <>
                <LinkContainer to="/admin/dashboard">
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/products">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orders">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
              </>
              )}
              <Link
                className="dropdown-item"
                to="#logout"
                onClick={logoutHandler}
              >
                Logout
              </Link>
            </NavDropdown>
            ) : (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

