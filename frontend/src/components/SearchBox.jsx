import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SearchBox({ scrolled }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [query, setQuery] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);
  const inputRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  useEffect(() => {
    if (showSearchBox && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearchBox]);


  useEffect(() => {
    if (pathname.startsWith('/search')) 
       setShowSearchBox(true);
    else
       setShowSearchBox(false);
  }, [pathname]);


  return (
    <>
      {!showSearchBox && (
        <Button
          variant="outline-primary"
          id="button-search-icon"
          onClick={() => setShowSearchBox(true)}
          className={`search-icon ${scrolled ? 'search-icon-dark' : 'search-icon-light'}`}
        >
          <i className="fas fa-search"></i>
        </Button>
      )}
      {showSearchBox && (
        <Form className="d-flex w-100" onSubmit={submitHandler}>
          <InputGroup className={`search-box ${scrolled ? 'search-box-dark' : 'search-box-light'}`}>
            <FormControl
              className={`search-box-input ${scrolled ? 'search-box-input-dark' : 'search-box-input-light'}`}
              type="text"
              name="q"
              id="q"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search products..."
              aria-label="Search Products"
              aria-describedby="button-search"
              ref={inputRef}
            ></FormControl>
            <Button variant="outline-primary" type="submit" id="button-search" className={`${scrolled ? 'button-dark' : 'button-light'}`}>
              <i className="fas fa-search"></i>
            </Button>
          </InputGroup>
        </Form>
      )}
    </>
  );
}