import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React, {useLayoutEffect} from 'react';
import {Row, Col, Card} from 'react-bootstrap';

const Company = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const coreValues = [
    {
      name: "Team Collabortion",
      description: `The development of cutting-edge computer vision technology requires
                    expertise across multiple domains, from optics and sensor to AI and software engineering.
                    We foster a culture of collaboration where interdisciplinary teams work together to push
                    the boundaries of innovation`
    },
    {
      name: "First Principle Thinking",
      description: `The computer vision industry is driven by complex challenges, from improving recognition 
                    accuracy to optimizing hardware efficiency. We apply first principle thinking to break down
                    problems, challenge conventional methods, and develop novel solutions that redefine the 
                    industry`
    },
    {
      name: "Intellectual Honesty",
      description: `Advancing computer vision technology requires rigorous experimentation and evaluation of results.
                    We prioritize intellectual honesty by ensuring our research and product are based on objective
                    analysis rather than confirmation bias, fostering a culture of transparency and continous improvement`
    },
    {
      name: "Customer-Oriented",
      description: `Computer vision applications vary widely, from autonomous vehicles to industrial inspection and
                    healthcare imaging. We are committed to understanding the unique challenges our customers face
                    and delivering tailored solutions that maximize performance, usability, and real-word impact`
    }, 
    {
      name: "Openness and Adaptability",
      description: `The computer vision industry is evolving rapidly with advancesment in deep learning, real-time processing and
                    quantum computing. We embrace openness to new ideas, continuous learning, and adaptability to stay ahead in
                    this fast-paced environment, ensuring our technology remains cutting-edge and future-proof`
    }
  ]

  return (
    <div style={{ marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh' }}>
      <div className="career-left-text">
        <div>
          <p style = {{fontSize: '50px'}}>
            Our Vision
          </p>
          <br/>
          <p>
            Accelerate innovation through advanced simulation software solutions
          </p>
        </div>
        <div style = {{marginTop: '15vh'}}>
          <p style = {{fontSize: '50px'}}>
            Our Mission
          </p>
          <br/>
          <p>
            By advancing computer vision simulation technology, we help industries develop smarter, 
            more efficient vision systems while eliminating the need for physical prototypes, 
            reducing waste, and protecting the environment
          </p>
        </div>
        <div style = {{marginTop: '15vh'}}>
          <p style = {{fontSize: '50px'}}>
            Our Core Values
          </p>
          <br/>
          <Row className = "g-4">
            {coreValues.map((value, index) => (
              <Col key={index} md={6}>
                <Card className="h-100 shadow" style={{ backgroundColor: 'transparent', border: 'none' }}>
                  <Card.Body style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                    <Card.Title style={{ fontWeight: '900', fontSize: '1.5rem', color: 'white'}}>
                      {value.name}
                    </Card.Title>
                    <Card.Text style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
                      {value.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
    
      </div>
    </div>
  );
};

export default Company;
