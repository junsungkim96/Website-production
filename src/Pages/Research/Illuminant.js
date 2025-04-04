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
    <div style = {{marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh', overflowX: 'hidden', width: '100vw', boxSizing: 'border-box'}}>
      <div style = {{marginBottom: '15vh'}}>
        <div className="left-text">
          Active Illumination Methods
        </div>
        <br/>
        <p className = "company-text" >
          Active illumination involves dynamically altering the spectrum of the illuminant to enhance scene perception and 
          improve imaging performance. Unlike passive imaging, which relies on ambient or uncontrolled lighting conditions, 
          active illumination allows precise control over spectral composition, intensity, and directionality. Our research 
          explores the impact of spectral tuning on object recognition, material classification, and depth estimation. 
          By optimizing the illuminant spectrum based on scene characteristics, we enhance visibility in challenging environments, 
          improve AI model accuracy, and enable advanced computational imaging techniques. Applications include hyperspectral 
          imaging, adaptive lighting for autonomous systems, and real-time spectral optimization for industrial inspection.
        </p>
      </div>
    </div>
  )
};


export default Illuminant;