import '../App.css';
import React, {useLayoutEffect} from 'react';

const Product = () => {
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
                Main features
            </p>
            <br/>
          </div>
          <div>
            <p>
              A complete platform for engineers from diverse fields to design a computer vision system
            </p>
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <p>
              Customizable illuminant
            </p>
            <h>
              Change the spectrum of light and brightness
            </h>
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <p>
              Default scene given to test the performance of optics
            </p>
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <p>
              Simulate the performance of a lens system using image simulation
            </p>
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <p>
              Any types of sensor can be tested
            </p>
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <p>
              Turn RAW images into beautiful images using ISP simulations
            </p>
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <p>
              Test AI algorithms performance on the image
            </p>
          </div>

        </div>
      </div>
    </div>
  )
};


export default Product;