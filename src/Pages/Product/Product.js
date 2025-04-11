import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React, {useLayoutEffect, useState, useEffect} from 'react';
// import illuminant from "../../img/product/illuminant.mp4";


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
      <div className = "career-left-text">
        <p style = {{fontSize: '50px'}}>
          Main Features
        </p>
      </div>


      {/* Illuminant */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%'}}>
          Light Your Scene: Default or Customizable Illuminants
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Explore how lighting impacts image capture with flexible illumination options
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {!isSmallScreen ? undefined : "/img/illuminant.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/illuminant-p347qo7yMw0x4XJPB6YzseDzanujCz.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      

      {/* Scene */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%'}}>
          Set the Stage: Realistic Scenes & Image Import Support
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Use built-in scenes or load any iamge to simulate real-world scenarios
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {!isSmallScreen ? undefined : "/img/scene.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/scene-ZqqFovg7BXgn2035Wu5U4HIV7aXISZ.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      {/* Optics */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%'}}>
          See Through the Glass: Simulate Optical Performance
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Evaluate how your lens design affect image sharpness, distortion, and clarity
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {!isSmallScreen ? undefined : "/img/optics.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/optics-GhD7QB5N2OyqsTLdYO6fAN5iOXTalY.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      {/* Sensor */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%'}}>
          Capture the Details: Model Sensor Response & Noise  
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Test dynamic range, resolution and sensor noise under realistic conditions
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {!isSmallScreen ? undefined : "/img/sensor.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/sensor-wRmSwhW4Xs5iwzRbyv3u5RQAvNs2fE.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      {/* ISP */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%'}}>
          Polish Your Pixels: Simulate the Entire ISP Pipeline  
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Apply demosaicing, noise reduction, color correction and more
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {!isSmallScreen ? undefined : "/img/isp.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/isp-FhVv0cepVhKRz0bXDDbeyyUYKR8syD.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      {/* AI Algorithms */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%'}}>
          Power the Vision: Benchmark AI Algorithm Performance
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Assess detection, segmentation, and other CV tasks with simulated data
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {!isSmallScreen ? undefined : "/img/isp.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/isp-FhVv0cepVhKRz0bXDDbeyyUYKR8syD.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


    </div>
  )
};


export default Product;