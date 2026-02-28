import { useState, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue: #2563eb;
    --blue-hover: #1d4ed8;
    --blue-light: #eff6ff;
    --blue-mid: #bfdbfe;
    --green: #16a34a;
    --green-light: #f0fdf4;
    --green-mid: #bbf7d0;
    --purple: #7c3aed;
    --purple-light: #f5f3ff;
    --orange: #ea580c;
    --orange-light: #fff7ed;
    --text: #0f172a;
    --text-2: #475569;
    --text-3: #94a3b8;
    --bg: #ffffff;
    --bg-soft: #f8fafc;
    --bg-mid: #f1f5f9;
    --border: #e2e8f0;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04);
    --shadow-lg: 0 12px 40px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.06);
    --shadow-xl: 0 24px 64px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06);
    --radius: 12px;
    --radius-sm: 8px;
    --radius-xs: 6px;
    --font: 'Plus Jakarta Sans', sans-serif;
    --font-serif: 'Lora', serif;
    --transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  }

  html { scroll-behavior: smooth; }
  body { font-family: var(--font); background: var(--bg); color: var(--text); line-height: 1.6; -webkit-font-smoothing: antialiased; }

  /* NAVBAR */
  .navbar {
    position: sticky; top: 0; z-index: 100;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
  }
  .navbar-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
    height: 64px; display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo {
    font-size: 20px; font-weight: 800; color: var(--text);
    letter-spacing: -0.03em; cursor: pointer; display: flex; align-items: center; gap: 8px;
  }
  .nav-logo span { color: var(--blue); }
  .nav-logo-badge {
    font-size: 10px; font-weight: 700; background: var(--blue-light);
    color: var(--blue); padding: 2px 8px; border-radius: 20px;
    border: 1px solid var(--blue-mid); letter-spacing: 0.04em;
  }
  .nav-links { display: flex; align-items: center; gap: 4px; }
  .nav-link {
    font-size: 14px; font-weight: 500; color: var(--text-2);
    background: none; border: none; padding: 8px 14px;
    border-radius: var(--radius-xs); cursor: pointer; transition: var(--transition);
  }
  .nav-link:hover { color: var(--text); background: var(--bg-soft); }

  /* HERO */
  .hero {
    padding: 80px 24px 96px; max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 12px; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--blue); background: var(--blue-light);
    border: 1px solid var(--blue-mid); padding: 6px 14px; border-radius: 20px;
    margin-bottom: 24px; animation: fadeUp 0.6s ease both;
  }
  .hero-eyebrow-dot {
    width: 6px; height: 6px; background: var(--blue);
    border-radius: 50%; animation: breathe 2s ease-in-out infinite;
  }
  @keyframes breathe { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
  .hero-heading {
    font-size: clamp(34px,5vw,54px); font-weight: 800;
    letter-spacing: -0.04em; line-height: 1.1; color: var(--text);
    margin-bottom: 20px; animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero-heading em { font-style: italic; font-family: var(--font-serif); color: var(--blue); font-weight: 600; }
  .hero-sub {
    font-size: 17px; color: var(--text-2); line-height: 1.65;
    margin-bottom: 36px; animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; animation: fadeUp 0.6s 0.3s ease both; }
  .hero-stats { display: flex; gap: 28px; margin-top: 40px; animation: fadeUp 0.6s 0.4s ease both; flex-wrap: wrap; }
  .hero-stat { display: flex; flex-direction: column; gap: 2px; }
  .hero-stat-num { font-size: 22px; font-weight: 800; color: var(--text); letter-spacing: -0.03em; }
  .hero-stat-label { font-size: 12px; color: var(--text-3); font-weight: 500; }
  .hero-stat-divider { width: 1px; background: var(--border); align-self: stretch; }

  /* BUTTONS */
  .btn-primary {
    font-family: var(--font); display: inline-flex; align-items: center; gap: 8px;
    font-size: 15px; font-weight: 600; color: #fff; background: var(--blue);
    border: none; padding: 14px 28px; border-radius: var(--radius-sm);
    cursor: pointer; transition: var(--transition); letter-spacing: -0.01em; white-space: nowrap;
  }
  .btn-primary:hover { background: var(--blue-hover); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,99,235,0.3); }
  .btn-secondary {
    font-family: var(--font); display: inline-flex; align-items: center; gap: 8px;
    font-size: 15px; font-weight: 600; color: var(--text); background: var(--bg);
    border: 1.5px solid var(--border); padding: 13px 28px; border-radius: var(--radius-sm);
    cursor: pointer; transition: var(--transition); letter-spacing: -0.01em; white-space: nowrap;
  }
  .btn-secondary:hover { border-color: var(--blue); color: var(--blue); transform: translateY(-2px); box-shadow: var(--shadow-md); }

  /* HERO MOCKUP */
  .hero-mockup-wrap { position: relative; animation: fadeUp 0.7s 0.2s ease both; }
  .hero-mockup-bg {
    position: absolute; inset: -24px;
    background: radial-gradient(ellipse at 60% 40%, #eff6ff 0%, #f8fafc 60%, transparent 100%);
    border-radius: 32px; z-index: 0;
  }
  .hero-mockup {
    position: relative; z-index: 1; background: #fff;
    border-radius: var(--radius); box-shadow: var(--shadow-xl);
    border: 1px solid var(--border); overflow: hidden;
    aspect-ratio: 3/4; max-width: 340px; margin: 0 auto;
  }
  .mockup-header { background: var(--blue); padding: 22px 24px 18px; color: #fff; }
  .mockup-name { font-size: 18px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 3px; }
  .mockup-title { font-size: 10px; opacity: 0.75; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 500; margin-bottom: 10px; }
  .mockup-contact { display: flex; gap: 12px; }
  .mockup-contact-item { font-size: 9px; opacity: 0.7; }
  .mockup-body { padding: 14px 24px; display: flex; flex-direction: column; gap: 12px; }
  .mockup-section-title {
    font-size: 8px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.12em; color: var(--blue); margin-bottom: 6px;
    display: flex; align-items: center; gap: 6px;
  }
  .mockup-section-title::after { content: ''; flex: 1; height: 1px; background: var(--blue-mid); }
  .mockup-line { height: 5px; background: var(--bg-mid); border-radius: 3px; margin-bottom: 4px; }
  .mockup-line.short { width: 55%; }
  .mockup-line.shorter { width: 40%; }
  .mockup-line.full { width: 100%; }
  .mockup-line.mid { width: 75%; }
  .mockup-badge-row { display: flex; gap: 4px; flex-wrap: wrap; }
  .mockup-badge { background: var(--blue-light); color: var(--blue); font-size: 8px; font-weight: 600; padding: 2px 7px; border-radius: 3px; }
  .mockup-badge.green { background: var(--green-light); color: var(--green); }
  .mockup-badge.purple { background: var(--purple-light); color: var(--purple); }
  .floating-card {
    position: absolute; background: #fff; border-radius: 10px;
    box-shadow: var(--shadow-lg); border: 1px solid var(--border);
    padding: 10px 14px; display: flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 600; color: var(--text);
    animation: floatY 3s ease-in-out infinite; white-space: nowrap; z-index: 2;
  }
  @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  .floating-card.top-left { top: 20px; left: -36px; animation-delay: 0.5s; }
  .floating-card.bottom-right { bottom: 28px; right: -32px; animation-delay: 1.2s; }
  .floating-icon { width: 26px; height: 26px; background: var(--blue-light); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; }
  .floating-icon.green { background: var(--green-light); }

  /* SECTION */
  .section { padding: 80px 24px; max-width: 1200px; margin: 0 auto; }
  .section-full { padding: 80px 24px; background: var(--bg-soft); }
  .section-inner { max-width: 1200px; margin: 0 auto; }
  .section-label {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--blue); background: var(--blue-light); padding: 5px 12px; border-radius: 20px; margin-bottom: 20px;
  }
  .section-title { font-size: clamp(26px,4vw,38px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.15; color: var(--text); margin-bottom: 14px; }
  .section-sub { font-size: 16px; color: var(--text-2); line-height: 1.65; max-width: 540px; }

  /* BUILDER */
  .builder-section { background: var(--bg-soft); }
  .builder-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 48px; }

  /* FORM PANEL */
  .form-panel { background: #fff; border-radius: var(--radius); border: 1px solid var(--border); box-shadow: var(--shadow-md); overflow: hidden; }
  .panel-header {
    padding: 18px 24px; border-bottom: 1px solid var(--border);
    background: var(--bg-soft); display: flex; align-items: center; justify-content: space-between;
  }
  .panel-title { font-size: 14px; font-weight: 700; color: var(--text); display: flex; align-items: center; gap: 8px; letter-spacing: -0.01em; }
  .panel-title-icon { width: 28px; height: 28px; background: var(--blue-light); border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 14px; }
  .panel-body { padding: 20px; display: flex; flex-direction: column; gap: 14px; max-height: calc(100vh - 180px); overflow-y: auto; }
  .panel-body::-webkit-scrollbar { width: 4px; }
  .panel-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

  /* TABS */
  .form-tabs { display: flex; gap: 4px; background: var(--bg-soft); padding: 4px; border-radius: var(--radius-sm); border: 1px solid var(--border); }
  .form-tab {
    flex: 1; padding: 7px 8px; font-family: var(--font); font-size: 11px; font-weight: 600;
    color: var(--text-3); background: none; border: none; border-radius: var(--radius-xs);
    cursor: pointer; transition: var(--transition); text-align: center; letter-spacing: 0.02em;
  }
  .form-tab.active { background: #fff; color: var(--blue); box-shadow: var(--shadow-sm); }
  .form-tab:hover:not(.active) { color: var(--text-2); }

  /* FORM FIELDS */
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .form-field { display: flex; flex-direction: column; gap: 5px; }
  .form-label { font-size: 11px; font-weight: 600; color: var(--text-2); letter-spacing: 0.02em; }
  .form-input {
    font-family: var(--font); font-size: 13px; color: var(--text);
    background: var(--bg-soft); border: 1.5px solid var(--border);
    border-radius: var(--radius-xs); padding: 9px 12px; outline: none;
    transition: var(--transition); width: 100%;
  }
  .form-input:focus { border-color: var(--blue); background: #fff; box-shadow: 0 0 0 3px rgba(37,99,235,0.08); }
  .form-input::placeholder { color: var(--text-3); }
  textarea.form-input { resize: none; min-height: 72px; line-height: 1.55; }

  .form-section-title {
    font-size: 11px; font-weight: 700; color: var(--text-2);
    text-transform: uppercase; letter-spacing: 0.08em;
    display: flex; align-items: center; gap: 8px; margin-top: 4px;
  }
  .form-section-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .form-section-icon { font-size: 13px; }

  /* SKILLS */
  .skills-container {
    background: var(--bg-soft); border: 1.5px solid var(--border);
    border-radius: var(--radius-xs); padding: 7px; min-height: 44px;
    display: flex; flex-wrap: wrap; gap: 5px; align-items: flex-start;
    transition: var(--transition); cursor: text;
  }
  .skills-container:focus-within { border-color: var(--blue); background: #fff; box-shadow: 0 0 0 3px rgba(37,99,235,0.08); }
  .skill-tag {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 4px; border: 1px solid;
  }
  .skill-tag.blue { background: var(--blue-light); color: var(--blue); border-color: var(--blue-mid); }
  .skill-tag.green { background: var(--green-light); color: var(--green); border-color: var(--green-mid); }
  .skill-tag.purple { background: var(--purple-light); color: var(--purple); border-color: #ddd6fe; }
  .skill-tag-remove { background: none; border: none; cursor: pointer; font-size: 13px; line-height: 1; padding: 0; opacity: 0.5; transition: opacity 0.15s; display: flex; align-items: center; color: inherit; }
  .skill-tag-remove:hover { opacity: 1; }
  .skills-input { font-family: var(--font); font-size: 13px; color: var(--text); background: none; border: none; outline: none; min-width: 80px; flex: 1; padding: 2px 4px; }
  .skills-input::placeholder { color: var(--text-3); }

  /* ENTRY CARDS */
  .entries-list { display: flex; flex-direction: column; gap: 8px; }
  .entry-card { background: var(--bg-soft); border: 1.5px solid var(--border); border-radius: var(--radius-xs); padding: 12px; transition: var(--transition); }
  .entry-card:hover { border-color: #cbd5e1; }
  .entry-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .entry-card-label { font-size: 10px; font-weight: 700; color: var(--text-2); text-transform: uppercase; letter-spacing: 0.06em; display: flex; align-items: center; gap: 5px; }
  .entry-remove-btn { background: none; border: 1px solid var(--border); color: var(--text-3); font-size: 11px; padding: 3px 8px; border-radius: 4px; cursor: pointer; transition: var(--transition); font-family: var(--font); font-weight: 500; }
  .entry-remove-btn:hover { border-color: #fca5a5; color: #ef4444; background: #fef2f2; }
  .entry-add-btn { display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; padding: 9px; background: none; border: 1.5px dashed var(--border); border-radius: var(--radius-xs); color: var(--text-3); font-family: var(--font); font-size: 12px; font-weight: 500; cursor: pointer; transition: var(--transition); }
  .entry-add-btn:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-light); }

  /* GENERATE BTN */
  .btn-generate {
    font-family: var(--font); display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 13px; background: var(--blue); color: #fff; border: none;
    border-radius: var(--radius-sm); font-size: 14px; font-weight: 700; cursor: pointer;
    transition: var(--transition); letter-spacing: -0.01em; margin-top: 4px;
  }
  .btn-generate:hover { background: var(--blue-hover); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,99,235,0.3); }
  .btn-generate:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  /* PREVIEW PANEL */
  .preview-panel { background: #fff; border-radius: var(--radius); border: 1px solid var(--border); box-shadow: var(--shadow-md); overflow: hidden; display: flex; flex-direction: column; }
  .preview-toolbar { padding: 12px 20px; border-bottom: 1px solid var(--border); background: var(--bg-soft); display: flex; align-items: center; justify-content: space-between; }
  .preview-toolbar-left { display: flex; align-items: center; gap: 6px; }
  .preview-dot { width: 10px; height: 10px; border-radius: 50%; }
  .preview-dot.red { background: #fe5f57; }
  .preview-dot.yellow { background: #febc2e; }
  .preview-dot.green { background: #28c840; }
  .preview-label { font-size: 11px; font-weight: 600; color: var(--text-3); margin-left: 6px; }
  .btn-download { font-family: var(--font); display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 600; color: var(--blue); background: var(--blue-light); border: 1px solid var(--blue-mid); padding: 6px 13px; border-radius: var(--radius-xs); cursor: pointer; transition: var(--transition); }
  .btn-download:hover { background: var(--blue); color: #fff; border-color: var(--blue); }
  .preview-scroll { flex: 1; overflow-y: auto; padding: 16px; background: #e8ecf0; display: flex; justify-content: center; }
  .preview-scroll::-webkit-scrollbar { width: 4px; }
  .preview-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }

  /* A4 RESUME */
  .a4-resume { width: 100%; max-width: 560px; background: #fff; box-shadow: var(--shadow-lg); font-family: 'Georgia', serif; font-size: 10px; line-height: 1.5; }
  .a4-header { background: var(--blue); padding: 24px 28px 20px; color: #fff; }
  .a4-name { font-family: var(--font); font-size: 24px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 3px; line-height: 1.1; }
  .a4-role { font-family: var(--font); font-size: 11px; opacity: 0.8; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 10px; }
  .a4-college { font-family: var(--font); font-size: 11px; opacity: 0.7; margin-bottom: 8px; font-style: italic; }
  .a4-contacts { display: flex; gap: 14px; flex-wrap: wrap; }
  .a4-contact { font-family: var(--font); font-size: 9.5px; opacity: 0.75; display: flex; align-items: center; gap: 3px; }
  .a4-body { padding: 18px 28px; display: flex; flex-direction: column; gap: 14px; }
  .a4-section-title { font-family: var(--font); font-size: 8.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.14em; color: var(--blue); margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
  .a4-section-title::after { content: ''; flex: 1; height: 1.5px; background: var(--blue-mid); }
  .a4-summary { font-family: var(--font); font-size: 10.5px; color: #374151; line-height: 1.7; }
  .a4-entry { margin-bottom: 10px; }
  .a4-entry:last-child { margin-bottom: 0; }
  .a4-entry-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
  .a4-entry-company { font-family: var(--font); font-size: 11px; font-weight: 700; color: #111827; }
  .a4-entry-dates { font-family: var(--font); font-size: 8.5px; color: #9ca3af; font-weight: 500; }
  .a4-entry-role { font-family: var(--font); font-size: 10px; color: var(--blue); font-weight: 600; margin-bottom: 3px; }
  .a4-entry-desc { font-family: var(--font); font-size: 10px; color: #4b5563; line-height: 1.6; }
  .a4-entry-link { font-family: var(--font); font-size: 9.5px; color: var(--blue); margin-top: 2px; }
  .a4-skills { display: flex; flex-wrap: wrap; gap: 5px; }
  .a4-skill { font-family: var(--font); font-size: 9px; font-weight: 700; padding: 3px 9px; border-radius: 3px; letter-spacing: 0.02em; }
  .a4-skill.blue { background: var(--blue-light); color: var(--blue); }
  .a4-skill.green { background: var(--green-light); color: var(--green); }
  .a4-skill.purple { background: var(--purple-light); color: var(--purple); }
  .a4-cert-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px; }
  .a4-cert-name { font-family: var(--font); font-size: 10.5px; font-weight: 600; color: #111827; }
  .a4-cert-issuer { font-family: var(--font); font-size: 9.5px; color: #6b7280; }
  .a4-cert-date { font-family: var(--font); font-size: 8.5px; color: #9ca3af; }
  .a4-activity { font-family: var(--font); font-size: 10px; color: #374151; padding: 4px 0; border-bottom: 1px solid #f3f4f6; }
  .a4-activity:last-child { border-bottom: none; }
  .a4-empty { font-family: var(--font); font-size: 10.5px; color: #9ca3af; font-style: italic; padding: 6px 0; }

  /* TEMPLATES */
  .templates-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 40px; }
  .template-card { background: var(--bg); border-radius: var(--radius); border: 1.5px solid var(--border); overflow: hidden; cursor: pointer; transition: var(--transition); box-shadow: var(--shadow-sm); position: relative; }
  .template-card:hover { transform: translateY(-6px) scale(1.02); box-shadow: var(--shadow-xl); border-color: var(--blue); }
  .template-card:hover .template-overlay { opacity: 1; }
  .template-preview { height: 200px; position: relative; overflow: hidden; }
  .template-overlay { position: absolute; inset: 0; background: rgba(37,99,235,0.08); display: flex; align-items: center; justify-content: center; opacity: 0; transition: var(--transition); }
  .template-overlay-btn { background: var(--blue); color: #fff; font-family: var(--font); font-size: 12px; font-weight: 700; padding: 9px 18px; border-radius: var(--radius-xs); border: none; cursor: pointer; }
  .template-info { padding: 14px; border-top: 1px solid var(--border); }
  .template-name { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 2px; }
  .template-desc { font-size: 11px; color: var(--text-3); }
  .template-badge { position: absolute; top: 8px; right: 8px; font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 3px 7px; border-radius: 3px; background: var(--blue); color: #fff; }
  .template-badge.green { background: var(--green); }

  /* FEATURES */
  .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px; }
  .feature-card { background: #fff; border-radius: var(--radius); border: 1px solid var(--border); padding: 28px 24px; box-shadow: var(--shadow-sm); transition: var(--transition); position: relative; overflow: hidden; }
  .feature-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--blue); transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease; }
  .feature-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: #cbd5e1; }
  .feature-card:hover::before { transform: scaleX(1); }
  .feature-icon { width: 48px; height: 48px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 16px; border: 1px solid; }
  .feature-icon.blue { background: var(--blue-light); border-color: var(--blue-mid); }
  .feature-icon.green { background: var(--green-light); border-color: var(--green-mid); }
  .feature-icon.purple { background: var(--purple-light); border-color: #ddd6fe; }
  .feature-icon.orange { background: var(--orange-light); border-color: #fed7aa; }
  .feature-title { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 8px; letter-spacing: -0.02em; }
  .feature-desc { font-size: 13px; color: var(--text-2); line-height: 1.65; }
  .feature-pill { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 600; padding: 3px 9px; border-radius: 20px; margin-top: 12px; border: 1px solid; }
  .feature-pill.green { background: #f0fdf4; color: var(--green); border-color: var(--green-mid); }
  .feature-pill.blue { background: var(--blue-light); color: var(--blue); border-color: var(--blue-mid); }
  .feature-pill.purple { background: var(--purple-light); color: var(--purple); border-color: #ddd6fe; }
  .feature-pill.orange { background: var(--orange-light); color: var(--orange); border-color: #fed7aa; }

  /* HOW IT WORKS */
  .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 40px; position: relative; }
  .steps-grid::before { content: ''; position: absolute; top: 28px; left: 10%; right: 10%; height: 1px; background: var(--border); z-index: 0; }
  .step-card { background: #fff; border-radius: var(--radius); border: 1px solid var(--border); padding: 24px 20px; text-align: center; box-shadow: var(--shadow-sm); transition: var(--transition); position: relative; z-index: 1; }
  .step-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
  .step-num { width: 44px; height: 44px; background: var(--blue); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; margin: 0 auto 14px; }
  .step-title { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
  .step-desc { font-size: 12px; color: var(--text-2); line-height: 1.6; }

  /* FOOTER */
  footer { border-top: 1px solid var(--border); background: var(--bg-soft); }
  .footer-inner { max-width: 1200px; margin: 0 auto; padding: 36px 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
  .footer-logo { font-size: 17px; font-weight: 800; color: var(--text); letter-spacing: -0.03em; }
  .footer-logo span { color: var(--blue); }
  .footer-tagline { font-size: 11px; color: var(--text-3); margin-top: 3px; }
  .footer-links { display: flex; gap: 20px; list-style: none; flex-wrap: wrap; }
  .footer-link { font-size: 12px; color: var(--text-2); cursor: pointer; transition: color 0.15s; font-weight: 500; }
  .footer-link:hover { color: var(--blue); }
  .footer-copy { font-size: 11px; color: var(--text-3); margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); text-align: center; }

  /* ANIMATIONS */
  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  .fade-up { opacity: 0; animation: fadeUp 0.7s ease forwards; }
  .fade-up-1 { animation-delay: 0.1s; }
  .fade-up-2 { animation-delay: 0.2s; }
  .fade-up-3 { animation-delay: 0.3s; }
  .fade-up-4 { animation-delay: 0.4s; }

  /* RESPONSIVE */
  @media (max-width: 960px) {
    .hero { grid-template-columns: 1fr; }
    .hero-mockup-wrap { display: none; }
    .builder-grid { grid-template-columns: 1fr; }
    .templates-grid { grid-template-columns: repeat(2,1fr); }
    .features-grid { grid-template-columns: 1fr 1fr; }
    .steps-grid { grid-template-columns: 1fr 1fr; }
    .steps-grid::before { display: none; }
  }
  @media (max-width: 600px) {
    .features-grid { grid-template-columns: 1fr; }
    .templates-grid { grid-template-columns: 1fr 1fr; }
    .hero { padding: 48px 20px 64px; }
    .section { padding: 60px 20px; }
  }
`;

/* ─── SKILLS INPUT ─────────────────────────── */
function SkillsInput({ skills, setSkills, color = "blue", placeholder = "Type skill, press Enter..." }) {
  const [input, setInput] = useState("");
  const ref = useRef();
  const add = (v) => { const t = v.trim(); if (t && !skills.includes(t)) setSkills([...skills, t]); setInput(""); };
  return (
    <div className="skills-container" onClick={() => ref.current?.focus()}>
      {skills.map((s, i) => (
        <span key={i} className={`skill-tag ${color}`}>{s}
          <button className="skill-tag-remove" onClick={() => setSkills(skills.filter((_,j)=>j!==i))}>×</button>
        </span>
      ))}
      <input ref={ref} className="skills-input" value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if(e.key==="Enter"||e.key===","){e.preventDefault();add(input);} if(e.key==="Backspace"&&!input&&skills.length>0) setSkills(skills.slice(0,-1)); }}
        onBlur={() => input && add(input)}
        placeholder={skills.length===0 ? placeholder : "Add more..."} />
    </div>
  );
}

/* ─── ENTRY CARD ─────────────────────────── */
function EntryCard({ label, icon, index, onRemove, children }) {
  return (
    <div className="entry-card">
      <div className="entry-card-header">
        <span className="entry-card-label"><span>{icon}</span> {label} {index + 1}</span>
        <button className="entry-remove-btn" onClick={onRemove}>Remove</button>
      </div>
      {children}
    </div>
  );
}

/* ─── TEMPLATE MINI PREVIEWS ─────────────── */
function TplPreview({ type }) {
  const line = (w, color="#e2e8f0", h=5) => <div style={{height:h,background:color,borderRadius:3,width:w,marginBottom:4}} />;
  if (type === "classic") return (
    <div style={{background:"#fff",padding:12,height:"100%"}}>
      <div style={{background:"#2563eb",height:44,borderRadius:4,marginBottom:10}} />
      {[["90%"],["70%"],["80%"],["55%"],["90%"],["65%"],["75%"]].map(([w],i)=><div key={i}>{i%3===0&&i>0&&<div style={{height:2,background:"#bfdbfe",width:"35%",borderRadius:1,marginBottom:6,marginTop:4}}/>}{line(w)}</div>)}
      <div style={{display:"flex",gap:4,marginTop:8,flexWrap:"wrap"}}>
        {["React","Python","Figma"].map(s=><div key={s} style={{height:14,background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:3,padding:"0 6px",fontSize:7,color:"#2563eb",fontWeight:700,display:"flex",alignItems:"center"}}>{s}</div>)}
      </div>
    </div>
  );
  if (type === "modern") return (
    <div style={{background:"#fff",height:"100%",display:"flex"}}>
      <div style={{width:"38%",background:"#1e3a5f",padding:"10px 8px"}}>
        <div style={{width:32,height:32,background:"rgba(255,255,255,0.25)",borderRadius:"50%",margin:"0 auto 8px"}} />
        {[80,60,90,55,70].map((w,i)=><div key={i} style={{height:4,background:"rgba(255,255,255,0.3)",borderRadius:2,width:`${w}%`,marginBottom:4}}/>)}
        <div style={{marginTop:8}}>{[0,1,2].map(i=><div key={i} style={{height:10,background:"rgba(255,255,255,0.15)",borderRadius:2,marginBottom:3}}/>)}</div>
      </div>
      <div style={{flex:1,padding:"10px 8px"}}>
        {[90,70,80,90,55,75,85].map((w,i)=><div key={i} style={{height:4,background:"#e2e8f0",borderRadius:2,width:`${w}%`,marginBottom:4}}/>)}
      </div>
    </div>
  );
  if (type === "minimal") return (
    <div style={{background:"#fff",padding:12,height:"100%"}}>
      <div style={{height:16,background:"#111",borderRadius:3,width:"55%",marginBottom:4}} />
      <div style={{height:6,background:"#e2e8f0",borderRadius:2,width:"38%",marginBottom:6}} />
      <div style={{height:1,background:"#111",marginBottom:8}} />
      {[90,70,80,55,90,65,80].map((w,i)=><div key={i} style={{height:4,background:"#e2e8f0",borderRadius:2,width:`${w}%`,marginBottom:4}}/>)}
    </div>
  );
  if (type === "internship") return (
    <div style={{background:"#f0fdf4",padding:12,height:"100%",borderTop:"4px solid #16a34a"}}>
      <div style={{height:14,background:"#16a34a",borderRadius:3,width:"52%",marginBottom:4}} />
      <div style={{height:6,background:"#bbf7d0",borderRadius:2,width:"36%",marginBottom:10}} />
      {[90,70,80,55,90,65].map((w,i)=><div key={i} style={{height:4,background:"#dcfce7",borderRadius:2,width:`${w}%`,marginBottom:4}}/>)}
      <div style={{display:"flex",gap:4,marginTop:8}}>
        {[0,1,2].map(i=><div key={i} style={{height:13,width:32,background:"#bbf7d0",borderRadius:3}}/>)}
      </div>
    </div>
  );
  return null;
}

/* ─── A4 LIVE PREVIEW ─────────────────────── */
function A4Preview({ data }) {
  const { name, email, phone, college, branch, year, summary, skills, techSkills, projects, certifications, activities, experience } = data;
  const hasContent = name || email || college || summary || skills.length || projects.some(p=>p.name) || certifications.some(c=>c.name) || activities.some(a=>a.name);
  return (
    <div className="a4-resume">
      <div className="a4-header">
        <div className="a4-name">{name || "Your Full Name"}</div>
        {(branch || year) && <div className="a4-role">{[branch, year && `${year} Year`].filter(Boolean).join(" · ")}</div>}
        {college && <div className="a4-college">🎓 {college}</div>}
        <div className="a4-contacts">
          {email && <span className="a4-contact">✉ {email}</span>}
          {phone && <span className="a4-contact">📞 {phone}</span>}
        </div>
      </div>
      <div className="a4-body">
        {summary && (
          <div className="a4-section">
            <div className="a4-section-title">About Me</div>
            <div className="a4-summary">{summary}</div>
          </div>
        )}
        {experience.some(e=>e.company||e.role) && (
          <div className="a4-section">
            <div className="a4-section-title">Experience</div>
            {experience.filter(e=>e.company||e.role).map((e,i)=>(
              <div key={i} className="a4-entry">
                <div className="a4-entry-head">
                  <div className="a4-entry-company">{e.company}</div>
                  <div className="a4-entry-dates">{e.startDate}{e.endDate?` — ${e.endDate}`:""}</div>
                </div>
                {e.role && <div className="a4-entry-role">{e.role}</div>}
                {e.description && <div className="a4-entry-desc">{e.description}</div>}
              </div>
            ))}
          </div>
        )}
        {projects.some(p=>p.name) && (
          <div className="a4-section">
            <div className="a4-section-title">Projects</div>
            {projects.filter(p=>p.name).map((p,i)=>(
              <div key={i} className="a4-entry">
                <div className="a4-entry-head">
                  <div className="a4-entry-company">{p.name}</div>
                  <div className="a4-entry-dates">{p.date}</div>
                </div>
                {p.techStack && <div className="a4-entry-role">{p.techStack}</div>}
                {p.description && <div className="a4-entry-desc">{p.description}</div>}
                {p.link && <div className="a4-entry-link">🔗 {p.link}</div>}
              </div>
            ))}
          </div>
        )}
        {certifications.some(c=>c.name) && (
          <div className="a4-section">
            <div className="a4-section-title">Certifications</div>
            {certifications.filter(c=>c.name).map((c,i)=>(
              <div key={i} className="a4-cert-row">
                <div>
                  <div className="a4-cert-name">{c.name}</div>
                  {c.issuer && <div className="a4-cert-issuer">{c.issuer}</div>}
                </div>
                <div className="a4-cert-date">{c.date}</div>
              </div>
            ))}
          </div>
        )}
        {(skills.length > 0 || techSkills.length > 0) && (
          <div className="a4-section">
            <div className="a4-section-title">Skills</div>
            <div className="a4-skills">
              {skills.map((s,i)=><span key={i} className="a4-skill blue">{s}</span>)}
              {techSkills.map((s,i)=><span key={i} className="a4-skill green">{s}</span>)}
            </div>
          </div>
        )}
        {activities.some(a=>a.name) && (
          <div className="a4-section">
            <div className="a4-section-title">Clubs & Activities</div>
            {activities.filter(a=>a.name).map((a,i)=>(
              <div key={i} className="a4-activity"><strong>{a.name}</strong>{a.role ? ` · ${a.role}` : ""}{a.description ? ` — ${a.description}` : ""}</div>
            ))}
          </div>
        )}
        {!hasContent && <div className="a4-empty">Fill in the form to see your resume appear here in real time...</div>}
      </div>
    </div>
  );
}

/* ─── BUILDER ─────────────────────────────── */
function BuilderSection() {
  const [tab, setTab] = useState(0);
  const [isGen, setIsGen] = useState(false);
  const [data, setData] = useState({
    name:"", email:"", phone:"", college:"", branch:"", year:"", summary:"",
    skills:[], techSkills:[],
    experience:[{company:"",role:"",startDate:"",endDate:"",description:""}],
    projects:[{name:"",techStack:"",description:"",link:"",date:""}],
    certifications:[{name:"",issuer:"",date:""}],
    activities:[{name:"",role:"",description:""}],
  });

  const upd = (k,v) => setData(p=>({...p,[k]:v}));
  const addItem = (k, blank) => setData(p=>({...p,[k]:[...p[k],blank]}));
  const removeItem = (k,i) => setData(p=>({...p,[k]:p[k].filter((_,j)=>j!==i)}));
  const updItem = (k,i,v) => setData(p=>({...p,[k]:p[k].map((x,j)=>j===i?v:x)}));

  const tabs = ["👤 Personal", "💼 Experience", "🚀 Projects", "🏆 Certs", "🎯 Skills & Clubs"];

  const handleGenerate = async () => {
    setIsGen(true);
    await new Promise(r=>setTimeout(r,1600));
    setIsGen(false);
  };

  return (
    <div className="builder-section" id="builder">
      <div className="section-inner" style={{padding:"80px 24px"}}>
        <div className="fade-up" style={{textAlign:"center"}}>
          <div className="section-label" style={{margin:"0 auto 16px"}}>⚡ Live Builder</div>
          <div className="section-title" style={{textAlign:"center"}}>Build Your Resume, Live</div>
          <div className="section-sub" style={{margin:"0 auto",textAlign:"center"}}>Fill in your details — your resume updates in real time on the right.</div>
        </div>
        <div className="builder-grid">
          {/* FORM */}
          <div className="form-panel fade-up fade-up-1">
            <div className="panel-header">
              <div className="panel-title"><div className="panel-title-icon">🎓</div>Student Resume Builder</div>
              <span style={{fontSize:10,color:"var(--text-3)",fontWeight:500}}>All fields optional</span>
            </div>
            <div className="panel-body">
              {/* Tabs */}
              <div className="form-tabs">
                {tabs.map((t,i)=>(
                  <button key={i} className={`form-tab${tab===i?" active":""}`} onClick={()=>setTab(i)}>{t}</button>
                ))}
              </div>

              {/* TAB 0: PERSONAL */}
              {tab===0 && <>
                <div className="form-section-title"><span className="form-section-icon">👤</span> Personal Info</div>
                <div className="form-field"><label className="form-label">Full Name</label><input className="form-input" placeholder="Rahul Sharma" value={data.name} onChange={e=>upd("name",e.target.value)}/></div>
                <div className="form-row">
                  <div className="form-field"><label className="form-label">Email</label><input className="form-input" placeholder="rahul@gmail.com" value={data.email} onChange={e=>upd("email",e.target.value)}/></div>
                  <div className="form-field"><label className="form-label">Phone</label><input className="form-input" placeholder="+91 9876543210" value={data.phone} onChange={e=>upd("phone",e.target.value)}/></div>
                </div>
                <div className="form-section-title" style={{marginTop:4}}><span className="form-section-icon">🎓</span> College Info</div>
                <div className="form-field"><label className="form-label">College / University</label><input className="form-input" placeholder="Anna University, Chennai" value={data.college} onChange={e=>upd("college",e.target.value)}/></div>
                <div className="form-row">
                  <div className="form-field"><label className="form-label">Branch / Department</label><input className="form-input" placeholder="B.Tech CSE" value={data.branch} onChange={e=>upd("branch",e.target.value)}/></div>
                  <div className="form-field"><label className="form-label">Current Year</label>
                    <select className="form-input" value={data.year} onChange={e=>upd("year",e.target.value)}>
                      <option value="">Select year</option>
                      <option>1st</option><option>2nd</option><option>3rd</option><option>4th</option><option>Final</option>
                    </select>
                  </div>
                </div>
                <div className="form-section-title" style={{marginTop:4}}><span className="form-section-icon">📝</span> About Me</div>
                <div className="form-field"><label className="form-label">Summary <span style={{color:"var(--text-3)",fontWeight:400}}>(2–3 lines)</span></label>
                  <textarea className="form-input" rows={3} placeholder="Passionate CS student with interest in web development and machine learning. Looking for internship opportunities..." value={data.summary} onChange={e=>upd("summary",e.target.value)}/>
                </div>
              </>}

              {/* TAB 1: EXPERIENCE */}
              {tab===1 && <>
                <div className="form-section-title"><span className="form-section-icon">💼</span> Internships / Work Experience</div>
                <div className="entries-list">
                  {data.experience.map((exp,i)=>(
                    <EntryCard key={i} label="Experience" icon="💼" index={i} onRemove={()=>removeItem("experience",i)}>
                      <div className="form-row">
                        <div className="form-field"><label className="form-label">Company</label><input className="form-input" placeholder="Google, TCS, Startup..." value={exp.company} onChange={e=>updItem("experience",i,{...exp,company:e.target.value})}/></div>
                        <div className="form-field"><label className="form-label">Role</label><input className="form-input" placeholder="SWE Intern" value={exp.role} onChange={e=>updItem("experience",i,{...exp,role:e.target.value})}/></div>
                      </div>
                      <div className="form-row" style={{marginTop:8}}>
                        <div className="form-field"><label className="form-label">Start</label><input className="form-input" placeholder="May 2024" value={exp.startDate} onChange={e=>updItem("experience",i,{...exp,startDate:e.target.value})}/></div>
                        <div className="form-field"><label className="form-label">End</label><input className="form-input" placeholder="Jul 2024" value={exp.endDate} onChange={e=>updItem("experience",i,{...exp,endDate:e.target.value})}/></div>
                      </div>
                      <div className="form-field" style={{marginTop:8}}><label className="form-label">What you did</label><textarea className="form-input" rows={2} placeholder="Built REST APIs, worked on React dashboard..." value={exp.description} onChange={e=>updItem("experience",i,{...exp,description:e.target.value})}/></div>
                    </EntryCard>
                  ))}
                </div>
                <button className="entry-add-btn" onClick={()=>addItem("experience",{company:"",role:"",startDate:"",endDate:"",description:""})}>+ Add Internship / Job</button>
              </>}

              {/* TAB 2: PROJECTS */}
              {tab===2 && <>
                <div className="form-section-title"><span className="form-section-icon">🚀</span> Projects</div>
                <div className="entries-list">
                  {data.projects.map((p,i)=>(
                    <EntryCard key={i} label="Project" icon="🚀" index={i} onRemove={()=>removeItem("projects",i)}>
                      <div className="form-field"><label className="form-label">Project Name</label><input className="form-input" placeholder="AI Chatbot, E-Commerce App..." value={p.name} onChange={e=>updItem("projects",i,{...p,name:e.target.value})}/></div>
                      <div className="form-row" style={{marginTop:8}}>
                        <div className="form-field"><label className="form-label">Tech Stack</label><input className="form-input" placeholder="React, Node, MongoDB" value={p.techStack} onChange={e=>updItem("projects",i,{...p,techStack:e.target.value})}/></div>
                        <div className="form-field"><label className="form-label">Date</label><input className="form-input" placeholder="Jan 2024" value={p.date} onChange={e=>updItem("projects",i,{...p,date:e.target.value})}/></div>
                      </div>
                      <div className="form-field" style={{marginTop:8}}><label className="form-label">Description</label><textarea className="form-input" rows={2} placeholder="What does it do? What problem does it solve?" value={p.description} onChange={e=>updItem("projects",i,{...p,description:e.target.value})}/></div>
                      <div className="form-field" style={{marginTop:8}}><label className="form-label">GitHub / Live Link</label><input className="form-input" placeholder="github.com/yourname/project" value={p.link} onChange={e=>updItem("projects",i,{...p,link:e.target.value})}/></div>
                    </EntryCard>
                  ))}
                </div>
                <button className="entry-add-btn" onClick={()=>addItem("projects",{name:"",techStack:"",description:"",link:"",date:""})}>+ Add Project</button>
              </>}

              {/* TAB 3: CERTS */}
              {tab===3 && <>
                <div className="form-section-title"><span className="form-section-icon">🏆</span> Certifications</div>
                <div className="entries-list">
                  {data.certifications.map((c,i)=>(
                    <EntryCard key={i} label="Certificate" icon="🏆" index={i} onRemove={()=>removeItem("certifications",i)}>
                      <div className="form-field"><label className="form-label">Certificate Name</label><input className="form-input" placeholder="AWS Cloud Practitioner, Meta React..." value={c.name} onChange={e=>updItem("certifications",i,{...c,name:e.target.value})}/></div>
                      <div className="form-row" style={{marginTop:8}}>
                        <div className="form-field"><label className="form-label">Issued By</label><input className="form-input" placeholder="Coursera, NPTEL, Udemy..." value={c.issuer} onChange={e=>updItem("certifications",i,{...c,issuer:e.target.value})}/></div>
                        <div className="form-field"><label className="form-label">Date</label><input className="form-input" placeholder="Oct 2023" value={c.date} onChange={e=>updItem("certifications",i,{...c,date:e.target.value})}/></div>
                      </div>
                    </EntryCard>
                  ))}
                </div>
                <button className="entry-add-btn" onClick={()=>addItem("certifications",{name:"",issuer:"",date:""})}>+ Add Certification</button>
              </>}

              {/* TAB 4: SKILLS & CLUBS */}
              {tab===4 && <>
                <div className="form-section-title"><span className="form-section-icon">💻</span> Technical Skills</div>
                <div className="form-field">
                  <label className="form-label">Tech / Languages <span style={{color:"var(--text-3)",fontWeight:400}}>(press Enter)</span></label>
                  <SkillsInput skills={data.techSkills} setSkills={v=>upd("techSkills",v)} color="green" placeholder="Python, React, SQL..."/>
                </div>
                <div className="form-section-title" style={{marginTop:4}}><span className="form-section-icon">🌟</span> Soft Skills</div>
                <div className="form-field">
                  <label className="form-label">Skills <span style={{color:"var(--text-3)",fontWeight:400}}>(press Enter)</span></label>
                  <SkillsInput skills={data.skills} setSkills={v=>upd("skills",v)} color="blue" placeholder="Leadership, Communication..."/>
                </div>
                <div className="form-section-title" style={{marginTop:4}}><span className="form-section-icon">🎯</span> Clubs & Activities</div>
                <div className="entries-list">
                  {data.activities.map((a,i)=>(
                    <EntryCard key={i} label="Activity" icon="🎯" index={i} onRemove={()=>removeItem("activities",i)}>
                      <div className="form-row">
                        <div className="form-field"><label className="form-label">Club / Activity</label><input className="form-input" placeholder="Coding Club, NSS, Sports..." value={a.name} onChange={e=>updItem("activities",i,{...a,name:e.target.value})}/></div>
                        <div className="form-field"><label className="form-label">Your Role</label><input className="form-input" placeholder="President, Volunteer..." value={a.role} onChange={e=>updItem("activities",i,{...a,role:e.target.value})}/></div>
                      </div>
                      <div className="form-field" style={{marginTop:8}}><label className="form-label">Brief Description</label><input className="form-input" placeholder="Organized hackathon for 200+ students" value={a.description} onChange={e=>updItem("activities",i,{...a,description:e.target.value})}/></div>
                    </EntryCard>
                  ))}
                </div>
                <button className="entry-add-btn" onClick={()=>addItem("activities",{name:"",role:"",description:""})}>+ Add Club / Activity</button>
              </>}

              <button className="btn-generate" onClick={handleGenerate} disabled={isGen}>
                {isGen ? <><span style={{animation:"breathe 0.8s ease-in-out infinite"}}>◈</span> Generating...</> : <><span>✦</span> Generate Resume</>}
              </button>
            </div>
          </div>

          {/* PREVIEW */}
          <div className="preview-panel fade-up fade-up-2">
            <div className="preview-toolbar">
              <div className="preview-toolbar-left">
                <div className="preview-dot red"/><div className="preview-dot yellow"/><div className="preview-dot green"/>
                <span className="preview-label">student-resume.pdf</span>
              </div>
              <button className="btn-download" onClick={()=>window.print()}>↓ Download PDF</button>
            </div>
            <div className="preview-scroll"><A4Preview data={data}/></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN APP ────────────────────────────── */
export default function App() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"});

  const templates = [
    {id:"classic",name:"Classic",desc:"ATS-friendly, clean",badge:"Popular",badgeColor:""},
    {id:"modern",name:"Modern",desc:"Sidebar layout",badge:"New",badgeColor:""},
    {id:"minimal",name:"Minimal",desc:"Typographic & elegant",badge:null},
    {id:"internship",name:"Internship",desc:"Perfect for freshers",badge:"Student",badgeColor:"green"},
  ];

  const features = [
    {icon:"🚀",color:"blue",title:"Project Showcase",desc:"Dedicated section to highlight your best college projects with tech stack, GitHub links and descriptions.",pill:"Stand Out",pillColor:"blue"},
    {icon:"🏆",color:"green",title:"Certifications",desc:"Add all your NPTEL, Coursera, AWS and other certifications. Recruiters love verified proof of skills.",pill:"Verified Skills",pillColor:"green"},
    {icon:"🎯",color:"purple",title:"Clubs & Activities",desc:"Showcase your leadership in college clubs, NSS, sports teams and events. Personality matters!",pill:"Show Personality",pillColor:"purple"},
    {icon:"⚡",color:"orange",title:"ATS Optimized",desc:"Clean structure and proper keywords ensure your resume passes automated screening systems every time.",pill:"98% Pass Rate",pillColor:"orange"},
    {icon:"📄",color:"blue",title:"PDF Export",desc:"One-click, pixel-perfect PDF download. Ready to attach to any internship or placement application.",pill:"Instant Export",pillColor:"blue"},
    {icon:"✦",color:"green",title:"AI Suggestions",desc:"Get AI-powered content suggestions for your summary, project descriptions and bullet points.",pill:"AI Powered",pillColor:"green"},
  ];

  const steps = [
    {num:"1",title:"Fill Your Details",desc:"Add your personal info, college, skills and projects"},
    {num:"2",title:"Pick a Template",desc:"Choose from 4 professional student-friendly designs"},
    {num:"3",title:"Generate with AI",desc:"AI polishes your descriptions and summary"},
    {num:"4",title:"Download PDF",desc:"One click — ready for internships & placements"},
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:styles}}/>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="nav-logo" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>
            Intern<span>Ready</span>
            <span className="nav-logo-badge">For Students</span>
          </div>
          <div className="nav-links">
            <button className="nav-link" onClick={()=>scrollTo("builder")}>Builder</button>
            <button className="nav-link" onClick={()=>scrollTo("templates")}>Templates</button>
            <button className="nav-link" onClick={()=>scrollTo("features")}>Features</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section>
        <div className="hero">
          <div>
            <div className="hero-eyebrow"><div className="hero-eyebrow-dot"/>🎓 Made for College Students</div>
            <h1 className="hero-heading">Land Your <em>Dream Internship</em> with a Perfect Resume</h1>
            <p className="hero-sub">Built specifically for students — showcase your projects, certifications, clubs and skills. ATS-optimized and recruiter-ready in minutes.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={()=>scrollTo("builder")}>✦ Build My Resume</button>
              <button className="btn-secondary" onClick={()=>scrollTo("templates")}>View Templates</button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">10K+</span><span className="hero-stat-label">Students helped</span></div>
              <div className="hero-stat-divider"/>
              <div className="hero-stat"><span className="hero-stat-num">98%</span><span className="hero-stat-label">ATS pass rate</span></div>
              <div className="hero-stat-divider"/>
              <div className="hero-stat"><span className="hero-stat-num">Free</span><span className="hero-stat-label">Always free</span></div>
            </div>
          </div>
          {/* Hero Mockup */}
          <div className="hero-mockup-wrap">
            <div className="hero-mockup-bg"/>
            <div className="floating-card top-left"><div className="floating-icon green">🚀</div>Project Added!</div>
            <div className="hero-mockup">
              <div className="mockup-header">
                <div className="mockup-name">Priya Nair</div>
                <div className="mockup-title">B.Tech CSE · 3rd Year</div>
                <div className="mockup-contact">
                  <span className="mockup-contact-item">priya@gmail.com</span>
                  <span className="mockup-contact-item">Chennai, TN</span>
                </div>
              </div>
              <div className="mockup-body">
                <div><div className="mockup-section-title">Projects</div>
                  <div className="mockup-line shorter"/><div className="mockup-line full"/><div className="mockup-line mid"/>
                </div>
                <div><div className="mockup-section-title">Certifications</div>
                  <div className="mockup-badge-row"><span className="mockup-badge">AWS</span><span className="mockup-badge purple">NPTEL</span><span className="mockup-badge green">Coursera</span></div>
                </div>
                <div><div className="mockup-section-title">Skills</div>
                  <div className="mockup-badge-row"><span className="mockup-badge green">React</span><span className="mockup-badge green">Python</span><span className="mockup-badge green">SQL</span></div>
                </div>
              </div>
            </div>
            <div className="floating-card bottom-right"><div className="floating-icon">✓</div>ATS Score: 96%</div>
          </div>
        </div>
      </section>

      {/* BUILDER */}
      <BuilderSection/>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="fade-up" style={{textAlign:"center"}}>
          <div className="section-label" style={{margin:"0 auto 16px"}}>⚡ How It Works</div>
          <div className="section-title" style={{textAlign:"center"}}>Ready in 4 Simple Steps</div>
          <div className="section-sub" style={{margin:"0 auto",textAlign:"center"}}>No confusion. No sign up. Just fill and download.</div>
        </div>
        <div className="steps-grid">
          {steps.map((s,i)=>(
            <div key={i} className={`step-card fade-up fade-up-${i+1}`}>
              <div className="step-num">{s.num}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TEMPLATES */}
      <div className="section-full" id="templates">
        <div className="section-inner">
          <div className="fade-up" style={{textAlign:"center"}}>
            <div className="section-label" style={{margin:"0 auto 16px"}}>◈ Templates</div>
            <div className="section-title" style={{textAlign:"center"}}>4 Student-Friendly Templates</div>
            <div className="section-sub" style={{margin:"0 auto",textAlign:"center"}}>All designed to impress recruiters and pass ATS systems.</div>
          </div>
          <div className="templates-grid">
            {templates.map((t,i)=>(
              <div key={t.id} className={`template-card fade-up fade-up-${i+1}`}>
                <div className="template-preview">
                  <TplPreview type={t.id}/>
                  {t.badge && <div className={`template-badge${t.badgeColor?" "+t.badgeColor:""}`}>{t.badge}</div>}
                  <div className="template-overlay"><button className="template-overlay-btn" onClick={()=>scrollTo("builder")}>Use Template</button></div>
                </div>
                <div className="template-info"><div className="template-name">{t.name}</div><div className="template-desc">{t.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="section" id="features">
        <div className="fade-up" style={{textAlign:"center"}}>
          <div className="section-label" style={{margin:"0 auto 16px"}}>⚙ Features</div>
          <div className="section-title" style={{textAlign:"center"}}>Everything a Student Needs</div>
          <div className="section-sub" style={{margin:"0 auto",textAlign:"center"}}>Sections and features built specifically for internship and placement applications.</div>
        </div>
        <div className="features-grid">
          {features.map((f,i)=>(
            <div key={i} className={`feature-card fade-up fade-up-${(i%3)+1}`}>
              <div className={`feature-icon ${f.color}`}>{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
              <div className={`feature-pill ${f.pillColor}`}>✓ {f.pill}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{background:"var(--blue)",padding:"56px 24px"}}>
        <div style={{maxWidth:580,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:12,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,0.6)",marginBottom:14}}>FREE FOR ALL STUDENTS</div>
          <h2 style={{fontSize:"clamp(26px,4vw,38px)",fontWeight:800,color:"#fff",letterSpacing:"-0.03em",marginBottom:14,lineHeight:1.15}}>Your dream internship starts with a great resume.</h2>
          <p style={{fontSize:15,color:"rgba(255,255,255,0.75)",marginBottom:28,lineHeight:1.65}}>Join thousands of students who've used InternReady to land internships at top companies.</p>
          <button className="btn-primary" style={{background:"#fff",color:"var(--blue)",margin:"0 auto",display:"inline-flex"}} onClick={()=>scrollTo("builder")}>
            Build My Resume — It's Free ✦
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-logo">Intern<span>Ready</span></div>
            <div className="footer-tagline">Helping students land their first opportunity. 🎓</div>
          </div>
          <ul className="footer-links">
            {["About","Templates","Features","How It Works","Privacy Policy","Contact"].map(l=>(
              <li key={l} className="footer-link">{l}</li>
            ))}
          </ul>
        </div>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
          <div className="footer-copy">© 2025 InternReady — Free for all college students. Made with ❤️ for students everywhere.</div>
        </div>
      </footer>
    </>
  );
}
