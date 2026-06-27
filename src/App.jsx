import './styles/theme.css';
import CursorGlow from './components/CursorGlow';
import Progress from './components/Progress';
import SiteNav from './components/SiteNav';
import HeroSection from './components/HeroSection';
import Marquee from './components/Marquee';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import CertsSection from './components/CertsSection';
import ContactSection from './components/ContactSection';
import SiteFooter from './components/SiteFooter';
import { useGlobalFX } from './hooks/effects';

function App() {
  useGlobalFX();

  return (
    <>
      <h2 className="sr-only">
        Portfolio of Abhinav Pratap Singh, Senior AI Engineer specializing in generative AI,
        multi-agent systems, RAG pipelines, and agentic workflows.
      </h2>
      <CursorGlow />
      <Progress />
      <SiteNav />
      <main>
        <HeroSection />
        <Marquee />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
