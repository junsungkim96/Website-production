import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { ANONYMOUS } from "@tosspayments/tosspayments-sdk";

const Payment = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate();
  const location = useLocation();
  const planName = location.state?.planName || 'Basic';

  const plans = {
    Trial: {
      name: 'Trial',
      priceUSD: 0,
      priceLabel: 'Free',
      features: [
        '7-day trial',
        'Access to core simulator functions',
        'Limited scene data & simulated image downloads',
        'Option to upgrade to any paid tier after trial',
      ],
    },
    Basic: {
      name: 'Basic',
      priceUSD: 499,
      priceLabel: '$499 / month',
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
      priceUSD: 2499,
      priceLabel: '$2499 / month',
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

  useEffect(() => {
    let mounted = true;

    async function initToss() {
      if (!mounted) return;

      const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
      const tossPayments = window.TossPayments(clientKey);
      const customerKey = ANONYMOUS;
      const widgets = tossPayments.widgets({ customerKey });

      const usdPrice = selectedPlan.priceUSD;
      const response = await fetch(
        'https://api.exchangerate.host/latest?base=USD&symbols=KRW'
      );
      const data = await response.json();
      const rate = data?.rates?.KRW || 1400;

      const krwPriceExclVAT = Math.round(usdPrice * rate); // 부가세 제외
      const krwPrice = Math.round(krwPriceExclVAT * 1.1); // 10% 부가세 포함

      await widgets.setAmount({ currency: 'KRW', value: krwPrice });

      // 중복 렌더링 방지
      document.getElementById('payment-method').innerHTML = '';
      document.getElementById('agreement').innerHTML = '';

      await widgets.renderPaymentMethods({
        selector: '#payment-method',
        variantKey: 'DEFAULT',
      });
      await widgets.renderAgreement({
        selector: '#agreement',
        variantKey: 'AGREEMENT',
      });

      const paymentButton = document.getElementById('payment-button');
      paymentButton.onclick = async () => {
        try {
          await widgets.requestPayment({
            orderId: `ORDER-${Date.now()}`,
            orderName: `${selectedPlan.name} Plan Subscription`,
            successUrl: window.location.origin + '/success',
            failUrl: window.location.origin + '/fail',
            customerEmail: 'info@qblackai.com', // 실제 사용자로 수정 필요
            customerName: 'QblackAI User', // 실제 사용자 이름으로 수정 필요
          });
        } catch (err) {
          console.error('Toss SDK Error:', err);
          alert('결제 요청 중 오류가 발생했습니다. 콘솔을 확인하세요.');
        }
      };
    }

    if (window.TossPayments) initToss();
    else {
      const script = document.createElement('script');
      script.src = 'https://js.tosspayments.com/v2/standard';
      script.async = true;
      script.onload = initToss;
      document.body.appendChild(script);
    }

    return () => { mounted = false; };
  }, [selectedPlan]);



  const handleBack = () => navigate('/product_pricing');

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
        <span style={{ color: 'black', fontSize: '18px', fontWeight: '500' }}>
          Back
        </span>
      </div>

      {/* Main Content */}
      <Container>
        <Row
          className="justify-content-center"
          style={{ gap: '10px', alignItems: 'flex-start' }} // stretch 제거
        >
          {/* 왼쪽: 상품 카드 */}
          <Col md={5} style={{ display: 'flex', minWidth: '300px' }}>
            <Card
              className="shadow-sm"
              style={{
                borderRadius: '15px',
                display: 'flex',
                flexDirection: 'column',
                height: 'auto', // 글 길이에 맞춤
              }}
            >
              <Card.Body
                style={{
                  padding: '2rem 2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
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
                <h3
                  style={{
                    textAlign: 'center',
                    marginTop: '1vh',
                    fontSize: '23px',
                  }}
                >
                  {selectedPlan.priceLabel}
                </h3>
                <ul
                  className="list-unstyled mt-3 mb-4"
                  style={{
                    textAlign: 'left',
                    flexGrow: 1,
                    marginTop: '2vh',
                    paddingLeft: '1rem',
                  }}
                >
                  {selectedPlan.features.map((feature, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <span style={{ color: '#008B8B', flexShrink: 0 }}>✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>

          {/* 오른쪽: 결제 위젯 카드 */}
          <Col md={5} style={{ display: 'flex', minWidth: '600px' }}>
            <Card
              className="shadow-sm flex-fill"
              style={{
                borderRadius: '15px',
                display: 'flex',
                flexDirection: 'column',
                height: 'auto', // 위젯 높이
              }}
            >
              <Card.Body
                style={{
                  padding: '2rem 2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              >
                <Card.Title
                  style={{
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: '500',
                    marginBottom: '2vh',
                    // display: 'none',
                  }}
                >
                  Payment
                </Card.Title>

                <div id="payment-method" style={{ marginTop: '20px' }}></div>
                <div id="agreement" style={{ marginTop: '20px' }}></div>

                {/* 환불 규정 안내문 추가 */}
                <div
                  style={{
                    marginTop: '20px',
                    fontSize: '14px',
                    color: '#555',
                    textAlign: 'center',
                    lineHeight: '1.6',
                  }}
                >
                  결제 진행 시{' '}
                  <a
                    href="/refund"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0066cc', textDecoration: 'underline' }}
                  >
                    환불 및 취소 정책
                  </a>
                  에 동의한 것으로 간주됩니다.
                </div>

                <div className="d-grid" style={{ marginTop: '30px' }}>
                  <Button
                    id="payment-button"
                    size="lg"
                    style={{
                      backgroundColor: '#3282f6',
                      color: '#f9fcff',
                      borderRadius: '10px',
                      padding: '12px 0',
                      fontWeight: '600',
                      fontSize: '17px',
                    }}
                  >
                    결제하기
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Payment;
