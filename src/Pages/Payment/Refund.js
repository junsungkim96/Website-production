import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React from 'react';
import {Helmet} from "react-helmet";

const Refund = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '10vh',
        color: 'white',
        textAlign: 'left',
        fontSize: '0.9rem',
        lineHeight: '2.2',
        marginBottom: '40vh',
      }}
    >
      <Helmet>
        <title>Product</title>
        <meta
          name="description"
          content="Learn about our refund policy"
        />
        <link rel="canonical" href="https://qblackai.com/refund" />
      </Helmet>

      <div className="term-container" style={{ textAlign: 'left' }}>
        <h1 style={{ marginBottom: '2rem' }}>Refund & Cancellation Policy</h1>

        <h3 style={{ marginTop: '1.5rem' }}>1. Non-Refundable Subscription</h3>
        <p className="description-text" style={{ marginBottom: '1.5rem'}}>
          Once a paid subscription is activated, refunds for the remaining period are not available.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>2. Service Failure or Non-Provided Features</h3>
        <p className="description-text" style={{ marginBottom: '1.5rem'}}>
          If the service fails or contracted features are not provided due to our responsibility, a proportional refund will be issued for the unused period.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>3. How to Request a Refund</h3>
        <p className="description-text" style={{ marginBottom: '1.5rem'}}>
          Refund requests should be submitted to <strong>info@qblackai.com</strong>. 
          Requests will be processed within 3–5 business days.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>4. Others</h3>
        <p className="description-text" style={{ marginBottom: '2rem'}}>
          This refund policy may be subject to change according to applicable laws and our service policies. 
          Any updates will be communicated in advance.
        </p>
        
      </div>
    </div>
  );
};



export default Refund;
