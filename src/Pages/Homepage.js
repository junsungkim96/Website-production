import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import bg from '../img/universe.jpg'
import img1 from '../img/nuclear_fusion.jpg';
import img2 from '../img/quantum_computer.jpg';
import img3 from '../img/quantum_biden.jpg';
import ai_safety from '../img/ai_safety.jpg';
import career from '../img/career.jpg';
import feynman from '../img/feynman.jpg';
import product1 from '../img/superconductor.jpg';
import product2 from '../img/arc_reactor.jpg';
import product3 from '../img/material.jpg';
import product4 from '../img/vaccine.jpg';
import {useNavigate} from 'react-router-dom';
import {useLayoutEffect} from 'react';


const Homepage = () => {
  const navigate = useNavigate();

  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

  return(
    <div>
      <img style = {{width: '60vw', backgroundPosition: 'center'}} src={bg} alt = ""/>
      <div className="container" style = {{marginBottom: '3vh', marginTop: '3vh', width: '60vw'}}>
        <div className="row">
          <div className="col-md-4"><p>Pioneering research on the <br/> path to Quantum AI</p></div>
          <div className="col-md-4"><p>Transforming work and <br/> creativity with Quantum AI</p></div>
          <div className="col-md-4"><p>Join us in shaping the future of <br/> technology</p></div>
        </div>
      </div>

      <hr class="separator"></hr>

      <div class="update-container" style = {{marginBottom: '3.5vh', marginTop: '3.5vh'}}>
        <div className="left-text">Latest updates</div>
        <div className="right-text">
          <p className = "underline" style = {{cursor: 'pointer'}}>View all updates</p>
        </div>
      </div>

      <div style = {{marginBottom: '3.5vh', paddingLeft: '20vw', paddingRight: '20vw'}}>
        <div className="row">
          <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
            <img style = {{width: '18vw', height: '18vw', backgroundPosition: 'left'}} src={img1} alt=""/>
            <p style={{textAlign: 'left', fontSize: '1.5vh', width: '18vw'}}>
              Breathrough in nuclear fusion technology. South Korea's nuclear reactor sets a new world record of 100s running time
            </p>
          </div>
          <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
            <img style = {{width: '18vw', height: '18vw', backgroundPosition: 'center'}} src={img2} alt = ""/>
            <p style = {{textAlign: 'left', fontSize: '1.5vh', width: '18vw'}}>
              Quantum computer shows quantum supremacy over world's fastest supercomputer 
            </p>  
          </div>
          <div className="col-md-4" style = {{display: 'flex', flexDirection: 'column'}}>
            <img style = {{width: '18vw', height: '18vw', backgroundPosition: 'center'}} src={img3} alt = ""/>
            <p style = {{textAlign: 'left', fontSize: '1.5vh', width: '18vw'}}>
              Joe Biden visits Google's quantum computing center before U.S. quantum initiatives
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
        <div className="left-text">Products</div>
        <div className="right-text" style = {{width: '45vw'}}>
          <div>
            Our API platform offers our latest models and guides for safety best practices.
          </div>
          <div className = "underline" style = {{cursor: 'pointer', paddingTop: '2vh'}}>
            <p>Explore our products</p>
          </div>
        </div>
      </div>

      <div style = {{marginBottom: '3.5vh', marginTop: '3.5vh', paddingLeft: '20vw', paddingRight: '20vw'}}>
        <div className="row" style = {{marginBottom: '7vh', display: 'flex', alignItems: 'flex-start'}}>
          <div className="col-md-3">
            <img style = {{width: '14vw', height: '10vw', overflow: 'hidden'}} src={product1} alt = ""/>
            <p style = {{textAlign: 'center', marginTop: '1.5vh'}}>
              Room-temperature superconductor
            </p>  
          </div>
          <div className="col-md-3">
            <img style = {{width: '14vw', height: '10vw'}} src={product2} alt = ""/>
            <p style = {{textAlign: 'center', marginTop: '1.5vh'}}>
              Miniaturized arc reactor
            </p>  
          </div>
          <div className="col-md-3">
            <img style = {{width: '14vw', height: '10vw'}} src={product3} alt = ""/>
            <p style = {{textAlign: 'center', marginTop: '1.5vh'}}>
              Material synthesis simulation software
            </p>  
          </div>
          <div className="col-md-3">
            <img style = {{width: '14vw', height: '10vw'}} src={product4} alt = ""/>
            <p style = {{textAlign: 'center', marginTop: '1.5vh'}}>
              Vaccine simulation software
            </p>  
          </div>
        </div>
      </div>
      
      <hr class="separator"></hr>
      
      <div class="update-container" style = {{marginBottom: '3.5vh', marginTop: '3.5vh'}}>
        <div className="left-text">Careers at OpenAI</div>
        <div className="right-text" style = {{width: '45vw'}}>
          <div>
            Developing safe and beneficial Quantum AI requires people from a wide range of disciplines and backgrounds.
          </div>
          <div className = "underline" onClick = {()=> navigate('/careers')} style = {{cursor: 'pointer', paddingTop: '2vh'}}>
            <p>View careers</p>
          </div>
        </div>
      </div>

      <img style = {{width: '60vw', backgroundPosition: 'center', marginTop: '1.5vh', marginBottom: '5vh'}} src={career} alt = "" />
      
      <hr class="separator"></hr>

      <div className = "container" style = {{marginTop: '5vh', marginBottom: '5vh', width: '60vw'}}>
        <div className = "row" style = {{display: 'flex', alignItems: 'center'}}>
          <div className="col-md-6">
            <p style = {{fontSize: '2.3vh', textAlign: 'left'}}>Nature isn't classical, dammit, and if you want to make a simulation of nature, 
            you better make it quantum mechanical.</p>
          </div>
          <div className="col-md-6">
            <img style = {{width: '30vw'}} src={feynman} alt = ""/>    
          </div>
        </div>
      </div>

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
    </div>
  )
};

export default Homepage;