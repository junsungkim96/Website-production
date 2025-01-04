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

  const researchItems = ['Overview', 'Index', 'GPT-4', 'DALLE-3'];
  const apiItems = ['Overview', 'Data privacy', 'Pricing', 'Docs'];
  const chatGPTItems = ['Overview', 'Enterprise', 'Try ChatGPT'];
  const companyItems = ['About', 'Blog', 'Careers', 'Residency', 'Charter', 'Security', 'Customer Stories'];

  return(
    <>
    <Navbar collapseOnSelect className="body" 
    style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: 'black', height: '60px', zIndex: 1, marginBottom: '50px'}}>
      <Container style = {{position: 'fixed', left: 0, paddingLeft: '20vw'}}>
      <img src={logo} alt = "" style = {{marginRight: '0.2vw', width: '30px'}}/>
      <Navbar.Brand href="#home" style = {{color: 'white', marginRight: '4vw'}} 
      onClick = {()=> navigate('/')}>QuantumAI</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" style = {{color: 'white'}}>
        <Nav className="me-auto">
        <NavDropdown title= {<span style = {{color: 'white'}}>Research </span>} id="collapsible-nav-dropdown" className = "navbar-item">
          {researchItems.map((item, i) => (
          <NavDropdown.Item key = {i} href = {`#Research/${i}`}>
            {item}
          </NavDropdown.Item>
          )
          )}
        </NavDropdown>

        <div style = {{marginRight: '0.1vw'}}></div>
        
        <NavDropdown title= {<span style = {{color: 'white'}}>API</span>} id="collapsible-nav-dropdown" className = "navbar-item">
          {apiItems.map((item, i) => (
          <NavDropdown.Item key = {i} href = {`#API/${i}`}>
            {item}
          </NavDropdown.Item>
          )
          )}
        </NavDropdown>
        
        <NavDropdown title= {<span style = {{color: 'white'}}>ChatGPT</span>} id="collapsible-nav-dropdown" className = "navbar-item">
          {chatGPTItems.map((item, i) => (
          <NavDropdown.Item key = {i} href = {`#ChatGPT/${i}`}>
            {item}
          </NavDropdown.Item>
          ) 
          )}
        </NavDropdown>

        <Nav.Link href="#safety">{<span className = "navbar-item" style = {{marginRight: '10px'}}>Safety</span>}</Nav.Link>

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

        <Nav.Link href="#Log in" onClick = {()=>{navigate('/login')}}>{<span className = "navbar-item">Login↗</span>}</Nav.Link>

        </Nav>
      </Navbar.Collapse>

      </Container>
    </Navbar>

    </>
  )
};

export default Menubar;