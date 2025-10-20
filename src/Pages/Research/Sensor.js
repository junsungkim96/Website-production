import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React, {useLayoutEffect} from 'react';
import {Helmet} from "react-helmet";

const Sensor = () => {
  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

//   let [tab, setTab] = useState(null)

  return(
    <div style = {{marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh', overflowX: 'hidden', width: '100%', boxSizing: 'border-box'}}>
      <Helmet>
        <title>Research</title>
        <meta
          name="description"
          content="Learn about our cutting-edge research in sensor"
        />
        <link rel="canonical" href="https://qblackai.com/sensor" />
      </Helmet>
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
        <div className = "left-text" style = {{width: '90vw'}}>
          <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.8', fontSize: '1rem', color: 'white  ' }}>
            <li style={{ marginBottom: '12px' }}>Quantum Efficiency</li>
            <li style={{ marginBottom: '12px' }}>Noise Characteristics</li>
            <li style={{ marginBottom: '12px' }}>Color filter array responses</li>
            <li>Pixel-level signal dynamics</li>
          </ul>
        </div>
      </div>
    </div>
  )
};


export default Sensor;