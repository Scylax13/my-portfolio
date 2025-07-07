import { lazy, Suspense, useState, createContext } from 'react';
import './App.css'
import MyNavbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import ThemeContext from './context/ThemeContext';

// Lazy load components for better performance
const Hero = lazy(() => import('./components/hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Project'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
        <MyNavbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </Suspense>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;