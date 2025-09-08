import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const DesktopInfo = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',        // 화면 전체 높이
        textAlign: 'center',
        paddingTop: '30vh',
        padding: '20px',
        backgroundColor: '#000', // 페이지 배경 검정
        color: '#fff',           // 글자 흰색
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <h4 style = {{width: '80%', margin: '0 auto', fontWeight: 300}}>
        The free trial is only available on desktop. Please use a desktop computer to start your trial.
      </h4>
      <Button
        variant="success"
        size="lg"
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#008B8B",
          borderColor: '#2F4F4F',
          borderWidth: "1px",
          borderStyle: "solid",
          marginTop: '30px',
          borderRadius: '8px',
          color: '#fff', // 버튼 글자도 흰색
        }}
      >
        Back to Mainpage
      </Button>
    </div>
  );
};

export default DesktopInfo;
