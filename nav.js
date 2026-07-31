/* ============================================================
   Global site navigation — injected on every page that loads
   this file. To add a new page to the site:
     1. Drop the new .html file in this folder.
     2. Add one entry to CASE_STUDIES (or SECTION_LINKS for a
        non-case-study page) below.
   Every existing page picks up the new link automatically —
   no other markup needs to change.
   ============================================================ */
(function(){
  var HOME = { href: 'index.html', label: 'Home' };

  var SECTION_LINKS = [
    { href: 'index.html#work', label: 'Work' },
    { href: 'index.html#journey', label: 'Journey' },
    { href: 'index.html#contact', label: 'Contact' }
  ];

  var CASE_STUDIES = [
    { href: 'floret_casestudy.html', label: 'Floret Design System' },
    { href: 'floretcodegen_casestudy.html', label: 'Floret Codegen' },
    { href: 'wcagaccessibility_casestudy.html', label: 'WCAG 2.2 Accessibility' },
    { href: 'pbl_casestudy.html', label: 'PBL Click Test' },
    { href: 'responsiblegaming_casestudy.html', label: 'Responsible Gaming' },
    { href: 'sysrupt_casestudy.html', label: 'SYSrupt' }
  ];

  function currentFile(){
    var path = window.location.pathname.split('/').pop();
    return path === '' ? 'index.html' : path;
  }

  /* ---------- theme toggle ----------
     Every page ships both a light and a dark palette. Each page has its
     own *native* default (index.html = dark, case studies = light) — that
     native look renders untouched until the visitor actually picks a
     theme. Once they do, the choice is remembered and applied everywhere,
     on every page, via an explicit data-theme attribute on <html>. */
  var THEME_KEY = 'siteTheme';
  var SUN_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>';
  var MOON_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  var MENU_ICON = '<svg class="icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"></path></svg>' +
                  '<svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"></path></svg>';

  function getStoredTheme(){
    try { return localStorage.getItem(THEME_KEY); } // 'light' | 'dark' | null
    catch (e) { return null; }
  }
  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }

  function linkHTML(item, current, markActive){
    var isActive = markActive && item.href.split('#')[0] === current;
    return '<a href="' + item.href + '"' + (isActive ? ' class="active" aria-current="page"' : '') + '>' + item.label + '</a>';
  }

  function buildNav(){
    var current = currentFile();
    var onCaseStudy = CASE_STUDIES.some(function(c){ return c.href === current; });

    var native = (current === HOME.href) ? 'dark' : 'light';
    var stored = getStoredTheme();
    if (stored === 'light' || stored === 'dark') applyTheme(stored);
    var effectiveTheme = stored || native;

    var nav = document.createElement('nav');
    nav.className = 'site-nav';

    var caseLinksHTML = CASE_STUDIES.map(function(c){ return linkHTML(c, current, true); }).join('');
    var sectionLinksHTML = SECTION_LINKS.map(function(s){ return linkHTML(s, current, false); }).join('');

    nav.innerHTML =
      '<div class="site-nav-wrap">' +
        '<a href="' + HOME.href + '" class="site-brand">' +
          '<span class="site-brand-dot"></span>' +
          '<span class="site-brand-name">Jagadeesh SJ</span>' +
        '</a>' +
        '<div class="site-navlinks">' +
          linkHTML(HOME, current, true) +
          sectionLinksHTML +
          '<div class="site-navdrop" data-open="false">' +
            '<button type="button" aria-haspopup="true" aria-expanded="false"' + (onCaseStudy ? ' class="active"' : '') + '>' +
              'Case Studies<span class="caret">▾</span>' +
            '</button>' +
            '<div class="site-navdrop-menu">' + caseLinksHTML + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    var themeBtn = document.createElement('button');
    themeBtn.type = 'button';
    themeBtn.className = 'theme-toggle';
    var setIcon = function(theme){
      themeBtn.innerHTML = theme === 'light' ? MOON_ICON : SUN_ICON;
      themeBtn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    };
    setIcon(effectiveTheme);
    themeBtn.addEventListener('click', function(){
      var next = effectiveTheme === 'light' ? 'dark' : 'light';
      applyTheme(next);
      effectiveTheme = next;
      setIcon(next);
    });
    nav.querySelector('.site-nav-wrap').appendChild(themeBtn);

    // ---------- mobile hamburger + slide-down menu (<=760px) ----------
    var hamburger = document.createElement('button');
    hamburger.type = 'button';
    hamburger.className = 'nav-hamburger';
    hamburger.setAttribute('aria-label', 'Open menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = MENU_ICON;
    nav.querySelector('.site-nav-wrap').appendChild(hamburger);

    var mobileMenu = document.createElement('div');
    mobileMenu.className = 'site-mobile-menu';
    mobileMenu.setAttribute('data-open', 'false');
    mobileMenu.innerHTML =
      '<div class="site-mobile-menu-inner">' +
        linkHTML(HOME, current, true) +
        sectionLinksHTML +
        '<div class="mobile-menu-label">Case Studies</div>' +
        caseLinksHTML +
      '</div>';
    nav.appendChild(mobileMenu);

    hamburger.addEventListener('click', function(e){
      e.stopPropagation();
      var open = mobileMenu.getAttribute('data-open') === 'true';
      mobileMenu.setAttribute('data-open', String(!open));
      hamburger.setAttribute('aria-expanded', String(!open));
      hamburger.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    });
    var closeMobileMenu = function(){
      mobileMenu.setAttribute('data-open', 'false');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    };

    document.body.insertBefore(nav, document.body.firstChild);

    var drop = nav.querySelector('.site-navdrop');
    var toggle = drop.querySelector('button');

    toggle.addEventListener('click', function(e){
      e.stopPropagation();
      var open = drop.getAttribute('data-open') === 'true';
      drop.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });
    document.addEventListener('click', function(e){
      if (!drop.contains(e.target)){
        drop.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
      if (!mobileMenu.contains(e.target) && e.target !== hamburger && !hamburger.contains(e.target)){
        closeMobileMenu();
      }
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape'){
        drop.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
        closeMobileMenu();
      }
    });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    buildNav();
  }
})();
