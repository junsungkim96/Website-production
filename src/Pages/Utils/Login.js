import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from '../../img/qblackai_logo.png';
import '../../styles/desktop.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const API_BASE = 'https://www.qblackai.com/api';

const Login = () => {
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: Password
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Validation schemas for each step
  const emailSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
  });

  const passwordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
      .required('Password is required'),
  });

  const handleLogin = async (values, setSubmitting, setFieldError, navigate) => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', values.email);
        navigate('/');
      } else {
        alert(data.message || '로그인에 실패했습니다.');
        setFieldError('password', data.message || 'Login failed');
      }
    } catch (err) {
      alert('서버 오류로 로그인에 실패했습니다.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: '5vh', textAlign: 'center' }}>
      <img
        src={logo}
        alt="QblackAI Logo"
        style={{ width: '180px', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      />

      <div style={{ maxWidth: '400px', margin: '20px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Formik
          enableReinitialize
          initialValues={{ email: '', password: '' }}
          validationSchema={step === 1 ? emailSchema : passwordSchema}
          onSubmit={async (values, { setSubmitting, validateForm, setFieldError }) => {
            if (step === 1) {
              // 이메일 검증
              const errors = await validateForm();
              if (errors.email) {
                alert(errors.email);
                setSubmitting(false);
                return;
              }
              setStep(2);
              setSubmitting(false);
            } else if (step === 2) {
              await handleLogin(values, setSubmitting, setFieldError, navigate);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Welcome 유지 */}
              <div
                style={{
                  fontSize: '4vh',
                  fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                Welcome
              </div>

              {/* 이메일 */}
              <div className="form-group" style={{ width: '100%' }}>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={`input-field${errors.email && touched.email ? ' is-invalid' : ''}`}
                />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>

              {/* 비밀번호 */}
              {step === 2 && (
                <div className="form-group" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <Field
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className={`input-field${errors.password && touched.password ? ' is-invalid' : ''}`}
                      style={{ flex: 1, height: '50px', fontSize: '16px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#008B8B',
                        padding: 0,
                      }}
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </div>
              )}

              {/* 버튼 */}
              <button type="submit" className="next-button">
                {step === 1 ? 'Next' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>

        <span style={{ display: 'flex', justifyContent: 'center', fontSize: '16px', marginTop: '15px' }}>
          Need an account?&nbsp;
          <span
            style={{ color: 'rgb(0, 100, 250)', cursor: 'pointer' }}
            onClick={() => navigate('/signup')}
          >
            Get Started!
          </span>
        </span>

      </div>
    </div>
  );
};

export default Login;