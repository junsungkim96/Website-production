import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from '../../img/qblackai_logo.png';
import '../../styles/desktop.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import {Helmet} from "react-helmet";

const API_BASE = 'https://www.qblackai.com/api';

const Login = () => {
  // step: 1=이메일 입력, 2=비밀번호 입력, 3=reset 이메일 전송, 4=코드 인증, 5=비밀번호 재설정
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 2 && passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [step]);
  
  // Initialize resetMessage after every step
  useEffect(() => {
    setResetMessage('');
  }, [step]);

  // Validation schemas
  const emailSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
  });

  const passwordSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const codeSchema = Yup.object().shape({
    code: Yup.string().required('Verification code is required'),
  });

  const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  });

// --- API handlers ---
const handleLogin = async (values, setSubmitting, setFieldError) => {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: values.email, password: values.password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', values.email);
      localStorage.setItem('userFirstName', data.firstName);
      localStorage.setItem('userPlan', data.plan);
      window.dispatchEvent(new Event('login'));
      navigate('/');
    } else {
      alert(data.message || 'Login failed.');
      setFieldError('password', data.message || 'Login failed');
    }
  } catch (err) {
    alert('Server error. Failed to login.');
    console.error(err);
  } finally {
    setSubmitting(false);
  }
};

const handleSendResetEmail = async (values, setSubmitting) => {
  try {
    const res = await fetch(`${API_BASE}/send-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail }),
    });
    const data = await res.json();
    if (res.ok) {
      setUserEmail(values.email);
      setResetMessage('Verification code sent. Please check your email.');
      setStep(4);
    } else {
      setResetMessage(data.message || 'Failed to send reset email.');
    }
  } catch (err) {
    setResetMessage('Server error. Request failed.');
    console.error(err);
  } finally {
    setSubmitting(false);
  }
};

const handleVerifyCode = async (values, setSubmitting) => {
  try {
    const res = await fetch(`${API_BASE}/verify-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, code: values.code }),
    });
    const data = await res.json();
    if (res.ok) {
      setStep(5);
    } else {
      alert(data.message || 'Invalid verification code.');
    }
  } catch (err) {
    alert('Server error.');
    console.error(err);
  } finally {
    setSubmitting(false);
  }
};

const handleResetPassword = async (values, setSubmitting) => {
  try {
    const res = await fetch(`${API_BASE}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, password: values.password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert('Password reset successful. Please login.');
      setStep(1);
    } else {
      alert(data.message || 'Password reset failed.');
    }
  } catch (err) {
    alert('Server error.');
    console.error(err);
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div style={{ marginTop: '5vh', textAlign: 'center'}}>
      <Helmet>
        <title>Login</title>
        <meta
          name="description"
          content="Login page"
        />
        <link rel="canonical" href="https://qblackai.com/login" />
      </Helmet>

      <img
        src={logo}
        alt="QblackAI Logo"
        style={{ width: '180px', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      />

      <div style={{ maxWidth: '400px', margin: '20px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Formik
          enableReinitialize
          initialValues={{
            email: step === 1 ? '' : userEmail || '',
            password: '',
            code: '',
            confirmPassword: '',
          }}
          validationSchema={
            step === 1
              ? emailSchema
              : step === 2
              ? passwordSchema
              : step === 3
              ? emailSchema
              : step === 4
              ? codeSchema
              : resetPasswordSchema
          }
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            if (step === 1) {
              setUserEmail(values.email);
              setStep(2);
              setSubmitting(false);
            } else if (step === 2) {
              await handleLogin(values, setSubmitting, setFieldError);
            } else if (step === 3) {
              setUserEmail(values.email);
              await handleSendResetEmail(values, setSubmitting);
            } else if (step === 4) {
              await handleVerifyCode(values, setSubmitting);
            } else if (step === 5) {
              await handleResetPassword(values, setSubmitting);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Welcome */}
              <div style={{ fontSize: '4vh', fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>
                {step === 1 && 'Welcome'}
                {step === 2 && 'Welcome'}
                {step === 3 && 'Reset Password'}
                {step === 4 && 'Verify Code'}
                {step === 5 && 'New Password'}
              </div>

              {/* 이메일 */}
              {(step === 1 || step === 2 || step === 3) && (
                <div className="form-group" style={{ width: '100%', position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={`input-field${errors.email && touched.email ? ' is-invalid' : ''}`}
                    disabled={isSubmitting || step === 2}
                  />
                  {isSubmitting && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(200,200,200,0.5)',
                        zIndex: 10,
                      }}
                    />
                  )}
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </div>
              )}

              {/* 비밀번호 */}
              {step === 2 && (
                <div className="form-group" style={{ width: '100%', position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <Field
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className={`input-field${errors.password && touched.password ? ' is-invalid' : ''}`}
                      style={{ flex: 1, height: '50px', fontSize: '16px' }}
                      disabled={isSubmitting}
                      innerRef={passwordRef}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'none',
                        border: 'none',
                        cursor: isSubmitting ? 'default' : 'pointer',
                        color: '#008B8B',
                        padding: 0,
                      }}
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>

                  {isSubmitting && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(200,200,200,0.5)',
                        zIndex: 10,
                      }}
                    />
                  )}

                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </div>
              )}

              {/* 인증 코드 */}
              {step === 4 && (
                <div className="form-group" style={{ width: '100%', position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
                  <Field
                    name="code"
                    type="text"
                    placeholder="Enter verification code"
                    className={`input-field${errors.code && touched.code ? ' is-invalid' : ''}`}
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="code" component="div" className="invalid-feedback" />
                </div>
              )}

              {/* 새 비밀번호 */}
              {step === 5 && (
                <>
                  <div className="form-group" style={{ width: '100%', position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
                    <Field
                      name="password"
                      type="password"
                      placeholder="New Password"
                      className={`input-field${errors.password && touched.password ? ' is-invalid' : ''}`}
                      disabled={isSubmitting}
                    />
                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                  </div>

                  <div className="form-group" style={{ width: '100%', position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      className={`input-field${errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : ''}`}
                      disabled={isSubmitting}
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                  </div>
                </>
              )}

              {/* 버튼 */}
              <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
                <button type="submit" className="next-button" disabled={isSubmitting}>
                  {step === 1
                    ? 'Next'
                    : step === 2
                    ? 'Login'
                    : step === 3
                    ? 'Send Reset Link'
                    : step === 4
                    ? 'Verify Code'
                    : 'Reset Password'}
                </button>
                {isSubmitting && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(200,200,200,0.5)',
                      zIndex: 10,
                    }}
                  />
                )}
              </div>
            </Form>
          )}
        </Formik>

        {/* Forgot Password */}
        {step === 2 && (
          <span
            style={{ marginTop: '10px', display: 'block', cursor: 'pointer', color: '#0066cc' }}
            onClick={() => setStep(3)}
          >
            Forgot Password?
          </span>
        )}

        {resetMessage && <div style={{ marginTop: '10px', color: 'green' }}>{resetMessage}</div>}

        {(step === 1 || step === 2) && (
          <span style={{ display: 'flex', justifyContent: 'center', fontSize: '16px', marginTop: '15px' }}>
            Need an account?&nbsp;
            <span
              style={{ color: 'rgb(0, 100, 250)', cursor: 'pointer' }}
              onClick={() => navigate('/signup')}
            >
              Get Started!
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default Login;