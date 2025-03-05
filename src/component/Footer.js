import '../App.css';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate} from 'react-router-dom';
import {company_name} from '../data/Company_data';
import linkedin from '../img/linkedin_white.png';
import youtube from '../img/youtube_white.png'; 

const Footer = () => {
  const productItems = ['Overview', 'Pricing'];
  const researchItems = ['Overview', 'Optics', 'Sensor', 'ISP', 'Algorithms'];
  const companyItems = ['About', 'Blog', 'Careers', 'Customer Stories', 'Investor Relations', 'News'];

  const navigate = useNavigate();

  return(
    <>
      <hr class="separator" style = {{marginBottom: '3vh'}}></hr>
      
      <Container className = "footer-container">
        <Row className="footer">
          <Col xs={3}>
            <div style = {{fontSize: '1.4vh', marginBottom: '0.9vh', fontFamily: 'Helvetica, sans-serif'}}>
              Product
            </div>
            {productItems.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  if (item === 'Overview') {
                    navigate('/product_overview');
                  } 
                  else if (item === 'Pricing')
                  {
                    navigate('/product_pricing');
                  }
                }}
                className = "footer-font"
              >
                {item}
              </div>
            ))}
          </Col>

          <Col xs={3}>
            <div style = {{fontSize: '1.4vh', marginBottom: '0.9vh', fontFamily: 'Helvetica, sans-serif'}}>
              Research
            </div>
            {researchItems.map((item, i) => (
              <div
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
                className = "footer-font"
              >
                {item}
              </div>
            ))}
          </Col>
          
          <Col xs={3}>
            <div style = {{fontSize: '1.4vh', marginBottom: '0.9vh', fontFamily: 'Helvetica, sans-serif'}}>
              Company
            </div>
            {companyItems.map((item, i) => (
              <div
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
                className = "footer-font"
              >
                {item}
              </div>
            ))}
          </Col>

          <Col xs={3} sytle = {{textAlign: 'center'}}>
            <div style={{ fontSize: '1.4vh', marginBottom: '0.9vh', fontFamily: 'Helvetica, sans-serif' }}>
              Follow Us
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5vw' }}>
              <img style={{ width: '1vw', height: '1vw' }} src={linkedin} alt="LinkedIn" />
              <img style={{ width: '1vw', height: '1vw' }} src={youtube} alt="YouTube" />
            </div>
          </Col>

        </Row>
      </Container>



      <div style = {{backgroundColor: 'black'}}>
        <Container style = {{marginTop: '1vh'}}>
          <Row> 
            <Col className = "footer-left">
              <div>
                © Copyright {company_name}. All Rights Reserved
              </div>
            </Col>
            <Col>
              <div  className = "footer-right" onClick ={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Back to top</div>
            </Col>
          </Row>
        </Container>
      </div>

    </>
  )
};

export default Footer;