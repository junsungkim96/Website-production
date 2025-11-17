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
          content="Discover QblackAI's end-to-end computer vision simulation features including illuminant, scene, optics, sensor, ISP, and AI algorithms for accelerated validation and testing."
        />
        <link rel="canonical" href="https://qblackai.com/product_features" />
      </Helmet>

      <header className = "career-left-text">
        <p style = {{fontSize: '50px'}}>
          Main Features
        </p>
      </header>

      {/* Illuminant */}
      <section style = {{paddingTop: '10vh'}}>
        <h2 className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <img className="strength-image" src={illuminant} alt="QblackAI's illustration of customizable illuminants for computer vision simulation"/>
          <div>Light Your Scene: Default or Customizable Illuminants</div>
        </h2>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Explore how lighting impacts image capture with flexible illumination options
        </div>
        <div className="left-text" style = {{cursor: 'pointer',  fontSize: '2vh', marginBottom: '2vh', width: '90%',
            textDecoration: 'underline',
            textUnderlineOffset: '7px',
            textDecorationThickness: '1px'
        }}
          onClick={() => window.open('https://medium.com/qblackai/illuminant-how-light-sets-the-stage-for-imaging-d1f1d6442268', '_blank', 'noopener,noreferrer')}
          title="Read the QblackAI blog about how illuminants affect imaging and computer vision simulation">
          Learn More
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {"/img/illuminant.jpg"} 
          title="QblackAI video demonstrating illuminant effects on computer vision simulations">
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/illuminant-p347qo7yMw0x4XJPB6YzseDzanujCz.mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
      

      {/* Scene */}
      <section style = {{paddingTop: '10vh'}}>
        <h2 className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <img className="strength-image" src={scene} alt="QblackAI realistic scenes and image import options for computer vision simulation"/>
          <div>Set the Stage: Realistic Scenes & Image Import Support</div>
        </h2>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Use built-in scenes or load any image to simulate real-world scenarios
        </div>
        <div className="left-text" style = {{cursor: 'pointer', fontSize: '2vh', marginBottom: '2vh', width: '90%',
            textDecoration: 'underline',
            textUnderlineOffset: '7px',
            textDecorationThickness: '1px'
        }}
          onClick={() => window.open('https://medium.com/qblackai/scene-physical-environment-for-vision-testing-55d8d9d7e356', '_blank', 'noopener,noreferrer')}
          title="Read QblackAI blog about simulating realistic scenes and importing images for computer vision testing">
          Learn More
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {"/img/scene.jpg"} 
          title="QblackAI video demonstrating realistic scene setups and image import for computer vision simulations">
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/scene-WuF6wYkl989CXzaPc4orCt6Vx2SW3W.mp4" />
          Your browser does not support the video tag.
        </video>
      </section>


      {/* Optics */}
      <section style = {{paddingTop: '10vh'}}>
        <h2 className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <img className="strength-image" src={optics} alt="QblackAI optics simulation including lens design, sharpness, and distortion"/>
          <div>See Through the Glass: Simulate Optical Performance</div>
        </h2>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Evaluate how your lens design affect image sharpness, distortion, and clarity
        </div>
        <div className="left-text" style = {{cursor: 'pointer', fontSize: '2vh', marginBottom: '2vh', width: '90%',
            textDecoration: 'underline',
            textUnderlineOffset: '7px',
            textDecorationThickness: '1px'
        }}
          onClick={() => window.open('https://medium.com/qblackai/optics-from-rays-to-blur-e410988c23ad', '_blank', 'noopener,noreferrer')}
          title="Read QblackAI blog about simulating optical performance from lens design to image quality">
          Learn More
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {"/img/optics.jpg"}
          title="QblackAI video demonstrating optical performance simulation including lens sharpness and distortion">
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/optics-GhD7QB5N2OyqsTLdYO6fAN5iOXTalY.mp4" />
          Your browser does not support the video tag.
        </video>
      </section>


      {/* Sensor */}
      <section style = {{paddingTop: '10vh'}}>
        <h2 className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <img className="strength-image" src={sensor} alt="QblackAI sensor simulation showing sensor response, dynamic range, resolution, and noise modeling"/>
          <div>Capture the Details: Model Sensor Response & Noise</div>
        </h2>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Test dynamic range, resolution and sensor noise under realistic conditions
        </div>
        <div className="left-text" style = {{cursor: 'pointer', fontSize: '2vh', marginBottom: '2vh', width: '90%',
            textDecoration: 'underline',
            textUnderlineOffset: '7px',
            textDecorationThickness: '1px'
        }}
          onClick={() => window.open('https://medium.com/qblackai/sensor-turning-light-into-digital-data-ee5c8dfda2c6', '_blank', 'noopener,noreferrer')}
          title="Read QblackAI Medium article on sensor simulation and noise modeling">
          Learn More
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {"/img/sensor.jpg"}
          title="QblackAI video demonstrating sensor simulation including dynamic range, resolution, and noise">
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/sensor-wRmSwhW4Xs5iwzRbyv3u5RQAvNs2fE.mp4" />
          Your browser does not support the video tag.
        </video>
      </section>


      {/* ISP */}
      <section style = {{paddingTop: '10vh'}}>
        <h2 className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <img className="strength-image" src={isp} alt="QblackAI ISP pipeline simulation showing demosaicing, noise reduction, and color correction"/>
          <div>Polish Your Pixels: Simulate the Entire ISP Pipeline</div>
        </h2>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Apply demosaicing, noise reduction, color correction and more
        </div>
        <div className="left-text" style = {{cursor: 'pointer', fontSize: '2vh', marginBottom: '2vh', width: '90%',
            textDecoration: 'underline',
            textUnderlineOffset: '7px',
            textDecorationThickness: '1px'
        }}
          onClick={() => window.open('https://medium.com/qblackai/isp-transforming-raw-sensor-data-into-images-bd1e4ddfda6e', '_blank', 'noopener,noreferrer')}
          title="Read QblackAI Medium article on simulating the full ISP pipeline for image processing">
          Learn More
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {"/img/isp.jpg"} 
          title="QblackAI video demonstrating the full ISP pipeline simulation including demosaicing, noise reduction, and color correction">
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/isp-FhVv0cepVhKRz0bXDDbeyyUYKR8syD.mp4" />
          Your browser does not support the video tag.
        </video>
      </section>


      {/* AI Algorithms */}
      <section style = {{paddingTop: '10vh'}}>
        <h2 className="left-text" style = {{fontSize: '3vh', marginBottom: '1vh', width: '90%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <img className="strength-image" src={algorithms} alt="QblackAI AI algorithms simulation for computer vision tasks including detection and segmentation"/>
          <div>Power the Vision: Benchmark AI Algorithm Performance</div>
        </h2>
        <div className="left-text" style = {{fontStyle: 'italic', fontSize: '1.8vh', marginBottom: '1vh', width: '90%'}}>
          Assess detection, segmentation, and other CV tasks with simulated data
        </div>
        <div className="left-text" style = {{cursor: 'pointer', fontSize: '2vh', marginBottom: '2vh', width: '90%',
            textDecoration: 'underline',
            textUnderlineOffset: '7px',
            textDecorationThickness: '1px'
        }}
          onClick={() => window.open('https://medium.com/qblackai/ai-algorithms-making-sense-of-the-simulated-world-9c12da7d7d1d', '_blank', 'noopener,noreferrer')}
          title="Read QblackAI Medium article on benchmarking AI algorithm performance for computer vision tasks">
          Learn More
        </div>
        <video className = "video-container" controls autoPlay={false} loop = {false} muted poster = {"/img/algorithm.jpg"}
          title="QblackAI video demonstrating AI algorithm simulations for detection, segmentation, and other computer vision tasks">
          <source src="https://8puowjmkndisb60h.public.blob.vercel-storage.com/algorithm-XndlFRIeI7pVN3UM4skb26fZrqdmYh.mp4" />
          Your browser does not support the video tag.
        </video>
      </section>


    </div>
  )
};


export default Product;