import Particles from 'react-tsparticles';  // Import particles.js wrapper
import { loadFull } from 'tsparticles';  // Import loadFull to enable all features
import eye from '../../img/homepage/eye_diamond.png';
import Button from 'react-bootstrap/Button';
import {useLayoutEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const ParticleBackground = () => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const particlesInit = async (main) => {
    // Initialize the full version of particles.js
    await loadFull(main);
  };

  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

  const freeTrial = async () => {
    if (isMobile) {
      navigate("/desktop-info");
      return;
    }

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`/api/get-plan?email=${encodeURIComponent(userEmail)}`);
      const data = await res.json();

      if (!res.ok) {
        console.error("Failed to fetch plan:", data.message);
        navigate("/simulate"); // fallback
        return;
      }

      const { plan, expirationDate } = data;
      localStorage.setItem("userPlan", plan);
      localStorage.setItem("planExpiresAt", expirationDate);

      const isExpired = expirationDate && new Date(expirationDate) < new Date();
      
      // let plan = "Basic"
      // let isExpired = false

      // 플랜 상태에 따라 라우팅
      if (isExpired || plan === "Free Trial") {
        navigate("/simulate");
      } else if (plan === "Basic") {
        navigate("/simulate-basic");
      } else if (plan === "Pro") {
        navigate("/simulate-pro");
      } else {
        navigate("/simulate"); // fallback
      }

    } catch (err) {
      console.error("Error fetching plan info:", err);
      navigate("/simulate");
    }
  };


  return (
    <div style={{ position: 'relative', height: '105vh', width: '90%', marginLeft: 'auto', marginRight: 'auto', pointerEvents: 'auto' }}>
      
      <div style={{height: '6vh'}}/>

      {/* Text Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white'}}>
        <div style={{ marginTop: '8vh ', marginBottom: '2vh', height: 'auto' }}>
          <div className="catch-phrase">Simulate Your Vision</div>
        </div>

        <div style={{ marginTop: '2vh', marginBottom: '5vh', height: 'auto' }}>
          <div className="catch-phrase2">
            QblackAI is powering the Physical AI revolution  <br/>
            with next-generation computer vision simulation
          </div>
        </div>

        <div style ={{display: 'flex', justifyContent: 'center', gap: isMobile ? '15px' : '30px', marginTop: '5vh', marginBottom: '5vh'}}>
          <Button variant = "light" size = "md"
          onClick = {freeTrial} style = {{borderRadius: '12px'}}>
            <div className = "career-button">
              {isLoggedIn ? 'Start Simulation →' : 'Start Free Trial →'}
            </div> 
          </Button>
          
          <Button variant = "light" size = "md"
          onClick = {()=> navigate('/contact')} style = {{borderRadius: '12px'}}>
            <div className = "career-button">Contact Us →</div> 
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
