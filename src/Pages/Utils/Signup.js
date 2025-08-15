import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FormikConsumer} from 'formik';
import * as Yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import logo from '../../img/qblackai_logo.png';

const Signup = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');

  // Validation schema for email (step 1)
  const emailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  // Validation scehma for password (step 2)
  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Must contain lowercase')
      .matches(/[A-Z]/, 'Must contain uppercase')
      .matches(/\d/, 'Must contain a number')
      .matches(/[@$!%*?&#]/, 'Must contain a special character')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm your password'),
  });

  // Validation Schema for code (step 3)
  const codeSchema = Yup.object().shape({
    verificationCode: Yup.string()
      .length(6, 'Must be 6 digits')
      .required('Verification code is required'),
  });

  // Validation schema for User info (step 4)
  const nameSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
  });

  // Send code (step 2)
  const sendCode = async () => {
    if (!emailAddress){
      setServerMessage('Email not set.');
      return;
    }
    try {
      const res = await fetch('/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailAddress }),
      });
      const data = await res.json();
      if (res.ok) {
        setServerMessage(data.message || 'Verification code sent.');
      } else {
        setServerMessage(data.message || 'Failed to send verification.');
      }
    } catch {
      setServerMessage('Server error sending verification.');
    }
  };

  // Code verification (step 3)
  const verifyCode = async (values) => {
    try {
      const res = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailAddress, code: values.verificationCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setEmailVerified(true);
        setServerMessage('Email verified!');
      } else {
        setServerMessage(data.message || 'Verification failed.');
      }
    } catch {
      setServerMessage('Server error verifying code.');
    }
  };

  // Send user info (step 4)
  const finalSignup = async (values) => {
    if (!emailVerified) {
      setServerMessage('Please verify your email first.');
      return;
    }
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: emailAddress,
          password: values.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setServerMessage('Signup successful! You can now log in.');
        navigate('/login');
      } else {
        setServerMessage(data.message || 'Signup failed.');
      }
    } catch {
      setServerMessage('Server error during signup.');
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

      <div
        style={{
          maxWidth: '400px',
          margin: '20px auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            verificationCode: '',
            firstName: '',
            lastName: '',
          }}
          validationSchema={
            step === 1 ? emailSchema : step === 2 ? passwordSchema : step === 3 ? codeSchema : nameSchema
          }
          enableReinitialize
          onSubmit={async (values) => {
            if (step === 1){
              setEmailAddress(values.email);
              setStep(2);
            }
            else if (step === 2){
              await sendCode();
              setStep(3);
            }
            else if (step === 3) await verifyCode(values);
            else if (step === 4) await finalSignup(values);
          }}
        >
          {({ errors, touched}) => (
            <Form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '4vh', fontWeight: 'bold', textAlign: 'center' }}>
                Create Account
              </div>
              
              {/* Email form (Step 1)*/}
              {step === 1 && (
                <div className="form-group" style={{ width: '100%' }}>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={`input-field${errors.email && touched.email ? ' is-invalid' : ''}`}
                  />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </div>
              )}

              {/* Password form (Step 2) */}
              {step === 2 && (
                <>
                  {/* Password Field */}
                  <div className="form-group" style={{ position: 'relative', width: '100%' }}>
                    <Field name="password">
                      {({ field, meta }) => (
                        <>
                          <input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            style={{
                              height: '50px',
                              lineHeight: '50px',       // 버튼과 중앙 정렬
                              fontSize: '16px',
                              width: '100%',
                              paddingRight: '40px',     // 버튼 공간 확보
                              boxSizing: 'border-box',
                            }}
                            className={`input-field${meta.touched && meta.error ? ' is-invalid' : ''}`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              position: 'absolute',
                              right: '10px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#008B8B',
                              padding: 0,
                            }}
                          >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                          </button>
                          {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
                        </>
                      )}
                    </Field>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="form-group" style={{ position: 'relative', width: '100%' }}>
                    <Field name="confirmPassword">
                      {({ field, meta }) => (
                        <>
                          <input
                            {...field}
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            style={{
                              height: '50px',
                              lineHeight: '50px',       // 버튼과 중앙 정렬
                              fontSize: '16px',
                              width: '100%',
                              paddingRight: '40px',     // 버튼 공간 확보
                              boxSizing: 'border-box',
                            }}
                            className={`input-field${meta.touched && meta.error ? ' is-invalid' : ''}`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{
                              position: 'absolute',
                              right: '10px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#008B8B',
                              padding: 0,
                            }}
                          >
                            {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                          </button>
                          {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
                        </>
                      )}
                    </Field>
                  </div>
                </>
              )}



              {/* Verification code form  (Step 3)*/}
              {step === 3 && (
                <div style={{ width: '100%' }}>
                  <div style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#555', textAlign: 'center' }}>
                    {emailAddress} <br/> 주소로 받은 인증 코드를 입력하세요.
                  </div>

                  <Field
                    name="verificationCode"
                    type="text"
                    placeholder="6-digit Code"
                    className={`input-field${errors.verificationCode && touched.verificationCode ? ' is-invalid' : ''}`}
                  />
                  <ErrorMessage name="verificationCode" component="div" className="invalid-feedback" />
                </div>
              )}

              {/* User info form (Step 4)*/}
              {step === 4 && (
                <>
                  <div style={{ width: '100%' }}>
                    <Field
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      className={`input-field${errors.firstName && touched.firstName ? ' is-invalid' : ''}`}
                    />
                    <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                  </div>
                  <div style={{ width: '100%' }}>
                    <Field
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      className={`input-field${errors.lastName && touched.lastName ? ' is-invalid' : ''}`}
                    />
                    <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                  </div>
                </>
              )}

              <button type="submit" className="next-button" disabled={!!errors.password || !!errors.confirmPassword}>
                {step === 4 ? 'Sign Up' : 'Next'}
              </button>
            </Form>
          )}
        </Formik>
        
        {(step === 1 || step === 2) && (
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '16px',
              marginTop: '15px'
            }}
          >
            Already have account?&nbsp;
            <span
              style={{ color: 'rgb(0, 100, 250)', cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </span>
        )}


        {serverMessage && (
          <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{serverMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Signup;
