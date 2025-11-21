// pages/success-billing.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export function SuccessPage() {
  const [billingData, setBillingData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function issueBillingKey() {
      const searchParams = new URLSearchParams(location.search);
      const customerKey = searchParams.get('customerKey');
      const authKey = searchParams.get('authKey');

      if (!customerKey || !authKey) return;

      try {
        const response = await fetch('/api/billing-issue', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerKey, authKey }),
        });

        if (!response.ok) {
          const errData = await response.json();
          console.error("Billing key issuance failed:", errData);
          alert("Failed to issue billingkey");
          return;
        }

        const data = await response.json();
        setBillingData(data);
        console.log("Billing key issued:", data);

      } catch (err) {
        console.error("Error issuing billing key:", err);
        alert("Server error");
      }
    }

    issueBillingKey();
  }, [location.search]);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>카드 등록 완료</h2>

      {billingData ? (
        <div>
          <p style={{ color: 'black' }}>Billing Key 발급 완료 ✅</p>
          <p style={{ color: 'black' }}>Customer Key: {billingData.customerKey}</p>
          <p style={{ color: 'black' }}>Billing Key: {billingData.billingKey}</p>
          <Button onClick={() => window.location.href = '/'}>홈으로</Button>
        </div>
      ) : (
        <p style={{ color: 'black' }}>빌링키 발급 중...</p>
      )}
    </div>
  );
}
