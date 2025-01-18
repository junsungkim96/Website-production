import '../App.css';
import React, {useLayoutEffect} from 'react';

const Algorithms = () => {
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
              Algorithms
            </p>
            <br/>
          </div>
          <div>
            <p>
              Image Segmentation
            </p>
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <p>
              Depth Estimation
            </p>
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <p>
              Object Detection
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};


export default Algorithms;