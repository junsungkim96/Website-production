import Particles from 'react-tsparticles';  // Import particles.js wrapper
import { loadFull } from 'tsparticles';  // Import loadFull to enable all features

const ParticleBackground = () => {
  const particlesInit = async (main) => {
    // Initialize the full version of particles.js
    await loadFull(main);
  };

  return (
    <div style={{ position: 'relative', top: 0, left: 0, height: '100vh', width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
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
      />

      {/* Text Content */}
      <div style = {{height: '200px'}}>

      </div>
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
        <div style={{ marginTop: '60px', marginBottom: '100px', height: '10px' }}>
          <p style={{ fontSize: '70px' }}>Your Vision, Perfectly Simulated</p>
        </div>

        <div style={{ marginTop: '60px', marginBottom: '100px', height: '100px' }}>
          <p style={{ fontSize: '30px' }}>The ultimate digital twin simulator for computer vision</p>
        </div>
      </div>
    </div>
  );
};

export default ParticleBackground;