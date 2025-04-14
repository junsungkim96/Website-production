import '../../styles/desktop.css';
import '../../styles/laptop.css';
import '../../styles/tablet.css';
import '../../styles/mobile.css';
import React from 'react';

const Terms = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10vh', color: 'white', textAlign: 'left', fontSize: '0.9rem', lineHeight: '2.2', marginBottom: '2rem' }}>
      <div className = "term-container" style={{textAlign: 'left' }}>
        <h1 style={{ marginBottom: '2rem' }}>Terms of Use</h1>

        <p style={{ marginBottom: '1.5rem', fontSize: '20px' }}>
          Welcome to our website. By accessing or using our service, you agree to be bound by these Terms of Use.
          Please read them carefully. These terms govern your access to and use of our website, products, services,
          and applications (collectively, the "Service"). If you do not agree with these terms, please do not use the Service.
        </p>

        <h3 style={{ marginTop: '2rem' }}>1. Acceptance of Terms</h3>
        <p style={{ marginBottom: '1.5rem', fontSize: '20px' }}>
          By using the Service, you confirm that you are at least 18 years of age, or the age of majority in your jurisdiction,
          and that you are legally able to enter into this agreement. If you are using the Service on behalf of a company or organization,
          you represent that you have the authority to bind such entity to these Terms.
        </p>

        <h3 style={{ marginTop: '2rem' }}>2. Use of the Service</h3>
        <p style={{ marginBottom: '1.5rem', fontSize: '20px' }}>
          You agree to use the Service only for lawful purposes and in a way that does not infringe on the rights of others
          or restrict or inhibit their use of the Service. You may not use the Service to engage in any activity that could damage,
          disable, overburden, or impair any server or network connected to the Service.
        </p>
        <ul style={{ marginBottom: '1.5rem', fontSize: '18px'}}>
          <li>Attempting to gain unauthorized access to the Service or its related systems.</li>
          <li>Using the Service to transmit or post unlawful, harassing, defamatory, or harmful content.</li>
          <li>Interfering with the security or integrity of the Service or data.</li>
        </ul>

        <h3 style={{ marginTop: '2rem' }}>3. Account Responsibility</h3>
        <p style={{ marginBottom: '1.5rem', fontSize: '20px' }}>
          If you create an account with us, you are responsible for maintaining the confidentiality of your login credentials.
          You agree to notify us immediately of any unauthorized use of your account. We are not liable for any loss or damage
          arising from your failure to comply with this responsibility.
        </p>

        <h3 style={{ marginTop: '2rem' }}>4. Intellectual Property</h3>
        <p style={{ marginBottom: '1.5rem', fontSize: '20px' }}>
          All content, design, graphics, logos, and software are the intellectual property of our company or our licensors.
          You are granted a limited, non-exclusive, non-transferable license to access and use the Service for personal
          or internal business use only. You may not reproduce, distribute, modify, or create derivative works without
          express written permission.
        </p>

        <h3 style={{ marginTop: '2rem' }}>5. Third-Party Services</h3>
        <p style={{ marginBottom: '1.5rem', fontSize: '20px' }}>
          Our Service may contain links to third-party websites or services that are not owned or controlled by us.
          We are not responsible for the content, policies, or practices of any third-party services. Accessing them is
          at your own risk and subject to their terms and policies.
        </p>

        <h3 style={{ marginTop: '2rem' }}>6. Termination</h3>
        <p style={{ marginBottom: '1.5rem', fontSize: '20px' }}>
          We reserve the right to suspend or terminate your access to the Service at any time, with or without cause or notice,
          including for any violation of these Terms. Upon termination, your right to use the Service will immediately cease.
        </p>

        <h3 style={{ marginTop: '2rem' }}>7. Limitation of Liability</h3>
        <p style={{ marginBottom: '1.5rem', fontSize: '20px' }}>
          To the maximum extent permitted by law, we are not liable for any direct, indirect, incidental, special, or consequential damages,
          including but not limited to loss of profits, data, or goodwill arising from your use of or inability to use the Service.
        </p>

        <h3 style={{ marginTop: '2rem' }}>8. Indemnification</h3>
        <p style={{ marginBottom: '1.5rem', fontSize: '20px' }}>
          You agree to indemnify and hold harmless our company, its affiliates, officers, and employees from any claims, damages,
          losses, or expenses arising out of your use of the Service, your violation of these Terms, or your infringement of any rights of a third party.
        </p>

        <h3 style={{ marginTop: '2rem' }}>9. Changes to Terms</h3>
        <p style={{ marginBottom: '1.5rem', fontSize: '20px' }}>
          We may update these Terms of Use from time to time to reflect changes in legal, regulatory, or operational requirements.
          Continued use of the Service after any changes indicates your acceptance of the new terms. We encourage you to review
          the Terms periodically.
        </p>

        <h3 style={{ marginTop: '2rem' }}>10. Governing Law</h3>
        <p style={{ marginBottom: '2rem', fontSize: '20px' }}>
          These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is established,
          without regard to its conflict of law principles. Any disputes arising under these Terms shall be subject to the exclusive
          jurisdiction of the courts in that jurisdiction.
        </p>

        <p style={{ marginBottom: '2rem', fontSize: '20px' }}>
          If you have any questions regarding these Terms of Use, please contact us at info@qblackai.com
        </p>
      </div>
    </div>
  );
};

export default Terms;
