import React, { useState, useContext, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import ThemeContext from '../context/ThemeContext';

const MyNavbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`transition-all duration-300 ${isScrolled ? 'glass' : ''}`}
      style={{
        backgroundColor: isScrolled
          ? (isDarkMode ? 'rgba(18, 24, 21, 0.92)' : 'rgba(251, 248, 242, 0.92)')
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none'
      }}
    >
      <Container>
        <Navbar.Brand
          href="#home"
          className="fw-bold gradient-text"
          style={{ fontSize: '1.35rem', letterSpacing: 0 }}
        >
          Abhinav Singh
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-0"
          style={{
            backgroundColor: isDarkMode ? 'rgba(244,239,228,0.08)' : 'rgba(39,48,43,0.06)'
          }}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {navLinks.map((link, index) => (
              <Nav.Link
                key={index}
                href={link.href}
                className="mx-2 position-relative"
                style={{
                  color: 'var(--text)',
                  transition: 'all 0.25s ease'
                }}
              >
                {link.label}
              </Nav.Link>
            ))}

            <Button
              onClick={toggleTheme}
              variant="outline"
              className="ms-3 btn-modern btn-outline-classic"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                minWidth: '64px',
                height: '38px',
                padding: '0 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isDarkMode ? 'Light' : 'Dark'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
