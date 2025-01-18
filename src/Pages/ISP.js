import '../App.css';
import React, {useLayoutEffect} from 'react';

const ISP = () => {
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
              ISP
            </p>
            <br/>
          </div>
          <div>
            <p>
              AI recommendation for image signal processing
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};


export default ISP;