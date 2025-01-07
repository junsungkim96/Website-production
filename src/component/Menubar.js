import '../App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/atom-logo.jpg';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

const Menubar = () => {
  const navigate = useNavigate();

  // const productItems = [];
  // const researchItems = ['Overview', 'Index', 'GPT-4', 'DALLE-3'];
  // const companyItems = ['About', 'Blog', 'Careers', 'Customer Stories'];
  const companyItems = ['About', 'Blog', 'Careers', 'Invester Relations', 'News'];
  const [scrolled, setScrolled] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  }

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  }

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
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: scrolled ? 'white' : 'black', height: '60px', zIndex: 1, marginBottom: '50px', transition : 'background-color 0.3s ease' }}>
      <Container style={{ position: 'fixed', left: 0, paddingLeft: '20vw' }}>
        <img src={logo} alt="" style={{ marginRight: '0.1vw', width: '30px', filter: scrolled ? 'invert(1)' : 'invert(0)', transition: 'filter 0.3s ease' }} />
        <Navbar.Brand style={{ color: scrolled ? 'black' : 'white', marginRight: '10vw', cursor: 'pointer', transition: 'color 0.3s ease' }} onClick={() => navigate('/')}>
          VisionQ
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" style={{ color: scrolled ? 'black' : 'white', transition: 'color 0.3s ease' }}>
          <Nav className="me-auto">
            {/* Removed href and used only onClick for navigate */}
            <Nav.Link style={{ color: scrolled ? 'black' : 'white', transition: 'color 0.3s ease' }} onClick={() => navigate('/product')}>
              Product
            </Nav.Link>
          </Nav>

          <Nav className="me-auto">
            <Nav.Link style={{ color: scrolled ? 'black' : 'white', transition: 'color 0.3s ease' }} onClick={() => navigate('/research')}>
              Research
            </Nav.Link>
          </Nav>

          <NavDropdown
            title={<span style={{ color: scrolled ? 'black' : 'white', transition: 'color 0.3s ease' }}>Company</span>}
            id="collapsible-nav-dropdown"
            className="navbar-item"
            show={dropdownOpen}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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