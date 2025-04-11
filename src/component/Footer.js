import '../styles/desktop.css';
import '../styles/laptop.css';
import '../styles/tablet.css';
import '../styles/mobile.css';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate} from 'react-router-dom';
import {company_name} from '../data/Company_data';
import linkedin from '../img/sns/linkedin_white.png';
import youtube from '../img/sns/youtube_white.png'; 
import {productItems, researchItems, companyItems} from '../data/Menu_data';

const Footer = () => {
  const navigate = useNavigate();

  return(
    <>
      <hr class="separator" style = {{marginBottom: '3vh'}}></hr>
      
      <Container className = "footer-container">
        <Row className="footer">
          <Col xs={6} md={3} className="mb-5">
            <div className = "footer-title">
              PRODUCT
            </div>
            {productItems.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  if (item === 'Features') {
                    navigate('/product_features');
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

          <Col xs={6} md={3} className="mb-5">
            <div className = "footer-title">
              RESEARCH
            </div>
            {researchItems.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  if (item === 'Overview') {
                    navigate('/research');
                  }
                  else if (item === 'Illuminant') {
                    navigate('/illuminant');
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
                  else if (item === 'QPU') {
                    navigate('/qpu');
                  }
                }}
                className = "footer-font"
              >
                {item}
              </div>
            ))}
          </Col>
          
          <Col xs={6} md={3}>
            <div className = "footer-title">
              COMPANY
            </div>
            {companyItems.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  if (item === 'About') {
                    navigate('/company');
                  }
                  else if (item === 'Blog'){
                    navigate('/blog');
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

          <Col xs={6} md={3}>
            <div className = "footer-title">
              FOLLOW US
            </div>
            <div className = "footer-font">
              <a href="https://www.linkedin.com/company/qblackai/" target="_blank" rel="noreferrer noopener">
                <img className="social-media" src={linkedin} alt="LinkedIn" />
              </a>
              <a href="https://www.youtube.com/@qblackai" target="_blank" rel="noreferrer noopener">
                <img className="social-media" src={youtube} alt="YouTube" />
              </a>
            </div>
          </Col>

        </Row>
      </Container>



      <div style={{ backgroundColor: 'black', paddingBottom: '1vh' }}>
        <Container>
          <Row className="d-flex align-items-end">
            {/* Left column */}
            <Col xs={12} md={6} className = "mb-3 mb-md-0">
              <div
                style={{
                  color: '#aaa',
                  fontSize: '0.7rem',
                  lineHeight: '2',
                  textAlign: 'left',
                  marginBottom: '0.5vh',
                }}
              >
                상호: 큐블랙에이아이 | 대표: 김준성 <br />
                사업자등록번호: 484-50-00824 | 통신판매업 신고번호: <br />
                주소: 서울특별시 마포구 마포대로 92, A동 3층 | 이메일: info@qblackai.com
              </div>
            </Col>

            {/* Right column */}
            <Col
              xs={12}
              md={6}
              className="d-flex flex-column align-items-md-end align-items-start"
            >
              <div
                className="footer-right"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to top
              </div>

              <div className="footer-right" style={{ marginTop: '1vh' }}>
                © Copyright {company_name}. All Rights Reserved
              </div>
            </Col>
          </Row>
        </Container>
      </div>

    </>
  )
};

export default Footer;