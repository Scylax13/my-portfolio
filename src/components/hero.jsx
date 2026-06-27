import React, { useEffect, useMemo, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import profilePic from '../assets/abhinav.jpg';
import useTypingEffect from '../hooks/useTypingEffect';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  const roles = useMemo(() => [
    { mark: 'AI', label: 'Senior AI Engineer' },
    { mark: 'GEN', label: 'Generative AI Engineer' },
    { mark: 'AGENT', label: 'Agentic Systems Builder' },
    { mark: 'RAG', label: 'RAG & LLM Specialist' }
  ], []);

  const roleLabels = useMemo(() => roles.map((role) => role.label), [roles]);
  const typedText = useTypingEffect(roleLabels, 100);
  const activeRole = roles.find((role) => role.label.startsWith(typedText) || typedText.startsWith(role.label.slice(0, 3))) || roles[0];

  const particles = useMemo(() => (
    Array.from({ length: 14 }, () => ({
      width: Math.random() * 3 + 2,
      height: Math.random() * 3 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 2
    }))
  ), []);

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
      className="hero-section d-flex align-items-center position-relative overflow-hidden"
      style={{
        height: '100vh',
        minWidth: '100vw',
        width: '100vw',
        margin: 0,
        padding: 0
      }}
    >
      <div className="position-absolute w-100 h-100" style={{ zIndex: 1 }} aria-hidden="true">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="position-absolute subtle-particle"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      <Container className="text-center position-relative d-flex flex-column justify-content-center align-items-center hero-content" style={{ zIndex: 2 }}>
        <div className={`fade-in ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.1s' }}>
          <span className="status-pill mb-4 d-inline-flex">
            <span className="live" /> available for senior AI roles
          </span>
        </div>

        <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
          <img
            src={profilePic}
            alt="Abhinav Singh"
            className="float mb-4 profile-portrait"
          />
        </div>

        <div className={`slide-in-left ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.3s' }}>
          <h1 className="display-3 fw-bold mb-3">
            Hi, I'm{' '}
            <span className="gradient-text">Abhinav Singh</span>
          </h1>
        </div>

        <div className={`slide-in-right ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.6s' }}>
          <p className="lead fs-4 mb-3" style={{ minHeight: '2rem' }}>
            <span className="typed-role">
              <span className="typed-role-mark">{activeRole.mark}</span>
              <span>{typedText}</span>
            </span>
          </p>
        </div>

        <div className={`fade-in ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '0.75s' }}>
          <div className="hero-terminal">
            <div className="bar"><span /><span /><span /></div>
            <div className="row"><span className="c-key">role</span>: <span className="c-val">"Senior AI Engineer"</span>,</div>
            <div className="row"><span className="c-key">focus</span>: <span className="c-val">["multi-agent", "RAG", "MCP", "LangChain"]</span>,</div>
            <div className="row"><span className="c-key">stack</span>: <span className="c-val">["Azure OpenAI", "Python", "microservices"]</span>,</div>
            <div className="row"><span className="c-key">experience</span>: <span className="c-val">"2.5 years in production GenAI"</span></div>
          </div>
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
              className="btn-modern btn-outline-classic"
              href="/my-portfolio/Abhinav_resume.pdf"
              download
            >
              Download Resume
            </Button>
          </div>
        </div>

        <div
          className="position-absolute bottom-0 start-50 translate-middle-x mb-4 scroll-indicator"
          style={{ animation: 'pulse 2.4s ease-in-out infinite', zIndex: 3 }}
        >
          <button
            type="button"
            className="scroll-indicator-button"
            onClick={() => scrollToSection('about')}
          >
            <span className="mb-2">Scroll Down</span>
            <span className="scroll-indicator-line" />
          </button>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
