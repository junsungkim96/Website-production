import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../img/qblackai_logo.png';

const Submit = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '10vh',
      textAlign: 'center'
    }}>
      <img src={logo} alt="logo" style={{ width: '200px', marginBottom: '3vh'}} />
      <h2 style={{ fontSize: '3vh', fontWeight: 'bold', marginBottom: '2vh' }}>Thanks for applying!</h2>
      <h1 style={{ color: 'black', fontSize: '2vh', fontWeight: '500', marginBottom: '3vh' }}>
        We’ve received your application and will be in touch soon.
      </h1>
      <div className = "underline" style = {{cursor: 'pointer'}} onClick = {()=>navigate('/careers')}>
        <h2 style ={{color: 'black', fontSize: '2vh', fontWeight: '500'}}>Back to Homepage</h2>
      </div>
    </div>
  );
};

export default Submit;