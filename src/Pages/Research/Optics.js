import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React, {useLayoutEffect} from 'react';

const Optics = () => {
  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

//   let [tab, setTab] = useState(null)

  return(
    <div style = {{marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh'}}>
      <div style = {{display: 'flex', flexDirection: 'column'}}>
        <div className="career-left-text">
          <div>
            <p style = {{fontSize: '50px'}}>
              Lens Design Optimization for Downstream Tasks
            </p>
            <br/>
          </div>
          <p style = {{fontSize: '20px'}}>
            Traditional lens design prioritizes optical performance metrics such as aberration minimization and resolution. 
            However, in computer vision applications, lens performance should be evaluated in the context of downstream tasks 
            such as object detection, segmentation, and recognition. Our research focuses on optimizing lens parameters—including 
            focal length, aperture, and optical coatings—not just for conventional imaging performance but for their impact on 
            AI-driven vision systems. By simulating real-world conditions, we develop lenses that enhance machine perception, 
            improving accuracy in low-light environments, adverse weather conditions, and high-speed imaging scenarios.
          </p>
        </div>
      </div>
    </div>
  )
};


export default Optics;