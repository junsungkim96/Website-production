import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React, {useLayoutEffect} from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import team from '../../img/company/team.png';
import first_principle from '../../img/company/first_principle.png';
import honesty from '../../img/company/honesty.png';
import customer from '../../img/company/customer.png';
import open from '../../img/company/open.png';

const Company = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const coreValues = [
    {
      image: team,
      name: "Team Collabortion",
      description: `The development of cutting-edge computer vision technology requires
                    expertise across multiple domains, from optics and sensor to AI and software engineering.
                    We foster a culture of collaboration where interdisciplinary teams work together to push
                    the boundaries of innovation`
    },
    {
      image: first_principle,
      name: "First Principle Thinking",
      description: `The computer vision industry is driven by complex challenges, from improving recognition 
                    accuracy to optimizing hardware efficiency. We apply first principle thinking to break down
                    problems, challenge conventional methods, and develop novel solutions that redefine the 
                    industry`
    },
    {
      image: honesty,
      name: "Intellectual Honesty",
      description: `Advancing computer vision technology requires rigorous experimentation and evaluation of results.
                    We prioritize intellectual honesty by ensuring our research and product are based on objective
                    analysis rather than confirmation bias, fostering a culture of transparency and continous improvement`
    },
    {
      image: customer,
      name: "Customer-Oriented",
      description: `Computer vision applications vary widely, from autonomous vehicles to industrial inspection and
                    healthcare imaging. We are committed to understanding the unique challenges our customers face
                    and delivering tailored solutions that maximize performance, usability, and real-word impact`
    }, 
    {
      image: open,
      name: "Openness and Adaptability",
      description: `The computer vision industry is evolving rapidly with advancesment in deep learning, real-time processing and
                    quantum computing. We embrace openness to new ideas, continuous learning, and adaptability to stay ahead in
                    this fast-paced environment, ensuring our technology remains cutting-edge`
    }
  ]

  return (
    <div style={{ marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh', overflowX: 'hidden', width: '100vw', boxSizing: 'border-box'}}>
      <div>
        <div className="left-text">
          Shaping the Future
        </div>
        <br/>
        <p className = "company-text" >
          Our vision is to accelerate innovation through advanced simulation software solutions
        </p>
      </div>
      <div style = {{marginTop: '15vh'}}>
        <div className="left-text">
          Our Mission
        </div>
        <br/>
        <p className = "company-text">
          By advancing computer vision simulation technology, we help industries develop smarter, 
          more efficient vision systems while eliminating the need for physical prototypes, 
          reducing waste, and protecting the environment
        </p>
      </div>
      <div style = {{marginTop: '15vh'}}>
        <div className="left-text">
          5 Core Values
        </div>
        <br/>
        <Row className = "g-4 career-left-text">
          {coreValues.map((value, index) => (
            <Col key={index} md={6}>
              <Card className="h-100 shadow" style={{ backgroundColor: 'transparent', border: 'none' }}>
                <Card.Body style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <div style = {{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <img src={value.image} alt={value.name} className = "company-image" />
                    <Card.Title style={{ fontWeight: '900', fontSize: '1.6rem', color: 'white'}}>
                      {value.name}
                    </Card.Title>
                  </div>
                  <Card.Text style={{lineHeight: '2', fontSize: '1rem', marginTop: '0.5rem', color:'lightgray'}}>
                    {value.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
  
    </div>
  );
};

export default Company;
