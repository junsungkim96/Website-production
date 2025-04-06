import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React, {useLayoutEffect} from 'react';

const QPU = () => {
  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

//   let [tab, setTab] = useState(null)
    return (
        <div style={{ marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh', overflowX: 'hidden', width: '100vw', boxSizing: 'border-box' }}>
            <div style={{ marginBottom: '15vh' }}>
                <div className="left-text" style={{ width: '100vw', fontSize: '40px' }}>
                QPU-Based Optimization
                </div>
                <br />
                <p className="company-text">
                Classical optimization methods(GPU) often struggle with the complexity of high-dimensional, non-convex problems inherent in imaging system design.
                Our research explores the use of Quantum Processing Units (QPUs) to accelerate joint optimization across optics, sensors, ISP, and AI.
                Leveraging quantum algorithms allows us to:
                </p>
                <div className="left-text" style={{ width: '90vw' }}>
                    <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.8', fontSize: '1rem', color: 'white' }}>
                        <li style={{ marginBottom: '12px' }}>Achieve faster convergence in multi-parameter optimization</li>
                        <li style={{ marginBottom: '12px' }}>Escape local minima and find globally optimal solutions</li>
                        <li style={{ marginBottom: '12px' }}>Enable scalable co-design across hardware and software components</li>
                    </ul>
                </div>
            </div>
        </div>
    )
  
  
};


export default QPU;