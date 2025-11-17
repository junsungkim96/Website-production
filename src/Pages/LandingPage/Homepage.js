import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import img1 from '../../img/homepage/autonomous.jpg';
import img2 from '../../img/homepage/manufacturing.png';
import img3 from '../../img/homepage/ar_vr.jpg';
import career from '../../img/homepage/career.jpg';
import {useNavigate} from 'react-router-dom';
import {useLayoutEffect} from 'react';
import AnimatedBackground from './Animation';
import money from '../../img/homepage/cash_save.svg';
import time from '../../img/homepage/hourglass.svg';
import optimize from '../../img/homepage/optimization.svg';
import img4 from '../../img/homepage/security-safe.svg';
import img5 from '../../img/homepage/settings-gear.svg';
import img6 from '../../img/homepage/specificity.svg';
import {company_name} from '../../data/Company_data';
import product from '../../img/homepage/product_overview.png';
import {Helmet} from "react-helmet";


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
      <Helmet>
        <title>QblackAI | Integrated HW-SW Computer Vision Simulation Platform</title>
        <meta
          name="description"
          content="QblackAI provides an end-to-end virtual computer vision simulation platform covering hardware and software pipelines. 
                   Test AI algorithms and camera systems without physical prototypes."
        />
        <link rel="canonical" href="https://qblackai.com/" />
      </Helmet>
      
      <AnimatedBackground/>

      <hr class="separator"></hr>

      {/* -----------------------------------------------------------Product-------------------------------------------------------- */}

      <section>
        <div className="update-container">
          <h2 className="left-text">
            Product
          </h2>
          <div className="right-text">
            <p
              className="underline"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/product_features')}
            >
              View all product features
            </p>
          </div>
        </div>

        <img
          className="pipeline-image"
          src={product}
          alt="End-to-End computer vision imaging pipeline covering Illuminant, Scene, Optics, Sensor, ISP and Algorithms"
        />
        <div className="product-center-text">
          End-to-End imaging pipeline covering Illuminant, Scene, Optics, Sensor, ISP and Algorithms
        </div>

        <div className="product-card" style={{ marginTop: '10vh', marginBottom: '10vh' }}>
          <div className="row g-4">
            {/* Card 1 */}
            <article className="col-lg-4 col-md-6 d-flex">
              <div
                className="product-card-content"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '5vh 1vw',
                  borderRadius: '15px',
                  backgroundColor: '#FFFFFF',
                  minHeight: '25vh',
                  flexGrow: 1,
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '10%' }}>
                  <img className="product-image" src={time} alt="Save time with virtual simulations" />
                  <p className="strength-title">Save Time</p>
                </div>
                <div className="product-text">
                  Achieve system validation ~10x faster with integrated HW & SW virtual simulations
                </div>
              </div>
            </article>

            {/* Card 2 */}
            <article className="col-lg-4 col-md-6 d-flex">
              <div
                className="product-card-content"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '5vh 1vw',
                  borderRadius: '15px',
                  backgroundColor: '#FFFFFF',
                  minHeight: '25vh',
                  flexGrow: 1,
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '10%' }}>
                  <img className="product-image" src={money} alt="Save money with virtual simulations" />
                  <p className="strength-title">Reduce Cost</p>
                </div>
                <div className="product-text">
                  Minimize validation expenses to roughly 1/10 compared to physical prototypes using virtual simulations
                </div>
              </div>
            </article>

            {/* Card 3 */}
            <article className="col-lg-4 col-md-6 d-flex">
              <div
                className="product-card-content"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '5vh 1vw',
                  borderRadius: '15px',
                  backgroundColor: '#FFFFFF',
                  minHeight: '25vh',
                  flexGrow: 1,
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '10%' }}>
                  <img className="product-image" src={optimize} alt="Optimize balance between size, cost, and performance" />
                  <p className="strength-title">Optimize</p>
                </div>
                <div className="product-text">
                  Find the right balance between size, cost, and performance
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>





      <hr class="separator"></hr>

      {/* -----------------------------------------------------------Use Cases-------------------------------------------------------- */}
      <section>
        <div class="update-container">
          <h2 className="left-text">Use Cases</h2>
        </div>

        <div className="use-case" style = {{marginBottom: '25vh'}}>
          <div className="row">
            <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
              <div className="use-case-text-title">
                Autonomous systems
              </div>
              <img className="use-case-image" src={img1} alt="Virtual hardware simulation for autonomous systems AI testing"/>
              <div className="use-case-text">
                Validate AI algorithms on a virtual hardware for testing system-level performance
              </div>
            </div>
            <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
              <div className="use-case-text-title">
                Visual Inspection in Manufacturing
              </div>
              <img className="use-case-image" src={img2} alt = "Simulated visual inspection in manufacturing with different camera hardware and lighting"/>
              <div className="use-case-text">
                Test the performance of inspection algorithms in different camera HW and light settings
              </div>  
            </div>
            <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
              <div className="use-case-text-title">
                Augmented/Virtual Reality
              </div>
              <img className="use-case-image" src={img3} alt = "AR/VR hardware simulation for optimal computer vision algorithm setup"/>
              <div className="use-case-text">
                Find the best hardware for your specific algorithm needs
              </div>  
            </div>
          </div>
        </div>
      </section>

      <hr class="separator"></hr>

      {/* -----------------------------------------------------------Strengths-------------------------------------------------------- */}

      <section className="update-container" style={{ marginBottom: '10vh', marginTop: '10vh' }}>
        <h2 className="left-text">
          Strengths
        </h2>
        <div className="right-text">

          {/* World Class Accuracy */}
          <div className="strengths-card">
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div>
                <img className="strength-image" src={img6} alt="Icon representing world class accuracy" />
              </div>
              <p className="strength-title">World Class Accuracy</p>
            </div>
            <div className="strength-text">
              Recognized by computer vision engineers for its high accuracy
            </div>
          </div>

          {/* Customizable */}
          <div className="strengths-card">
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div>
                <img className="strength-image" src={img5} alt="Icon representing system customizability" />
              </div>
              <p className="strength-title">Customizable</p>
            </div>
            <div className="strength-text">
              The system is so flexible that you can simulate any vision hardware you want
            </div>
          </div>

          {/* Secure and Private */}
          <div className="strengths-card">
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div>
                <img className="strength-image" src={img4} alt="Icon representing secure and private cloud platform" />
              </div>
              <p className="strength-title">Secure and Private</p>
            </div>
            <div style={{ fontSize: '1.5vh', color: 'black', textAlign: 'left' }}>
              <div className="strength-text">
                Keep your data and intellectual property protected with enterprise-grade security measures
              </div>
            </div>
          </div>

        </div>
      </section>

      
      <hr class="separator"></hr>
      
      {/* -----------------------------------------------------------Research-------------------------------------------------------- */}

      <section class="update-container">
        <h2 className="left-text">
          Research
        </h2>
        <div className="right-text">
          <div className="right-small-text">
            We research deep learning based computer vision system optimization
          </div>
          <div className = "underline" style = {{cursor: 'pointer', paddingTop: '2vh'}} onClick = {()=>navigate('research')}>
            <p>Learn about our research</p>
          </div>
        </div>
      </section>
      
      <hr class="separator"></hr>

      {/* -----------------------------------------------------------Career-------------------------------------------------------- */}
      
      <section>
        <div class="update-container">
          <h2 className="left-text">
            Careers
          </h2>
          <div className="right-text">
            <div className="right-small-text">
              Developing a perfect computer vision simulator requires talents from diverse fields such as optics, sensor, image signal processing, and AI algorithms
            </div>
            <div className = "underline" onClick = {()=> navigate('/careers')} style = {{cursor: 'pointer', paddingTop: '2vh'}}>
              <p>View careers</p>
            </div>
          </div>
        </div>

        <div style = {{marginBottom: '10vh'}}>
          <img className = "full-width-image" src={career} alt = "" />
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
      </section>

      <hr class="separator"></hr>

      {/* -----------------------------------------------------------Contact Us-------------------------------------------------------- */}
      
      <section class="update-container">
        <h2 className="left-text">
          Contact Us
        </h2>
        <div className="right-text">
          <div className="right-small-text">
            Big ideas start with a simple hello. Let's connect!
          </div>
          <div className = "underline" onClick = {()=> navigate('/contact')} style = {{cursor: 'pointer', paddingTop: '2vh'}}>
            <p>Contact us</p>
          </div>
        </div>
      </section>

    </div>
  )
};

export default Homepage;