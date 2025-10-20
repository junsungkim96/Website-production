import React, { useEffect, useState } from 'react';

const Fail = () => {
  const [errorInfo, setErrorInfo] = useState({ code: '', message: '' });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setErrorInfo({
      code: urlParams.get("code"),
      message: urlParams.get("message"),
    });
  }, []);

  return (
    <div className="wrapper">
      <h2>결제 실패</h2>
      <p>코드: {errorInfo.code}</p>
      <p>메시지: {errorInfo.message}</p>
    </div>
  );
};

export default Fail;