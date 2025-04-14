import React, { useLayoutEffect } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Row } from 'react-bootstrap';
import {useLocation} from 'react-router-dom';

const validationSchema = Yup.object().shape({
  productType: Yup.string().required('Please select a product type'),
  quantity: Yup.number().positive('Quantity must be a positive number').integer('Quantity must be an integer').required('Quantity is required'),
  companyName: Yup.string().required('Company Name is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  acceptedTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and privacy policy')
    .required('You must accept the terms and privacy policy'),
});

const initialValues = {
  productType: '',
  quantity: 1,
  companyName: '',
  firstName: '',
  lastName: '',
  email: '',
  message: '',
  acceptedTerms: false,
};

const ContactSales = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const planName = location.state?.planName || '';  //fallback to empty string

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact-sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
  
      alert('Your message has been sent successfully!');
      resetForm();

    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an issue sending your message. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: '10vh', paddingBottom: '10vh', color: 'white', overflowX: 'hidden', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: '10vh' }}>
        <div className="left-text" style={{ fontSize: '50px' }}>
          Let's Make It Happen
        </div>
        <br />
        <p className="company-text">
          Thank you for your interest in our product. We are here to help you take the next step and turn your vision into reality.
        </p>
      </div>

      <Row className="justify-content-center">
        <div>
          <Formik initialValues={{...initialValues, productType: planName}} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting: isSending }) => (
              <FormikForm>
                <div className="contact d-flex justify-content-end">
                  <p style={{ fontSize: '14px', color: '#ccc' }}>
                    <span className="text-danger">*</span> Required Fields
                  </p>
                </div>

                <Form.Group className="contact mb-4 text-start" controlId="formProductType">
                  <Form.Label>
                    Product Type <span className="text-danger">*</span>
                  </Form.Label>
                  <Field as="select" name="productType" className="form-control">
                    <option value="">Select product type</option>
                    <option value="Trial">Trial</option>
                    <option value="Basic">Basic</option>
                    <option value="Pro">Pro</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Education">Education</option>
                  </Field>
                  <div className="text-danger"><ErrorMessage name="productType" /></div>
                </Form.Group>

                <Form.Group className="contact mb-4 text-start" controlId="formQuantity">
                    <Form.Label>
                        Quantity <span className="text-danger">*</span>
                    </Form.Label>
                    <Field 
                        type="number" 
                        name="quantity" 
                        className="form-control" 
                        min="1" // Quantity must be at least 1
                    />
                    <div className="text-danger"><ErrorMessage name="quantity" /></div>
                </Form.Group>

                <Form.Group className="contact mb-4 text-start" controlId="formCompanyName">
                  <Form.Label>Company Name <span className="text-danger">*</span></Form.Label>
                  <Field type="text" name="companyName" className="form-control" placeholder="" />
                  <div className="text-danger"><ErrorMessage name="companyName" /></div>
                </Form.Group>

                <Form.Group className="contact mb-4 text-start" controlId="formFirstName">
                  <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                  <Field type="text" name="firstName" className="form-control" placeholder="" />
                  <div className="text-danger"><ErrorMessage name="firstName" /></div>
                </Form.Group>

                <Form.Group className="contact mb-4 text-start" controlId="formLastName">
                  <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                  <Field type="text" name="lastName" className="form-control" placeholder="" />
                  <div className="text-danger"><ErrorMessage name="lastName" /></div>
                </Form.Group>

                <Form.Group className="contact mb-4 text-start" controlId="formEmail">
                  <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                  <Field type="email" name="email" className="form-control" placeholder="" />
                  <div className="text-danger"><ErrorMessage name="email" /></div>
                </Form.Group>

                <Form.Group className="contact mb-4 text-start" controlId="formMessage">
                  <Form.Label>Message </Form.Label>
                  <Field as="textarea" name="message" rows={5} className="form-control" placeholder="Write your message here..." />
                  <div className="text-danger"><ErrorMessage name="message" /></div>
                </Form.Group>

                <Form.Group className="contact mb-4 text-start" controlId="formTerms">
                  <div className="form-check">
                    <Field
                      type="checkbox"
                      name="acceptedTerms"
                      className="form-check-input"
                      id="termsCheckbox"
                    />
                    <Form.Label className="form-check-label" htmlFor="termsCheckbox">
                      I agree to the&nbsp;
                      <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#fff', textDecoration: 'underline' }}
                      >
                        Terms of Use
                      </a>
                      &nbsp;and&nbsp;
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#fff', textDecoration: 'underline' }}
                      >
                        Privacy Policy
                      </a>
                      &nbsp;of Qblack AI
                      <span className="text-danger"> *</span>
                    </Form.Label>
                  </div>
                  <div className="text-danger">
                    <ErrorMessage name="acceptedTerms" />
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button variant="light" type="submit" 
                  style={{
                  backgroundColor: "#008B8B",
                  borderColor: '#008B8B',
                  borderWidth: "1px",
                  borderStyle: "solid",
                  minWidth: '180px',
                  position: 'relative',
                  color: 'white'}} 
                  disabled={isSending}>
                    {isSending ? 'Sending...' : 'Submit Inquiry'}
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

export default ContactSales;
