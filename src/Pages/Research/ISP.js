import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React, {useLayoutEffect} from 'react';

const ISP = () => {
  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

//   let [tab, setTab] = useState(null)

  return(
    <div style = {{marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh', overflowX: 'hidden', width: '100%', boxSizing: 'border-box'}}>
      <div style = {{marginBottom: '15vh'}}>
        <div className="left-text" style = {{width: '100vw', fontSize: '40px'}}>
          AI-Based ISP Automation
        </div>
        <br/>
        <p className = "company-text" >
          The traditional Image Signal Processing (ISP) pipeline is designed with fixed parameters, often requiring 
          manual tuning for different imaging conditions. Our research leverages deep learning to develop AI-driven 
          ISP optimization, where models learn to adjust processing parameters dynamically based on lighting conditions and scene content. 
          This approach improves:
        </p>
        <div className = "left-text" style = {{width: '90vw'}}>
          <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.8', fontSize: '1rem', color: 'white  ' }}>
            <li style={{ marginBottom: '12px' }}>Color Accuracy</li>
            <li style={{ marginBottom: '12px' }}>Noise Reduction</li>
            <li style={{ marginBottom: '12px' }}>Dynamic Range</li>
            <li >Tailored ISP paramters for light spectrum</li>
          </ul>
        </div>
      </div>
    </div>
  )
};


export default ISP;