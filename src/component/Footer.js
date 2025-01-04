import '../App.css';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
  const researchItems = ['Overview', 'Index', 'GPT-4', 'DALLE-3'];
  const apiItems = ['Overview', 'Data privacy', 'Pricing', 'Docs'];
  const chatGPTItems = ['Overview', 'Enterprise', 'Try ChatGPT'];
  const companyItems = ['About', 'Blog', 'Careers', 'Residency', 'Charter', 'Security', 'Customer Stories'];

  const footer = ['OpenAI © 2015-2023', 'Terms & policies', 'Privacy policy', 'Brand guidlines']
  const footer2 = ['Twitter', 'YouTube', 'GitHub', 'SoundCloud', 'Linkedin']

  return(
    <>
      <Container style = {{marginBottom: '3.5vh', marginTop: '10vh', width: '60vw'}}>
        <Row className = "footer">
          <Col xs = {3}>
            <div>{researchItems[0]}</div>
            {researchItems.slice(1).map((item, i) => (
              <div style = {{marginTop: '0.2vh'}}> {item} </div>
              )
            )}
          </Col>
          <Col xs = {3}>
            <div>{apiItems[0]}</div>
            {apiItems.slice(1).map((item, i) => (
              <div style = {{marginTop: '0.2vh'}}> {item} </div>
              )
            )}
          </Col>
          <Col xs = {3}>
            <div>{chatGPTItems[0]}</div>
            {chatGPTItems.slice(1).map((item, i) => (
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
      
      <hr class="separator"></hr>

      <Container style = {{marginTop: '1vh', width: '60vw'}}>
        <Row> 
          <Col className = "footer" style = {{textAlign: 'left'}}>
            {
            footer.map((item, i) => (
            <div>{item}</div> 
            ))
            }
          </Col>
          <Col className = "footer">
            <div style = {{display: 'flex', justifyContent: 'flex-end'}}>
            {
              footer2.map((item, i) => (
              <div style = {{marginRight: i !== footer.length ? '1vw' : '0'}}>{item}</div>
              ))
            }
            </div>
        
            <div  style={{ marginTop: '3.5vh', display: 'flex', justifyContent: 'flex-end', cursor: 'pointer'}} 
            onClick ={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Back to top</div>
          </Col>
        </Row>
      </Container>
      
      <div style={{ backgroundColor: 'black', height: '2vh' }}></div>
    </>
  )
};

export default Footer;