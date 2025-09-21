import '../styles/desktop.css';
import '../styles/laptop.css';
import '../styles/tablet.css';
import '../styles/mobile.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/qblackai_logo.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { company_name } from '../data/Company_data';
import {productItems, researchItems, companyItems} from '../data/Menu_data';

const API_BASE = 'https://www.qblackai.com/api';

const Menubar = () => {
  // Inside your Menubar component
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  // const [isLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  // const [userFirstName] = useState(localStorage.getItem('userFirstName') || '');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');

  useEffect(()=>{
    const firstName = localStorage.getItem('userFirstName');
    const loggedIn = !!firstName;
    setIsLoggedIn(loggedIn);
    setUserFirstName(firstName || '');

  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setShowOffcanvas(false);
        setIsOpen(false);
        resetMenus();
      }
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resetMenus = () => setExpandedMenu(null);

  const handleToggleOffcanvas = () => {
    setIsOpen(!isOpen);
    setShowOffcanvas(!showOffcanvas);
    if (!showOffcanvas) resetMenus();
  };

  const closeOffcanvasAndNavigate = (path) => {
    navigate(path);
    setShowOffcanvas(false);
    setIsOpen(false);
    resetMenus();
  };

  const toggleMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
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
          backgroundColor: 'rgba(0, 0, 0, 1)',
          zIndex: 9999,
          transition: 'background-color 0.3s ease',
        }}
      >
        <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="logo" style={{ width: '30px', filter: scrolled ? 'invert(1)' : 'invert(0)', transition: 'filter 0.3s ease' }} />
            <Navbar.Brand
              style={{ color: 'white', marginLeft: '3px', cursor: 'pointer', transition: 'color 0.3s ease', fontSize: '20.5px'}}
              onClick={() => closeOffcanvasAndNavigate('/')}
            >
              {company_name}
            </Navbar.Brand>
          </div>
          
          {/* -----------------------------------------------------------Desktop-------------------------------------------------------- */}

          <div className="desktop-nav">
            {[
              {
                title: 'Product',
                items: productItems,
                onClick: (item) => {
                  if (item === 'Features') navigate('/product_features');
                  else if (item === 'Pricing') navigate('/product_pricing');
                },
              },
              {
                title: 'Research',
                items: researchItems,
                onClick: (item) => {
                  if (item === 'Overview') navigate('/research');
                  else if (item === 'Illuminant') navigate('/illuminant');
                  else if (item === 'Optics') navigate('/optics');
                  else if (item === 'Sensor') navigate('/sensor');
                  else if (item === 'ISP') navigate('/isp');
                  else if (item === 'QPU') navigate('/qpu');
                },
              },
              {
                title: 'Company',
                items: companyItems,
                onClick: (item) => {
                  if (item === 'About') navigate('/company');
                  else if (item === 'Blog') navigate('/blog');
                  else if (item === 'Careers') navigate('/careers');
                  else if (item === 'Customer Stories') navigate('/stories');
                  else if (item === 'Investor Relations') navigate('/ir');
                  else if (item === 'News') navigate('/news');
                  else if (item === 'Contact') navigate('/contact')
                },
              },
            ].map((menu, idx) => (
              <div
                className="navbar-item"
                style = {{cursor: 'pointer'}}
                key={idx}
                onMouseEnter={() => setHoveredMenu(menu.title)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <span className="custom-dropdown-title">
                  {menu.title}
                  <span
                    className={`custom-dropdown-icon ${hoveredMenu === menu.title ? 'open' : ''}`}
                    style={{ marginLeft: '10px' }}
                  >
                    ›
                  </span>
                </span>
                <div className="dropdown-menu">
                  {menu.items.map((item, i) => (
                    <div
                      className="dropdown-item"
                      key={i}
                      onClick={() => {
                        setHoveredMenu(null);
                        setTimeout(() => menu.onClick(item), 100);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div
              className="navbar-item"
              style={{ cursor: 'pointer', paddingLeft: '1vw', position: 'relative' }}
              onMouseEnter={() => setHoveredMenu(isLoggedIn ? 'userMenu' : 'Login')}
              onMouseLeave={() => setHoveredMenu(null)}
              onClick={()=>{
                if(!isLoggedIn){
                  navigate('/login');
                }
              }}
            >
              <span className="custom-dropdown-title"
              >
                {isLoggedIn ? userFirstName : 'Login'}
                {isLoggedIn && (
                  <span
                    className={`custom-dropdown-icon ${hoveredMenu === 'userMenu' ? 'open' : ''}`}
                    style={{ marginLeft: '10px'}}
                  >
                    ›
                  </span>
                )}
              </span>

              {/* 로그인 상태일 때 드롭다운 메뉴 */}
              {isLoggedIn && (
                <div
                  className="dropdown-menu"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0
                  }}
                >
                  {[
                    {
                      label: 'Simulate',
                      onClick: () => {
                        setHoveredMenu(null);
                        navigate('/simulate');  
                      },
                    },
                    {
                      label: 'Logout',
                      onClick: () => {
                        setHoveredMenu(null);
                        await fetch(`${API_BASE}/logout`, {method: 'POST', credentials: 'include'});
                        localStorage.clear();
                        setIsLoggedIn(false);
                        setUserFirstName('');
                        navigate('/');
                      },
                    },
                  ].map((item, i) => (
                    <div
                      className="dropdown-item"
                      key={i}
                      onClick={item.onClick}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          <div className="mobile-nav">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggleOffcanvas} style={{ border: 'none', width: '25px', height: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0', marginLeft: 'auto' }}>
              {isOpen ? (
                <>
                  <div style={{ width: '25px', height: '2px', backgroundColor: 'white', position: 'absolute', top: '50%', transform: 'rotate(45deg)' }} />
                  <div style={{ width: '25px', height: '2px', backgroundColor: 'white', position: 'absolute', top: '50%', transform: 'rotate(-45deg)' }} />
                </>
              ) : (
                <>
                  <div style={{ width: '25px', height: '2px', backgroundColor: 'white' }} />
                  <div style={{ width: '25px', height: '2px', backgroundColor: 'white' }} />
                  <div style={{ width: '25px', height: '2px', backgroundColor: 'white' }} />
                </>
              )}
            </Navbar.Toggle>
          </div>

        </Container>
      </Navbar>

      {/* -----------------------------------------------------------Mobile-------------------------------------------------------- */}

      <Offcanvas show={showOffcanvas} onHide={handleToggleOffcanvas} placement="start" style={{ width: '300px', backgroundColor: 'black' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: 'white' }}>{company_name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ backgroundColor: 'black', color: 'white' }}>
          <Nav className="flex-column">
            {/* Product Dropdown */}
            <Nav.Link onClick={() => toggleMenu('Product')} style={{ color: 'white', fontSize: '4.5vw ', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '5px' }}>Product</span>
              <span style={{ fontSize: '2vw' }}>{expandedMenu === 'Product' ? '▲' : '▼'}</span>
            </Nav.Link>
            {expandedMenu === 'Product' && (
              <div style={{ paddingLeft: '15px' }}>
                {productItems.map((item, i) => (
                  <Nav.Link 
                    key={i} 
                    onClick={() => {
                      if (item === 'Features'){
                        closeOffcanvasAndNavigate('/product_features');
                      } else if (item === 'Pricing'){
                        closeOffcanvasAndNavigate('/product_pricing');
                      }
                    }}
                    style={{ color: 'white', fontSize: '4vw' }}
                  >
                    <span style={{ color: 'white', marginRight: '5px' }}>-</span> {item}
                  </Nav.Link>
                ))}
              </div>
            )}

            {/* Research Dropdown */}
            <Nav.Link onClick={() => toggleMenu('Research')} style={{ color: 'white', fontSize: '4.5vw', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '5px' }}>Research</span>
              <span style={{ fontSize: '2vw' }}>{expandedMenu === 'Research' ? '▲' : '▼'}</span>
            </Nav.Link>
            {expandedMenu === 'Research' && (
              <div style={{ paddingLeft: '15px' }}>
                {researchItems.map((item, i) => (
                  <Nav.Link
                    key={i}
                    onClick={() => {
                      if (item === 'Overview') {
                        closeOffcanvasAndNavigate('/research');
                      } else if (item === 'Illuminant') {
                        closeOffcanvasAndNavigate('/illuminant');
                      } else if (item === 'Optics') {
                        closeOffcanvasAndNavigate('/optics');
                      } else if (item === 'Sensor') {
                        closeOffcanvasAndNavigate('/sensor');
                      } else if (item === 'ISP') {
                        closeOffcanvasAndNavigate('/isp');
                      } else if (item === 'Algorithms') {
                        closeOffcanvasAndNavigate('/algorithms');
                      }
                    }}
                    style={{ color: 'white', fontSize: '4vw' }}
                  >
                  <span style={{ color: 'white', marginRight: '5px' }}>-</span> {item}
                </Nav.Link>
                
                ))}
              </div>
            )}

            {/* Company Dropdown */}
            <Nav.Link onClick={() => toggleMenu('Company')} style={{ color: 'white', fontSize: '4.5vw', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '5px' }}>Company</span>
              <span style={{ fontSize: '2vw' }}>{expandedMenu === 'Company' ? '▲' : '▼'}</span>
            </Nav.Link>
            {expandedMenu === 'Company' && (
              <div style={{ paddingLeft: '15px' }}>
                {companyItems.map((item, i) => (
                  <Nav.Link
                    key={i}
                    onClick={() => {
                      if (item === 'About') {
                        closeOffcanvasAndNavigate('/company');
                      } else if (item === 'Blog'){
                        closeOffcanvasAndNavigate('/blog');
                      } else if (item === 'Careers') {
                        closeOffcanvasAndNavigate('/careers');
                      } else if (item === 'Customer Stories') {
                        closeOffcanvasAndNavigate('/stories');
                      } else if (item === 'Investor Relations') {
                        closeOffcanvasAndNavigate('/ir');
                      } else if (item === 'News') {
                        closeOffcanvasAndNavigate('/news');
                      } else if (item === 'Contact'){
                        closeOffcanvasAndNavigate('/contact');
                      }
                    }}
                    style={{ color: 'white', fontSize: '4vw' }}
                  >
                    <span style={{ color: 'white', marginRight: '5px' }}>-</span> {item}
                  </Nav.Link>
                ))}
              </div>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Menubar;
