import '../styles/desktop.css';
import '../styles/laptop.css';
import '../styles/tablet.css';
import '../styles/mobile.css';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import illuminant from "../img/product/illuminant.mp4";


const Product = () => {
  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

//   let [tab, setTab] = useState(null)

  return(
    <div style = {{marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh'}}>
      {/* <div style = {{display: 'flex', flexDirection: 'column'}}> */}
        {/* <div className="career-left-text"> */}
          <div className = "career-left-text" style = {{fontSize: '50px'}}>
            Main Features
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <div className="left-text" style = {{marginBottom: '1vh'}}>
              Customizable illuminant
            </div>
            <video className="video-container" controls autoPlay={!isSmallScreen} loop muted>
              <source src={illuminant} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div style = {{paddingTop: '10vh'}}>
            <div className="left-text" style = {{marginBottom: '1vh'}}>
              Unlimited support for image type
            </div>
            <video className="video-container" controls autoPlay={!isSmallScreen} loop muted>
              <source src={illuminant} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>


          {/* <div style = {{paddingTop: '10vh'}}>
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
          </div> */}

        {/* </div> */}
      {/* </div> */}
    </div>
  )
};


export default Product;