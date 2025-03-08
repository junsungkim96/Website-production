import '../styles/desktop.css';
import '../styles/laptop.css';
import '../styles/tablet.css';
import '../styles/mobile.css';
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
              Optics
            </p>
            <br/>
          </div>
          <div>
            <p>
              Lens Design Optimization for Downstream Tasks
            </p>
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <p>
              
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};


export default Optics;