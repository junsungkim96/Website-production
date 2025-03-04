import '../App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/atom-logo.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { company_name } from '../data/Company_data';

const Menubar = () => {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to track the icon state
  const [productExpanded, setProductExpanded] = useState(false); // State to track product menu expansion

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggleOffcanvas = () => {
    setIsOpen(!isOpen); // Toggle the hamburger icon state
    setShowOffcanvas(!showOffcanvas);
  };

  const toggleProductMenu = () => {
    setProductExpanded(!productExpanded); // Toggle the product menu expansion
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="body"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          backgroundColor: scrolled ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 1)',
          height: '60px',
          zIndex: 9999,
          marginBottom: '50px',
          transition: 'background-color 0.3s ease',
        }}
      >
        <Container
          style={{
            paddingLeft: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
          }}
        >
          <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={logo}
              alt="logo"
              style={{
                width: '30px',
                filter: scrolled ? 'invert(1)' : 'invert(0)',
                transition: 'filter 0.3s ease',
              }}
            />
            <Navbar.Brand
              style={{
                color: scrolled ? 'white' : 'white',
                marginLeft: '10px',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
              }}
              onClick={() => navigate('/')}
            >
              {company_name}
            </Navbar.Brand>
          </div>

          {/* Toggle button for Offcanvas (Hamburger Menu) */}
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={handleToggleOffcanvas}
            style={{
              border: 'none',
              width: '30px',
              height: '22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '0',
              marginLeft: 'auto',
            }}
          >
            {isOpen ? (
              <>
                <div style={{
                  width: '30px',
                  height: '4px',
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: '50%',
                  transform: 'rotate(45deg)',
                  transformOrigin: 'center',
                }} />
                <div style={{
                  width: '30px',
                  height: '4px',
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: '50%',
                  transform: 'rotate(-45deg)',
                  transformOrigin: 'center',
                }} />
              </>
            ) : (
              <>
                <div style={{
                  width: '30px',
                  height: '4px',
                  backgroundColor: 'white',
                }} />
                <div style={{
                  width: '30px',
                  height: '4px',
                  backgroundColor: 'white',
                }} />
                <div style={{
                  width: '30px',
                  height: '4px',
                  backgroundColor: 'white',
                }} />
              </>
            )}
          </Navbar.Toggle>
        </Container>
      </Navbar>

      {/* Offcanvas component for mobile with black background and white text */}
      <Offcanvas
        show={showOffcanvas}
        onHide={handleToggleOffcanvas}
        placement="start"
        style={{
          width: '250px',
          backgroundColor: 'black',
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: 'white' }}>{company_name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ backgroundColor: 'black', color: 'white' }}>
          <Nav className="flex-column">
            {/* Product dropdown */}
            <Nav.Link
              onClick={toggleProductMenu}
              style={{
                color: 'white',
                fontSize: '1.1rem',
                backgroundColor: 'black',
                display: 'flex',
                alignItems: 'center', // Align text and triangle
                justifyContent: 'space-between',
                paddingRight: '10px',
              }}
            >
              <span>Product</span>
              <span style={{ fontSize: '0.8rem', marginLeft: '5px' }}>{productExpanded ? '▲' : '▼'}</span>
            </Nav.Link>

            {/* Expandable sub-menu under Product */}
            {productExpanded && (
              <div style={{ paddingLeft: '15px' }}> {/* Indentation for dropdown */}
                <Nav.Link
                  onClick={() => navigate('/overview')}
                  style={{
                    color: 'white',
                    fontSize: '0.9rem', // Smaller font size for sub-menu items
                    backgroundColor: 'black',
                    paddingLeft: '15px', // Further indentation
                  }}
                >
                  Overview
                </Nav.Link>
                <Nav.Link
                  onClick={() => navigate('/pricing')}
                  style={{
                    color: 'white',
                    fontSize: '0.9rem', // Smaller font size for sub-menu items
                    backgroundColor: 'black',
                    paddingLeft: '15px',
                  }}
                >
                  Pricing
                </Nav.Link>
              </div>
            )}

            {/* Direct links */}
            <Nav.Link
              onClick={() => navigate('/research')}
              style={{
                color: 'white',
                fontSize: '1.1rem',
                backgroundColor: 'black',
              }}
            >
              Research
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate('/blog')}
              style={{
                color: 'white',
                fontSize: '1.1rem',
                backgroundColor: 'black',
              }}
            >
              Blog
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate('/company')}
              style={{
                color: 'white',
                fontSize: '1.1rem',
                backgroundColor: 'black',
              }}
            >
              Company
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Menubar;
