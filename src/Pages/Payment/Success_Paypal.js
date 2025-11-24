import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function SuccessPayPal() {
  const [status, setStatus] = useState("Processing payment...");
  const location = useLocation();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const searchParams = new URLSearchParams(location.search);
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
		const plan = searchParams.get("plan");

    if (!paymentKey || !orderId || !amount) {
      setStatus("Invalid access.");
      return;
    }

    async function confirmPayment() {
		try {
			setStatus("Verifying PayPal payment...");

			// 1️⃣ Toss payment-confirm 호출
			const res = await fetch("/api/payment-confirm", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ paymentKey, orderId, amount }),
			});

			const paymentData = await res.json();

			if (!res.ok) {
				console.error("Payment confirmation failed:", paymentData);
				setStatus("Payment verification failed.");
				return;
			}

			// 2️⃣ 결제 성공 → plan 업데이트
			const email = localStorage.getItem("userEmail");

			if (!email || !plan) {
				console.error("Email or plan missing, cannot update plan.");
				setStatus("Payment verification failed.");
				return;
			}

			const updateRes = await fetch("/api/update-plan", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, plan, paymentData }),
			});

			const updateData = await updateRes.json();

			if (!updateRes.ok) {
				console.error("DB server error:", updateData);
				setStatus("Plan update failed.");
				return;
			}

			// 3️⃣ 모든 처리 성공
			setStatus("Payment completed successfully!");
			alert("Payment successful and plan activated!");
		} catch (err) {
			console.error("Payment confirmation error:", err);
			setStatus("Payment verification error.");
		}
	}

    confirmPayment();
  }, [location.search]);

  return (
    <div style={{ padding: "3vh 5vw", minHeight: "85vh", textAlign: "center" }}>
			<h2>PayPal Payment Status</h2>
			<p style={{color: 'black', marginTop: "1rem", fontSize: "18px" }}>{status}</p>
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
  );
}
