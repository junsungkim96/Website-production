import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import logo from '../../img/qblackai_logo.png';

const DownloadPage = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    licenseKey: Yup.string()
      .min(6, 'License key must be at least 6 characters')
      .required('License key is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await fetch('https://www.qblackai.com/api/validate-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Validation successful! Download will begin.');
        window.location.href = data.downloadUrl;
      } else {
        const errorData = await response.json();
        const message = errorData.message || 'Invalid email or license key.';
        alert(message);

        // 좀 더 일반적인 에러 처리
        if (message.toLowerCase().includes('email')) {
          setFieldError('email', 'Email does not match.');
        }
        if (message.toLowerCase().includes('license')) {
          setFieldError('licenseKey', 'License key does not match.');
        } else {
          // 오류 메시지가 모호할 때 두 필드 모두 강조
          setFieldError('email', 'Invalid credentials.');
          setFieldError('licenseKey', 'Invalid credentials.');
        }
      }
    } catch (error) {
      console.error('Validation request failed:', error);
      alert('Server error. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '-20vh',
        }}
      >
        <Link to="/" style={{ marginBottom: '20px' }}>
          <img
            src={logo}
            alt="QblackAI Logo"
            style={{ width: '250px', cursor: 'pointer' }}
          />
        </Link>

        <Formik
          initialValues={{ email: '', licenseKey: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Card
              style={{
                padding: '20px',
                width: '400px',
                backgroundColor: 'white',
                borderRadius: '8px',
              }}
            >
              <Form style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    textAlign: 'center',
                  }}
                >
                  Download Your Program
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label htmlFor="email">Email</label>
                  <Field
                    autoComplete="off"
                    name="email"
                    type="text"
                    className={
                      'form-control' + (errors.email && touched.email ? ' is-invalid' : '')
                    }
                  />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label htmlFor="licenseKey">License Key</label>
                  <Field
                    name="licenseKey"
                    type="text"
                    className={
                      'form-control' +
                      (errors.licenseKey && touched.licenseKey ? ' is-invalid' : '')
                    }
                  />
                  <ErrorMessage
                    name="licenseKey"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div
                  className="form-group"
                  style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
                >
                  <button type="submit" className="btn btn-primary">
                    Validate & Download
                  </button>
                </div>
              </Form>
            </Card>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DownloadPage;
