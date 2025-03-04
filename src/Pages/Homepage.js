import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import img1 from '../img/autonomous.jpg';
import img2 from '../img/manufacturing.png';
import img3 from '../img/ar_vr.jpg';
// import img4 from '../img/physics_simulation.jpg';
// import img5 from '../img/ai_algorithm.jpg';
import career from '../img/career.jpg';
import {useNavigate} from 'react-router-dom';
import {useLayoutEffect} from 'react';
// import videoSource from '../../public/video/Quasar_simulator.mp4';
import AnimatedBackground from './Animation';
import money from '../img/cash_save.svg';
import time from '../img/hourglass.svg';
import optimize from '../img/optimization.svg';
import img4 from '../img/security-safe.svg';
import img5 from '../img/settings-gear.svg';
import img6 from '../img/specificity.svg';
import {company_name} from '../data/Company_data';


const Homepage = () => {
  const navigate = useNavigate();

  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

  return(
    <div>
      
      <AnimatedBackground/>

      <hr class="separator"></hr>

      <div class="update-container" style = {{marginBottom: '3.5vh', marginTop: '3.5vh'}}>
        <div className="left-text">Product</div>
        <div className="right-text">
          <p className = "underline" style = {{cursor: 'pointer'}} onClick={() => navigate('/product_overview')}>View all product features</p>
        </div>
      </div>

      <video className="video-container" autoPlay loop muted
        style = {{marginBottom: '3vh'}}>
        <source src="/video/Quasar_simulator.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div class="update-container" style = {{marginBottom: '3.5vh', marginTop: '3.5vh'}}>
        <div className="center-text">End-to-End image pipeline for illuminant - scene - optics - actuator - sensor - isp  - algorithms</div>
      </div>

      <div style = {{marginTop: '7vh', marginBottom: '10vh', paddingLeft: '20vw', paddingRight: '20vw'}}>
        <div className="row">
          <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
            <div style={{ marginBottom: '0.5vh', paddingTop: '5vh', paddingBottom: '5vh', paddingLeft: '1vw', paddingRight: '1vw', borderRadius: '15px', backgroundColor: '#FFFFFF'}}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div>
                  <img style = {{width: '3vw', height: '3vw', backgroundPosition: 'left', marginRight: '1vw', marginBottom: '2vh'}} src={time} alt=""/>
                </div>
                <p style={{fontSize: '2.5vh', color: 'rgba(0, 0, 0, 1)', textAlign: 'left', fontFamily: 'Roboto, sans-serif'}}>
                  Save Time
                </p>
              </div>

              <p style={{textAlign: 'left', fontSize: '1.5vh', width: '18vw', color: 'rgba(0, 0, 0, 1)'}}>
                Achieve system validation ~100x faster <br/> with virtual hardware simulations.
              </p>
            </div>
          </div>
          <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
            <div style={{ marginBottom: '0.5vh', paddingTop: '5vh', paddingBottom: '5vh', paddingLeft: '1vw', paddingRight: '1vw', borderRadius: '15px', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div>
                  <img style = {{width: '3vw', height: '3vw', backgroundPosition: 'left', marginRight: '1vw', marginBottom: '2vh'}} src={money} alt=""/>
                </div>
                <p style={{fontSize: '2.5vh', color: 'rgba(0, 0, 0, 1)', textAlign: 'left', fontFamily: 'Roboto, sans-serif'}}>
                  Save Money
                </p>
              </div>
              <p style = {{textAlign: 'left', fontSize: '1.5vh', width: '18vw', color: 'rgba(0, 0, 0, 1)'}}>
                Reduce system validation costs to ~1/100 <br/> with virtual hardware simulations.
              </p>  
            </div>
          </div>
          <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
            <div style={{ marginBottom: '0.5vh', paddingTop: '5vh', paddingBottom: '5vh', paddingLeft: '1vw', paddingRight: '1vw', borderRadius: '15px', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div>
                  <img style = {{width: '3vw', height: '3vw', backgroundPosition: 'left', marginRight: '1vw', marginBottom: '2vh'}} src={optimize} alt=""/>
                </div>
                <p style={{fontSize: '2.5vh', color: 'rgba(0, 0, 0, 1)', textAlign: 'left', fontFamily: 'Roboto, sans-serif'}}>
                  Optimize
                </p>
              </div>
              <p style = {{textAlign: 'left', fontSize: '1.5vh', width: '18vw', color: 'rgba(0, 0, 0, 1)'}}>
                Find the right balance <br/> between size, cost and performance  
              </p>  
            </div>
          </div>
        </div>
      </div>

      <div style = {{marginBottom: '3.5vh', paddingLeft: '20vw', paddingRight: '20vw'}}/>

      <hr class="separator"></hr>

      <div class="update-container" style = {{marginBottom: '3.5vh', marginTop: '3.5vh'}}>
        <div className="left-text">Use cases</div>
        {/* <div className="right-text">
          <p className = "underline" style = {{cursor: 'pointer'}}>View all updates</p>
        </div> */}
      </div>

      <div style = {{marginBottom: '8vh', paddingLeft: '20vw', paddingRight: '20vw'}}>
        <div className="row">
          <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
            <p>
              Autonomous systems
            </p>
            <img style = {{width: '18vw', height: '10vw', backgroundPosition: 'left'}} src={img1} alt=""/>
            <p style={{textAlign: 'left', fontSize: '1.5vh', width: '18vw'}}>
              Validate AI algorithms on a virtual hardware for testing system-level performance
            </p>
          </div>
          <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
            <p>
              Visual Inspection in Manufacturing
            </p>
            <img style = {{width: '18vw', height: '10vw', backgroundPosition: 'center'}} src={img2} alt = ""/>
            <p style = {{textAlign: 'left', fontSize: '1.5vh', width: '18vw'}}>
              Test the performance of Inspection algorithms in different light settings
            </p>  
          </div>
          <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
            <p>
              Augmented/Virtual Reality
            </p>
            <img style = {{width: '18vw', height: '10vw', backgroundPosition: 'center'}} src={img3} alt = ""/>
            <p style = {{textAlign: 'left', fontSize: '1.5vh', width: '18vw'}}>
              Find the best hardware for your specific algorithm needs
            </p>  
          </div>
        </div>
      </div>

      <hr class="separator"></hr>

      <div class="update-container" style = {{marginBottom: '10vh', marginTop: '10vh'}}>
        <div className="left-text">Strengths</div>
        <div className="right-text" style = {{width: '45vw'}}>
          <div style={{ marginBottom: '0.5vh', paddingTop: '7vh', paddingBottom: '7vh',
            paddingLeft: '50px', paddingRight: '50px', borderRadius: '15px', backgroundColor: '#f9f9f9' }}>
            
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <div>
                <img style = {{width: '3vw', height: '3vw', backgroundPosition: 'left', marginRight: '1vw', marginBottom: '2vh'}} src={img6} alt=""/>
              </div>
              <p style={{ fontWeight: 'bold', fontSize: '2.5vh', color: 'black', fontFamily: 'Roboto, sans-serif'}}>
                World Class Accuracy
              </p>
            </div>
            
            <div style={{ fontSize: '1.5vh', color: 'black' }}>
              Recognized by computer vision engineers for its high accuracy
            </div>
          </div>
          <div style={{ marginBottom: '0.5vh', paddingTop: '7vh', paddingBottom: '7vh',
            paddingLeft: '50px', paddingRight: '50px', borderRadius: '15px', backgroundColor: '#f9f9f9' }}>
            
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <div>
                <img style = {{width: '3vw', height: '3vw', backgroundPosition: 'left', marginRight: '1vw', marginBottom: '2vh'}} src={img5} alt=""/>
              </div>
              <p style={{ fontWeight: 'bold', fontSize: '2.5vh', color: 'black', fontFamily: 'Roboto, sans-serif' }}>
                Customizable
              </p>
            </div>
            
            <div style={{ fontSize: '1.5vh', color: 'black' }}>
              The system is so flexible that you can simulate any vision hardware you want
            </div>
          </div>
          <div style={{ marginBottom: '0.5vh', paddingTop: '7vh', paddingBottom: '7vh',
            paddingLeft: '50px', paddingRight: '50px', borderRadius: '15px', backgroundColor: '#f9f9f9' }}>
            
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <div>
                <img style = {{width: '3vw', height: '3vw', backgroundPosition: 'left', marginRight: '1vw', marginBottom: '2vh'}} src={img4} alt=""/>
              </div>
              <p style={{ fontWeight: 'bold', fontSize: '2.5vh', color: 'black', fontFamily: 'Roboto, sans-serif' }}>
                Secure and Private
              </p>
            </div>
            
            <div style={{ fontSize: '1.5vh', color: 'black' }}>
              <div style={{marginBottom: '0.7vh'}}>
                Ensure the security and confidentiality of your design specifications by utilizing on-premise deployment <br/>
              </div>
              <div>
                Keep your data and intellectual property within your own infrastructure
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <hr class="separator"></hr>

      <div class="update-container" style = {{marginBottom: '3.5vh', marginTop: '3.5vh'}}>
        <div className="left-text">Research</div>
        <div className="right-text">
          <div>
            We research deep learning based computer vision system optimization.
          </div>
          <div className = "underline" style = {{cursor: 'pointer', paddingTop: '2vh'}} onClick = {()=>navigate('research')}>
            <p>Learn about our research</p>
          </div>
        </div>
      </div>
      
      <hr class="separator"></hr>
      
      <div class="update-container" style = {{marginBottom: '3.5vh', marginTop: '3.5vh'}}>
        <div className="left-text">Careers at {company_name}</div>
        <div className="right-text">
          <div>
            Developing a perfect computer vision simulator requires talents from diverse fields such as optics, sensor, image signal processing, and computer vision
          </div>
          <div className = "underline" onClick = {()=> navigate('/careers')} style = {{cursor: 'pointer', paddingTop: '2vh'}}>
            <p>View careers</p>
          </div>
        </div>
      </div>

      <img style = {{width: '60vw', backgroundPosition: 'center', marginTop: '0.5vh', marginBottom: '3vh'}} src={career} alt = "" />
      <div style = {{marginBottom: '3vh'}}>
        <p className = "career-join">Join us in shaping the future of technology</p>
      </div>
      
      <div style = {{marginBottom: '5vh'}}>
        <Button variant = "light" size = "lg"
        onClick = {()=> navigate('/careers')}>
          <div className = "career-button">View Careers</div> 
        </Button>
      </div>

    </div>
  )
};

export default Homepage;