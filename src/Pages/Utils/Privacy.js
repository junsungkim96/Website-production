import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React from 'react';

const Privacy = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10vh', color: 'white', textAlign: 'left', fontSize: '0.9rem', lineHeight: '2.2', marginBottom: '2rem' }}>
      <div className = "term-container" style={{textAlign: 'left' }}>
        <h1 style={{ marginBottom: '2rem' }}>Privacy Policy</h1>

        <h3 style={{ marginTop: '2.5rem' }}>1. Information We Collect</h3>
        <p style={{ fontSize: '20px' }}>
          We may collect personal identification information such as your name, email address, company name, phone number,
          and any other details you voluntarily provide through forms or when contacting us. We also automatically collect
          certain data such as IP address, browser type, device information, and pages visited through cookies or analytics tools.
        </p>

        <h3 style={{ marginTop: '2.5rem' }}>2. How We Use Your Information</h3>
        <p style={{ fontSize: '20px' }}>
          We use the collected information to:
        </p>
        <ul style={{ paddingLeft: '1.5rem', fontSize: '18px' }}>
          <li>Provide and improve our services</li>
          <li>Communicate with you regarding your inquiries or transactions</li>
          <li>Send important updates, service-related messages, and marketing emails (with your consent)</li>
          <li>Analyze usage and optimize website performance</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h3 style={{ marginTop: '2.5rem' }}>3. Sharing Your Information</h3>
        <p style={{ fontSize: '20px' }}>
          We do not sell your personal information. We may share your information with third-party service providers
          that help us operate our website and deliver our services. These third parties are obligated to keep your
          information secure and only use it for the purposes specified by us.
        </p>
        <p style={{ fontSize: '20px' }}>
          We may also disclose information if required by law, to protect our legal rights, or in connection with a merger,
          acquisition, or asset sale.
        </p>

        <h3 style={{ marginTop: '2.5rem' }}>4. Cookies and Tracking Technologies</h3>
        <p style={{ fontSize: '20px' }}>
          Our website uses cookies and similar tracking technologies to enhance your browsing experience, understand user behavior,
          and improve our site. You can manage your cookie preferences in your browser settings.
        </p>

        <h3 style={{ marginTop: '2.5rem' }}>5. Data Retention</h3>
        <p style={{ fontSize: '20px' }}>
          We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy,
          or as required by law. After that, we securely delete or anonymize your data.
        </p>

        <h3 style={{ marginTop: '2.5rem' }}>6. Security</h3>
        <p style={{ fontSize: '20px' }}>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access,
          alteration, disclosure, or destruction. However, no system is 100% secure, so we cannot guarantee absolute security.
        </p>

        <h3 style={{ marginTop: '2.5rem' }}>7. Your Rights</h3>
        <p style={{ fontSize: '20px' }}>
          Depending on your location, you may have rights to access, correct, delete, or restrict the use of your personal information.
          You may also have the right to object to certain processing or withdraw your consent at any time. To exercise these rights,
          please contact us.
        </p>

        <h3 style={{ marginTop: '2.5rem' }}>8. Children's Privacy</h3>
        <p style={{ fontSize: '20px' }}>
          Our services are not intended for individuals under the age of 18. We do not knowingly collect or solicit personal information
          from minors. If we learn that we have collected personal information from a child without parental consent, we will delete it promptly.
        </p>

        <h3 style={{ marginTop: '2.5rem' }}>9. Third-Party Links</h3>
        <p style={{ fontSize: '20px' }}>
          Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of those websites.
          We encourage you to read their privacy policies before providing any personal information.
        </p>

        <h3 style={{ marginTop: '2.5rem' }}>10. Changes to This Policy</h3>
        <p style={{ fontSize: '20px' }}>
          We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or legal requirements.
          When we do, we will revise the “Last Updated” date at the bottom. We encourage you to review this policy periodically.
        </p>

        <h3 style={{ marginTop: '2.5rem' }}>11. Contact Us</h3>
        <p style={{ fontSize: '20px' }}>
          If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at:
          <br />
          <strong>Email:</strong> info@qblack.ai
        </p>

        <p style={{ fontSize: '20px', marginTop: '2.5rem' }}><em>Last Updated: April 2025</em></p>
      </div>
    </div>
  );
};

export default Privacy;
