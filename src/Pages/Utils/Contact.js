import React, { useLayoutEffect } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Row } from 'react-bootstrap';

const validationSchema = Yup.object().shape({
  questionType: Yup.string().required('Please select a question type'),
  companyName: Yup.string().required('Company Name is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
  acceptedTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and privacy policy')
    .required('You must accept the terms and privacy policy'),
});

const initialValues = {
  questionType: '',
  companyName: '',
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
  acceptedTerms: false,
};

const Contact = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await fetch('http://qblackai.com/api/contact', {
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
          Contact Us
        </div>
        <br />
        <p className="company-text">
          Big ideas start with a simple hello — whether it’s about our tech, teaming up, or something new.
        </p>
      </div>

      <Row className="justify-content-center">
        <div>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting: isSending }) => (
              <FormikForm>
                <div className="contact d-flex justify-content-end">
                  <p style={{ fontSize: '14px', color: '#ccc' }}>
                    <span className="text-danger">*</span> Required Fields
                  </p>
                </div>

                <Form.Group className="contact mb-4 text-start" controlId="formQuestionType">
                  <Form.Label>
                    Question Type <span className="text-danger">*</span>
                  </Form.Label>
                  <Field as="select" name="questionType" className="form-control">
                    <option value="">Select a question type</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Support">Support</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Careers">Careers</option>
                    <option value="Other">Other</option>
                  </Field>
                  <div className="text-danger"><ErrorMessage name="questionType" /></div>
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

                <Form.Group className="contact mb-4 text-start" controlId="formSubject">
                  <Form.Label>Subject <span className="text-danger">*</span></Form.Label>
                  <Field type="text" name="subject" className="form-control" placeholder="Let us know what you're reaching out about" />
                  <div className="text-danger"><ErrorMessage name="subject" /></div>
                </Form.Group>

                <Form.Group className="contact mb-4 text-start" controlId="formMessage">
                  <Form.Label>Message <span className="text-danger">*</span></Form.Label>
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
                    {isSending ? 'Sending Message...' : 'Send Message'}
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

export default Contact;
