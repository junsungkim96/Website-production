import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';
import logo from '../../img/qblackai_logo.png';
import { Link } from 'react-router-dom';

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={fields => {
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
      }}
    >
      {({ errors, status, touched }) => (
        <>
          <Link to="/" style={{ marginTop: '10vh', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            <img
              src={logo}
              alt="QblackAI Logo"
              style={{ width: '250px', cursor: 'pointer' }}
            />
          </Link>

          <Card
            style={{
              padding: '20px',
              marginTop: '1vh',
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: '400px',
              backgroundColor: 'white',
              boxSizing: 'border-box',
              width: '90%',          // 작은 화면에서 좌우 여백 확보
            }}
          >
            <Form style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: '3.3vh',
                  fontWeight: 'bold',
                  marginBottom: '2vh',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                Welcome
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  autoComplete="off"
                  name="email"
                  type="text"
                  className={
                    'form-control' +
                    (errors.email && touched.email ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group" style={{ marginBottom: '1vh' }}>
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className={
                    'form-control' +
                    (errors.password && touched.password ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div
                className="form-group"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '15px',
                }}
              >
                <button type="submit" className="btn btn-primary mr-2">
                  Login
                </button>
              </div>
            </Form>
            <span
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: '16px',
              }}
            >
              Need an account?&nbsp;
              <span
                style={{ color: 'rgb(0, 100, 250)', cursor: 'pointer' }}
                onClick={() => {
                  navigate('/signup');
                }}
              >
                Get Started!
              </span>
            </span>
          </Card>
        </>
      )}
    </Formik>
  );
};

export default Login;