import React from 'react';

const PlanModal = ({ currentPlan, onClose, onChangePlan }) => {
    const plans = ['Trial', 'Basic', 'Pro', 'Max'];
    
    return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
      onClick={onClose} // 모달 바깥 클릭 시 닫힘
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          minWidth: '250px',
        }}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않음
      >
        <h2>Select a Plan</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          {plans.map((plan) => (
            <button
              key={plan}
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: plan === currentPlan ? '2px solid #007bff' : '1px solid #ccc',
                backgroundColor: plan === currentPlan ? '#e0f0ff' : '#fff',
                cursor: 'pointer'
              }}
              onClick={() => onChangePlan(plan)}
            >
              {plan}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          style={{ marginTop: '20px', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PlanModal;