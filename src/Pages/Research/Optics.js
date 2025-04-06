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
    <div style = {{marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh', overflowX: 'hidden', width: '100vw', boxSizing: 'border-box'}}>
      <div style = {{marginBottom: '15vh'}}>
        <div className="left-text" style = {{width: '100vw', fontSize: '40px'}}>
          Lens Design Optimization for Downstream Tasks
        </div>
        <br/>
        <p className = "company-text" >
          Traditional lens design focuses on maximizing optical performance—such as reducing aberrations and increasing resolution.
          However, for computer vision, it's crucial to evaluate lenses based on how they affect downstream AI tasks like object detection
          and segmentation. Our research takes this into account to design lenses that enhance vision system performance. This includes:
        </p>
        <div className = "left-text" style = {{width: '100vw'}}>
          <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.8', fontSize: '1rem', color: 'white  ' }}>
            <li style={{ marginBottom: '12px' }}>Optimizing focal length, aperture, and coatings for AI-driven perception</li>
            <li style={{ marginBottom: '12px' }}>Simulating real-world conditions to evaluate lens performance</li>
            <li style={{ marginBottom: '12px' }}>Enhancing robustness in low-light, high-speed, and harsh environments</li>
            <li>Balancing optical and computational elements for task-specific imaging</li>
          </ul>
        </div>
      </div>
    </div>
  )
};


export default Optics;