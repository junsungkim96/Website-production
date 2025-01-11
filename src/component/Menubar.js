import '../App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/atom-logo.png';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

const Menubar = () => {
  const navigate = useNavigate();

  const productItems = ['Overview', 'Illuminant', 'Scene', 'Optics', 'Sensor', 'ISP', 'Algorithms'];
  const researchItems = ['Overview', 'Optics', 'Sensor', 'ISP', 'Algorithms'];
  // const companyItems = ['About', 'Blog', 'Careers', 'Customer Stories'];
  const companyItems = ['About', 'Careers', 'Invester Relations', 'News'];

  const [scrolled, setScrolled] = useState(false);

  // Separate dropdown states for each menu
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [researchDropdownOpen, setResearchDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);  

  const handleProductMouseEnter = () => {
    setProductDropdownOpen(true);
  };

  const handleProductMouseLeave = () => {
    setProductDropdownOpen(false);
  };

  const handleResearchMouseEnter = () => {
    setResearchDropdownOpen(true);
  };

  const handleResearchMouseLeave = () => {
    setResearchDropdownOpen(false);
  };

  const handleCompanyMouseEnter = () => {
    setCompanyDropdownOpen(true);
  };

  const handleCompanyMouseLeave = () => {
    setCompanyDropdownOpen(false);
  };

  useEffect(()=>{
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return() => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return(
    <>
    <Navbar collapseOnSelect className="body" 
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: scrolled ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 1)', height: '60px', zIndex: 9999, marginBottom: '50px', transition : 'background-color 0.3s ease' }}>
      <Container style={{ position: 'fixed', left: 0, paddingLeft: '20vw' }}>
        <img src={logo} alt="" style={{ marginRight: '0.1vw', width: '30px', filter: scrolled ? 'invert(1)' : 'invert(0)', transition: 'filter 0.3s ease' }} />
        <Navbar.Brand style={{ color: scrolled ? 'white' : 'white', marginRight: '10vw', cursor: 'pointer', transition: 'color 0.3s ease' }} onClick={() => navigate('/')}>
          VisionQ
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" style={{ color: scrolled ? 'white' : 'white', transition: 'color 0.3s ease' }}>
          
          <NavDropdown
            title={<span style={{ color: scrolled ? 'white' : 'white', transition: 'color 0.3s ease', 
              fontSize: '1.1rem', // Consistent font size for both
             }}>
              Product
            </span>}
            id="collapsible-nav-dropdown"
            className = "navbar-item"
            // show={productDropdownOpen}
            // onMouseEnter={handleProductMouseEnter}
            // onMouseLeave={handleProductMouseLeave}
            style={{ marginRight: '3.5vw' }}
          >
            {productItems.map((item, i) => (
              <NavDropdown.Item
                key={i}
                onClick={() => {
                  if (item === 'Careers') {
                    navigate('/careers');
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
            // show={researchDropdownOpen}
            // onMouseEnter={handleResearchMouseEnter}
            // onMouseLeave={handleResearchMouseLeave}
            style={{ marginRight: '3.5vw' }}
          >
            {researchItems.map((item, i) => (
              <NavDropdown.Item
                key={i}
                onClick={() => {
                  if (item === 'Careers') {
                    navigate('/careers');
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
            // show={companyDropdownOpen}
            // onMouseEnter={handleCompanyMouseEnter}
            // onMouseLeave={handleCompanyMouseLeave}
          >
            {companyItems.map((item, i) => (
              <NavDropdown.Item
                key={i}
                onClick={() => {
                  if (item === 'Careers') {
                    navigate('/careers');
                  }
                }}
              >
                {item}
              </NavDropdown.Item>
            ))}
          </NavDropdown>


          <div style={{ marginRight: '1vw' }}></div>
        </Navbar.Collapse>
      </Container>
    </Navbar>


    </>
  )
};

export default Menubar;