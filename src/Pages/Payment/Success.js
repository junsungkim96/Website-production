import { useState } from "react";
import { Button } from 'react-bootstrap';

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
        <div
          className="flex-column align-center confirm-success w-100 max-w-540"
          style={{ marginTop: '5%', display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
        >
          <img
            src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
            width="120"
            height="120"
            style={{ marginBottom: "20px" }} // img와 h2 사이 간격
          />
          <h2 className="title" style={{ marginBottom: "20px" }}>결제를 완료했어요</h2>

          <div
            className="response-section"
            style={{
              width: "100%",           // 부모 박스 넓이
              maxWidth: "500px",       // 박스 최대 너비
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "10px",
              margin: "0 auto 20px",   // 가운데 정렬 + 아래 간격
              boxSizing: "border-box"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span className="response-label">결제 금액</span>
              <span id="amount" className="response-text">{amount}원</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span className="response-label">주문번호</span>
              <span id="orderId" className="response-text">{orderId}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="response-label">paymentKey</span>
              <span id="paymentKey" className="response-text">{paymentKey}</span>
            </div>
          </div>

          <div
            style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}
          >
            <Button
              onClick={() => window.location.href = "/"} // 홈페이지로 이동
              style={{
                backgroundColor: "#3282f6",
                color: "#f9fcff",
                borderRadius: "10px",
                padding: "12px 24px",
                fontWeight: "600",
                fontSize: "17px",
                border: "none",
                cursor: "pointer"
              }}
            >
              홈페이지로 돌아가기
            </Button>
          </div>



        </div>
      ) : (
        <div
          className="flex-column align-center confirm-loading w-100 max-w-540"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
        >
          <img
            src="https://static.toss.im/lotties/loading-spot-apng.png"
            width="120"
            height="120"
            style={{ marginTop: '5%', marginBottom: "20px" }} // img와 h2 사이 간격
          />
          <h2 className="title" style={{ marginBottom: "10px", fontWeight: '600', fontSize: '30px' }}>
            결제 요청까지 성공했어요.
          </h2>
          <h4 className="description" style={{ fontWeight: '500', fontSize: '23px' }}>
            결제 승인하고 완료해보세요.
          </h4>

          {/* 버튼 */}
          <div style={{ marginTop: "30px", display: "flex", textAlign: "center" }}>
            <Button
              id="payment-button"
              size="lg"
              onClick={confirmPayment}
              style={{
                backgroundColor: "#3282f6",
                color: "#f9fcff",
                borderRadius: "10px",
                padding: "12px 120px",
                fontWeight: "600",
                fontSize: "17px",
                // width: "400%",       // 화면 대비 넓이
                display: "inline-block",
              }}
            >
              결제 승인하기
            </Button>
          </div>
        </div>
      )}

      {responseData && !isConfirmed && (
        <pre style={{ whiteSpace: "pre-wrap", marginTop: "16px", textAlign: "center" }}>
          {JSON.stringify(responseData, null, 2)}
        </pre>
      )}
    </div>
  );
}
