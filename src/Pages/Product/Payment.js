import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const planName = location.state?.planName || 'Basic';

  const plans = {
    Trial: {
      name: 'Trial',
      price: 'Free',
      features: [
        '7-day trial',
        'Access to core simulator functions',
        'Limited scene data & simulated image downloads',
        'Option to upgrade to any paid tier after trial',
      ],
    },
    Basic: {
      name: 'Basic',
      price: '$499 / month',
      features: [
        'Access to core simulator functionalities',
        'CPU-based simulations',
        'Complete scene data & unlimited simulated image downloads',
        'Email support',
        'Monthly updates and community forum access',
      ],
    },
    Pro: {
      name: 'Pro',
      price: '$2499 / month',
      features: [
        'All Basic Tier features',
        'GPU-based simulations',
        'Access to extensive lens, sensor and ISP database',
        'Advanced automation and analytics tools',
        'Support via email',
        'Access to webinars and tutorials',
      ],
    },
  };

  const selectedPlan = plans[planName] || plans.Basic;

  const handleBack = () => {
    navigate('/product_pricing');
  };

  return (
    <div style={{ paddingTop: '8vh', minHeight: '85vh' }}>
      {/* Back Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '6vw',
          marginBottom: '3vh',
          cursor: 'pointer',
        }}
        onClick={handleBack}
      >
        <ArrowLeft size={22} color="black" style={{ marginRight: '8px' }} />
        <span style={{ color: 'black', fontSize: '18px', fontWeight: '500' }}>Back</span>
      </div>

      {/* Main Content */}
      <Container>
        <Row
          className="justify-content-center align-items-stretch"
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '30px',
          }}
        >
          {/* Plan Summary */}
          <Col md={5} style={{ display: 'flex' }}>
            <Card
              className="shadow-sm flex-fill"
              style={{
                borderRadius: '15px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Card.Body
                style={{
                  padding: '2rem 2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  height: '100%',
                }}
              >
                <Card.Title
                  style={{
                    textAlign: 'center',
                    fontSize: '30px',
                    fontWeight: '500',
                  }}
                >
                  {selectedPlan.name}
                </Card.Title>
                <h3 style={{ textAlign: 'center', marginTop: '1vh', fontSize: '23px' }}>
                  {selectedPlan.price}
                </h3>
                <ul
                  className="list-unstyled mt-3 mb-4"
                  style={{
                    textAlign: 'left',
                    flexGrow: 1,
                    marginTop: '2vh',
                  }}
                >
                  {selectedPlan.features.map((feature, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '1vh',
                      }}
                    >
                      <span style={{ marginRight: '5px', flexShrink: 0 }}>✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>

          {/* Payment Information */}
          <Col md={5} style={{ display: 'flex' }}>
            <Card
              className="shadow-sm flex-fill"
              style={{
                borderRadius: '15px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Card.Body
                style={{
                  padding: '2rem 2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  height: '100%',
                }}
              >
                <Card.Title
                  style={{
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: '500',
                    marginBottom: '2vh',
                  }}
                >
                  Payment Information
                </Card.Title>

                <Form style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Form.Group controlId="cardNumber" className="mb-3">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control type="text" placeholder="1234 5678 9012 3456" />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="expiry" className="mb-3">
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control type="text" placeholder="MM/YY" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="cvc" className="mb-3">
                        <Form.Label>CVC</Form.Label>
                        <Form.Control type="text" placeholder="123" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="name" className="mb-4">
                    <Form.Label>Cardholder Name</Form.Label>
                    <Form.Control type="text" placeholder="John Doe" />
                  </Form.Group>

                  <div className="d-grid mt-auto">
                    <Button
                      variant="dark"
                      size="lg"
                      style={{
                        borderRadius: '10px',
                        padding: '12px 0',
                      }}
                    >
                      Confirm Payment
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Payment;
