import Particles from 'react-tsparticles';  // Import particles.js wrapper
import { loadFull } from 'tsparticles';  // Import loadFull to enable all features
import eye from '../img/homepage/eye_diamond.png';
import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {useLayoutEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const ParticleBackground = () => {
  const navigate = useNavigate();

  const particlesInit = async (main) => {
    // Initialize the full version of particles.js
    await loadFull(main);
  };

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ position: 'relative', height: '105vh', width: '90%', marginLeft: 'auto', marginRight: 'auto', pointerEvents: 'auto' }}>
      
      <div style={{height: '6vh'}}/>

      {/* Text Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white'}}>
        <div style={{ marginTop: '8vh ', marginBottom: '2vh', height: 'auto' }}>
          <div className="catch-phrase">Your Vision Perfectly Simulated</div>
        </div>

        <div style={{ marginTop: '2vh', marginBottom: '2vh', height: 'auto' }}>
          <div className="catch-phrase2">The ultimate digital twin simulator {isSmallScreen ? <br/> : null} for Computer Vision</div>
        </div>

        <div style={{ marginTop: '3vh', marginBottom: '4vh'}}>
          <Button variant = "light" size = "lg"
          onClick = {()=> navigate('/demo')}>
            <div className = "career-button">Book a Demo →</div> 
          </Button>
        </div>

        <div>
          <img className = "eye" src={eye} alt = ""/>
        </div>
      </div>
      
      {/* Particles background */}
      <Particles
        id="particles-js"
        init={particlesInit}
        options={{
          particles: {
            number: {
              value: 50,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#ffffff",
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000000",
              },
              polygon: {
                nb_sides: 5,
              },
              image: {
                src: "img/github.svg",
                width: 100,
                height: 300,
              },
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 10,
                size_min: 0.1,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: false,
                mode: "repulse",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
          fullScreen: false,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />

    </div>
  );
};


export default ParticleBackground;
