import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import ThemeContext from '../context/ThemeContext';

const Projects = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const projects = [
    {
      title: 'Multi-Agent AI System',
      description: 'Architected and deployed a production-grade multi-agent AI system for an enterprise client, enabling autonomous task decomposition, delegation, and execution across specialized agents — significantly reducing manual intervention in complex workflows.',
      shortDescription: 'Autonomous multi-agent orchestration with MCP',
      technologies: ['Multi-Agent Systems', 'MCP', 'LangChain', 'Python', 'Microservices'],
      image: 'AGT',
      color: '#c9a66b',
      features: [
        'Autonomous task decomposition, delegation, and execution',
        'Model Context Protocol (MCP) as the agent-to-tool communication layer',
        'Scalable, maintainable agentic architecture within a microservices ecosystem',
        'Prompt and context engineering for consistent, low-hallucination output'
      ],
      link: '#',
      github: '#'
    },
    {
      title: 'Generative AI RAG Chatbot',
      description: 'Built a production-ready Generative AI chatbot using Azure OpenAI and LangChain, implementing a full RAG architecture from dataset preparation to cloud deployment on Azure — delivering context-aware, knowledge-grounded conversational AI.',
      shortDescription: 'Knowledge-grounded chatbot with full RAG pipeline',
      technologies: ['Azure OpenAI', 'LangChain', 'RAG', 'Python', 'Azure Cloud'],
      image: 'RAG',
      color: '#b98f7c',
      features: [
        'End-to-end RAG pipeline: ingestion, chunking, embedding, retrieval',
        'Context-aware, document-grounded responses',
        'Custom prompt engineering for reliability',
        'Scalable cloud deployment on Azure'
      ],
      link: '#',
      github: '#'
    },
    {
      title: 'Dialogflow CX IVR Chatbot',
      description: 'Designed and developed an IVR-based conversational chatbot using Dialogflow CX to automate customer interaction flows, reducing dependency on live agents for routine queries.',
      shortDescription: 'Conversational IVR automation on Dialogflow CX',
      technologies: ['Dialogflow CX', 'Google Cloud', 'Python', 'IVR'],
      image: 'CX',
      color: '#7fa99b',
      features: [
        'Natural language understanding for customer queries',
        'Automated multi-turn interaction flows',
        'Reduced live-agent dependency for routine queries',
        'Integration with telephony and backend services'
      ],
      link: '#',
      github: '#'
    }
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const ProjectCard = ({ project, index = 0 }) => (
    <Col lg={4} md={6} className="mb-4">
      <Card
        className="h-100 project-card glass reveal tilt"
        data-reveal-delay={index * 110}
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

          <div className="mt-auto text-center">
            <span className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--accent)' }}>
              › view details
            </span>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <section id="projects" className="py-5">
      <Container>
        <div className="text-center mb-5 reveal">
          <div className="section-tag font-mono">projects<span className="caret" /></div>
          <h2 className="gradient-text display-4 fw-bold mb-3">Featured Projects</h2>
          <p className="lead">Production AI systems I've designed and shipped</p>
        </div>

        <Row>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
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
