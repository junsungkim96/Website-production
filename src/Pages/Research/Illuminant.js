import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React, {useLayoutEffect} from 'react';

const Illuminant = () => {
  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

//   let [tab, setTab] = useState(null)

  return(
    <div style = {{marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh', overflowX: 'hidden', width: '100%', boxSizing: 'border-box'}}>
      <div style = {{marginBottom: '15vh'}}>
        <div className="left-text" style = {{fontSize: '40px'}}>
          Active Illumination Methods
        </div>
        <br/>
        <p className = "company-text" >
          Active illumination involves dynamically altering the spectrum of the illuminant to enhance scene perception and 
          improve imaging performance. Unlike passive imaging, which relies on ambient or uncontrolled lighting conditions, 
          active illumination allows precise control over spectral composition, intensity, and directionality. This enables:
        </p>
        <div className = "left-text" style = {{width: '90vw'}}>
          <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.8', fontSize: '1rem', color: 'white  ' }}>
            <li style={{ marginBottom: '12px' }}>Improved object recognition and material classification</li>
            <li style={{ marginBottom: '12px' }}>Enhanced depth estimation through spectral tuning</li>
            <li style={{ marginBottom: '12px' }}>Optimized visibility in low-light or complex environments</li>
            <li>Applications in hyperspectral imaging, autonomous vision, and inspection</li>
          </ul>
        </div>
      </div>
    </div>
  )
};


export default Illuminant;