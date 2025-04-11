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
      <div className = "career-left-text" style = {{fontSize: '50px'}}>
        Main Features
      </div>


      {/* Illuminant */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{marginBottom: '1vh', width: '100%'}}>
          Light Your Scene: Default or Customizable Illuminants
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '2vh', marginBottom: '1vh', width: '100%'}}>
          Explore how lighting impacts image capture with flexible illumination options
        </div>
        <video className = "video-container" controls autoPlay={!isSmallScreen} loop = {false} muted poster = {!isSmallScreen ? undefined : "/img/demo.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/illuminant-gzkpH8rptbRvwN05O3VYPKHBdZyeOZ.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      

      {/* Scene */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{marginBottom: '1vh', width: '100%'}}>
          Set the Stage: Realistic Scenes & Image Import Support
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '2vh', marginBottom: '1vh', width: '100%'}}>
          Use built-in scenes or load any iamge to simulate real-world scenarios
        </div>
        <video className = "video-container" controls autoPlay={!isSmallScreen} loop = {false} muted poster = {!isSmallScreen ? undefined : "/img/demo.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/illuminant-gzkpH8rptbRvwN05O3VYPKHBdZyeOZ.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      {/* Optics */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{marginBottom: '1vh', width: '100%'}}>
          See Through the Glass: Simulate Optical Performance
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '2vh', marginBottom: '1vh', width: '100%'}}>
          Evaluate how your lens design affect image sharpness, distortion, and clarity
        </div>
        <video className = "video-container" controls autoPlay={!isSmallScreen} loop = {false} muted poster = {!isSmallScreen ? undefined : "/img/demo.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/illuminant-gzkpH8rptbRvwN05O3VYPKHBdZyeOZ.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      {/* Sensor */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{marginBottom: '1vh', width: '100%'}}>
          Capture the Details: Model Sensor Response & Noise  
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '2vh', marginBottom: '1vh', width: '100%'}}>
          Test dynamic range, resolution and sensor noise under realistic conditions
        </div>
        <video className = "video-container" controls autoPlay={!isSmallScreen} loop = {false} muted poster = {!isSmallScreen ? undefined : "/img/demo.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/illuminant-gzkpH8rptbRvwN05O3VYPKHBdZyeOZ.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      {/* ISP */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{marginBottom: '1vh', width: '100%'}}>
          Polish Your Pixels: Simulate the Entire ISP Pipeline  
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '2vh', marginBottom: '1vh', width: '100%'}}>
          Apply demosaicing, noise reduction, color correction and more
        </div>
        <video className = "video-container" controls autoPlay={!isSmallScreen} loop = {false} muted poster = {!isSmallScreen ? undefined : "/img/demo.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/illuminant-gzkpH8rptbRvwN05O3VYPKHBdZyeOZ.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      {/* AI Algorithms */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{marginBottom: '1vh', width: '100%'}}>
          Power the Vision: Benchmark AI Algorithm Performance
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '2vh', marginBottom: '1vh', width: '100%'}}>
          Assess detection, segmentation, and other CV tasks with simulated data
        </div>
        <video className = "video-container" controls autoPlay={!isSmallScreen} loop = {false} muted poster = {!isSmallScreen ? undefined : "/img/demo.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/illuminant-gzkpH8rptbRvwN05O3VYPKHBdZyeOZ.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


    </div>
  )
};


export default Product;