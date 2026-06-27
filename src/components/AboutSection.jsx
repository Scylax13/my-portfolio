import React from 'react';
import profile from '../assets/abhinav.jpg';
import { useCountUp } from '../hooks/effects';

const Stat = ({ end, suffix, label, delay }) => {
  const [ref, val] = useCountUp(end, 1400, suffix);
  return (
    <div className="card spot reveal stat b2" data-delay={delay}>
      <div className="num gtext" ref={ref}>{val}</div>
      <div className="lbl">{label}</div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">/ about</span>
          <h2 className="section-title">Engineering intelligence,<br /><span className="gtext">end to end.</span></h2>
        </div>

        <div className="bento">
          <div className="card spot reveal b4" data-delay="0" style={{ display: 'flex', gap: '1.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <img
              src={profile}
              alt="Abhinav Pratap Singh"
              style={{ width: 96, height: 96, borderRadius: 20, objectFit: 'cover', border: '1px solid var(--line-2)', flex: 'none' }}
            />
            <div style={{ flex: '1 1 260px' }}>
              <p className="muted" style={{ margin: 0 }}>
                I turn ambitious AI ideas into reliable, production-grade systems. My focus is
                <strong style={{ color: 'var(--ink)' }}> agentic architectures</strong> — autonomous agents that
                decompose, delegate, and execute work — grounded by
                <strong style={{ color: 'var(--ink)' }}> RAG</strong> and connected through the
                <strong style={{ color: 'var(--ink)' }}> Model Context Protocol</strong>. A full-stack background in
                Python and the MERN stack lets me ship complete products, not just models.
              </p>
            </div>
          </div>

          <Stat end={2.5} suffix="+" label="years building production GenAI" delay="60" />

          <Stat end={3} suffix="" label="enterprise AI systems shipped" delay="0" />
          <Stat end={4} suffix="" label="industry certifications" delay="80" />

          <div className="card spot reveal b2" data-delay="160">
            <div className="mono" style={{ color: 'var(--c4)', fontSize: '0.8rem', marginBottom: '0.6rem' }}>education</div>
            <h4 style={{ fontSize: '1.02rem' }}>MCA — Chandigarh University</h4>
            <div className="muted" style={{ fontSize: '0.86rem' }}>2021–2023 · CGPA 8.0</div>
            <h4 style={{ fontSize: '1.02rem', marginTop: '0.9rem' }}>BCA — Dr. VSICS, Kanpur</h4>
            <div className="muted" style={{ fontSize: '0.86rem' }}>2018–2021 · 71.77%</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
