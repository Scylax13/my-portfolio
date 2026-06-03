# Abhinav Singh Portfolio

A personal portfolio website built with React and Vite. It highlights Abhinav Singh's profile, skills, projects, experience, resume, and contact details in a polished responsive interface with dark and light theme support.

## Features

- Responsive single-page portfolio layout
- Classy dark and light theme toggle
- Animated hero role text
- About, education, achievements, skills, projects, experience, and contact sections
- Project detail modal interactions
- Resume download link
- Contact form powered by Formspree
- Production build and GitHub Pages deployment support

## Tech Stack

- React 19
- Vite
- React Bootstrap
- Bootstrap 5
- ESLint
- GitHub Pages

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local app:

```text
http://127.0.0.1:5173/my-portfolio/
```

## Available Scripts

Run locally:

```bash
npm run dev
```

Check linting:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Deploy to GitHub Pages:

```bash
npm run deploy
```

## Project Structure

```text
src/
  components/      Portfolio sections and UI components
  context/         Theme context
  hooks/           Custom typing animation hook
  assets/          Profile image and technology assets
```

## Notes

- The resume file is served from `public/Abhinav_resume.pdf`.
- The contact form endpoint is configured in `src/components/Contact.jsx`.
- The site is configured for GitHub Pages deployment through the `homepage` and `gh-pages` settings.
