import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React, {useLayoutEffect} from 'react';

const Sensor = () => {
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
              Physical sensor simulation
            </p>
            <br/>
          </div>
          <p style = {{fontSize: '20px'}}>
            The interaction between light and an image sensor is a complex process influenced by sensor architecture, 
            quantum efficiency, noise characteristics, and signal processing pipelines. Our research aims to build highly 
            accurate sensor simulation models that replicate real-world sensor behavior. This allows AI models to be trained
            on realistic synthetic data, reducing the dependency on expensive real-world data collection. By modeling sensor 
            noise, color filter array responses, and pixel-level dynamics, we enable better algorithm robustness and
            facilitate rapid prototyping of novel sensor technologies.
          </p>
        </div>
      </div>
    </div>
  )
};


export default Sensor;