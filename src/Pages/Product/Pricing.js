import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React, {useLayoutEffect} from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {Helmet} from "react-helmet";

const Pricing = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const freeTrial = () => {
    if (isLoggedIn){
      navigate('/simulate');
    } else{
      navigate('/login');
    }
  }

  const paidPlan = (planName) => {
    if(isLoggedIn){
      navigate('/checkout', {state: {planName}});
    } else{
      navigate('/login');
    }
  }
  
  const navigate = useNavigate();
  
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      name: 'Trial',
      price: 'Free',
      features: [
        '7-day trial',
        'Access to core simulator functions',
        'Limited scene data & simulated image downloads',
        'Option to upgrade to any paid tier after trial',
      ],
      buttonText: 'Start Free Trial',
      onClick: freeTrial,
    },
    {
      name: 'Basic',
      price: '$499/month',
      features: [
        'Access to core simulator functionalities',
        'CPU-based simulations',
        'Complete scene data & unlimited simulated image downloads',
        'Email support',
        'Monthly updates and community forum access',
      ],
      buttonText: 'Subscribe Now',
      onClick: () => paidPlan('Basic'),
    },
    {
      name: 'Pro',
      price: '$2499/month',
      features: [
        'All Basic Tier features',
        'GPU-based simulations',
        'Access to extensive lens, sensor and ISP database',
        'Advanced automation and analytics tools',
        'Support via email',
        'Access to webinars and tutorials',
      ],
      buttonText: 'Subscribe Now',
      onClick: () => paidPlan('Pro'),
    },
    // {
    //   name: 'Enterprise',
    //   price: 'Contact Us',
    //   features: [
    //     'All Pro Tier features',
    //     'On-premise deployment',
    //     'Tailored hardware/software integrations',
    //     'Dedicated account manager',
    //     'Onboarding assistance and training for teams',
    //   ],
    //   buttonText: 'Contact Sales',
    //   onClick: () => navigate('/contact_sales', {state: {planName: 'Enterprise'}})
    // },
    // {
    //   name: 'Education',
    //   price: '$9/month',
    //   features: [
    //     'Designed for students and educators',
    //     'All Basic Tier features',
    //     'Support via email',
    //     'Group access for classrooms',
    //   ],
    //   buttonText: 'Contact Sales',
    //   onClick: () => navigate('/contact_sales', {state: {planName: 'Education'}})
    // },
  ];


  return (
    <div style={{ marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh'}}>
      <Helmet>
        <title>Product</title>
        <meta
          name="description"
          content="Learn about our product pricings"
        />
        <link rel="canonical" href="https://qblackai.com/product_pricing" />
      </Helmet>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="career-left-text">
          <div>
            <p style={{ fontSize: '50px' }}>Pricings</p>
            <br />
          </div>
        </div>
      </div>

      {/* ✅ 안내 문구 추가 */}
      <div className="pricing-alert">
        ⚠️ Basic & Pro plan are temporarily unavailable due to ongoing PG integration and review. <br/>  
        The payment feature is expected to be reactivated in November.
      </div>
      
      <Container style={{ marginTop: '5vh', marginBottom: '10vh' }}>
        <Row>
          {plans.map((plan, index) => (
            <Col key={index} md={6} lg={4} className="mb-4" style={{ position: 'relative' }}>
              {plan.name === 'Trial' && (
                <div style={{
                  position: 'absolute',
                  top: '-40px',    // 카드 위쪽 바깥
                  left: '20px',     // 카드 왼쪽 정렬
                  fontSize: '16px',
                  color: '#fff',
                  fontWeight: 400,
                  textDecoration: 'underline'
                }}>
                  *Price does not include taxes
                </div>
              )}

              {plan.name === 'Pro' && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '20px',
                  backgroundColor: '#FFA500', // 주황색
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  zIndex: 10,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                }}>
                  Top Choice
                </div>
              )}
              <Card className="h-100 shadow">
                <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
                  <Card.Title style={{ textAlign: 'center', fontSize: '30px', fontWeight: '500'}}>{plan.name}</Card.Title>
                  <h3 style={{ textAlign: 'center', marginTop: '1vh', fontSize: '23px' }}>{plan.price}</h3>
                  <ul className="list-unstyled mt-3 mb-4" style={{ textAlign: 'left', minHeight: '15vh' }}>
                    {plan.features.map((feature, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1vh' }}>
                        <span style={{ marginRight: '5px', flexShrink: 0, whiteSpace: 'nowrap' }}>✔</span>
                        <span style={{ wordWrap: 'break-word' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="d-grid" style={{ marginTop: 'auto', marginBottom: '2vh' }}>
                    <Button
                      variant="success"
                      size="lg"
                      onClick={plan.onClick}
                      style={{ backgroundColor: "#008B8B", borderColor: '#2F4F4F', borderWidth: "1px", borderStyle: "solid"}}
                    >
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