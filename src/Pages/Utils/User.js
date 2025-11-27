import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React, { useState, useLayoutEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Helmet } from "react-helmet";

const User = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [payments, setPayments] = useState([]);

  const [autoBilling, setAutoBilling] = useState(null);

  const disableAutoBilling = async () => {
    const confirm = window.confirm(
      "Are you sure you want to disable Automatic Billing?\nThis process is irreversible."
    );
    if (!confirm) return;
    // 서버 API 호출 후 상태 변경

    try {
      const email = localStorage.getItem("userEmail");
      
      const res = await fetch("/api/disable-auto-billing", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email}),
      });

      if(!res.ok){
        const text = await res.text();
        console.error("Failed to disable auto billing", text);
        return;
      }    

      const data = await res.json();
      console.log("Server response:", data);

      localStorage.setItem('autoBilling', false);
      setAutoBilling(false);

    } catch (err){
      console.error("Error diabling auto billing:", err);
      alert("Unexpected error occurred");
    }
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    const email = localStorage.getItem('userEmail');
    if (!email) return;

    const firstName = localStorage.getItem('userFirstName');
    const lastName = localStorage.getItem('userLastName');
    const plan = localStorage.getItem('userPlan');
    const date = localStorage.getItem('expireDate');
    const paymentsRaw = localStorage.getItem('payments');
    setAutoBilling(localStorage.getItem('autoBilling') === 'true');

    setUserInfo({
      email,
      firstName,
      lastName,
      plan,
      date,
    });

    if (paymentsRaw) {
      try {
        const parsedPayments = JSON.parse(paymentsRaw);
        setPayments(parsedPayments);
      } catch (err) {
        console.error("Failed to parse payments:", err);
      }
    }

  }, []);

  if (!userInfo) {
    return <div style={{ padding: '2rem', color: '#fff' }}>Loading user info...</div>;
  }

  return (
    <div style={{ marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh', backgroundColor: 'transparent', color: '#fff' }}>
      <Helmet>
        <title>User</title>
        <meta name="description" content="User profile and payment history" />
        <link rel="canonical" href="https://qblackai.com/user" />
      </Helmet>

      <Container style={{ marginBottom: '5vh' }}>
        <h2 style={{ marginBottom: '4rem', fontSize: '2.5rem', textAlign: 'left', fontWeight: '700' }}>
          <p style={{ fontSize: '40px' }}>User Information</p>
        </h2>

        {[
          { label: 'Email', value: userInfo.email },
          { label: 'First Name', value: userInfo.firstName },
          { label: 'Last Name', value: userInfo.lastName },
          { label: 'Current Plan', value: userInfo.plan },
          { label: 'Automatic Billing', value: autoBilling ? 'Enabled' : 'Disabled'},
          { label: 'Expiration Date', value: userInfo.date === 'undefined' ? 'N/A' :  new Date(userInfo.date).toLocaleDateString() },
          { label: 'Payment History', value: null } // Payment History 라벨만 표시
        ].map((item, idx) => (
          <Row key={idx} className="mb-5">
            <Col xs={4} style={{ fontWeight: '500', fontSize: '1.1rem', textAlign: 'left' }}>
              {idx + 1}. {item.label}
            </Col>
            <Col xs={8} style={{ fontSize: '1rem', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
              {item.value}
              {item.label === 'Automatic Billing' && autoBilling && (
                <Button
                  variant="success"
                  size="sm"
                  onClick={disableAutoBilling}
                  style={{ marginLeft: '25px', backgroundColor: "#008B8B", borderColor: '#2F4F4F', borderWidth: "1px", borderStyle: "solid"}}
                >
                  Disable
                </Button>
              )}
            </Col>
          </Row>
        ))}

        {/* Payment Table Header */}
        {payments.length > 0 && (
          <Row style={{ paddingLeft: '4rem', fontWeight: '500', fontSize: '1rem', borderBottom: '1px solid #555', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
            <Col style={{ flex: 1, textAlign: 'left' }}>Date</Col>
            <Col style={{ flex: 1, textAlign: 'center' }}>Plan</Col>
            <Col style={{ flex: 1, textAlign: 'right' }}>Payment ID</Col>
          </Row>
        )}

        {/* Payment Items */}
        {payments.length > 0 ? payments.map((p, i) => (
          <Row key={i} className="mb-2" style={{ paddingLeft: '4rem', fontSize: '1rem' }}>
            <Col style={{ flex: 1, textAlign: 'left' }}>
              {new Date(p.createdAt).toLocaleDateString()}
            </Col>
            <Col style={{ flex: 1, textAlign: 'center' }}>
              {p.plan}
            </Col>
            <Col style={{ flex: 1, textAlign: 'right' }}>
              {p.billingData?.paymentKey ?? p.paymentData?.paymentKey ?? 'N/A'}
            </Col>
          </Row>
        )) : (
          <Row style={{ paddingLeft: '4rem', fontSize: '1rem', color: '#fff' }}>
            <Col xs={12}>No payment history available.</Col>
          </Row>
        )}
      </Container>



    </div>
  );


};

export default User;
