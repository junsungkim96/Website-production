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
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
          height: '60px',
          zIndex: 9999,
          transition: 'background-color 0.3s ease',
        }}
      >
        <Container style={{ paddingLeft: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="logo" style={{ width: '30px', filter: scrolled ? 'invert(1)' : 'invert(0)', transition: 'filter 0.3s ease' }} />
            <Navbar.Brand
              style={{ color: 'white', marginLeft: '3px', cursor: 'pointer', transition: 'color 0.3s ease' }}
              onClick={() => closeOffcanvasAndNavigate('/')}
            >
              {company_name}
            </Navbar.Brand>
          </div>
          
          <div className="desktop-nav">
            <NavDropdown
              title={<span style={{ color: scrolled ? 'white' : 'white', transition: 'color 0.3s ease', 
                fontSize: '1.1rem', // Consistent font size for both
              }}>
                Product
              </span>}
              id="collapsible-nav-dropdown"
              className = "navbar-item"
              show={productDropdownOpen}
              onMouseEnter={handleProductMouseEnter}
              onMouseLeave={handleProductMouseLeave}
              style={{ marginRight: '3vw' }}
            >
              {productItems.map((item, i) => (
                <NavDropdown.Item
                  key={i}
                  onClick={() => {
                    if (item === 'Overview') {
                      navigate('/product_overview');
                    }
                    else if (item === 'Pricing'){
                      navigate('/product_pricing');
                    }                  
                  }}
                >
                  {item}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown
              title={<span style={{ color: scrolled ? 'white' : 'white', transition: 'color 0.3s ease', 
                fontSize: '1.1rem', // Consistent font size for both
              }}>
                Research
              </span>}
              id="collapsible-nav-dropdown"
              className="navbar-item"
              show={researchDropdownOpen}
              onMouseEnter={handleResearchMouseEnter}
              onMouseLeave={handleResearchMouseLeave}
              style={{ marginRight: '3vw' }}
            >
              {researchItems.map((item, i) => (
                <NavDropdown.Item
                  key={i}
                  onClick={() => {
                    if (item === 'Overview') {
                      navigate('/research');
                    }
                    else if (item === 'Optics') {
                      navigate('/optics');
                    } 
                    else if (item === 'Sensor') {
                      navigate('/sensor');
                    }
                    else if (item === 'ISP') {
                      navigate('/isp');
                    }
                    else if (item === 'Algorithms') {
                      navigate('/algorithms');
                    }
                  }}
                >
                  {item}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Nav className="navbar-item">
              <Nav.Link style={{ color: scrolled ? 'white' : 'white', transition: 'color 0.3s ease', 
                fontSize: '1.1rem', // Consistent font size for both
              }} onClick={() => navigate('/blog')}>
                Blog
              </Nav.Link>
            </Nav>

            <NavDropdown
              title={<span style={{ color: scrolled ? 'white' : 'white', transition: 'color 0.3s ease',
                fontSize: '1.1rem', // Consistent font size for both
              }}>
                Company
              </span>}
              id="collapsible-nav-dropdown"
              className="navbar-item"
              show={companyDropdownOpen}
              onMouseEnter={handleCompanyMouseEnter}
              onMouseLeave={handleCompanyMouseLeave}
            >
              {companyItems.map((item, i) => (
                <NavDropdown.Item
                  key={i}
                  onClick={() => {
                    if (item === 'About') {
                      navigate('/company');
                    }
                    else if (item === 'Careers') {
                      navigate('/careers');
                    }
                    else if (item === 'Customer Stories') {
                      navigate('/stories');
                    }
                    else if (item === 'Investor Relations') {
                      navigate('/ir');
                    }
                    else if (item === 'News') {
                      navigate('/news');
                    }
                  }}
                >
                  {item}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </div>

          <div className="mobile-nav">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggleOffcanvas} style={{ border: 'none', width: '30px', height: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0', marginLeft: 'auto' }}>
              {isOpen ? (
                <>
                  <div style={{ width: '30px', height: '4px', backgroundColor: 'white', position: 'absolute', top: '50%', transform: 'rotate(45deg)' }} />
                  <div style={{ width: '30px', height: '4px', backgroundColor: 'white', position: 'absolute', top: '50%', transform: 'rotate(-45deg)' }} />
                </>
              ) : (
                <>
                  <div style={{ width: '30px', height: '4px', backgroundColor: 'white' }} />
                  <div style={{ width: '30px', height: '4px', backgroundColor: 'white' }} />
                  <div style={{ width: '30px', height: '4px', backgroundColor: 'white' }} />
                </>
              )}
            </Navbar.Toggle>
          </div>

        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={handleToggleOffcanvas} placement="start" style={{ width: '250px', backgroundColor: 'black' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: 'white' }}>{company_name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ backgroundColor: 'black', color: 'white' }}>
          <Nav className="flex-column">
            {/* Product Dropdown */}
            <Nav.Link onClick={() => toggleMenu('Product')} style={{ color: 'white', fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '5px' }}>Product</span>
              <span style={{ fontSize: '0.7rem' }}>{expandedMenu === 'Product' ? '▲' : '▼'}</span>
            </Nav.Link>
            {expandedMenu === 'Product' && (
              <div style={{ paddingLeft: '15px' }}>
                {['Overview', 'Pricing'].map((item, i) => (
                  <Nav.Link key={i} onClick={() => closeOffcanvasAndNavigate(item === 'Overview' ? '/product_overview' : '/product_pricing')} style={{ color: 'white', fontSize: '0.9rem' }}>
                    {item}
                  </Nav.Link>
                ))}
              </div>
            )}

            {/* Research Dropdown */}
            <Nav.Link onClick={() => toggleMenu('Research')} style={{ color: 'white', fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '5px' }}>Research</span>
              <span style={{ fontSize: '0.7rem' }}>{expandedMenu === 'Research' ? '▲' : '▼'}</span>
            </Nav.Link>
            {expandedMenu === 'Research' && (
              <div style={{ paddingLeft: '15px' }}>
                {['Overview', 'Optics', 'Sensor', 'ISP', 'Algorithms'].map((item, i) => (
                  <Nav.Link
                    key={i}
                    onClick={() => {
                      if (item === 'Overview') {
                        closeOffcanvasAndNavigate('/research');
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
                    style={{ color: 'white', fontSize: '0.9rem' }}
                  >
                  {item}
                </Nav.Link>
                
                ))}
              </div>
            )}

            {/* Blog */}
            <Nav.Link onClick={() => closeOffcanvasAndNavigate('/blog')} style={{ color: 'white', fontSize: '1.1rem' }}>
              Blog
            </Nav.Link>

            {/* Company Dropdown */}
            <Nav.Link onClick={() => toggleMenu('Company')} style={{ color: 'white', fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '5px' }}>Company</span>
              <span style={{ fontSize: '0.7rem' }}>{expandedMenu === 'Company' ? '▲' : '▼'}</span>
            </Nav.Link>
            {expandedMenu === 'Company' && (
              <div style={{ paddingLeft: '15px' }}>
                {['About', 'Careers', 'Customer Stories', 'Investor Relations', 'News'].map((item, i) => (
                  <Nav.Link
                    key={i}
                    onClick={() => {
                      if (item === 'About') {
                        closeOffcanvasAndNavigate('/company');
                      } else if (item === 'Careers') {
                        closeOffcanvasAndNavigate('/careers');
                      } else if (item === 'Customer Stories') {
                        closeOffcanvasAndNavigate('/stories');
                      } else if (item === 'Investor Relations') {
                        closeOffcanvasAndNavigate('/ir');
                      } else if (item === 'News') {
                        closeOffcanvasAndNavigate('/news');
                      }
                    }}
                    style={{ color: 'white', fontSize: '0.9rem' }}
                  >
                    {item}
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
