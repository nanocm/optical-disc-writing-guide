(() => {
  const root = document.documentElement;
  const theme = document.getElementById('theme-toggle');
  let saved;
  try { saved = localStorage.getItem('optical-disc-theme'); } catch (_) { /* file:// storage may be blocked */ }
  if (saved === 'dark' || saved === 'light') root.dataset.theme = saved;
  theme?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('optical-disc-theme', root.dataset.theme); } catch (_) { /* theme still works for this page */ }
  });

  const links = [...document.querySelectorAll('#toc a[href^="#"]')];
  const tocToggle = document.getElementById('toc-toggle');
  const sidebar = document.querySelector('.sidebar');
  tocToggle?.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    tocToggle.setAttribute('aria-expanded', String(open));
    tocToggle.firstChild.textContent = open ? '收起章节目录 ' : '展开章节目录 ';
  });
  for (const link of links) link.addEventListener('click', () => {
    if (matchMedia('(max-width: 830px)').matches) {
      sidebar.classList.remove('open');
      tocToggle?.setAttribute('aria-expanded', 'false');
      tocToggle.firstChild.textContent = '展开章节目录 ';
    }
  });
  const input = document.getElementById('nav-search');
  input?.addEventListener('input', () => {
    const term = input.value.trim().toLocaleLowerCase();
    for (const link of links) link.hidden = !!term && !link.textContent.toLocaleLowerCase().includes(term);
  });

  const headings = links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (!visible.length) return;
    for (const link of links) link.classList.toggle('active', link.hash === `#${visible[0].target.id}`);
  }, { rootMargin: '-8% 0px -78% 0px' });
  headings.forEach(heading => observer.observe(heading));

  const progress = document.getElementById('read-progress');
  const top = document.getElementById('back-to-top');
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? Math.max(0, Math.min(100, scrollY / max * 100)) : 0}%`;
    top.classList.toggle('visible', scrollY > 700);
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
  top?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const yearbook = document.getElementById('yearbook-viewer');
  const yearbookToggle = document.getElementById('yearbook-toggle');
  const setYearbookExpanded = open => {
    yearbook?.classList.toggle('expanded', open);
    yearbookToggle?.setAttribute('aria-expanded', String(open));
    if (yearbookToggle) yearbookToggle.textContent = open ? '关闭放大' : '放大查看';
    document.body.style.overflow = open ? 'hidden' : '';
  };
  yearbookToggle?.addEventListener('click', () => setYearbookExpanded(!yearbook.classList.contains('expanded')));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && yearbook?.classList.contains('expanded')) setYearbookExpanded(false);
  });
})();
