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
    <div style = {{marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh'}}>
      <div style = {{display: 'flex', flexDirection: 'column'}}>
        <div className="career-left-text">
          <div>
            <p style = {{fontSize: '50px'}}>
              Active Illumination Methods
            </p>
            <br/>
          </div>
          <p style = {{fontSize: '20px'}}>
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
    </div>
  )
};


export default Illuminant;