import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import ThemeContext from '../context/ThemeContext';
import linkedinLogo from '../assets/tech/linkedin.svg';
import githubLogo from '../assets/tech/github.svg';
import instagramLogo from '../assets/tech/instagram.png';

const Contact = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);
    // Use Formspree for email sending
    const formUrl = 'https://formspree.io/f/xdoqzqzq'; // Replace with your Formspree endpoint if needed
    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(e.target)
      });
      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setShowError(true);
      }
    } catch {
      setShowError(true);
    }
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'pratapabhi1999@gmail.com',
      link: 'mailto:pratapabhi1999@gmail.com'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '7985102382',
      link: 'tel:7985102382'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Mumbai, India',
      link: '#'
    }
  ];

  const socialLinks = [
    { logo: linkedinLogo, alt: 'LinkedIn', url: 'https://www.linkedin.com/in/abhinav1311/' },
    { logo: githubLogo, alt: 'GitHub', url: 'https://github.com/Scylax13' },
    { logo: instagramLogo, alt: 'Instagram', url: 'https://www.instagram.com/scy_abhinav/' }
  ];

  return (
    <section id="contact" className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="gradient-text display-4 fw-bold mb-3">Get In Touch</h2>
          <p className="lead">Let's discuss your next project or just say hello!</p>
        </div>
        {showSuccess && (
          <Alert variant="success" className="mb-4" dismissible onClose={() => setShowSuccess(false)}>
            Thank you! Your message has been sent successfully. I'll get back to you soon!
          </Alert>
        )}
        {showError && (
          <Alert variant="danger" className="mb-4" dismissible onClose={() => setShowError(false)}>
            Oops! Something went wrong. Please try again later.
          </Alert>
        )}
        <Row className="g-4">
          <Col lg={4} className="mb-4">
            <div className="glass p-4 h-100">
              <h4 className="mb-4">Contact Information</h4>
              {contactInfo.map((info, index) => (
                <div key={index} className="d-flex align-items-center mb-3">
                  <span className="fs-3 me-3">{info.icon}</span>
                  <div>
                    <h6 className="mb-1">{info.title}</h6>
                    <a 
                      href={info.link} 
                      className="text-decoration-none"
                      style={{ color: isDarkMode ? '#60a5fa' : '#3b82f6' }}
                    >
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <h6 className="mb-3">Follow Me</h6>
                <div className="d-flex justify-content-center gap-4">
                  {socialLinks.map((social, idx) => (
                    <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                      <img src={social.logo} alt={social.alt} style={{ width: 32, height: 32, borderRadius: 6 }} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Col>
          <Col lg={8}>
            <div className="glass p-4">
              <Form onSubmit={handleSubmit} method="POST">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-0"
                        style={{ 
                          backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                          color: isDarkMode ? '#ffffff' : '#1e293b'
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-0"
                        style={{ 
                          backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                          color: isDarkMode ? '#ffffff' : '#1e293b'
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="border-0"
                    style={{ 
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      color: isDarkMode ? '#ffffff' : '#1e293b'
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="border-0"
                    style={{ 
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      color: isDarkMode ? '#ffffff' : '#1e293b'
                    }}
                  />
                </Form.Group>
                <Button 
                  type="submit" 
                  className="btn-modern w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact; 