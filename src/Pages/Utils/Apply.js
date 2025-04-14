import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const ApplicationForm = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    resume: Yup.mixed().required('A file is required')
  });

  return (
    <div className="apply">
      <div style={{ fontSize: '3.3vh', fontWeight: 'bold', marginBottom: '2vh' }}>
        Apply for this job
      </div>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', phone: '', resume: null }}
        validationSchema={validationSchema}
        onSubmit={async (fields, { setSubmitting }) => {
          const formData = new FormData();
          formData.append('firstName', fields.firstName);
          formData.append('lastName', fields.lastName);
          formData.append('email', fields.email);
          formData.append('phone', fields.phone);
          formData.append('resume', fields.resume);

          try {
            const res = await fetch('http://qblackai-111s-projects-230c46fa.vercel.app/api/apply', {
              method: 'POST',
              body: formData
            });

            if (res.ok) {
              navigate('/submit');
            } else {
              alert('Failed to submit application');
            }
          } catch (err) {
            console.error(err);
            alert('Error while submitting application');
          } finally {
            setSubmitting(false); // 꼭 다시 false로 돌려줘야 함
          }
        }}
      >
        {({ errors, touched, setFieldValue, isSubmitting }) => (
          <Form>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              Field required <span style={{ color: 'red' }}>*</span>
            </div>

            <div className="form-group" style={{ marginBottom: '1vh' }}>
              <label htmlFor="firstName">First Name <span style={{ color: 'red' }}>*</span></label>
              <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
              <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
            </div>

            <div className="form-group" style={{ marginBottom: '1vh' }}>
              <label htmlFor="lastName">Last Name <span style={{ color: 'red' }}>*</span></label>
              <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
              <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
            </div>

            <div className="form-group" style={{ marginBottom: '1vh' }}>
              <label htmlFor="email">Email <span style={{ color: 'red' }}>*</span></label>
              <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
            </div>

            <div className="form-group" style={{ marginBottom: '1vh' }}>
              <label htmlFor="phone">Phone <span style={{ color: 'red' }}>*</span></label>
              <Field name="phone" type="text" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
              <ErrorMessage name="phone" component="div" className="invalid-feedback" />
            </div>

            <div className="form-group" style={{ marginBottom: '2vh' }}>
              <label htmlFor="resume">Resume/CV <span style={{ color: 'red' }}>*</span></label>
              <input
                id="resume"
                name="resume"
                type="file"
                onChange={(event) => {
                  setFieldValue('resume', event.currentTarget.files[0]);
                }}
                className={'form-control' + (errors.resume && touched.resume ? ' is-invalid' : '')}
              />
              <ErrorMessage name="resume" component="div" className="invalid-feedback" />
            </div>

            <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="submit"
                className="btn btn-primary mr-2"
                style={{
                  backgroundColor: "#008B8B",
                  borderColor: "#008B8B",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  minWidth: '180px',
                  position: 'relative'
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ApplicationForm;
