import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function FailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorInfo, setErrorInfo] = useState({ code: '', message: '' });

  // 이전 플랜 정보 가져오기
  const planName = location.state?.planName || 'Basic';

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setErrorInfo({
      code: urlParams.get("code") || '',
      message: urlParams.get("message") || '',
    });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <img
        src="https://static.toss.im/lotties/error-spot-apng.png"
        alt="결제 실패"
        style={{ width: '120px', marginBottom: '20px' }}
      />
      <h2 style={{ color: '#d9534f', marginBottom: '10px' }}>Payment Failed</h2>
      <p style={{ marginBottom: '20px', color: '#555', fontSize: '16px' }}>
        {errorInfo.message}
      </p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('/product_pricing')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#e0e0e0',
            color: '#333',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          Go back to Pricings page
        </button>
      </div>
    </div>
  );
}
