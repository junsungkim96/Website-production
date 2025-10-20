import React, { useEffect, useState } from 'react';

const Success = () => {
  const [paymentInfo, setPaymentInfo] = useState({ paymentKey: '', orderId: '', amount: '' });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const info = {
      paymentKey: urlParams.get("paymentKey"),
      orderId: urlParams.get("orderId"),
      amount: urlParams.get("amount"),
    };
    setPaymentInfo(info);

    const confirmPayment = async () => {
      try {
        const response = await fetch('/api/payment-confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(info),
        });
        if (response.ok) setSuccess(true);
        else {
          const resData = await response.json();
          console.error(resData);
          alert("결제 승인 실패");
        }
      } catch (err) {
        console.error(err);
        alert("결제 승인 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, []);

  return (
    <div className="wrapper">
      {loading && !success && (
        <div className="confirm-loading">
          <p>결제 승인 중...</p>
        </div>
      )}

      {success && (
        <div className="confirm-success">
          <h2>결제가 완료되었습니다.</h2>
          <p>PaymentKey: {paymentInfo.paymentKey}</p>
          <p>OrderId: {paymentInfo.orderId}</p>
          <p>Amount: {paymentInfo.amount}원</p>
        </div>
      )}
    </div>
  );
};

export default Success;
