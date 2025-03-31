import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import {useNavigate} from 'react-router-dom';
import React, {useLayoutEffect} from 'react';
import imaging_pipeline from '../../img/research/research_overview.png';

const Research = () => {
  const navigate = useNavigate();

  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

//   let [tab, setTab] = useState(null)

  return(
    <div style = {{marginBottom: '200px', paddingTop: '10vh', paddingBottom: '10vh', minHeight: '80vh'}}>
      <div style = {{display: 'flex', flexDirection: 'column'}}>
        <div className="career-left-text">
          <div>
            <p style = {{fontSize: '50px'}}>
              Cutting-edge Research
            </p>
            <br/>
          </div>

          <div>
            <p style = {{fontSize: '20px'}}>
              At Qblack AI, we conduct cutting-edge research at the intersection of optics, imaging and artificial intelligence. <br/>
              Our focus is on understanding and optimizing interdependent effects of light, scene, lens, sensor, actuator, 
              image signal processing(isp) and AI algorithms. <br/>
              By taking a holistic approach to the entire imaging pipeline, 
              we develop solutions that push the boundaries of computer vision performance. 
            </p>

            <img className = "full-width-image" style = {{marginTop: '3vh'}} src={imaging_pipeline} alt = "" />
          </div>
          
          {/* <Route path="/illuminant" element={<MainLayout>< Illuminant /></MainLayout>}/>
        <Route path="/optics" element={<MainLayout>< Optics /></MainLayout>}/>
        <Route path="/sensor" element={<MainLayout>< Sensor /></MainLayout>}/>
        <Route path="/isp" element={<MainLayout>< ISP /></MainLayout>}/> */}


          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20vh' }}>
              <p style={{ fontSize: '40px' }}>
                Active Illumination Methods
              </p>
              <p className="underline" style={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => navigate('/illuminant')}>
                View in detail
              </p>
            </div>
            <p style = {{fontSize: '20px'}}>
              By dynamically adjusting the spectrum of the illuminant, we enhance object recognition, material classification, and imaging
              performance in diverse environments
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20vh' }}>
              <p style={{ fontSize: '40px' }}>
                Lens Design Optimization for Downstream Tasks
              </p>
              <p className="underline" style={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => navigate('/optics')}>
                View in detail
              </p>
            </div>
            <p style = {{fontSize: '20px'}}>
              We optimize lens design by considering its impact on AI-driven tasks, ensuring enhanced image quality and improved algorithm performance
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20vh' }}>
              <p style={{ fontSize: '40px' }}>
                Physical Sensor Simulation
              </p>
              <p className="underline" style={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => navigate('/sensor')}>
                View in detail
              </p>
            </div>
            <p style = {{fontSize: '20px'}}>
              Our sensor simulations accurately model real-world imaging conditions, enabling efficient sensor evaluation and algorithm development
              without costly hardware iterations
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20vh' }}>
              <p style={{ fontSize: '40px' }}>
                AI Recommendation for Image Signal Processing
              </p>
              <p className="underline" style={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => navigate('/isp')}>
                View in detail
              </p>
            </div>
            <p style = {{fontSize: '20px'}}>
              We develop AI-driven optimization techniques to automatically fine-tune ISP parameters, acheiving superior image quality tailored
              to specific applications
            </p>
          </div>

          <div>
            <p style = {{fontSize: '50px', paddingTop: '20vh'}}>
              Why Our Research Matters  
            </p>
            <br/>
            <p style = {{fontSize: '18px'}}>
              Unlike traditional approches that optimize each component of the imaging pipeline independently, 
              we focus on the interdependent effects across the entire system. This enables:
              <br/>
              <br/>
              <div>
                Better AI Performance - By understanding how lens and sensor characteristics affect AI, we ensure
                that vision algorithms operate at peak efficiency.
              </div>
              <br/>
              <div>
                Cost-Effective Solutions - Joint optimization reduces the need for expensive hardware by leveraging
                computational enhancements
              </div>
              <br/>
              <div>
                Real-World Robustness - Our research leads to imaging solutions that are adaptable to diverse 
                lighting environments and conditions
              </div>
            </p>
          </div>

          <div style = {{marginTop: '30vh'}}>
            <p style = {{fontSize: '50px'}}>
              Collaborate With Us
            </p>
            <br/>
            <p style = {{fontSize: '18px'}}>
              We believe that true innovation happens through collaboration. Whether you are a computer vision researcher, camera manufacturer, or system integrator, 
              we invite you to work with us in pushing the boundaries of computational imaging and AI-driven vision systems.
              <br/>
              <br/>
            </p>
            <p>
              Contact us to learn more about our research and partnership opportunities.
            </p>


          </div>

        </div>
      </div>
    </div>
  )
};


export default Research;