import { useState } from "react";

export function SuccessPage() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const searchParams = new URLSearchParams(window.location.search);
  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  async function confirmPayment() {
    try {
      const response = await fetch("http://localhost:8000/api/payment-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentKey, orderId, amount }),
      });

      const data = await response.json();
      setResponseData(data);

      if (response.ok) {
        setIsConfirmed(true);
      } else {
        console.error("결제 승인 실패:", data);
        alert("결제 승인 실패. 콘솔 확인");
      }
    } catch (err) {
      console.error("결제 승인 중 오류:", err);
      alert("결제 승인 중 오류 발생");
    }
  }

  return (
    <div className="wrapper w-100">
      {isConfirmed ? (
        <div className="flex-column align-center confirm-success w-100 max-w-540" style={{ display: "flex" }}>
          <img
            src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
            width="120"
            height="120"
          />
          <h2 className="title">결제를 완료했어요</h2>

          <div className="response-section w-100">
            <div className="flex justify-between">
              <span className="response-label">결제 금액</span>
              <span id="amount" className="response-text">{amount}원</span>
            </div>
            <div className="flex justify-between">
              <span className="response-label">주문번호</span>
              <span id="orderId" className="response-text">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="response-label">paymentKey</span>
              <span id="paymentKey" className="response-text">{paymentKey}</span>
            </div>
          </div>

          <div className="w-100 button-group">
            <div className="flex" style={{ gap: "16px" }}>
              <a className="btn w-100" href="https://developers.tosspayments.com/sandbox">다시 테스트하기</a>
              <a className="btn w-100" href="https://docs.tosspayments.com/guides/v2/payment-widget/integration" target="_blank" rel="noopener noreferrer">결제 연동 문서가기</a>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-column align-center confirm-loading w-100 max-w-540">
          <div className="flex-column align-center">
            <img src="https://static.toss.im/lotties/loading-spot-apng.png" width="120" height="120" />
            <h2 className="title text-center">결제 요청까지 성공했어요.</h2>
            <h4 className="text-center description">결제 승인하고 완료해보세요.</h4>
          </div>
          <div className="w-100">
            <button className="btn primary w-100" onClick={confirmPayment}>결제 승인하기</button>
          </div>
        </div>
      )}
      {responseData && !isConfirmed && (
        <pre style={{ whiteSpace: "pre-wrap", marginTop: "16px" }}>
          {JSON.stringify(responseData, null, 2)}
        </pre>
      )}
    </div>
  );
}
