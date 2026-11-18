import '@picocss/pico/css/pico.min.css';
import * as AsciinemaPlayer from 'asciinema-player';
import 'asciinema-player/dist/bundle/asciinema-player.css';
import { marked } from 'marked';
import { createIcons, ArrowRight, ArrowUpRight, Check, Copy, Hexagon } from 'lucide';
import content from 'bundle-text:./content/home.md';
import demoCastUrl from 'url:../assets/demo.cast';

const sections = {};
let currentSection;
for (const token of marked.lexer(content)) {
  if (token.type === 'heading' && token.depth === 2) {
    currentSection = token.text;
    sections[currentSection] = [];
  } else if (currentSection) {
    sections[currentSection].push(token);
  }
}

const render = (name) => marked.parser(sections[name] || []);
const example = sections.example?.find((token) => token.type === 'code')?.text || '';
const escapeHtml = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const lines = example.split('\n');
const exampleLines = lines.map((line, index) => `<div><span class="prompt">$</span> ${escapeHtml(line)}${index === lines.length - 1 ? '<span class="cursor"></span>' : ''}</div>`).join('');

document.querySelector('#app').innerHTML = `
  <div class="announcement"><span class="status-dot"></span> AN OPEN-SOURCE PROJECT IN THE MAKING <span class="announcement-separator">/</span> COMING SOON</div>
  <header class="site-header shell">
    <a class="brand" href="#top" aria-label="Nkube home"><span class="brand-mark"><i data-lucide="hexagon"></i><span>n</span></span> nkube<span class="brand-period">.</span></a>
    <nav aria-label="Main navigation">
      <a href="#about">The idea</a>
      <a href="#workflow">Workflow</a>
      <a href="#roadmap">Roadmap</a>
    </nav>
    <a class="header-link" href="#roadmap">Explore the roadmap <i data-lucide="arrow-up-right"></i></a>
  </header>

  <main id="top">
    <section class="hero shell" aria-labelledby="hero-title">
      <div class="hero-grid" aria-hidden="true"></div>
      <div class="hero-content">
        <div class="eyebrow"><span class="status-dot"></span> THE DEVELOPER CLI FOR KUBERNETES <span class="eyebrow-line"></span> 01 / 04</div>
        <div class="hero-copy markdown">${render('hero')}</div>
        <div class="hero-actions"><a class="button-primary" href="#about">Meet Nkube <i data-lucide="arrow-right"></i></a><a class="button-secondary" href="#roadmap">See the roadmap <i data-lucide="arrow-up-right"></i></a></div>
        <div class="hero-footnote"><span>OPEN SOURCE</span><span class="footnote-cross">+</span><span>NATIVE AOT</span><span class="footnote-cross">+</span><span>MADE FOR .NET</span></div>
        <div class="hero-delivery markdown">${render('delivery')}</div>
      </div>
      <div class="hero-index" aria-hidden="true">N / K<br>001—026</div>
    </section>

    <section class="toolkit shell" id="about">
      <div class="section-heading"><span>01 / THE IDEA</span><span class="heading-rule"></span><span>THE NKUBE TOOLKIT</span></div>
      <div class="intro-row"><div class="section-copy markdown">${render('introduction')}</div><span class="section-aside">A BETTER WAY<br>TO DEVELOP <span>↘</span></span></div>
      <div class="feature-grid">
        <div class="feature-wrap"><div class="feature-label">01 / SHIP</div><article class="feature feature-orange"><div class="feature-top"><span>01</span><span>↗</span></div><div class="markdown">${render('deploy')}</div><div class="feature-bottom">PROJECT → CLUSTER <span>+</span></div></article></div>
        <div class="feature-wrap"><div class="feature-label">02 / UNDERSTAND</div><article class="feature feature-lilac"><div class="feature-top"><span>02</span><span>↗</span></div><div class="markdown">${render('inspect')}</div><div class="feature-bottom">CONTEXT → CLARITY <span>+</span></div></article></div>
        <div class="feature-wrap"><div class="feature-label">03 / SOLVE</div><article class="feature feature-pink"><div class="feature-top"><span>03</span><span>↗</span></div><div class="markdown">${render('debug')}</div><div class="feature-bottom">ISSUE → INSIGHT <span>+</span></div></article></div>
      </div>
    </section>

    <section class="compatibility shell" id="compatibility">
      <div class="section-heading"><span>02 / KUBECTL COMPATIBILITY</span><span class="heading-rule"></span><span>SEE IT IN ACTION</span></div>
      <div class="compatibility-inner">
        <div class="compatibility-copy"><div class="markdown">${render('kubectl')}</div><a class="text-link" href="https://asciinema.org/a/aux78sH6tkcx1Cfa" target="_blank" rel="noopener noreferrer">Open recording on asciinema <i data-lucide="arrow-up-right"></i></a></div>
        <div class="recording"><div class="recording-header"><span>NKUBE / LIVE RECORDING</span><span>ASCIINEMA</span></div><div id="asciinema-player"></div></div>
      </div>
    </section>

    <section class="workflow" id="workflow"><div class="shell workflow-inner">
      <div class="workflow-copy"><div class="section-heading"><span>03 / THE WORKFLOW</span><span class="heading-rule"></span></div><div class="markdown">${render('workflow')}</div><a class="text-link" href="#roadmap">See what's coming <i data-lucide="arrow-right"></i></a></div>
      <div class="terminal" aria-label="Example of the planned Nkube workflow"><div class="terminal-header"><div class="terminal-dots"><span></span><span></span><span></span></div><span>YOUR PROJECT / TERMINAL</span><span>EXAMPLE</span></div><div class="terminal-body"><div class="terminal-comment"># A simpler path to Kubernetes</div>${exampleLines}<div class="terminal-caption">// A glimpse of the workflow we're building.</div></div><button class="copy-button" type="button" title="Copy example commands" aria-label="Copy example commands"><i data-lucide="copy"></i></button></div>
    </div></section>

    <section class="roadmap shell" id="roadmap"><div class="section-heading"><span>04 / WHAT'S NEXT</span><span class="heading-rule"></span><span>THE ROAD TO PREVIEW</span></div><div class="roadmap-intro markdown">${render('roadmap-intro')}</div><div class="roadmap-grid">
      <article class="roadmap-item"><span class="roadmap-number">01</span><span class="roadmap-time">DAYS 01—30</span><div class="markdown">${render('foundation')}</div></article>
      <article class="roadmap-item"><span class="roadmap-number">02</span><span class="roadmap-time">DAYS 31—60</span><div class="markdown">${render('project-to-cluster')}</div></article>
      <article class="roadmap-item"><span class="roadmap-number">03</span><span class="roadmap-time">DAYS 61—90</span><div class="markdown">${render('debug-slice')}</div></article>
    </div></section>

    <section class="closing"><div class="shell closing-inner"><div><div class="eyebrow"><span class="status-dot"></span> STILL IN THE WORKS</div><div class="markdown">${render('closing')}</div></div><a href="#top" class="button-dark">Back to the top <i data-lucide="arrow-up-right"></i></a></div></section>
  </main>
  <footer class="site-footer shell"><a class="brand" href="#top"><span class="brand-mark"><i data-lucide="hexagon"></i><span>n</span></span> nkube<span class="brand-period">.</span></a><span>FOR THE DEVELOPERS BUILDING WHAT'S NEXT.</span><span>OPEN SOURCE / COMING SOON</span></footer>
`;

document.querySelector('.hero-copy h1').id = 'hero-title';
createIcons({ icons: { ArrowRight, ArrowUpRight, Check, Copy, Hexagon } });

const recordingPlayer = document.querySelector('#asciinema-player');
const demoPlayer = AsciinemaPlayer.create(demoCastUrl, recordingPlayer, {
  autoplay: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  loop: false,
  startAt: 15,
  fit: 'width',
  terminalFontFamily: "'JetBrains Mono', monospace",
});
demoPlayer.addEventListener('ended', async () => {
  await demoPlayer.seek(15);
  await demoPlayer.play();
});

const copyButton = document.querySelector('.copy-button');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(example);
    copyButton.innerHTML = '<i data-lucide="check"></i>';
    copyButton.setAttribute('aria-label', 'Commands copied');
    createIcons({ icons: { Check } });
    setTimeout(() => {
      copyButton.innerHTML = '<i data-lucide="copy"></i>';
      copyButton.setAttribute('aria-label', 'Copy example commands');
      createIcons({ icons: { Copy } });
    }, 2000);
  } catch {
    copyButton.setAttribute('aria-label', 'Unable to copy commands');
  }
});
