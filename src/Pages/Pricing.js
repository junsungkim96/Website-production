import '../App.css';
import React, {useLayoutEffect} from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import handleTrialDownload from '../component/Download';

const Pricing = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      name: 'Trial',
      price: 'Free',
      features: [
        '7-day trial',
        'Full access to core simulator functionalities for a limited time',
        'Access to onboarding materials and tutorials',
        'Option to upgrade to any paid tier at the end of the trial',
      ],
      buttonText: 'Start Trial',
      onClick: handleTrialDownload,
    },
    {
      name: 'Basic',
      price: '$[299]/month',
      features: [
        'Access to core simulator functionalities',
        'Limited hardware/software integration options',
        'Basic support via email',
        'Monthly updates and access to community forums',
      ],
      buttonText: 'Subscribe',
    },
    {
      name: 'Pro',
      price: '$[999]/month',
      features: [
        'All Basic Tier features',
        'Advanced simulation tools and analytics',
        'Priority email support',
        'Access to webinars and tutorials',
        'One-on-one consultation (1 hour/month)',
      ],
      buttonText: 'Subscribe',
    },
    {
      name: 'Enterprise',
      price: 'Contact us',
      features: [
        'All Pro Tier features',
        'Custom integration solutions for specific HW/SW',
        'Dedicated account manager',
        'Onboarding assistance and training for teams',
        'Access to early/beta releases',
      ],
      buttonText: 'Contact Sales',
    },
    {
      name: 'Educational',
      price: '$[9]/month',
      features: [
        'Designed for students and educators',
        'Access to core simulator functionalities',
        'Educational resources and case studies',
        'Limited support via email',
        'Group access for classrooms or labs',
      ],
      buttonText: 'Subscribe',
    },
  ];


  return (
    <div style={{ marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="career-left-text">
          <div>
            <p style={{ fontSize: '50px' }}>Pricings</p>
            <br />
          </div>
        </div>
      </div>
      <Container style={{ marginTop: '5vh', marginBottom: '10vh' }}>
        <Row>
          {plans.map((plan, index) => (
            <Col key={index} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow">
                <Card.Body>
                  <Card.Title style={{ textAlign: 'center' }}>{plan.name}</Card.Title>
                  <h3 style={{ textAlign: 'center', marginTop: '1vh' }}>{plan.price}</h3>
                  <ul className="list-unstyled mt-3 mb-4" style={{ textAlign: 'left', minHeight: '15vh' }}>
                    {plan.features.map((feature, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1vh' }}>
                        <span style={{ marginRight: '5px', flexShrink: 0, whiteSpace: 'nowrap' }}>✔</span>
                        <span style={{ wordWrap: 'break-word' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="d-grid">
                    <Button variant="success" size="lg" onClick={plan.onClick}>
                      {plan.buttonText}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};


export default Pricing;