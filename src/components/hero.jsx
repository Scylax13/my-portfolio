import React, { useContext, useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Typewriter } from 'react-simple-typewriter';
import profilePic from '../assets/abhinav.jpg';
import useTypingEffect from '../hooks/useTypingEffect';
import ThemeContext from '../context/ThemeContext';

const Hero = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);
  
  const typedText = useTypingEffect([
    'Software Engineer 💻',
    'MERN Stack Developer 🌐',
    'Generative AI Enthusiast 🤖',
    'Problem Solver 🧩'
  ], 100);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="d-flex align-items-center position-relative overflow-hidden"
      style={{
        height: '100vh',
        background: isDarkMode 
          ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
        color: isDarkMode ? '#f3f4f6' : '#1e293b',
        minWidth: '100vw',
        width: '100vw',
        margin: 0,
        padding: 0
      }}
    >
      {/* Animated background particles */}
      <div className="position-absolute w-100 h-100" style={{ zIndex: 1 }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="position-absolute"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)',
              borderRadius: '50%',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}
      </div>

      <Container className="text-center position-relative d-flex flex-column justify-content-center align-items-center" style={{ zIndex: 2, height: '100%', paddingBottom: '80px', paddingTop: '110px' }}>
        <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
          <img 
            src={profilePic} 
            alt="Abhinav Singh" 
            className="rounded-circle shadow-lg float mb-4"
            style={{
              width: '180px',
              height: '180px',
              objectFit: 'cover',
              border: `4px solid ${isDarkMode ? '#3b82f6' : '#8b5cf6'}`,
              boxShadow: `0 0 30px ${isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)'}`
            }}
          />
        </div>

        <div className={`slide-in-left ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.3s' }}>
          <h1 className="display-3 fw-bold mb-3">
            Hi, I'm{' '}
            <span className="gradient-text">Abhinav Singh</span>
          </h1>
        </div>

        <div className={`slide-in-right ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.6s' }}>
          <p className="lead fs-4 mb-4" style={{ minHeight: '2rem', color: isDarkMode ? '#e0e7ef' : '#2d3748' }}>
            {typedText}
          </p>
        </div>

        <div className={`fade-in ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.9s' }}>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Button 
              className="btn-modern"
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </Button>
            <Button 
              variant="outline"
              className="btn-modern"
              style={{
                background: 'transparent',
                border: `2px solid ${isDarkMode ? '#3b82f6' : '#8b5cf6'}`,
                color: isDarkMode ? '#3b82f6' : '#8b5cf6'
              }}
              href="/Abhinav_Resume.pdf" 
              download
            >
              Download Resume
            </Button>
          </div>
        </div>

        {/* Add extra space at the bottom so the scroll indicator is never covered */}
        <div style={{ flex: 1 }} />

        {/* Scroll indicator */}
        <div 
          className="position-absolute bottom-0 start-50 translate-middle-x mb-4"
          style={{ animation: 'pulse 2s ease-in-out infinite', zIndex: 3 }}
        >
          <div 
            className="d-flex flex-column align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={() => scrollToSection('about')}
          >
            <span className="mb-2">Scroll Down</span>
            <div 
              style={{
                width: '2px',
                height: '30px',
                background: `linear-gradient(to bottom, ${isDarkMode ? '#3b82f6' : '#8b5cf6'}, transparent)`,
                animation: 'pulse 2s ease-in-out infinite'
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
