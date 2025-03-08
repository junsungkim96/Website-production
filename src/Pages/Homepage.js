import '../styles/desktop.css';
import '../styles/laptop.css';
import '../styles/tablet.css';
import '../styles/mobile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import img1 from '../img/autonomous.jpg';
import img2 from '../img/manufacturing.png';
import img3 from '../img/ar_vr.jpg';
import career from '../img/career.jpg';
import {useNavigate} from 'react-router-dom';
import {useLayoutEffect} from 'react';
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

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

  return(
    <div>
      
      <AnimatedBackground/>

      <hr class="separator"></hr>

      {/* -----------------------------------------------------------Product-------------------------------------------------------- */}

      <div class="update-container">
        <div className="left-text">
          Product
        </div>
        <div className="right-text">
          <p className = "underline" style = {{cursor: 'pointer'}} onClick={() => navigate('/product_overview')}>View all product features</p>
        </div>
      </div>

      <video className="video-container" autoPlay loop muted
        style = {{marginBottom: '3vh'}}>
        <source src="/video/Quasar_simulator.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="product-center-text">End-to-End image pipeline for illuminant - scene - optics - actuator - sensor - isp  - algorithms</div>
      

      <div className = "product-card" style ={{marginTop: '10vh', marginBottom: '10vh'}}>
        <div className="row">
          <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
            <div style={{ marginBottom: '3vh', marginTop: '3vh', paddingTop: '5vh', paddingBottom: '5vh', paddingLeft: '1vw', paddingRight: '1vw', 
                          borderRadius: '15px', backgroundColor: '#FFFFFF', minHeight: '25vh'}}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '10%'}}>
                <img className="product-image" src={time} alt=""/>
                <div className = "product-text-title">
                  Save Time
                </div>
              </div>

              <div className = "product-text">
                Achieve system validation ~100x faster with virtual hardware simulations.
              </div>
            </div>
          </div>
          <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
            <div style={{ marginBottom: '3vh', marginTop: '3vh', paddingTop: '5vh', paddingBottom: '5vh', paddingLeft: '1vw', paddingRight: '1vw', 
                          borderRadius: '15px', backgroundColor: '#FFFFFF', minHeight: '25vh' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '10%'}}>
                <img className="product-image" src={money} alt=""/>
                <div className = "product-text-title">
                  Save Money
                </div>
              </div>
              <div className = "product-text">
                Reduce system validation costs to ~1/100 with virtual hardware simulations.
              </div>  
            </div>
          </div>
          <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
            <div style={{ marginBottom: '3vh', marginTop: '3vh', paddingTop: '5vh', paddingBottom: '5vh', paddingLeft: '1vw', paddingRight: '1vw', 
                          borderRadius: '15px', backgroundColor: '#FFFFFF', minHeight: '25vh' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '10%'}}>
                <img className="product-image" src={optimize} alt=""/>
                <div className = "product-text-title">
                  Optimize
                </div>
              </div>
              <div className = "product-text">
                Find the right balance between size, cost and performance  
              </div>  
            </div>
          </div>
        </div>
      </div>

      <hr class="separator"></hr>

      {/* -----------------------------------------------------------Use Cases-------------------------------------------------------- */}
      <div class="update-container">
        <div className="left-text">Use Cases</div>
        {/* <div className="right-text">
          <p className = "underline" style = {{cursor: 'pointer'}}>View all updates</p>
        </div> */}
      </div>

      <div className="use-case" style = {{marginBottom: '25vh'}}>
        <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
          <div className="use-case-text-title">
            Autonomous systems
          </div>
          <img className="use-case-image" src={img1} alt=""/>
          <div className="use-case-text">
            Validate AI algorithms on a virtual hardware for testing system-level performance
          </div>
        </div>
        <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
          <div className="use-case-text-title">
            Visual Inspection in Manufacturing
          </div>
          <img className="use-case-image" src={img2} alt = ""/>
          <div className="use-case-text">
            Test the performance of Inspection algorithms in different light settings
          </div>  
        </div>
        <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
          <div className="use-case-text-title">
            Augmented/Virtual Reality
          </div>
          <img className="use-case-image" src={img3} alt = ""/>
          <div className="use-case-text">
            Find the best hardware for your specific algorithm needs
          </div>  
        </div>
      </div>

      <hr class="separator"></hr>

      {/* -----------------------------------------------------------Strengths-------------------------------------------------------- */}

      <div class="update-container" style = {{marginBottom: '10vh', marginTop: '10vh'}}>
        <div className="left-text">Strengths</div>
        <div className="right-text">
          <div className = "strengths-card">
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <div>
                <img className="strength-image" src={img6} alt=""/>
              </div>
              <p className="strength-title">
                World Class Accuracy
              </p>
            </div>
            
            <div className="strength-text">
              Recognized by computer vision engineers for its high accuracy
            </div>
          </div>
          <div className = "strengths-card">
            
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <div>
                <img className="strength-image" src={img5} alt=""/>
              </div>
              <p className="strength-title">
                Customizable
              </p>
            </div>
            
            <div className="strength-text">
              The system is so flexible that you can simulate any vision hardware you want
            </div>
          </div>
          <div className = "strengths-card">
            
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <div>
                <img className="strength-image" src={img4} alt=""/>
              </div>
              <p className="strength-title">
                Secure and Private
              </p>
            </div>
            
            <div style={{ fontSize: '1.5vh', color: 'black', textAlign: 'left'}}>
              <div className="strength-text" style={{marginBottom: '0.7vh'}}>
                Ensure the security and confidentiality of your design specifications by utilizing on-premise deployment <br/>
              </div>
              <div className="strength-text">
                Keep your data and intellectual property within your own infrastructure
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <hr class="separator"></hr>
      
      {/* -----------------------------------------------------------Research-------------------------------------------------------- */}

      <div class="update-container">
        <div className="left-text">Research</div>
        <div className="right-text">
          <div className="right-small-text">
            We research deep learning based computer vision system optimization.
          </div>
          <div className = "underline" style = {{cursor: 'pointer', paddingTop: '2vh'}} onClick = {()=>navigate('research')}>
            <p>Learn about our research</p>
          </div>
        </div>
      </div>
      
      <hr class="separator"></hr>

      {/* -----------------------------------------------------------Career-------------------------------------------------------- */}
      
      <div class="update-container">
        <div className="left-text">
          Careers at {isSmallScreen ? <br/> : null} {company_name}
        </div>
        <div className="right-text">
          <div className="right-small-text">
            Developing a perfect computer vision simulator requires talents from diverse fields such as optics, sensor, image signal processing, and computer vision
          </div>
          <div className = "underline" onClick = {()=> navigate('/careers')} style = {{cursor: 'pointer', paddingTop: '2vh'}}>
            <p>View careers</p>
          </div>
        </div>
      </div>

      <div style = {{marginBottom: '10vh'}}>
        <img className = "career-image" src={career} alt = "" />
        <div className="career-join" style={{ textAlign: 'center', marginBottom: '3vh' }}>
          Join us in shaping the {isSmallScreen ? <br/> : null} future of technology
        </div>
        
        <div>
          <Button variant = "light" size = "lg"
          onClick = {()=> navigate('/careers')}>
            <div className = "career-button">View Careers</div> 
          </Button>
        </div>
      </div>

    </div>
  )
};

export default Homepage;