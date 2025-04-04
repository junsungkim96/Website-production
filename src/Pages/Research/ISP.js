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
    <div style = {{marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh', overflowX: 'hidden', width: '100vw', boxSizing: 'border-box'}}>
      <div style = {{display: 'flex', flexDirection: 'column'}}>
        <div className="career-left-text">
          <div>
            <p style = {{fontSize: '50px'}}>
              AI recommendation for image signal processing
            </p>
            <br/>
          </div>
          <p style = {{fontSize: '20px'}}>
            The traditional Image Signal Processing (ISP) pipeline is designed with fixed parameters, often requiring 
            manual tuning for different imaging conditions. Our research leverages deep learning to develop AI-driven 
            ISP optimization, where models learn to adjust processing parameters dynamically based on scene content. 
            This approach enhances color accuracy, reduces noise, and improves dynamic range without manual intervention. 
            We also investigate differentiable ISP pipelines that allow end-to-end optimization, ensuring that raw sensor
            data is processed in a way that maximizes performance for downstream AI tasks.
          </p>
        </div>
      </div>
    </div>
  )
};


export default ISP;