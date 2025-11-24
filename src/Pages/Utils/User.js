import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Helmet } from "react-helmet";

const User = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [payments, setPayments] = useState([]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    console.log('Email:', email);
    if (!email) return;

    const fetchUserData = async () => {
      try {
        // 사용자 정보 가져오기
        const userRes = await fetch(`/api/get-user-info?email=${encodeURIComponent(email)}`);
        const userData = await userRes.json();

        if (!userRes.ok) {
          console.error("Failed to fetch user info:", userData.message);
          return;
        }

        setUserInfo(userData);

        // 결제 이력 가져오기
        const paymentRes = await fetch(`/api/get-payments?email=${encodeURIComponent(email)}`);
        const paymentData = await paymentRes.json();
        console.log(paymentData);

        if (!paymentRes.ok) {
          console.error("Failed to fetch payments:", paymentData.message);
          return;
        }

        // 최신순 정렬
        const sortedPayments = paymentData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPayments(sortedPayments);
      } catch (err) {
        console.error("Error fetching user info or payments:", err);
      }
    };

    fetchUserData();
  }, []);

  if (!userInfo) return <div style={{ padding: '2rem' }}>Loading user info...</div>;

  return (
    <div style={{ marginBottom: '200px', paddingTop: '10vh', minHeight: '80vh' }}>
      <Helmet>
        <title>User Info</title>
        <meta name="description" content="User profile and payment history" />
        <link rel="canonical" href="https://qblackai.com/user" />
      </Helmet>

      <Container style={{ marginBottom: '5vh' }}>
        <h2 style={{ marginBottom: '2rem', fontSize: '2.5rem', textAlign: 'center' }}>User Information</h2>
        <Row>
            <Col xs={12} className="mb-4">
                <Card className="shadow" style={{ backgroundColor: '#111', color: '#fff' }}>
                <Card.Body>
                    <h4>Email</h4>
                    <p>{userInfo.email}</p>
                    <h4>First Name</h4>
                    <p>{userInfo.firstName}</p>
                    <h4>Last Name</h4>
                    <p>{userInfo.lastName}</p>
                </Card.Body>
                </Card>
            </Col>

            <Col xs={12} className="mb-4">
                <Card className="shadow" style={{ backgroundColor: '#111', color: '#fff' }}>
                <Card.Body>
                    <h4>Current Plan</h4>
                    <p>{userInfo.plan}</p>
                    <h4>Expiration Date</h4>
                    <p>{userInfo.expirationDate ? new Date(userInfo.expirationDate).toLocaleDateString() : 'N/A'}</p>
                </Card.Body>
                </Card>
            </Col>
            </Row>

        <h3 style={{ marginBottom: '1.5rem', marginTop: '2rem' }}>Payment History</h3>
        <Row>
          {payments.length > 0 ? payments.map((p, i) => (
            <Col key={i} md={6} lg={4} className="mb-4">
              <Card className="shadow h-100">
                <Card.Body>
                  <h5>Plan: {p.plan}</h5>
                  <p>Date: {new Date(p.createdAt).toLocaleDateString()}</p>
                  {p.amount && <p>Amount: {p.amount} {p.paymentData?.currency ?? ''}</p>}
                  <p>Payment ID: {p.paymentData?.paymentKey ?? 'N/A'}</p>
                </Card.Body>
              </Card>
            </Col>
          )) : <p>No payment history available.</p>}
        </Row>
      </Container>
    </div>
  );
};

export default User;
