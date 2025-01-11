import '../App.css';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
  const productItems = ['Overview', 'Illuminant', 'Scene', 'Optics', 'Sensor', 'ISP', 'Algorithms'];
  const researchItems = ['Overview', 'Optics', 'Sensor', 'ISP', 'Algorithms'];
  const blogItems = ['Blog'];
  const companyItems = ['About', 'Careers', 'Customer Stories', 'Investor Relations', 'News'];

  // const footer = ['© Copyright Qureka. All rights reserved']
  // const footer = ['Copyright Qureka. All rights reserved', 'Terms & policies', 'Privacy policy', 'Brand guidlines']
  // const footer2 = ['Twitter', 'YouTube', 'GitHub', 'SoundCloud', 'Linkedin']

  return(
    <>
      <hr class="separator" style = {{marginBottom: '3vh'}}></hr>

      <Container style = {{marginBottom: '10vh', marginTop: '5vh', width: '60vw'}}>
        <Row className = "footer">
          <Col xs = {3}>
            <div>{productItems[0]}</div>
            {productItems.slice(1).map((item, i) => (
              <div style = {{marginTop: '0.2vh'}}> {item} </div>
              )
            )}
          </Col>
          <Col xs = {3}>
            <div>{researchItems[0]}</div>
            {researchItems.slice(1).map((item, i) => (
              <div style = {{marginTop: '0.2vh'}}> {item} </div>
              )
            )}
          </Col>
          <Col xs = {3}>
            <div>{blogItems[0]}</div>
            {blogItems.slice(1).map((item, i) => (
              <div style = {{marginTop: '0.2vh'}}> {item} </div>
              )
            )}

          </Col>
          <Col xs = {3}>
            <div>{companyItems[0]}</div>
            {companyItems.slice(1).map((item, i) => (
              <div style = {{marginTop: '0.2vh'}}> {item} </div>
              )
            )}
          </Col>
        </Row>
      </Container>
      
      {/* <hr class="separator"></hr> */}

      <div style = {{backgroundColor: 'black'}}>
        <Container style = {{marginTop: '1vh', width: '60vw'}}>
          <Row> 
            <Col className = "footer" style = {{textAlign: 'left'}}>
              <div>
                © Copyright VisionQ. All rights reserved
              </div>
            </Col>
            <Col className = "footer">
              <div  style={{display: 'flex', justifyContent: 'flex-end', cursor: 'pointer'}} 
              onClick ={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Back to top</div>
            </Col>
          </Row>
        </Container>
      </div>

    </>
  )
};

export default Footer;