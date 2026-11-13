
import React, { useLayoutEffect, useState } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

const initialValues = {
  companyName: '',
  jobTitle: '',
  firstName: '',
  lastName: '',
  email: '',
  industry: '',
  acceptedTerms: false,
};

const validationSchema = Yup.object({
  companyName: Yup.string().trim().required('Company name is required.'),
  jobTitle: Yup.string().trim().required('Job title is required.'),
  firstName: Yup.string().trim().required('First name is required.'),
  lastName: Yup.string().trim().required('Last name is required.'),
  email: Yup.string().email('Invalid email address.').required('Business email is required.'),
  industry: Yup.string().required('Please select your industry.'),
  acceptedTerms: Yup.boolean().oneOf([true], 'You must agree to the Terms of Use and Privacy Policy.'),
});

const CompanyProfile = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('/api/send-company-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to send the company profile. Please try again.');
      }

      alert('The company profile has been sent to your email.');
      resetForm();
    } catch (error) {
      console.error('Email error:', error);
      alert(error.message || 'Unable to send the company profile. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: '10vh', paddingBottom: '10vh', color: 'white', overflowX: 'hidden', width: '100%', boxSizing: 'border-box' }}>
      <Helmet>
        <title>Company Profile | QblackAI</title>
        <meta name="description" content="Request the QblackAI company profile." />
        <link rel="canonical" href="https://qblackai.com/company-profile" />
      </Helmet>

      <div style={{ marginBottom: '10vh' }}>
        <div className="left-text" style={{ fontSize: '50px' }}>
          Company {isSmallScreen ? <br/> : null} Profile
        </div>
        <br />
        <p className="company-text">
          Fill out the form below to receive our company profile via email.
        </p>
      </div>

      <Row className="justify-content-center">
        <div>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <FormikForm>
                <div className="contact d-flex justify-content-end">
                  <p style={{ fontSize: '14px', color: '#ccc' }}>
                    <span className="text-danger">*</span> Required Fields
                  </p>
                </div>

                <Form.Group className="contact mb-4 text-start" controlId="formCompanyName">
                  <Form.Label>
                    Company Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Field type="text" name="companyName" className="form-control" placeholder="Company name" />
                  <div className="text-danger"><ErrorMessage name="companyName" /></div>
                </Form.Group>

                <Form.Group className="contact mb-4 text-start" controlId="formJobTitle">
                  <Form.Label>
                    Job Title <span className="text-danger">*</span>
                  </Form.Label>
                  <Field type="text" name="jobTitle" className="form-control" placeholder="e.g. CEO, Engineer, Researcher" />
                  <div className="text-danger"><ErrorMessage name="jobTitle" /></div>
                </Form.Group>

                <Form.Group className="contact mb-4 text-start" controlId="formFirstName">
                  <Form.Label>
                    First Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Field type="text" name="firstName" className="form-control" placeholder="First name" />
                  <div className="text-danger"><ErrorMessage name="firstName" /></div>
                </Form.Group>

                <Form.Group className="contact mb-4 text-start" controlId="formLastName">
                  <Form.Label>
                    Last Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Field type="text" name="lastName" className="form-control" placeholder="Last name" />
                  <div className="text-danger"><ErrorMessage name="lastName" /></div>
                </Form.Group>

                <Form.Group className="contact mb-4 text-start" controlId="formEmail">
                  <Form.Label>
                    Business Email <span className="text-danger">*</span>
                  </Form.Label>
                  <Field type="email" name="email" className="form-control" placeholder="name@company.com" />
                  <div className="text-danger"><ErrorMessage name="email" /></div>
                </Form.Group>

                <Form.Group className="contact mb-4 text-start" controlId="formIndustry">
                  <Form.Label>
                    Industry <span className="text-danger">*</span>
                  </Form.Label>
                  <Field as="select" name="industry" className="form-select">
                    <option value="">Select your industry</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Consumer Electronics">Consumer Electronics</option>
                    <option value="Semiconductor">Semiconductor</option>
                    <option value="Camera & Imaging">Camera & Imaging</option>
                    <option value="Robotics">Robotics</option>
                    <option value="Industrial Automation">Industrial Automation</option>
                    <option value="AI & Software">AI & Software</option>
                    <option value="Research & Academia">Research & Academia</option>
                    <option value="Other">Other</option>
                  </Field>
                  <div className="text-danger"><ErrorMessage name="industry" /></div>
                </Form.Group>

                <Form.Group className="contact mb-4 text-start" controlId="formTerms">
                  <div className="form-check">
                    <Field type="checkbox" name="acceptedTerms" className="form-check-input" id="termsCheckbox" />
                    <Form.Label className="form-check-label" htmlFor="termsCheckbox">
                      I agree to the&nbsp;
                      <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>
                        Terms of Use
                      </a>
                      &nbsp;and&nbsp;
                      <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>
                        Privacy Policy
                      </a>
                      &nbsp;of QblackAI
                      <span className="text-danger"> *</span>
                    </Form.Label>
                  </div>
                  <div className="text-danger">
                    <ErrorMessage name="acceptedTerms" />
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button variant="light" type="submit" style={{ backgroundColor: '#008B8B', borderColor: '#008B8B', borderWidth: '1px', borderStyle: 'solid', minWidth: '180px', position: 'relative', color: 'white' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Email'}
                  </Button>
                </div>
              </FormikForm>
            )}
          </Formik>
        </div>
      </Row>
    </div>
  );
};

export default CompanyProfile;
