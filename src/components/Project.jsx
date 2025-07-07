import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import ThemeContext from '../context/ThemeContext';

const Projects = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const projects = [
    {
      title: 'Dialogflow CX IVR Chatbot',
      description: 'Designed and developed a fully functional IVR-based chatbot using Dialogflow CX for efficient call handling and customer service automation.',
      shortDescription: 'IVR-based chatbot for customer service automation',
      technologies: ['Dialogflow CX', 'Python', 'Google Cloud', 'IVR'],
      image: '🤖',
      color: '#4285f4',
      features: [
        'Natural language processing for customer queries',
        'Multi-language support',
        'Integration with CRM systems',
        'Analytics and reporting dashboard'
      ],
      link: '#',
      github: '#'
    },
    {
      title: 'Generative AI Chatbot',
      description: 'Built an advanced chatbot utilizing Azure OpenAI, Langchain, and RAG approach for context-aware responses with Azure deployment.',
      shortDescription: 'AI-powered chatbot with context awareness',
      technologies: ['Azure OpenAI', 'Langchain', 'Python', 'RAG', 'Azure Cloud'],
      image: '🧠',
      color: '#ff6b6b',
      features: [
        'Context-aware conversations using RAG',
        'Integration with Azure OpenAI services',
        'Custom prompt engineering',
        'Scalable cloud deployment'
      ],
      link: '#',
      github: '#'
    },
    {
      title: 'Expense Tracker',
      description: 'Developed a MERN stack Expense Tracker web application for personal finance management, demonstrating CRUD operations, REST API integrations, and user authentication.',
      shortDescription: 'MERN stack expense tracker for personal finance',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: '💸',
      color: '#61dafb',
      features: [
        'Track income and expenses',
        'User authentication and dashboard',
        'RESTful API design',
        'Responsive design'
      ],
      link: '#',
      github: '#'
    }
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Col lg={4} md={6} className="mb-4">
        <Card 
          className="h-100 project-card glass"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            cursor: 'pointer',
            transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
            transition: 'all 0.3s ease'
          }}
          onClick={() => handleProjectClick(project)}
        >
          <Card.Body className="p-4 d-flex flex-column">
            <div className="text-center mb-3">
              <div 
                className="project-icon mb-3"
                style={{
                  fontSize: '3rem',
                  filter: isHovered ? 'drop-shadow(0 0 20px rgba(255,255,255,0.3))' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {project.image}
              </div>
              <h5 className="fw-bold mb-2">{project.title}</h5>
              <p className="text-muted small">{project.shortDescription}</p>
            </div>

            <div className="mb-3">
              <div className="d-flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="badge"
                    style={{
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                      fontSize: '0.7rem',
                      padding: '0.4rem 0.6rem'
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span 
                    className="badge"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      color: isDarkMode ? '#ffffff' : '#1e293b',
                      fontSize: '0.7rem',
                      padding: '0.4rem 0.6rem'
                    }}
                  >
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-auto">
              <div className="d-flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-fill"
                  style={{
                    borderColor: project.color,
                    color: project.color,
                    backgroundColor: 'transparent'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.github, '_blank');
                  }}
                >
                  GitHub
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <section id="projects" className="py-5" style={{ 
      backgroundColor: isDarkMode ? 'rgba(15, 15, 35, 0.3)' : 'rgba(248, 250, 252, 0.5)' 
    }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="gradient-text display-4 fw-bold mb-3">Featured Projects</h2>
          <p className="lead">Some of my recent work and personal projects</p>
        </div>

        <Row>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </Row>

        {/* Project Modal */}
        <Modal 
          show={showModal} 
          onHide={() => setShowModal(false)}
          size="lg"
          centered
        >
          {selectedProject && (
            <>
              <Modal.Header closeButton className="glass">
                <Modal.Title className="d-flex align-items-center">
                  <span className="fs-2 me-3">{selectedProject.image}</span>
                  {selectedProject.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="glass">
                <p className="mb-4">{selectedProject.description}</p>
                
                <h6 className="mb-3">Key Features:</h6>
                <ul className="mb-4">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index} className="mb-2">{feature}</li>
                  ))}
                </ul>

                <h6 className="mb-3">Technologies Used:</h6>
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {selectedProject.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="badge"
                      style={{
                        backgroundColor: `${selectedProject.color}20`,
                        color: selectedProject.color,
                        padding: '0.5rem 0.75rem'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="d-flex gap-3">
                  <Button 
                    className="btn-modern flex-fill"
                    onClick={() => window.open(selectedProject.github, '_blank')}
                  >
                    View on GitHub
                  </Button>
                </div>
              </Modal.Body>
            </>
          )}
        </Modal>
      </Container>
    </section>
  );
};

export default Projects;
