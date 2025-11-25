import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import ReactCountryFlag from "react-country-flag";
import {FaPaypal} from 'react-icons/fa';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const planName = location.state?.planName || 'Basic';

  const [currency, setCurrency] = useState('USD'); // 기본 USD
  const [rate, setRate] = useState(null);
  const [priceKRW, setPriceKRW] = useState(null);

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

  const handleBack = () => navigate('/product_pricing');


  // 환율 가져오기
  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await res.json();
        setRate(data.rates.KRW);
      } catch (err) {
        console.error(err);
      }
    }
    fetchRate();
  }, []);

  // 환율 정보 가져온 후 KRW 업데이트
  useEffect(() => {
    if (!rate) return;
    setPriceKRW(Math.round(selectedPlan.priceUSD * rate));
  }, [rate, selectedPlan]);


  // PayPal 위젯 초기화
  useEffect(() => {
    if (currency !== "USD") return; // USD일 때만 PayPal 초기화

    let mounted = true;
    let cleanupClick = null;

    const setupPayPal = async () => {
      try {
        const clientKey = "test_ck_ALnQvDd2VJqOwQ0XeeYP3Mj7X41m";
        const tossPayments = await loadTossPayments(clientKey);

        if (!mounted) return;

        // 비회원 결제 (ANONYMOUS)
        const payment = tossPayments.payment({ customerKey: ANONYMOUS });

        // 버튼
        const button = document.getElementById("us-payment-button");
        const amount = Number((selectedPlan.priceUSD * 1.1).toFixed(2));

        const handleClick = async () => {
          try {
            const plan = encodeURIComponent(selectedPlan.name);

            await payment.requestPayment({
              method: "FOREIGN_EASY_PAY",
              amount: {
                currency: "USD",
                value: amount,
              },
              orderId: `order_${Date.now()}`,
              orderName: selectedPlan.name,
              successUrl: window.location.origin + `/success_paypal?plan=${plan}&amount=${amount}`,
              failUrl: window.location.origin + "/fail",
              customerEmail: localStorage.getItem("userEmail"),
              customerName: localStorage.getItem("userFirstName"),
              customerMobilePhone: "0000000000",

              // PayPal 옵션
              foreignEasyPay: {
                provider: "PAYPAL",
                country: "US",
                paymentMethodOptions: {
                  paypal: {
                    // PayPal STC 옵션
                    setTransactionContext: {
                      sender_account_id: localStorage.getItem("userEmail"),
                      sender_first_name: localStorage.getItem("userFirstName"),
                      sender_last_name: localStorage.getItem('userLastName'),
                      sender_email: localStorage.getItem("userEmail"),
                      sender_phone: "0000000000",
                      sender_country_code: "KR",
                      sender_create_date: localStorage.getItem('date'),
                    },
                  },
                },
              },
            });
          } catch (err) {
            console.error("PayPal Payment Error:", err);
            alert("PayPal 결제 중 오류가 발생했습니다.");
          }
        };

        button.addEventListener("click", handleClick);
        cleanupClick = () => button.removeEventListener("click", handleClick);
      } catch (err) {
        console.error("PayPal 초기화 실패:", err);
      }
    };

    setupPayPal();

    return () => {
      mounted = false;
      if (cleanupClick) cleanupClick();
    };
  }, [selectedPlan, currency]);



  // TossPayments 초기화 (KRW 전용)
  useEffect(() => {
    if (currency !== 'KRW') return;

    let mounted = true;

    async function initToss() {
      if (!mounted) return;

      const clientKey = 'test_ck_EP59LybZ8BBWJD7l5wqQ86GYo7pR';
      const tossPayments = window.TossPayments(clientKey);
      const customerKey = ANONYMOUS;
      const payment = tossPayments.payment({ customerKey });

      const button = document.getElementById('payment-button');
      if (!button) return;

      button.onclick = async () => {
        try {
          const plan = encodeURIComponent(selectedPlan.name);
          const amount = Math.round(priceKRW * 1.1);

          await payment.requestBillingAuth({
            method: 'CARD',
            successUrl: `${window.location.origin}/success?plan=${plan}&amount=${amount}`,
            failUrl: `${window.location.origin}/fail`,
            customerEmail: localStorage.getItem('userEmail'),
            customerName: localStorage.getItem('userFirstName'),
          });
        } catch (err) {
          console.error('Billing Auth Error:', err);
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
  }, [currency]);


  return (
    <div style={{ paddingTop: '8vh', minHeight: '85vh' }}>
      {/* Back Button */}
      <div
        onClick={handleBack}
        style={{
          display: 'inline-flex',   // 버튼 크기만 차지
          alignItems: 'center',
          cursor: 'pointer',
          marginLeft: '6vw',
          marginBottom: '3vh',
          padding: '4px 8px',       // 클릭 영역 약간 확보
          borderRadius: '6px',      // hover 시 시각적 효과용 optional
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <ArrowLeft size={22} color="black" style={{ marginRight: '8px' }} />
        <span style={{ color: 'black', fontSize: '18px', fontWeight: '500' }}>Back</span>
      </div>

      <Container>
        <Row className="justify-content-center" style={{ gap: '10px', alignItems: 'flex-start' }}>
          {/* 왼쪽: Plan Card */}
          <Col md={5} style={{ display: 'flex', minWidth: '300px' }}>
            <Card
              className="shadow-sm"
              style={{
                borderRadius: '15px',
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
                position: 'relative', // Card를 기준으로 절대 위치 지정 가능
              }}
            >
              {/* Price 안내 표시 */}
              <div
                style={{
                  position: 'absolute',
                  top: '-30px',    
                  left: '10px',   
                  fontSize: '14px',
                  color: '#555',
                  fontWeight: '400',
                }}
              >
                *Price does not include tax
              </div>

              <Card.Body
                style={{
                  padding: '2rem 2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              >
                <Card.Title style={{ textAlign: 'center', fontSize: '30px', fontWeight: '500' }}>
                  {selectedPlan.name}
                </Card.Title>
                <h3 style={{ textAlign: 'center', marginTop: '1vh', fontSize: '23px' }}>
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

          {/* 오른쪽: 결제 카드 */}
          <Col md={5} style={{ display: 'flex', minWidth: '600px' }}>
            <Card
              className="shadow-sm flex-fill"
              style={{
                borderRadius: '15px',
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
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
                {/* 상단 Payment 제목 */}
                <Card.Title
                  style={{
                    textAlign: 'center',  // 가운데 정렬
                    fontSize: '28px',
                    fontWeight: '600',
                    marginBottom: '1.5rem',  // 아래 여백
                  }}
                >
                  Payment
                </Card.Title>

                <Card.Title
                  style={{
                    textAlign: 'left',
                    fontSize: '21px',
                    fontWeight: '500',
                    marginBottom: '0.5vh',
                    paddingLeft: '10px',
                  }}
                >
                  Choose currency:
                </Card.Title>

                {/* 통화 선택 버튼 (가로 배치, 박스 안쪽 여유) */}
                <div style={{ display: 'flex', gap: '15px', marginBottom: '0px', padding: '10px 0' }}>
                  <Button
                    variant={currency === 'USD' ? 'secondary' : 'light'}
                    style={{
                      flex: 1,
                      borderRadius: '14px',
                      padding: '16px 0',
                      display: 'flex',
                      gap: '10px',
                      justifyContent: 'flex-start',
                      fontSize: '18px',
                      paddingLeft: '20px',   // 왼쪽 여유 추가
                    }}
                    onClick={() => setCurrency('USD')}
                  >
                    <ReactCountryFlag countryCode="US" svg style={{ width: '1.6em', height: '1.6em' }} />
                    ${selectedPlan.priceUSD}
                  </Button>

                  <Button
                    variant={currency === 'KRW' ? 'secondary' : 'light'}
                    style={{
                      flex: 1,
                      borderRadius: '14px',
                      padding: '16px 0',
                      display: 'flex',
                      gap: '10px',
                      justifyContent: 'flex-start',
                      fontSize: '18px',
                      paddingLeft: '20px',   // 왼쪽 여유 추가
                    }}
                    onClick={() => setCurrency('KRW')}
                  >
                    <ReactCountryFlag countryCode="KR" svg style={{ width: '1.6em', height: '1.6em' }} />
                    {rate ? `₩${priceKRW?.toLocaleString()}` : '₩---'}
                  </Button>
                </div>

                {/* 환율 정보: USD 버튼 밑 */}
                <div style={{ fontSize: '14px', color: '#555', marginBottom: '20px', marginLeft: '10px' }}>
                  {rate ? `1 USD = ${rate.toLocaleString()} KRW` : '환율 불러오는 중…'}
                </div>

                {/* 환불 안내 (결제 버튼 위) */}
                <div
                  style={{
                    minHeight: '50px',           // 최소 높이 고정
                    marginBottom: '20px',
                    fontSize: '14px',
                    color: '#555',
                    textAlign: 'center',
                    lineHeight: '1.6',
                    display: 'flex',             // flex로 세로 중앙
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {currency === 'USD' ? (
                    <div>
                      By proceeding with the payment, you agree to our<br />
                      <a
                        href="/refund"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#0066cc', textDecoration: 'underline' }}
                      >
                        Refund & Cancellation Policy
                      </a>.
                    </div>
                  ) : (
                    <div>
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
                  )}
                </div>

                {/* 결제 버튼 */}
                <div className="d-grid">
                  {currency === 'USD' ? (
                    <Button
                      id="us-payment-button"
                      size="lg"
                      style={{
                        backgroundColor: '#003087', // PayPal 공식 파란색
                        color: '#fff',               // 텍스트 흰색
                        borderRadius: '10px',
                        padding: '12px 0',
                        fontWeight: '600',
                        fontSize: '17px',
                        border: 'none',              // 테두리 없앰
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.1s, box-shadow 0.1s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 10px rgba(0,0,0,0.25)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
                      }}
                    >
                      <FaPaypal size={24} /> 
                      Checkout with PayPal
                    </Button>
                  ) : (
                    <Button
                      id="payment-button"
                      size="lg"
                      style={{
                        backgroundColor: '#222',   // KRW도 외국통화와 동일
                        color: '#f9fcff',
                        borderRadius: '10px',
                        padding: '12px 0',
                        fontWeight: '600',
                        fontSize: '17px',
                        border: '2px solid #000',  // 테두리 검은색
                        boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.1s, box-shadow 0.1s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 10px rgba(0,0,0,0.25)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
                      }}
                    >
                      카드등록 후 구독하기
                    </Button>
                  )}
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
