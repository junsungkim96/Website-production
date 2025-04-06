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
    <div style = {{marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh', overflowX: 'hidden', width: '100vw', boxSizing: 'border-box'}}>
      <div style = {{marginBottom: '15vh'}}>
        <div className="left-text" style = {{fontSize: '40px'}}>
          Physical Sensor Simulation
        </div>
        <br/>
        <p className = "company-text" >
          The interaction between light and an image sensor is a complex process influenced by sensor architecture, 
          quantum efficiency, noise characteristics, and signal processing pipelines. Our research aims to build highly 
          accurate sensor simulation models that replicate real-world sensor behavior. This includes:
        </p>
        <div className = "left-text" style = {{width: '100vw'}}>
          <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.8', fontSize: '1rem', color: 'white  ' }}>
            <li>Quantum Efficiency</li>
            <li>Noise Characteristics</li>
            <li>Color filter array responses</li>
            <li>Pixel-level signal dynamics</li>
          </ul>
        </div>
      </div>
    </div>
  )
};


export default Sensor;