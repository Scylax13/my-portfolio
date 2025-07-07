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
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`transition-all duration-300 ${isScrolled ? 'glass' : ''}`}
      style={{
        backgroundColor: isScrolled 
          ? (isDarkMode ? 'rgba(15, 15, 35, 0.9)' : 'rgba(248, 250, 252, 0.9)')
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none'
      }}
    >
      <Container>
        <Navbar.Brand 
          href="#home" 
          className="fw-bold gradient-text"
          style={{ fontSize: '1.5rem' }}
        >
          Abhinav Singh
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className="border-0"
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
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
                  color: isDarkMode ? '#ffffff' : '#1e293b',
                  transition: 'all 0.3s ease'
                }}
              >
                {link.label}
                <span className="position-absolute bottom-0 start-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </Nav.Link>
            ))}
            
            <Button
              onClick={toggleTheme}
              variant="outline"
              className="ms-3 btn-modern"
              style={{
                minWidth: '40px',
                height: '40px',
                borderRadius: '50%',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;