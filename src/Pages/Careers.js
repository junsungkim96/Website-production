import '../App.css';
import Button from 'react-bootstrap/Button';
import React, {useLayoutEffect} from 'react';

const Careers = () => {
  useLayoutEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

  let data = [
    {
      job: "Account Director, Platform",
      location: "Seoul, South Korea"
    },
    {
      job: "Applied quantum AI: Senior Software Engineer",
      location: "Busan, South Korea" 
    },
    {
      job: "Media Relations, Asia lead",
      location: "Gyeonggi, South Korea"
    },
    {
      job: "Associate General Counsel, Regulatory",
      location: "Osaka, Japan"
    },
    {
      job: "Data engineer",
      location: "San Francisco, U.S."
    },
    {
      job: "Staff System engineer",
      location: "New York, U.S."
    },
    {
      job: "Quantum Algorithm, Research Scientist",
      location: "London, U.K."
    },
    {
      job: "Quantum Algorithm, Research Scientist",
      location: "Seoul, South Korea"
    },
    {
      job: "Quantum Algorithm, Research Scientist",
      location: "Pairs, France"
    }
  ]

  return(
    <div style = {{marginBottom: '200px'}}>
      <div style = {{display: 'flex', flexDirection: 'column'}}>
        <div className = "career-left-text">
          <div>
            <p style = {{fontSize: '50px'}}>Careers at QuantumAI</p>
          </div>
          <div>
            <Button variant = "light" size = "lg" style = {{marginBottom: '50px', marginRight: "1%"}} className = "px-4">
              <div style = {{fontSize: '20px', fontWeight: 'bold'}}>All teams</div>
            </Button>
            <Button variant = "light" size = "lg" style = {{marginBottom: '50px'}} className = "px-4">
              <div style = {{fontSize: '20px', fontWeight: 'bold'}}>All locations</div>
            </Button>
          </div>
        </div>
      </div>
      
      {
        data.map((a, i) =>{
          return(
            <>
              <hr class="separator"></hr>
              <div class="update-container" style = {{marginBottom: '30px', marginTop: '30px'}}>
                <div className = "career-left-text">
                  {data[i].job} <br/>
                  <p2>{data[i].location}</p2>
                </div>
                <div className = "right-text">
                  Apply now
                </div>
              </div>
            </>
          )
        })
      }

    </div>
  )
};

export default Careers;