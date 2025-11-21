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
        // 1) 빌링키 발급
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

        // 2) DB에 저장
        const email = localStorage.getItem('userEmail'); // 필요 시
        const saveRes = await fetch('/api/save-billing-key', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            billingKey: data.billingKey,
            customerKey: data.customerKey,
          }),
        });

        if (!saveRes.ok) {
          const saveErr = await saveRes.json();
          console.error("Billing key DB 저장 실패:", saveErr);
          alert("Failed to save billingkey");
          return;
        }

        const saveJson = await saveRes.json();
        console.log("Billing key saved:", saveJson);

      } catch (err) {
        console.error("Error issuing billing key:", err);
        alert("Server error");
      }
    }

    issueBillingKey();
  }, [location.search]);

  async function Pay() {
    // 3) 정기 결제 테스트
    try {
      const chargeRes = await fetch("/api/cron/billing-charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!chargeRes.ok) {
        const chargeErr = await chargeRes.json();
        console.error("Billing charge test failed:", chargeErr);
        alert("Failed billing charge test");
        return;
      }

      const chargeData = await chargeRes.json();
      console.log("Billing charge test success:", chargeData);
      alert(`Billing charge test complete: ${chargeData.processed} users`);
    } catch (err) {
      console.error("Billing charge request error:", err);
      alert("Server error during billing charge");
    }
  }

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>카드 등록 완료</h2>

      {billingData ? (
        <div>
          <p style={{ color: 'black' }}>Billing Key 발급 완료 ✅</p>
          <p style={{ color: 'black' }}>Customer Key: {billingData.customerKey}</p>
          <p style={{ color: 'black' }}>Billing Key: {billingData.billingKey}</p>
          <div style={{marginTop: '1vh'}}>
            <Button onClick={() => window.location.href = '/'}>홈으로</Button>
            <Button onClick={Pay}>빌링 결제하기</Button>
          </div>
        </div>
      ) : (
        <p style={{ color: 'black' }}>빌링키 발급 중...</p>
      )}
    </div>
  );
}
