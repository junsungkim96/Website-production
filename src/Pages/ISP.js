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
                Your imagination is the limit. Whatever you can think of is possible in this platform
            </p>
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <p>
              Test how your computer vision algorithm will perform on an actual physical hardware
            </p>
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <p>
              Change the light to whatever spectrum you want at the right intensity
            </p>
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <p>
              Determine the sensor specifications for your needs
            </p>
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <p>
              Get instant AI recommendation for Image Signal Processing
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};


export default ISP;