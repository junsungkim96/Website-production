import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage} from 'formik';
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
  const [signupPassword, setSignupPassword] = useState('');

  // Validation schema for email (step 1)
  const emailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const checkEmailDuplicate = async (email) => {
    if (!email) return false;

    try {
      const response = await fetch('/api/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      return !data.duplicate; // 중복이면 false, 중복 아니면 true
    } catch (error) {
      console.error('Email check failed:', error);
      return false;
    }
  };

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
      const res = await fetch('https://www.qblackai.com/api/send-code', {
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
      const res = await fetch('https://www.qblackai.com/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailAddress, code: values.verificationCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setEmailVerified(true);
        setServerMessage('Email verified!');
        return true;
      } else {
        setServerMessage(data.message || 'Verification failed.');
        return false;
      }
    } catch {
      setServerMessage('Server error verifying code.');
      return false;
    }
  };

  // Send user info (step 4)
  const finalSignup = async (values) => {
    if (!emailVerified) {
      setServerMessage('Please verify your email first.');
      return;
    }
    console.log('Submitting final signup with:', {
    firstName: values.firstName,
    lastName: values.lastName,
    email: emailAddress,
    password: signupPassword,
    });
    try {
      const res = await fetch('https://www.qblackai.com/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: emailAddress,
          password: signupPassword,
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
          onSubmit={async (values, {setSubmitting, setErrors}) => {
            setServerMessage('');
            setSubmitting(true);
            try{
              if (step === 1){
                const isAvailable = await checkEmailDuplicate(values.email);
                if (!isAvailable){
                  setErrors({email: 'Already registered. Try another email'});
                  setServerMessage('Email already registered');
                  return;
                }
                setEmailAddress(values.email);
                setStep(2);
              }
              else if (step === 2){
                setSignupPassword(values.password)
                await sendCode();
                setStep(3);
              }
              else if (step === 3){
                const ok = await verifyCode(values);
                if(ok) setStep(4);
              }
              else if (step === 4){
                await finalSignup(values);
              }
            } finally{
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, isSubmitting}) => (
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
                  <div className="form-group" style={{ width: '100%' }}>
                    <Field name="password">
                      {({ field, meta }) => (
                        <>
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <input
                              {...field}
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Password"
                              style={{
                                height: '50px',
                                fontSize: '16px',
                                flex: 1,
                                paddingRight: '40px',
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
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
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
                          {meta.touched && meta.error && (
                            <div style={{ color: 'red', fontSize: '0.85rem', marginTop: '4px' }}>
                              {meta.error}
                            </div>
                          )}
                        </>
                      )}
                    </Field>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="form-group" style={{ width: '100%'}}>
                    <Field name="confirmPassword">
                      {({ field, meta }) => (
                        <>
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <input
                              {...field}
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Confirm Password"
                              style={{
                                height: '50px',
                                fontSize: '16px',
                                flex: 1,
                                paddingRight: '40px',
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
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#008B8B',
                                padding: 0,
                              }}
                            >
                              {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </button>
                          </div>
                          {meta.touched && meta.error && (
                            <div style={{ color: 'red', fontSize: '0.85rem', marginTop: '4px' }}>
                              {meta.error}
                            </div>
                          )}
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
                    Enter the verification code sent to <br/> {emailAddress} <br/>
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

              {/* Submit / Next Button */}
              <button
                type="submit"
                className="next-button"
                disabled={!!errors.password || !!errors.confirmPassword || isSubmitting}
                style={{
                  backgroundColor: isSubmitting ? '#006666' : '#008B8B',
                  color: 'white',
                  border: '1px solid #008B8B',
                  minWidth: '180px',
                  transition: 'all 0.5s ease',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  padding: '12px 0',
                  marginTop: '8px',
                }}
              >
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
