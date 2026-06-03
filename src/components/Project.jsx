import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
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
      image: 'CX',
      color: '#7fa99b',
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
      image: 'AI',
      color: '#c9a66b',
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
      image: 'ET',
      color: '#b98f7c',
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

  const ProjectCard = ({ project }) => (
    <Col lg={4} md={6} className="mb-4">
      <Card
        className="h-100 project-card glass"
        style={{ cursor: 'pointer' }}
        onClick={() => handleProjectClick(project)}
      >
        <Card.Body className="p-4 d-flex flex-column">
          <div className="text-center mb-3">
            <div className="project-icon mb-3" style={{ color: project.color }}>
              {project.image}
            </div>
            <h5 className="fw-bold mb-2">{project.title}</h5>
            <p className="small">{project.shortDescription}</p>
          </div>

          <div className="mb-3">
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="badge"
                  style={{
                    backgroundColor: `${project.color}1f`,
                    color: project.color,
                    border: `1px solid ${project.color}33`,
                    fontSize: '0.72rem',
                    padding: '0.4rem 0.65rem'
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="badge" style={{ fontSize: '0.72rem', padding: '0.4rem 0.65rem' }}>
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </div>

          <div className="mt-auto" />
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <section id="projects" className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="gradient-text display-4 fw-bold mb-3">Featured Projects</h2>
          <p className="lead">Some of my recent work and personal projects</p>
        </div>

        <Row>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </Row>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          size="lg"
          centered
          className={`${isDarkMode ? 'theme-dark' : 'theme-light'} portfolio-modal`}
        >
          {selectedProject && (
            <>
              <Modal.Header closeButton className="glass">
                <Modal.Title className="d-flex align-items-center">
                  <span className="project-icon me-3" style={{ color: selectedProject.color }}>{selectedProject.image}</span>
                  {selectedProject.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="glass">
                <p className="mb-4" style={{ fontSize: '1.05rem', lineHeight: 1.65 }}>
                  {selectedProject.description}
                </p>

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
                        backgroundColor: `${selectedProject.color}1f`,
                        color: selectedProject.color,
                        border: `1px solid ${selectedProject.color}33`,
                        padding: '0.5rem 0.75rem'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
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
