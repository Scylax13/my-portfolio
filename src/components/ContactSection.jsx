import React, { useState } from 'react';

const SOCIALS = [
  { label: 'github', url: 'https://github.com/Scylax13' },
  { label: 'linkedin', url: 'https://www.linkedin.com/in/abhinav1311/' },
  { label: 'instagram', url: 'https://www.instagram.com/scy_abhinav/' },
  { label: 'email', url: 'mailto:pratapabhi1999@gmail.com' },
];

const EMAIL = 'pratapabhi1999@gmail.com';

const ContactSection = () => {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // 'ok' | 'err'
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch('https://formspree.io/f/xdoqzqzq', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      });
      if (res.ok) { setStatus('ok'); e.target.reset(); }
      else setStatus('err');
    } catch {
      setStatus('err');
    }
    setSending(false);
  };

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="grid-2">
          <div className="reveal">
            <span className="kicker">/ contact</span>
            <h2 className="section-title">Let's build something<br /><span className="gtext">intelligent.</span></h2>
            <p className="section-sub" style={{ marginBottom: '1.8rem' }}>
              Open to senior AI engineering roles and collaborations on agentic systems, RAG, and
              applied LLM products. Drop a message — I reply fast.
            </p>
            <div style={{ marginBottom: '1.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', flexWrap: 'wrap' }}>
                <a href={`mailto:${EMAIL}`} className="gtext mono" style={{ fontSize: '1.1rem' }}>
                  {EMAIL}
                </a>
                <button type="button" className="chip" onClick={copyEmail} aria-label="Copy email address">
                  {copied ? '✓ copied' : '⧉ copy'}
                </button>
              </div>
              <div className="muted mono" style={{ fontSize: '0.9rem', marginTop: '0.4rem' }}>
                +91 79851 02382 · Noida, India
              </div>
            </div>
            <div className="socials">
              {SOCIALS.map((s) => {
                const isMail = s.url.startsWith('mailto:');
                if (isMail) {
                  return (
                    <button type="button" className="social" key={s.label} onClick={copyEmail}>
                      {copied ? '✓ email copied' : '✉ email'}
                    </button>
                  );
                }
                return (
                  <a className="social" key={s.label} href={s.url} target="_blank" rel="noreferrer">
                    ↗ {s.label}
                  </a>
                );
              })}
            </div>
          </div>

          <form className="card spot reveal" data-delay="120" onSubmit={submit}>
            {status === 'ok' && <div className="toast ok">Message sent — I'll be in touch soon.</div>}
            {status === 'err' && <div className="toast err">Something went wrong. Try email instead.</div>}
            <div style={{ display: 'grid', gap: '0.9rem' }}>
              <input className="field" name="name" placeholder="Your name" required />
              <input className="field" type="email" name="email" placeholder="Your email" required />
              <input className="field" name="subject" placeholder="Subject" required />
              <textarea className="field" name="message" rows={5} placeholder="Tell me about your project…" required />
              <button className="btn magnetic" type="submit" disabled={sending} style={{ justifyContent: 'center' }}>
                {sending ? 'sending…' : 'send message →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
