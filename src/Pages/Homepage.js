import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import bg from '../img/universe.jpg'
import img1 from '../img/autonomous.jpg';
import img2 from '../img/manufacturing.png';
import img3 from '../img/ar_vr.jpg';
import ai_safety from '../img/ai_safety.jpg';
import career from '../img/career.jpg';
import feynman from '../img/feynman.jpg';
import {useNavigate} from 'react-router-dom';
import {useLayoutEffect} from 'react';
import videoSource from '../video/Quasar_simulator.mp4';


const Homepage = () => {
  const navigate = useNavigate();

  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

  return(
    <div>
      <div style = {{marginTop: '60px', marginBottom: '100px', height: '100px'}}>
        <p>"Your Vision, Perfectly Simulated"</p>
      </div>
      {/* <img style = {{width: '60vw', backgroundPosition: 'center'}} src={bg} alt = ""/> */}

      <video style={{ width: '60vw', backgroundPosition: 'center' }} autoPlay loop muted>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container" style = {{marginBottom: '3vh', marginTop: '3vh', width: '60vw'}}>
        <div className="row">
          <div className="col-md-6"><p>Predict performance without a physical prototype</p></div>
          <div className="col-md-6"><p>Find the right balance between size, cost and performance</p></div>
        </div>
      </div>

      <hr class="separator"></hr>

      <div class="update-container" style = {{marginBottom: '3.5vh', marginTop: '3.5vh'}}>
        <div className="left-text">Products</div>
        <div className="right-text">
          <p className = "underline" style = {{cursor: 'pointer'}}>View all updates</p>
        </div>
      </div>

      <div style = {{marginBottom: '3.5vh', paddingLeft: '20vw', paddingRight: '20vw'}}>

      </div>

      <hr class="separator"></hr>

      <div class="update-container" style = {{marginBottom: '3.5vh', marginTop: '3.5vh'}}>
        <div className="left-text">Use cases</div>
        {/* <div className="right-text">
          <p className = "underline" style = {{cursor: 'pointer'}}>View all updates</p>
        </div> */}
      </div>

      <div style = {{marginBottom: '3.5vh', paddingLeft: '20vw', paddingRight: '20vw'}}>
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

      <div class="update-container" style = {{marginBottom: '3.5vh', marginTop: '3.5vh'}}>
        <div className="left-text">Safety & Responsibility</div>
        <div className="right-text" style = {{width: '45vw'}}>
          <div>
            Our work to create safe and beneficial AI requires a deep understanding of the potential risks and benefits, as well as careful consideration of the impact
          </div>
          <div className = "underline" style = {{cursor: 'pointer', paddingTop: '2vh'}}>
            <p>Learn about safety</p>
          </div>
        </div>
      </div>

      <img style = {{width: '60vw', backgroundPosition: 'center', marginTop: '1.5vh', marginBottom: '3.5vh'}}  src={ai_safety} alt = "" />

      <hr class="separator"></hr>
      
      <div class="update-container" style = {{marginBottom: '3.5vh', marginTop: '3.5vh'}}>
        <div className="left-text">Research</div>
        <div className="right-text" style = {{width: '45vw'}}>
          <div>
            We research generative models and how to align them with human values.
          </div>
          <div className = "underline" style = {{cursor: 'pointer', paddingTop: '2vh'}}>
            <p>Learn about our research</p>
          </div>
        </div>
      </div>
      
      <hr class="separator"></hr>
      
      <div class="update-container" style = {{marginBottom: '3.5vh', marginTop: '3.5vh'}}>
        <div className="left-text">Strengths</div>
        <div className="right-text" style = {{width: '45vw'}}>
          <div style={{ marginBottom: '0.5vh', paddingTop: '120px', paddingBottom: '120px',
            paddingLeft: '50px', paddingRight: '50px', borderRadius: '15px', backgroundColor: '#f9f9f9' }}>
            <p style={{ fontWeight: 'bold', fontSize: '1.2em', color: 'black' }}>
              World Class Accuracy
            </p>
            <div style={{ fontSize: '1em', color: 'black' }}>
              Recognized by computer vision engineers as the most complete computer vision system available
            </div>
          </div>
          <div style={{ marginBottom: '0.5vh', paddingTop: '120px', paddingBottom: '120px',
            paddingLeft: '50px', paddingRight: '50px', borderRadius: '15px', backgroundColor: '#f9f9f9' }}>
            <p style={{ fontWeight: 'bold', fontSize: '1.2em', color: 'black' }}>
              Customizable
            </p>
            <div style={{ fontSize: '1em', color: 'black' }}>
              The system is so flexbible that you can simulate any vision hardware you want
            </div>
          </div>
          <div style={{ marginBottom: '0.5vh', paddingTop: '120px', paddingBottom: '120px',
            paddingLeft: '50px', paddingRight: '50px', borderRadius: '15px', backgroundColor: '#f9f9f9' }}>
            <p style={{ fontWeight: 'bold', fontSize: '1.2em', color: 'black' }}>
              Secure and Private
            </p>
            <div style={{ fontSize: '1em', color: 'black' }}>
              Ensure the security and confidentiality of your design specifications by utilizing on-premise deployment, 
              which keeps your data and intellectual property within your own infrastructure
            </div>
          </div>
        </div>
      </div>

      
      <hr class="separator"></hr>
      
      
      <div class="update-container" style = {{marginBottom: '3.5vh', marginTop: '3.5vh'}}>
        <div className="left-text">Careers at Qureka</div>
        <div className="right-text" style = {{width: '45vw'}}>
          <div>
            Developing a perfect computer vision simulator requires talents from diverse fields such as optics, sensor, image signal processing, computer vision engineers
          </div>
          <div className = "underline" onClick = {()=> navigate('/careers')} style = {{cursor: 'pointer', paddingTop: '2vh'}}>
            <p>View careers</p>
          </div>
        </div>
      </div>

      <img style = {{width: '60vw', backgroundPosition: 'center', marginTop: '1.5vh', marginBottom: '5vh'}} src={career} alt = "" />
      
      {/* <hr class="separator"></hr> */}

      {/* <div className = "container" style = {{marginTop: '5vh', marginBottom: '5vh', width: '60vw'}}>
        <div className = "row" style = {{display: 'flex', alignItems: 'center'}}>
          <div className="col-md-12">
            <p style = {{fontSize: '2.3vh', textAlign: 'left'}}>
              We make computer vision systems accessible to everyone!
            </p>
          </div>
        </div>
      </div> */}

      <hr class="separator" style = {{marginBottom: '3vh'}}></hr>

      <div style = {{marginBottom: '3vh'}}>
        <p style = {{fontSize: '1.7vw'}}>Join us in shaping the future of technology</p>
      </div>
      <div class = "container" style = {{marginBottom: '10vh'}}>
        <Button variant = "light" size = "lg" className = "px-4"
        onClick = {()=> navigate('/careers')}>
          View Careers 
        </Button>
      </div>

      <hr class="separator" style = {{marginBottom: '3vh'}}></hr>

    </div>
  )
};

export default Homepage;