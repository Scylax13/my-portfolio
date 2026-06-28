import React, { useState } from 'react';

const SOCIALS = [
  { label: 'github', url: 'https://github.com/Scylax13' },
  { label: 'linkedin', url: 'https://www.linkedin.com/in/abhinav1311/' },
  { label: 'instagram', url: 'https://www.instagram.com/scy_abhinav/' },
  { label: 'email', url: 'mailto:pratapabhi1999@gmail.com' },
];

const EMAIL = 'pratapabhi1999@gmail.com';

const ContactSection = () => {
  const [status, setStatus] = useState(null); // 'ok'
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
    const form = e.target;
    const data = new FormData(form);
    data.append('_subject', (data.get('subject') || 'New portfolio enquiry').toString());
    data.append('_template', 'table');
    data.append('_captcha', 'false');
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (res.ok) { setStatus('ok'); form.reset(); }
      else setStatus('err');
    } catch {
      setStatus('err');
    }
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
            {status === 'ok' && (
              <div className="toast ok">Message sent — thanks! I'll get back to you soon.</div>
            )}
            {status === 'err' && (
              <div className="toast err" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
                <span>Couldn't send right now — email me directly:</span>
                <button type="button" className="chip" onClick={copyEmail}>
                  {copied ? '✓ copied' : `⧉ ${EMAIL}`}
                </button>
              </div>
            )}
            <div style={{ display: 'grid', gap: '0.9rem' }}>
              <label className="sr-only" htmlFor="cf-name">Your name</label>
              <input id="cf-name" className="field" name="name" placeholder="Your name" autoComplete="name" required />
              <label className="sr-only" htmlFor="cf-email">Your email</label>
              <input id="cf-email" className="field" type="email" name="email" placeholder="Your email" autoComplete="email" required />
              <label className="sr-only" htmlFor="cf-subject">Subject</label>
              <input id="cf-subject" className="field" name="subject" placeholder="Subject" required />
              <label className="sr-only" htmlFor="cf-message">Message</label>
              <textarea id="cf-message" className="field" name="message" rows={5} placeholder="Tell me about your project…" required />
              <button className="btn magnetic" type="submit" disabled={status === 'sending'} style={{ justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}>
                {status === 'sending' ? 'sending…' : 'send message →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
