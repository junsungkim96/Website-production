// pages/success-billing.js
import React, { useEffect, useState, useRef} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function SuccessPage() {
  const [status, setStatus] = useState("Processing card registration...");
  const location = useLocation();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    // Strictmode useEffect double-fire 방지
    if (hasRun.current) return;
    hasRun.current = true;

    async function processBilling() {
      const searchParams = new URLSearchParams(location.search);
      const customerKey = searchParams.get('customerKey');
      const authKey = searchParams.get('authKey');
      const plan = searchParams.get('plan');           
      const amount = searchParams.get('amount');       

      const email = localStorage.getItem('userEmail');

      if (!customerKey || !authKey || !email) {
        setStatus("Invalid access.");
        return;
      }

      try {
        // 1) Billing Key issue
        setStatus("Registering your card...");
        const issueRes = await fetch('/api/billing-issue', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerKey, authKey }),
        });

        if (!issueRes.ok) {
          console.error(await issueRes.json());
          setStatus("Card registration failed.");
          return;
        }

        const issueJson = await issueRes.json();
        const billingKey = issueJson.billingKey;

        // 2) Save Billing Key
        setStatus("Saving billing information...");
        const saveRes = await fetch('/api/save-billing-key', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            billingKey,
            customerKey,
          }),
        });
        localStorage.setItem('userPlan', plan);
        localStorage.setItem('autoBilling', true);

        if (!saveRes.ok) {
          console.error(await saveRes.json());
          setStatus("Failed to save billing information.");
          return;
        }

        // 3) First billing
        setStatus("Processing payment...");
        const chargeRes = await fetch('/api/billing-charge-single', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            billingKey,
            plan,
            amount: Number(amount),
          }),
        });

        const chargeJson = await chargeRes.json();

        if (!chargeRes.ok) {
          console.error("Billing charge failed:", chargeJson);
          setStatus("Payment failed.");
          return;
        }

        localStorage.setItem('payments', JSON.stringify(chargeJson.payments));

        // 4) Success
        setStatus("Payment is completed and subscription is activated");
        alert("Payment completed! Your subscription is now active.");

      } catch (err) {
        console.error("Billing error:", err);
        setStatus("Server error");
      }
    }

    processBilling();
  }, [location.search]);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>{status}</h2>
      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
          }}
        >
          Back to Mainpage
        </button>
      </div>
    </div>
  );
}
