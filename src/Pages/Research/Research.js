import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import {useNavigate} from 'react-router-dom';
import React, {useLayoutEffect} from 'react';
import imaging_pipeline from '../../img/research/research_overview.png';
// import light from '../../img/research/lamp.svg';
// import optics from '../../img/research/optics.png';
// import microchip from '../../img/research/microchip.png';


const Research = () => {
  const navigate = useNavigate();

  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

//   let [tab, setTab] = useState(null)

  return(
    <div style = {{marginBottom: '200px', paddingTop: '10vh', paddingBottom: '10vh', minHeight: '80vh', 
                  overflowX: 'hidden', width: '100vw', boxSizing: 'border-box'}}>
      <div style = {{marginBottom: '15vh'}}>
        <div className="left-text" style = {{fontSize: '50px'}}>
          Cutting-edge Research
        </div>
        <br/>
        <p className = "company-text" >
          At Qblack AI, we conduct cutting-edge research at the intersection of optics, imaging and artificial intelligence. <br/>
          Our focus is on understanding and optimizing interdependent effects of light, scene, lens, sensor, actuator, 
          image signal processing(isp) and AI algorithms. 
          By taking a holistic approach to the entire imaging pipeline, 
          we develop solutions that push the boundaries of computer vision performance. 
        </p>
        <img className = "full-width-image" style = {{marginTop: '3vh'}} src={imaging_pipeline} alt = "" />
      </div>
      
      <hr class="separator"></hr>

      {/* Research 1 */}

      <div class="update-container" style={{marginBottom: '3vh'}}>
        <div className="left-text" style = {{width: '90vw'}}>
          {/* <img className = "company-image" style = {{backgroundColor: 'white', borderRadius: '8px', padding: '3px', filter: 'contrast(80%) brightness(105%)'}} src={light} alt = "" /> */}
          Active Illumination
        </div>
        <div className="right-text">
          <div className = "underline" style = {{cursor: 'pointer'}} onClick = {()=>navigate('/illuminant')}>
            <p>View in detail</p>
          </div>
        </div>
      </div>
      <div className ="career-left-text" style={{marginBottom: '20vh'}}>
        <p style = {{fontSize: '20px'}}>
          By dynamically adjusting the spectrum of the illuminant, we enhance object recognition, material classification, and imaging
          performance in diverse environments
        </p>
      </div>

      {/* Research 2 */}

      <div class="update-container" style={{marginBottom: '3vh'}}>
        <div className="left-text" style = {{width: '90vw'}}>
          {/* <img className = "company-image" style = {{backgroundColor: 'white', borderRadius: '8px', padding: '3px'}} src={optics} alt = "" /> */}
          Lens Design Optimization
        </div>
        <div className="right-text">
          <div className = "underline" style = {{cursor: 'pointer'}} onClick = {()=>navigate('/optics')}>
            <p>View in detail</p>
          </div>
        </div>
      </div>
      <div className ="career-left-text" style={{marginBottom: '20vh'}}>
        <p style = {{fontSize: '20px'}}>
          We optimize lens design by considering its impact on AI-driven tasks, ensuring enhanced image quality and improved algorithm performance
        </p>
      </div>

      {/* Research 3 */}

      <div class="update-container" style={{marginBottom: '3vh'}}>
        <div className="left-text" style = {{width: '90vw'}}>
          {/* <img className = "company-image" style = {{backgroundColor: 'white', borderRadius: '8px', padding: '3px'}} src={microchip} alt = "" /> */}
          Physical Sensor Simulation
        </div>
        <div className="right-text">
          <div className = "underline" style = {{cursor: 'pointer'}} onClick = {()=>navigate('/sensor')}>
            <p>View in detail</p>
          </div>
        </div>
      </div>
      <div className ="career-left-text" style={{marginBottom: '20vh'}}>
        <p style = {{fontSize: '20px'}}>
          Our sensor simulations accurately model real-world imaging conditions, enabling efficient sensor evaluation and algorithm development
          without costly hardware iterations
        </p>
      </div>

      {/* Research 4 */}

      <div class="update-container" style={{marginBottom: '3vh'}}>
        <div className="left-text" style = {{width: '90vw'}}>AI-Based ISP Automation</div>
        <div className="right-text">
          <div className = "underline" style = {{cursor: 'pointer'}} onClick = {()=>navigate('/isp')}>
            <p>View in detail</p>
          </div>
        </div>
      </div>
      <div className ="career-left-text" style={{marginBottom: '20vh'}}>
        <p style = {{fontSize: '20px'}}>
          We develop AI-driven optimization techniques to automatically fine-tune ISP parameters, acheiving superior image quality tailored
          to specific applications
        </p>
      </div>

      {/* Research 5 */}

      <div className="update-container" style={{ marginBottom: '3vh' }}>
        <div className="left-text" style={{ width: '90vw' }}>QPU-Based Optimization</div>
        <div className="right-text">
          <div className="underline" style={{ cursor: 'pointer' }} onClick={() => navigate('/qpu')}>
            <p>View in detail</p>
          </div>
        </div>
      </div>
      <div className="career-left-text" style={{ marginBottom: '20vh' }}>
        <p style={{ fontSize: '20px' }}>
          We explore the integration of Quantum Processing Units (QPUs) for accelerating the joint optimization of imaging pipelines.
        </p>
      </div>


      <hr class="separator"></hr>

      <div style = {{marginBottom: '20vh', marginTop: '10vh'}}>
        <div className="left-text">
          Why Our Research Matters  
        </div>
        <br/>
        <p className = "company-text" >
          Unlike traditional approches that optimize each component of the imaging pipeline independently, 
          we focus on the interdependent effects across the entire system. This enables:
          <br/>
          <br/>
          <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.8', fontSize: '1rem', color: 'white  ' }}>
            <li>Better AI Performance - By understanding how lens and sensor characteristics affect AI, we ensure
            that vision algorithms operate at peak efficiency.</li>
            <li>Cost-Effective Solutions - Joint optimization reduces the need for expensive hardware by leveraging
            computational enhancements</li>
            <li>Real-World Robustness - Our research leads to imaging solutions that are adaptable to diverse 
            lighting environments and conditions</li>
          </ul>
        </p>
      </div>

      <hr class="separator"></hr>

      <div style = {{marginTop: '10vh'}}>
        <div className="left-text">
          Collaborate With Us
        </div>
        <br/>
        <p className = "company-text" >
          We believe that true innovation happens through collaboration. Whether you are a computer vision researcher, camera manufacturer, or system integrator, 
          we invite you to work with us in pushing the boundaries of computational imaging and AI-driven vision systems.
          <br/><br/>
          Contact us to learn more about our research and partnership opportunities.
        </p>
      </div>

    </div>
  )
};


export default Research;