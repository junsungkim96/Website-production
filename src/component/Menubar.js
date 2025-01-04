import '../App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/atom-logo.jpg';
import {useNavigate} from 'react-router-dom';

const Menubar = () => {
  const navigate = useNavigate();

  // const productItems = [];
  // const researchItems = ['Overview', 'Index', 'GPT-4', 'DALLE-3'];
  // const companyItems = ['About', 'Blog', 'Careers', 'Customer Stories'];
  const companyItems = ['About', 'Blog', 'Careers'];

  return(
    <>
    <Navbar collapseOnSelect className="body" 
    style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: 'black', height: '60px', zIndex: 1, marginBottom: '50px'}}>
      <Container style = {{position: 'fixed', left: 0, paddingLeft: '20vw'}}>
      <img src={logo} alt = "" style = {{marginRight: '0.2vw', width: '30px'}}/>
      <Navbar.Brand href="#home" style = {{color: 'white', marginRight: '4vw'}} 
      onClick = {()=> navigate('/')}>Qureka</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" style = {{color: 'white'}}>
        <Nav className="me-auto">
          <Nav.Link href="#Research" style={{ color: 'white' }}>
            Product
          </Nav.Link>
        </Nav>

        <Nav className="me-auto">
          <Nav.Link href="#Research" style={{ color: 'white' }}>
            Research
          </Nav.Link>
        </Nav>

        <NavDropdown title={<span style = {{color: 'white'}}>Company</span>} id="collapsible-nav-dropdown" className = "navbar-item">
          {companyItems.map((item, i) => (
          <NavDropdown.Item key = {i} href = {`#Company/${i}`} onClick = {()=>{
            if (item === 'Careers'){
              navigate('/careers');
            }
          }}>
            {item}
          </NavDropdown.Item>
          )
          )}
        </NavDropdown>

        <div style = {{marginRight: '10vw'}}></div>

      </Navbar.Collapse>

      </Container>
    </Navbar>

    </>
  )
};

export default Menubar;