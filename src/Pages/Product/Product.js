import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React, {useLayoutEffect} from 'react';
import illuminant from '../../img/product/illuminant.png';
import scene from '../../img/product/scene.png';
import optics from '../../img/product/optics.png';
import sensor from '../../img/product/sensor.png';
import isp from '../../img/product/isp.png';
import algorithms from '../../img/product/algorithms.png';
import {Helmet} from "react-helmet";

const Product = () => {
  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

  return(
    <div style = {{marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh'}}>

      <Helmet>
        <title>Product</title>
        <meta
          name="description"
          content="Learn about our product features"
        />
        <link rel="canonical" href="https://qblackai.com/product_features" />
      </Helmet>

      <div className = "career-left-text">
        <p style = {{fontSize: '50px'}}>
          Main Features
        </p>
      </div>

      {/* Illuminant */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <img className="strength-image" src={illuminant} alt=""/>
          <div>Light Your Scene: Default or Customizable Illuminants</div>
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Explore how lighting impacts image capture with flexible illumination options
        </div>
        <div className="left-text" style = {{cursor: 'pointer',  fontSize: '2vh', marginBottom: '2vh', width: '90%',
            textDecoration: 'underline',
            textUnderlineOffset: '7px',
            textDecorationThickness: '1px'
        }}
          onClick={() => window.open('https://medium.com/qblackai/lighting-the-scene-the-critical-role-of-illuminants-in-computervision-ff916cc44c9c', '_blank', 'noopener,noreferrer')}>
          Learn More
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {"/img/illuminant.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/illuminant-p347qo7yMw0x4XJPB6YzseDzanujCz.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      

      {/* Scene */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <img className="strength-image" src={scene} alt=""/>
          <div>Set the Stage: Realistic Scenes & Image Import Support</div>
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Use built-in scenes or load any image to simulate real-world scenarios
        </div>
        <div className="left-text" style = {{cursor: 'pointer', fontSize: '2vh', marginBottom: '2vh', width: '90%',
            textDecoration: 'underline',
            textUnderlineOffset: '7px',
            textDecorationThickness: '1px'
        }}
          onClick={() => window.open('https://medium.com/qblackai/the-scene-physical-environment-for-vision-testing-817dcb1a6237', '_blank', 'noopener,noreferrer')}>
          Learn More
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {"/img/scene.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/scene-WuF6wYkl989CXzaPc4orCt6Vx2SW3W.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      {/* Optics */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
         <img className="strength-image" src={optics} alt=""/>
          <div>See Through the Glass: Simulate Optical Performance</div>
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Evaluate how your lens design affect image sharpness, distortion, and clarity
        </div>
        <div className="left-text" style = {{cursor: 'pointer', fontSize: '2vh', marginBottom: '2vh', width: '90%',
            textDecoration: 'underline',
            textUnderlineOffset: '7px',
            textDecorationThickness: '1px'
        }}
          onClick={() => window.open('https://medium.com/qblackai/optics-from-rays-to-blur-how-lenses-shape-vision-2a7911f80b11', '_blank', 'noopener,noreferrer')}>
          Learn More
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {"/img/optics.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/optics-GhD7QB5N2OyqsTLdYO6fAN5iOXTalY.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      {/* Sensor */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <img className="strength-image" src={sensor} alt=""/>
          <div>Capture the Details: Model Sensor Response & Noise</div>
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Test dynamic range, resolution and sensor noise under realistic conditions
        </div>
        <div className="left-text" style = {{cursor: 'pointer', fontSize: '2vh', marginBottom: '2vh', width: '90%',
            textDecoration: 'underline',
            textUnderlineOffset: '7px',
            textDecorationThickness: '1px'
        }}
          onClick={() => window.open('https://medium.com/qblackai/sensor-turning-light-into-digital-data-26291898573a', '_blank', 'noopener,noreferrer')}>
          Learn More
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {"/img/sensor.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/sensor-wRmSwhW4Xs5iwzRbyv3u5RQAvNs2fE.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      {/* ISP */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <img className="strength-image" src={isp} alt=""/>
          <div>Polish Your Pixels: Simulate the Entire ISP Pipeline</div>
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Apply demosaicing, noise reduction, color correction and more
        </div>
        <div className="left-text" style = {{cursor: 'pointer', fontSize: '2vh', marginBottom: '2vh', width: '90%',
            textDecoration: 'underline',
            textUnderlineOffset: '7px',
            textDecorationThickness: '1px'
        }}
          onClick={() => window.open('https://medium.com/qblackai/isp-transforming-raw-sensor-data-into-images-f053082eaeda', '_blank', 'noopener,noreferrer')}>
          Learn More
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {"/img/isp.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/isp-FhVv0cepVhKRz0bXDDbeyyUYKR8syD.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      {/* AI Algorithms */}
      <div style = {{paddingTop: '10vh'}}>
        <div className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <img className="strength-image" src={algorithms} alt=""/>
          <div>Power the Vision: Benchmark AI Algorithm Performance</div>
        </div>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Assess detection, segmentation, and other CV tasks with simulated data
        </div>
        <div className="left-text" style = {{cursor: 'pointer', fontSize: '2vh', marginBottom: '2vh', width: '90%',
            textDecoration: 'underline',
            textUnderlineOffset: '7px',
            textDecorationThickness: '1px'
        }}
          onClick={() => window.open('https://medium.com/qblackai/ai-algorithms-making-sense-of-the-simulated-world-f2aaa6cab5bd', '_blank', 'noopener,noreferrer')}>
          Learn More
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {"/img/algorithm.jpg"}>
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/algorithm-XndlFRIeI7pVN3UM4skb26fZrqdmYh.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


    </div>
  )
};


export default Product;