// Zeyno's Crochet - Shared Frontend Logic
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initTheme();
  renderSharedLayout();
  translatePage();
  initMobileMenu();
  initChatbot();
  initBackToTopButton();
  
  // Page-specific initializers
  const path = window.location.pathname;
  if (path.includes('products.html')) {
    initProductsPage();
  } else if (path.includes('portfolio.html')) {
    initPortfolioPage();
  } else if (path.includes('custom-order.html')) {
    initCustomOrderWizard();
  } else if (path.includes('testimonials.html')) {
    initTestimonialsPage();
  } else if (path.includes('order-tracking.html')) {
    initOrderTrackingPage();
  } else if (path.includes('contact.html')) {
    initContactForm();
    initTestimonialsPage();
  } else if (path.includes('faq.html')) {
    initFAQAccordion();
  } else {
    initHomePage();
  }
});

// --- i18n & Language Management ---
let currentLang = 'tr';

function initLanguage() {
  const savedLang = localStorage.getItem('zeyno_lang');
  if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
    currentLang = savedLang;
  } else {
    const userLang = navigator.language.substring(0, 2);
    currentLang = userLang === 'en' ? 'en' : 'tr';
    localStorage.setItem('zeyno_lang', currentLang);
  }
  document.documentElement.lang = currentLang;
}

// --- Theme Management (Automatic System Dark Mode) ---
function initTheme() {
  const mediaQuery = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  
  const applyTheme = (e) => {
    const isDark = e ? e.matches : (mediaQuery && mediaQuery.matches);
    if (isDark) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  };

  applyTheme();

  if (mediaQuery) {
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', applyTheme);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(applyTheme);
    }
  }
}


function setLanguage(lang) {
  if (lang !== 'tr' && lang !== 'en') return;
  currentLang = lang;
  localStorage.setItem('zeyno_lang', lang);
  document.documentElement.lang = lang;
  
  // Re-run translations and layout
  renderSharedLayout();
  translatePage();
  
  // Re-initialize page-specific elements
  const path = window.location.pathname;
  if (path.includes('products.html')) {
    initProductsPage();
  } else if (path.includes('portfolio.html')) {
    initPortfolioPage();
  } else if (path.includes('custom-order.html')) {
    initCustomOrderWizard();
  } else if (path.includes('testimonials.html')) {
    initTestimonialsPage();
  } else if (path.includes('order-tracking.html')) {
    initOrderTrackingPage();
  } else if (path.includes('contact.html')) {
    initContactForm();
    initTestimonialsPage();
  } else if (path.includes('faq.html')) {
    initFAQAccordion();
  } else {
    initHomePage();
  }
}

// Translate elements with data-i18n attribute
function translatePage() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const translation = getTranslationByKey(key);
    if (translation) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', translation);
      } else {
        el.innerHTML = translation;
      }
    }
  });
}

function getTranslationByKey(keyPath) {
  const keys = keyPath.split('.');
  let current = TRANSLATIONS[currentLang];
  for (const key of keys) {
    if (current && current[key] !== undefined) {
      current = current[key];
    } else {
      return null;
    }
  }
  return current;
}

// --- Layout Injector ---
function renderSharedLayout() {
  const headerRoot = document.getElementById('header-root');
  const footerRoot = document.getElementById('footer-root');
  const dict = TRANSLATIONS[currentLang];

  if (headerRoot) {
    headerRoot.innerHTML = `
      <header class="header">
        <div class="header-inner">
          <a href="index.html" class="header-logo accent-text">Zeyno's Crochet</a>
          <nav>
            <ul class="header-nav">
              <li><a href="index.html" class="header-nav-link">${dict.nav.home}</a></li>
              <li><a href="portfolio.html" class="header-nav-link">${dict.nav.portfolio}</a></li>
              <li><a href="products.html" class="header-nav-link">${dict.nav.products}</a></li>
              <li class="nav-dropdown">
                <span class="header-nav-link dropdown-trigger">${dict.nav.ordersDropdown} ▾</span>
                <ul class="dropdown-menu">
                  <li><a href="custom-order.html">${dict.nav.customOrder}</a></li>
                  <li><a href="order-tracking.html">${dict.nav.orderTracking}</a></li>
                </ul>
              </li>
              <li><a href="about.html" class="header-nav-link">${dict.nav.about}</a></li>
              <li><a href="faq.html" class="header-nav-link">${dict.nav.faq}</a></li>
              <li><a href="contact.html" class="header-nav-link">${dict.nav.contact}</a></li>
            </ul>
          </nav>
          <div class="header-actions">
            <button class="lang-btn" onclick="setLanguage('${currentLang === 'tr' ? 'en' : 'tr'}')">
              ${currentLang === 'tr' ? '🇬🇧 EN' : '🇹🇷 TR'}
            </button>
            <button class="hamburger" id="hamburger-btn" aria-label="Open menu">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </button>
          </div>
        </div>
      </header>
    `;
    
    // Set active nav link
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const activeLink = headerRoot.querySelector(`a[href="${path}"]`);
    if (activeLink) {
      activeLink.classList.add('header-nav-link-active');
      const dropdownParent = activeLink.closest('.nav-dropdown');
      if (dropdownParent) {
        const trigger = dropdownParent.querySelector('.dropdown-trigger');
        if (trigger) trigger.classList.add('header-nav-link-active');
      }
    }
  }

  if (footerRoot) {
    footerRoot.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <img src="favicon.png" alt="Zeyno's Crochet Logo" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--color-primary-light); box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                <div class="footer-brand accent-text" style="margin-bottom: 0;">${dict.footer.brand}</div>
              </div>
              <p class="footer-tagline">${dict.footer.tagline}</p>
            </div>
            <div>
              <h3 class="footer-heading">${currentLang === 'tr' ? 'Hızlı Bağlantılar' : 'Quick Links'}</h3>
              <ul class="footer-links">
                <li><a href="index.html" class="footer-link">${dict.nav.home}</a></li>
                <li><a href="portfolio.html" class="footer-link">${dict.nav.portfolio}</a></li>
                <li><a href="products.html" class="footer-link">${dict.nav.products}</a></li>
                <li><a href="about.html" class="footer-link">${dict.nav.about}</a></li>
                <li><a href="faq.html" class="footer-link">${dict.nav.faq}</a></li>
                <li><a href="contact.html" class="footer-link">${dict.nav.contact}</a></li>
              </ul>
            </div>
            <div>
              <h3 class="footer-heading">${dict.nav.ordersDropdown}</h3>
              <ul class="footer-links">
                <li><a href="custom-order.html" class="footer-link">${dict.nav.customOrder}</a></li>
                <li><a href="order-tracking.html" class="footer-link">${dict.nav.orderTracking}</a></li>
              </ul>
            </div>
            <div>
              <h3 class="footer-heading">${currentLang === 'tr' ? 'Sosyal Medya' : 'Social Media'}</h3>
              <ul class="footer-links">
                <li>
                  <a href="https://www.instagram.com/zeynoscrochet_/" class="footer-link" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 8px; font-weight: 600;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #e1306c;"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    @zeynoscrochet_
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© 2024 Zeyno's Crochet. ${dict.footer.rights}</span>
            <span>${dict.footer.madeWithLove}</span>
          </div>
        </div>
      </footer>
    `;
  }
}

// --- Mobile Menu ---
function initMobileMenu() {
  // Inject mobile menu overlay and panel dynamically on load
  const existingMenu = document.getElementById('mobile-menu-root');
  if (existingMenu) return;

  const mobileRoot = document.createElement('div');
  mobileRoot.id = 'mobile-menu-root';
  document.body.appendChild(mobileRoot);

  document.body.addEventListener('click', (e) => {
    const hamburger = e.target.closest('#hamburger-btn');
    if (hamburger) {
      renderMobileMenuPanel(true);
    }
  });
}

function renderMobileMenuPanel(isOpen) {
  const root = document.getElementById('mobile-menu-root');
  if (!root) return;

  if (!isOpen) {
    root.innerHTML = '';
    document.body.classList.remove('no-scroll');
    return;
  }

  const dict = TRANSLATIONS[currentLang];
  document.body.classList.add('no-scroll');

  root.innerHTML = `
    <div class="mobile-menu-overlay" onclick="renderMobileMenuPanel(false)"></div>
    <div class="mobile-menu-panel">
      <div class="mobile-menu-header">
        <span class="header-logo accent-text">Zeyno's Crochet</span>
        <button class="mobile-menu-close" onclick="renderMobileMenuPanel(false)">✕</button>
      </div>
      <nav>
        <ul class="mobile-menu-nav">
          <li><a href="index.html" class="mobile-menu-link" onclick="renderMobileMenuPanel(false)">${dict.nav.home}</a></li>
          <li><a href="portfolio.html" class="mobile-menu-link" onclick="renderMobileMenuPanel(false)">${dict.nav.portfolio}</a></li>
          <li><a href="products.html" class="mobile-menu-link" onclick="renderMobileMenuPanel(false)">${dict.nav.products}</a></li>
          <li style="margin: 10px 0;">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase; padding-left: 15px; display: block; margin-bottom: 5px;">${dict.nav.ordersDropdown}</span>
            <ul style="list-style: none; padding-left: 20px; display: flex; flex-direction: column; gap: 8px; border-left: 2px solid var(--color-primary-lighter); margin-left: 15px;">
              <li><a href="custom-order.html" class="mobile-menu-link" onclick="renderMobileMenuPanel(false)" style="font-size: 0.95rem; padding: 4px 0;">${dict.nav.customOrder}</a></li>
              <li><a href="order-tracking.html" class="mobile-menu-link" onclick="renderMobileMenuPanel(false)" style="font-size: 0.95rem; padding: 4px 0;">${dict.nav.orderTracking}</a></li>
            </ul>
          </li>
          <li><a href="about.html" class="mobile-menu-link" onclick="renderMobileMenuPanel(false)">${dict.nav.about}</a></li>
          <li><a href="faq.html" class="mobile-menu-link" onclick="renderMobileMenuPanel(false)">${dict.nav.faq}</a></li>
          <li><a href="contact.html" class="mobile-menu-link" onclick="renderMobileMenuPanel(false)">${dict.nav.contact}</a></li>
        </ul>
      </nav>
      <div style="padding: 20px 0; text-align: center;">
        <button class="lang-btn" style="width: 100%; padding: 12px;" onclick="setLanguage('${currentLang === 'tr' ? 'en' : 'tr'}'); renderMobileMenuPanel(false)">
          ${currentLang === 'tr' ? '🇬🇧 English (EN)' : '🇹🇷 Türkçe (TR)'}
        </button>
      </div>
    </div>
  `;
}

// --- Home Page ---
function initHomePage() {
  const featuredRoot = document.getElementById('featured-products-root');
  if (!featuredRoot) return;

  const featured = PRODUCTS.filter(p => p.featured).slice(0, 4);
  const dict = TRANSLATIONS[currentLang];

  featuredRoot.innerHTML = featured.map((p, index) => `
    <div class="card product-card" style="animation-delay: ${index * 100}ms">
      <div class="card-image-wrapper" onclick="window.location.href='products.html?slug=${p.slug}'" style="cursor: pointer;">
        <img class="card-image" src="${p.image}" alt="${p.name[currentLang]}">
        <div class="product-card-overlay">
          <a href="products.html?slug=${p.slug}" class="btn btn-primary btn-sm">${dict.products.viewDetails}</a>
        </div>
      </div>
      <div class="card-body">
        <h3 class="product-card-name">${p.name[currentLang]}</h3>
        <div class="product-card-price">${p.price} ${p.currency}</div>
      </div>
    </div>
  `).join('');
}

// --- Products Page ---
let activeCategory = 'all';
let searchKeyword = '';
let activeSort = 'default';

function initProductsPage() {
  // Check if viewing details for a single product
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  if (slug) {
    renderProductDetail(slug);
    return;
  }

  renderProductsGrid();
  initProductFilters();
}

function initProductFilters() {
  const filterRoot = document.getElementById('product-filters-root');
  if (!filterRoot) return;

  const dict = TRANSLATIONS[currentLang];
  const categories = ['all', 'amigurumi', 'giyim', 'cantaCuzdan', 'sacAksesuar', 'anahtarlik', 'punch', 'dantel', 'wishlist'];

  filterRoot.innerHTML = categories.map(cat => {
    const labelKey = 'filter' + cat.charAt(0).toUpperCase() + cat.slice(1);
    const label = dict.products[labelKey] || cat;
    return `
      <button class="filter-btn ${activeCategory === cat ? 'filter-btn-active' : ''}" onclick="filterCategory('${cat}')">
        ${label}
      </button>
    `;
  }).join('');
}

function filterCategory(cat) {
  activeCategory = cat;
  initProductFilters();
  renderProductsGrid();
}

function handleSearch(e) {
  searchKeyword = e.target.value.toLowerCase().trim();
  renderProductsGrid();
}

function handleSort(e) {
  activeSort = e.target.value;
  renderProductsGrid();
}
window.handleSort = handleSort;

function renderProductsGrid() {
  const gridRoot = document.getElementById('products-grid-root');
  if (!gridRoot) return;

  const dict = TRANSLATIONS[currentLang];
  const favs = getFavorites();
  let filtered = PRODUCTS.filter(p => {
    const matchesCat = activeCategory === 'all' || 
                       (activeCategory === 'wishlist' ? favs.includes(p.id) : p.category === activeCategory);
    const matchesSearch = p.name[currentLang].toLowerCase().includes(searchKeyword) || 
                          p.description[currentLang].toLowerCase().includes(searchKeyword);
    return matchesCat && matchesSearch;
  });

  // Sort logic
  if (activeSort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeSort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (activeSort === 'name-asc') {
    filtered.sort((a, b) => a.name[currentLang].localeCompare(b.name[currentLang]));
  }

  if (filtered.length === 0) {
    const emptyMsg = activeCategory === 'wishlist' 
      ? dict.wishlist.empty 
      : (currentLang === 'tr' ? 'Kriterlere uygun ürün bulunamadı.' : 'No products found matching the criteria.');
    const emptyIcon = activeCategory === 'wishlist' ? '❤️' : '🔍';
    
    gridRoot.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: var(--color-bg-soft); border-radius: 16px; border: 1px dashed var(--color-border); box-shadow: var(--shadow-sm); max-width: 500px; margin: 40px auto;">
        <span style="font-size: 3rem; display: block; margin-bottom: 15px;">${emptyIcon}</span>
        <p style="margin: 0; line-height: 1.6; color: var(--color-text-light); font-size: 1.05rem;">${emptyMsg}</p>
      </div>
    `;
    return;
  }

    let cardsHtml = filtered.map((p, index) => {
      const badgeText = p.inStock ? dict.products.inStock : dict.products.outOfStock;
      const badgeClass = p.inStock ? 'badge-success' : 'badge-danger';
      const favs = getFavorites();
      const isWished = favs.includes(p.id);
      
      return `
        <div class="card product-card" style="animation-delay: ${index * 100}ms">
          <div class="card-image-wrapper" onclick="window.location.href='products.html?slug=${p.slug}'" style="cursor: pointer;">
            <img class="card-image" src="${p.image}" alt="${p.name[currentLang]}">
            <button class="wishlist-btn ${isWished ? 'wished' : ''}" onclick="event.preventDefault(); event.stopPropagation(); toggleFavorite('${p.id}', this)" aria-label="Add to Wishlist">
              ${isWished ? '❤️' : '🤍'}
            </button>
            <div class="product-card-overlay">
              <a href="products.html?slug=${p.slug}" class="btn btn-primary btn-sm">${dict.products.viewDetails}</a>
            </div>
            <span class="badge ${badgeClass}" style="position: absolute; top: 10px; left: 10px;">${badgeText}</span>
          </div>
        <div class="card-body">
          <h3 class="product-card-name">${p.name[currentLang]}</h3>
          <p class="product-card-desc" style="font-size: 0.85rem; color: var(--color-text-light); margin-bottom: 10px;">
            ${p.description[currentLang].substring(0, 80)}...
          </p>
          <div class="product-card-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
            <span class="product-card-price">${p.price} ${p.currency}</span>
            ${p.inStock ? `
              <a href="https://www.instagram.com/zeynoscrochet_/" 
                 target="_blank" rel="noopener noreferrer" class="btn btn-instagram btn-sm" style="font-size: 0.8rem; padding: 6px 12px;">
                ${currentLang === 'tr' ? 'Sipariş Ver' : 'Order Now'}
              </a>
            ` : ''}
          </div>
        </div>
      </div>
      `;
    }).join('');

    if (activeCategory === 'wishlist') {
      cardsHtml += `
        <!-- Bulk Wishlist Order Card -->
        <div style="grid-column: 1/-1; background-color: var(--color-bg-soft); padding: 30px; border-radius: 16px; border: 1px solid var(--color-border-light); margin-top: 40px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 15px;">
          <h3 class="font-playfair" style="font-size: 1.4rem; color: var(--color-text);">💖 ${currentLang === 'tr' ? 'Toplu Sipariş Talebi' : 'Bulk Order Request'}</h3>
          <p style="color: var(--color-text-light); max-width: 500px; font-size: 0.95rem; margin: 0;">
            ${currentLang === 'tr' ? 'Favorilerinize eklediğiniz tüm ürünlerin dökümünü tek tıkla kopyalayıp Instagram DM\'den sipariş verebilirsiniz!' : 'Copy the summary of all your favorites with one click and place your order directly via Instagram DM!'}
          </p>
          <button class="btn btn-primary" id="wishlist-order-btn" onclick="copyWishlistDetails()" style="max-width: 320px; width: 100%;">
            ${dict.wishlist.orderAll}
          </button>
          <a href="https://www.instagram.com/zeynoscrochet_/" target="_blank" rel="noopener noreferrer" class="btn btn-instagram btn-outline" style="max-width: 320px; width: 100%; text-align: center; margin-top: 5px;">
            📸 ${currentLang === 'tr' ? "Instagram DM'e Git" : "Go to Instagram DM"}
          </a>
        </div>
      `;
    }

    gridRoot.innerHTML = cardsHtml;
  }

function renderProductDetail(slug) {
  const container = document.querySelector('.page-section .container');
  if (!container) return;

  const p = PRODUCTS.find(prod => prod.slug === slug);
  const dict = TRANSLATIONS[currentLang];

  if (!p) {
    container.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 80px 20px;">
        <span style="font-size: 3rem;">😔</span>
        <h2 style="margin-top: 20px;">${currentLang === 'tr' ? 'Ürün Bulunamadı' : 'Product Not Found'}</h2>
        <a href="products.html" class="btn btn-primary" style="margin-top: 20px;">← ${currentLang === 'tr' ? 'Ürünlere Dön' : 'Back to Products'}</a>
      </div>
    `;
    return;
  }

  const related = PRODUCTS.filter(prod => prod.category === p.category && prod.id !== p.id).slice(0, 3);
  const badgeText = p.inStock ? dict.products.inStock : dict.products.outOfStock;
  const badgeClass = p.inStock ? 'badge-success' : 'badge-danger';

  const favs = getFavorites();
  const isWished = favs.includes(p.id);

  container.innerHTML = `
    <a href="products.html" class="back-link" style="display: inline-block; margin-bottom: 30px; color: var(--color-primary); font-weight: 600;">
      ← ${currentLang === 'tr' ? 'Ürünlere Dön' : 'Back to Products'}
    </a>
    
    <div class="product-detail-grid">
      <div class="product-detail-images" style="position: relative;">
        <img class="product-detail-main-image" src="${p.image}" alt="${p.name[currentLang]}">
        <button class="wishlist-btn ${isWished ? 'wished' : ''}" onclick="toggleFavorite('${p.id}', this)" aria-label="Add to Wishlist" style="top: 15px; right: 15px; width: 42px; height: 42px; font-size: 1.3rem;">
          ${isWished ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="product-detail-info">
        <span class="badge ${badgeClass}" style="align-self: flex-start;">${badgeText}</span>
        <h1 class="product-detail-title" style="font-size: 2.2rem; font-weight: 700; color: var(--color-text);">${p.name[currentLang]}</h1>
        <p class="product-detail-description" style="font-size: 1.1rem; line-height: 1.8; color: var(--color-text-light);">${p.description[currentLang]}</p>
        
        <div class="product-detail-price" style="font-size: 2rem; font-weight: 800; color: var(--color-primary);">
          ${p.price} ${p.currency}
        </div>
        
        <div class="product-detail-meta" style="background: var(--color-bg-soft); padding: 20px; border-radius: 12px; display: flex; flex-direction: column; gap: 10px;">
          <div>
            <span class="product-detail-meta-label" style="font-weight: 700; display: block; font-size: 0.85rem; color: var(--color-text-muted);">🧶 MALZEME / MATERIALS</span>
            <span class="product-detail-meta-value">${p.materials[currentLang]}</span>
          </div>
          <div style="border-top: 1px solid var(--color-border); padding-top: 10px;">
            <span class="product-detail-meta-label" style="font-weight: 700; display: block; font-size: 0.85rem; color: var(--color-text-muted);">📐 BOYUTLAR / DIMENSIONS</span>
            <span class="product-detail-meta-value">${p.dimensions[currentLang]}</span>
          </div>
        </div>
        
        <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 25px; max-width: 450px;">
          ${p.inStock ? `
            <a href="https://www.instagram.com/zeynoscrochet_/" 
               target="_blank" rel="noopener noreferrer" class="btn btn-instagram btn-lg" style="flex: 2; text-align: center; justify-content: center; margin-top: 0; display: inline-flex; align-items: center; gap: 8px;">
              ${dict.products.orderViaWhatsApp}
            </a>
          ` : ''}
          <button onclick="shareProduct('${p.name[currentLang].replace(/'/g, "\\'")}', '${p.slug}', this)" class="btn btn-outline btn-lg" style="flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px; margin-top: 0; min-height: 48px; border-radius: var(--radius-md);">
            🔗 ${dict.share.btnText}
          </button>
        </div>
        <div id="share-notification" style="margin-top: 10px; font-size: 0.9rem; color: var(--color-success); font-weight: 600; display: none;"></div>
      </div>
    </div>

    ${related.length > 0 ? `
      <div class="related-products" style="margin-top: 60px; border-top: 1px solid var(--color-border); padding-top: 40px;">
        <h2 style="font-size: 1.5rem; margin-bottom: 25px;">${dict.products.relatedProducts}</h2>
        <div class="product-grid">
          ${related.map(rp => `
            <div class="card product-card">
              <div class="card-image-wrapper">
                <img class="card-image" src="${rp.image}" alt="${rp.name[currentLang]}">
                <div class="product-card-overlay">
                  <a href="products.html?slug=${rp.slug}" class="btn btn-primary btn-sm">${dict.products.viewDetails}</a>
                </div>
              </div>
              <div class="card-body">
                <h3 class="product-card-name">${rp.name[currentLang]}</h3>
                <div class="product-card-price">${rp.price} ${rp.currency}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}
  `;
}

// --- Portfolio Page ---
let activePortfolioFilter = 'all';

function initPortfolioPage() {
  renderPortfolioGrid();
  initPortfolioFilters();
}

function initPortfolioFilters() {
  const filterRoot = document.getElementById('portfolio-filters-root');
  if (!filterRoot) return;

  const dict = TRANSLATIONS[currentLang];
  const categories = ['all', 'knitting', 'crochet', 'amigurumi', 'accessory'];

  filterRoot.innerHTML = categories.map(cat => {
    const labelKey = 'filter' + cat.charAt(0).toUpperCase() + cat.slice(1);
    const label = dict.portfolio[labelKey];
    return `
      <button class="filter-btn ${activePortfolioFilter === cat ? 'filter-btn-active' : ''}" onclick="filterPortfolio('${cat}')">
        ${label}
      </button>
    `;
  }).join('');
}

function filterPortfolio(cat) {
  activePortfolioFilter = cat;
  initPortfolioFilters();
  renderPortfolioGrid();
}

function renderPortfolioGrid() {
  const gridRoot = document.getElementById('portfolio-grid-root');
  if (!gridRoot) return;

  const filtered = PORTFOLIO.filter(item => activePortfolioFilter === 'all' || item.category === activePortfolioFilter);

  gridRoot.innerHTML = filtered.map((item, index) => `
    <div class="portfolio-card" onclick="openLightbox(${index})" style="animation-delay: ${index * 80}ms">
      <img class="portfolio-card-image" src="${item.image}" alt="${item.title[currentLang]}">
      <div class="portfolio-card-overlay">
        <h3 class="portfolio-card-title">${item.title[currentLang]}</h3>
        <p class="portfolio-card-desc">${item.description[currentLang].substring(0, 70)}...</p>
        <div class="portfolio-card-techniques">
          ${item.techniques[currentLang].slice(0, 3).map(tech => `<span class="technique-tag">${tech}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// Lightbox Modal
let activeLightboxIndex = 0;

function openLightbox(index) {
  activeLightboxIndex = index;
  renderLightbox();
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.remove();
  document.body.classList.remove('no-scroll');
}

function navigateLightbox(direction) {
  const filtered = PORTFOLIO.filter(item => activePortfolioFilter === 'all' || item.category === activePortfolioFilter);
  activeLightboxIndex = (activeLightboxIndex + direction + filtered.length) % filtered.length;
  renderLightbox();
}

function renderLightbox() {
  let modal = document.getElementById('lightbox-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.className = 'modal-overlay';
    
    // Close modal when clicking outside modal-content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeLightbox();
      }
    });

    document.body.appendChild(modal);
    document.body.classList.add('no-scroll');
  }

  const filtered = PORTFOLIO.filter(item => activePortfolioFilter === 'all' || item.category === activePortfolioFilter);
  const item = filtered[activeLightboxIndex];
  if (!item) return;

  modal.innerHTML = `
    <div class="modal-content" style="max-width: 1050px; width: 90%; padding: 40px; background: var(--color-bg); border: 1px solid var(--color-border-light); position: relative;">
      <button class="modal-close" onclick="closeLightbox()" style="font-size: 1.6rem; background: none; border: none; cursor: pointer; color: var(--color-text); position: absolute; right: 25px; top: 25px; z-index: 10;">✕</button>
      
      <div class="lightbox-body" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; align-items: center; margin-top: 15px;">
        <div style="position: relative;">
          <img src="${item.image}" alt="${item.title[currentLang]}" style="width: 100%; border-radius: 12px; object-fit: cover; aspect-ratio: 4/3;">
          <button onclick="navigateLightbox(-1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); border: none; color: #fff; width: 36px; height: 36px; border-radius: 50%; font-size: 1.2rem; cursor: pointer;">‹</button>
          <button onclick="navigateLightbox(1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); border: none; color: #fff; width: 36px; height: 36px; border-radius: 50%; font-size: 1.2rem; cursor: pointer;">›</button>
        </div>
        <div style="display: flex; flex-direction: column; gap: 15px;">
          <span class="badge badge-default" style="align-self: flex-start; text-transform: capitalize;">${item.category}</span>
          <h2 style="font-size: 1.6rem; color: var(--color-text); font-family: var(--font-heading);">${item.title[currentLang]}</h2>
          <p style="color: var(--color-text-light); line-height: 1.6;">${item.description[currentLang]}</p>
          <div style="border-top: 1px solid var(--color-border); padding-top: 15px;">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-muted); display: block; margin-bottom: 5px;">🔧 ${currentLang === 'tr' ? 'TEKNİKLER' : 'TECHNIQUES'}</span>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${item.techniques[currentLang].map(tech => `<span class="badge badge-default" style="background: var(--color-bg-soft);">${tech}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- Testimonials Page ---
let activeTestimonialIndex = 0;

function getMergedTestimonials() {
  const localData = localStorage.getItem('zeyno_local_testimonials');
  const localList = localData ? JSON.parse(localData) : [];
  return [...TESTIMONIALS, ...localList];
}

function initTestimonialsPage() {
  activeTestimonialIndex = 0;
  renderTestimonialSlide();
  
  // Set auto slide
  if (window.testimonialInterval) clearInterval(window.testimonialInterval);
  window.testimonialInterval = setInterval(() => {
    navigateTestimonials(1);
  }, 5000);

  // If on testimonials.html, initialize review form
  const formRoot = document.getElementById('review-form-root');
  if (formRoot) {
    initReviewForm();
  }
}

function navigateTestimonials(direction) {
  const mergedList = getMergedTestimonials();
  if (mergedList.length === 0) return;
  activeTestimonialIndex = (activeTestimonialIndex + direction + mergedList.length) % mergedList.length;
  renderTestimonialSlide();
}

function setTestimonialIndex(idx) {
  activeTestimonialIndex = idx;
  renderTestimonialSlide();
}

function renderTestimonialSlide() {
  const track = document.getElementById('testimonials-slides-root');
  const dots = document.getElementById('testimonials-dots-root');
  if (!track || !dots) return;

  const mergedList = getMergedTestimonials();
  const t = mergedList[activeTestimonialIndex];
  if (!t) {
    track.innerHTML = '<p style="text-align: center; color: var(--color-text-light);">Henüz yorum bulunmuyor.</p>';
    dots.innerHTML = '';
    return;
  }

  const renderStars = (rating) => '★'.repeat(rating) + '☆'.repeat(5 - rating);

  track.innerHTML = `
    <div class="testimonial-card" style="max-width: 600px; margin: 0 auto; text-align: center; animation: fadeIn 0.4s ease;">
      <div class="testimonial-quote-icon" style="font-size: 4rem; color: var(--color-primary-light); line-height: 1; margin-bottom: -15px;">"</div>
      <div class="testimonial-stars" style="color: var(--color-primary-light); font-size: 1.3rem; margin-bottom: 15px;">
        ${renderStars(t.rating)}
      </div>
      <p class="testimonial-text" style="font-size: 1.15rem; font-style: italic; color: var(--color-text); margin-bottom: 25px; line-height: 1.8;">
        ${typeof t.comment === 'string' ? t.comment : (t.comment[currentLang] || t.comment['tr'])}
      </p>
      <div class="testimonial-author" style="display: flex; align-items: center; justify-content: center; gap: 15px;">
        <div class="testimonial-avatar" style="width: 50px; height: 50px; border-radius: 50%; background: var(--color-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem;">
          ${t.name.charAt(0).toUpperCase()}
        </div>
        <div style="text-align: left;">
          <span class="testimonial-name" style="font-weight: 700; color: var(--color-text); display: block;">${t.name}</span>
          <span class="testimonial-date" style="font-size: 0.8rem; color: var(--color-text-muted);">
            ${new Date(t.date).toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'long' })}
          </span>
        </div>
      </div>
    </div>
  `;

  dots.innerHTML = mergedList.map((_, i) => `
    <button class="carousel-dot ${i === activeTestimonialIndex ? 'carousel-dot-active' : ''}" onclick="setTestimonialIndex(${i})"></button>
  `).join('');
}

function initReviewForm() {
  const root = document.getElementById('review-form-root');
  if (!root) return;

  const dict = TRANSLATIONS[currentLang];
  
  root.innerHTML = `
    <div class="review-form-container">
      <h2 class="font-playfair" style="font-size: 1.6rem; margin-bottom: 8px; text-align: center;">${dict.testimonialForm.addTitle}</h2>
      <p style="text-align: center; color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 30px;">${dict.testimonialForm.addSubtitle}</p>
      
      <form id="review-submit-form" style="display: flex; flex-direction: column; gap: 20px; max-width: 500px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <div>
            <label style="font-weight: 600; font-size: 0.85rem; margin-bottom: 6px; display: block;">${dict.testimonialForm.nameLabel}</label>
            <input type="text" id="review-name" required style="width: 100%; padding: 10px 15px; border: 1px solid var(--color-border); border-radius: var(--radius-md); font-family: var(--font-body); font-size: 0.95rem;">
          </div>
          <div>
            <label style="font-weight: 600; font-size: 0.85rem; margin-bottom: 6px; display: block;">${dict.testimonialForm.productLabel}</label>
            <input type="text" id="review-product" placeholder="Örn: Bebek Battaniyesi" required style="width: 100%; padding: 10px 15px; border: 1px solid var(--color-border); border-radius: var(--radius-md); font-family: var(--font-body); font-size: 0.95rem;">
          </div>
        </div>
        
        <div>
          <label style="font-weight: 600; font-size: 0.85rem; margin-bottom: 6px; display: block;">${dict.testimonialForm.ratingLabel}</label>
          <div class="star-rating-input" id="star-rating-selector">
            <span data-val="1">★</span>
            <span data-val="2">★</span>
            <span data-val="3">★</span>
            <span data-val="4">★</span>
            <span data-val="5" class="star-active">★</span>
          </div>
          <input type="hidden" id="review-rating" value="5">
        </div>
        
        <div>
          <label style="font-weight: 600; font-size: 0.85rem; margin-bottom: 6px; display: block;">${dict.testimonialForm.commentLabel}</label>
          <textarea id="review-comment" required rows="4" style="width: 100%; padding: 12px; border: 1px solid var(--color-border); border-radius: var(--radius-md); font-family: var(--font-body); font-size: 0.95rem; resize: vertical;"></textarea>
        </div>
        
        <button type="submit" class="btn btn-primary" style="padding: 12px; font-size: 1rem;">
          ${dict.testimonialForm.submitBtn}
        </button>
      </form>
      <div id="review-status-box" style="margin-top: 20px; max-width: 500px; margin-left: auto; margin-right: auto;"></div>
    </div>
  `;

  // Star Rating Interactive Clicks
  const starsContainer = document.getElementById('star-rating-selector');
  const ratingInput = document.getElementById('review-rating');
  const stars = starsContainer.querySelectorAll('span');

  stars.forEach(star => {
    star.addEventListener('click', (e) => {
      const val = parseInt(e.target.getAttribute('data-val'));
      ratingInput.value = val;
      
      stars.forEach((s, idx) => {
        if (idx < val) {
          s.classList.add('star-active');
        } else {
          s.classList.remove('star-active');
        }
      });
    });
  });

  // Submit Handler
  const form = document.getElementById('review-submit-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameVal = document.getElementById('review-name').value.trim();
    const productVal = document.getElementById('review-product').value.trim();
    const ratingVal = parseInt(ratingInput.value);
    const commentVal = document.getElementById('review-comment').value.trim();

    const newTestimonial = {
      id: "local-" + Date.now(),
      name: nameVal,
      rating: ratingVal,
      comment: { tr: commentVal, en: commentVal },
      product: productVal,
      date: new Date().toISOString().split('T')[0]
    };

    // Save to localStorage
    const localData = localStorage.getItem('zeyno_local_testimonials');
    const localList = localData ? JSON.parse(localData) : [];
    localList.push(newTestimonial);
    localStorage.setItem('zeyno_local_testimonials', JSON.stringify(localList));

    // Reset Form
    form.reset();
    ratingInput.value = "5";
    stars.forEach(s => s.classList.add('star-active'));

    // Show Success Status
    const statusBox = document.getElementById('review-status-box');
    statusBox.innerHTML = `
      <div style="padding: 15px; background-color: var(--color-success-light); border: 1px solid var(--color-success); color: var(--color-success); border-radius: 8px; font-weight: 600; text-align: center;">
        ${dict.testimonialForm.successMsg}
      </div>
    `;

    // Re-render testimonials carousel and jump to the newly added review!
    const mergedList = getMergedTestimonials();
    activeTestimonialIndex = mergedList.length - 1; // set to the last one
    renderTestimonialSlide();

    setTimeout(() => {
      statusBox.innerHTML = '';
    }, 4000);
  });
}

window.navigateTestimonials = navigateTestimonials;
window.setTestimonialIndex = setTestimonialIndex;


// --- Order Tracking Page ---
function initOrderTrackingPage() {
  const form = document.getElementById('order-search-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('order-number-input');
    const orderNumber = input.value.trim().toUpperCase();
    
    const resultBox = document.getElementById('order-result-box');
    const dict = TRANSLATIONS[currentLang];
    
    if (!orderNumber) return;

    const order = ORDERS.find(o => o.orderNumber.toUpperCase() === orderNumber);

    if (!order) {
      resultBox.innerHTML = `
        <div class="empty-state" style="text-align: center; padding: 40px; background: #fff; border-radius: 12px; border: 1px solid var(--color-border);">
          <span style="font-size: 2.5rem;">🔍</span>
          <h3 style="margin-top: 15px; font-weight: 600;">${dict.orderTracking.noOrderFound}</h3>
        </div>
      `;
      return;
    }

    const statusesOrder = ['received', 'preparing', 'completed', 'shipped'];
    const currentStatusIndex = statusesOrder.indexOf(order.status);

    resultBox.innerHTML = `
      <div class="card" style="padding: 30px; background: #fff; border: 1px solid var(--color-border); border-radius: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: start; border-bottom: 1px solid var(--color-border); padding-bottom: 20px; margin-bottom: 25px; flex-wrap: wrap; gap: 15px;">
          <div>
            <h3 style="font-size: 1.3rem; margin-bottom: 5px; color: var(--color-text);">${order.orderNumber}</h3>
            <p style="color: var(--color-text-muted); font-size: 0.9rem;">${order.product}</p>
          </div>
          <div style="text-align: right;">
            <span class="badge badge-success" style="font-size: 0.9rem; padding: 6px 14px;">${dict.orderTracking.statuses[order.status]}</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; flex-wrap: wrap;">
          <div>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted); display: block;">📅 ${currentLang === 'tr' ? 'SİPARİŞ TARİHİ' : 'ORDER DATE'}</span>
            <span>${new Date(order.createdAt).toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US')}</span>
          </div>
          <div>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted); display: block;">🚚 ${dict.orderTracking.estimatedDelivery}</span>
            <span>${new Date(order.estimatedDelivery).toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US')}</span>
          </div>
          ${order.trackingNumber ? `
            <div style="grid-column: 1/-1; border-top: 1px dashed var(--color-border); padding-top: 15px;">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted); display: block;">📦 ${dict.orderTracking.trackingNumber}</span>
              <span style="font-family: monospace; font-size: 1rem; font-weight: bold; color: var(--color-primary);">${order.trackingNumber}</span>
            </div>
          ` : ''}
        </div>

        <h4 style="margin-bottom: 20px; font-weight: 700; font-size: 1.05rem;">📍 ${currentLang === 'tr' ? 'Sipariş Geçmişi' : 'Order Timeline'}</h4>
        <div class="order-timeline" style="display: flex; flex-direction: column; gap: 20px; border-left: 2px solid var(--color-border); padding-left: 20px; margin-left: 10px;">
          ${order.statusHistory.map((step, idx) => `
            <div style="position: relative;">
              <div style="position: absolute; left: -31px; top: 0; width: 20px; height: 20px; border-radius: 50%; background: ${idx <= currentStatusIndex ? 'var(--color-primary)' : '#e0e0e0'}; border: 4px solid #fff; box-shadow: 0 0 0 2px ${idx <= currentStatusIndex ? 'var(--color-primary-light)' : 'transparent'};"></div>
              <div>
                <span style="font-weight: 700; display: block; color: ${idx <= currentStatusIndex ? 'var(--color-text)' : 'var(--color-text-lighter)'};">
                  ${dict.orderTracking.statuses[step.status]}
                </span>
                <span style="font-size: 0.85rem; color: var(--color-text-light); line-height: 1.5; display: block;">${step.note[currentLang]}</span>
                <span style="font-size: 0.75rem; color: var(--color-text-muted); display: block; margin-top: 3px;">
                  ${new Date(step.date).toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          `).reverse().join('')}
        </div>
      </div>
    `;
  });
}

// --- Contact Form ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const dict = TRANSLATIONS[currentLang];
    const statusBox = document.getElementById('contact-status-box');
    
    btn.disabled = true;
    btn.innerText = dict.common.loading;

    const keyInput = form.querySelector('input[name="access_key"]');
    const apiKey = keyInput ? keyInput.value.trim() : '';

    if (apiKey && apiKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
      try {
        const formData = new FormData(form);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        
        if (result.success) {
          form.reset();
          statusBox.innerHTML = `
            <div style="padding: 15px; background-color: var(--color-success-light); border: 1px solid var(--color-success); color: var(--color-success); border-radius: 8px; font-weight: 600; text-align: center;">
              ${dict.contact.successMessage}
            </div>
          `;
        } else {
          throw new Error(result.message || 'Form gönderilemedi.');
        }
      } catch (err) {
        statusBox.innerHTML = `
          <div style="padding: 15px; background-color: rgba(220, 53, 69, 0.1); border: 1px solid #dc3545; color: #dc3545; border-radius: 8px; font-weight: 600; text-align: center;">
            ${dict.contact.errorMessage} (${err.message})
          </div>
        `;
      } finally {
        btn.disabled = false;
        btn.innerText = dict.contact.sendButton;
      }
    } else {
      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        btn.innerText = dict.contact.sendButton;
        statusBox.innerHTML = `
          <div style="padding: 15px; background-color: var(--color-success-light); border: 1px solid var(--color-success); color: var(--color-success); border-radius: 8px; font-weight: 600; text-align: center;">
            ${dict.contact.successMessage}
          </div>
        `;
      }, 1000);
    }
  });
}

// --- Interactive Chatbot Assistant ---
const CHAT_DATA = {
  tr: {
    welcome: "Merhaba! Ben Zeynep. Zeyno's Crochet sayfasına hoş geldiniz. 🧶 Size nasıl yardımcı olabilirim?",
    options: [
      { id: "recommend", text: "Hediye önerisi alabilir miyim? 🎁" },
      { id: "custom", text: "Kişiye özel sipariş alıyor musunuz?" },
      { id: "order", text: "Ödeme ve sipariş nasıl yapılıyor?" },
      { id: "shipping", text: "Kargo ücreti ve teslimat süresi nedir?" },
      { id: "materials", text: "Kullanılan iplik kalitesi nedir?" }
    ],
    responses: {
      custom: "Evet! Beğendiğiniz modelleri istediğiniz renk ve boyutlarda örüyorum. Tamamen size özel tasarımlar için bana Instagram DM üzerinden mesaj atabilirsiniz. 🌸",
      order: "Siparişlerinizi Instagram DM üzerinden alıyorum. Beğendiğiniz ürünü mesaj olarak ilettiğinizde detayları konuşup siparişinizi kesinleştiriyoruz. Ödemeleri ise Banka Havalesi / EFT ile kabul ediyorum.",
      shipping: "Tüm Türkiye'ye anlaşmalı kargo ile gönderim yapıyorum. Hazırda olan ürünler 2 iş günü içinde kargoya verilir. Özel siparişlerin hazırlanma süresi ise modelin büyüklüğüne göre ortalama 5-10 gündür.",
      materials: "Ürünlerimde genellikle bebek cildine zarar vermeyen %100 pamuklu, anti-alerjik organik iplikler (örneğin amigurumiler için tüylenme yapmayan özel pamuk ipler) kullanıyorum. Güvenle kullanabilirsiniz."
    },
    back: "Başka bir şey sormak ister misiniz?"
  },
  en: {
    welcome: "Hello! I am Zeynep. Welcome to Zeyno's Crochet. 🧶 How can I help you?",
    options: [
      { id: "recommend", text: "Can you recommend a gift? 🎁" },
      { id: "custom", text: "Do you accept custom orders?" },
      { id: "order", text: "How do payment and ordering work?" },
      { id: "shipping", text: "What are shipping fees and delivery times?" },
      { id: "materials", text: "What is the quality of yarn used?" }
    ],
    responses: {
      custom: "Yes! I knit/crochet products in the colors and sizes you prefer. You can contact me via Instagram DM for completely custom designs. 🌸",
      order: "I accept orders via Instagram DM. When you send a message with the product you like, we finalize the details. Payments are accepted via Bank Transfer.",
      shipping: "I ship worldwide! Ready items are shipped within 2 business days. Custom orders take about 5-10 days to prepare depending on the model's complexity.",
      materials: "I generally use 100% organic cotton, hypoallergenic yarns that do not irritate skin (perfect for babies and amigurumis). You can use them with confidence."
    },
    back: "Would you like to ask anything else?"
  }
};

function initChatbot() {
  const existing = document.querySelector('.chat-assistant-container');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.className = 'chat-assistant-container';
  container.innerHTML = `
    <button class="chat-bubble-btn" id="chat-bubble-trigger" aria-label="Destek Asistanı">🧶</button>
    <div class="chat-window" id="chat-assistant-window">
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-avatar">Z</div>
          <div>
            <div class="chat-title">Zeyno's Crochet</div>
            <span style="font-size: 0.75rem; opacity: 0.85; display: flex; align-items: center; gap: 4px;">
              <span style="width: 8px; height: 8px; background-color: #2ec4b6; border-radius: 50%; display: inline-block;"></span>
              ${currentLang === 'tr' ? 'Çevrimiçi' : 'Online'}
            </span>
          </div>
        </div>
        <button class="chat-close-btn" id="chat-close-trigger">✕</button>
      </div>
      <div class="chat-body" id="chat-messages-container">
        <!-- Messages will float here -->
      </div>
      <div class="chat-options-container" id="chat-options-box">
        <!-- Option buttons will render here -->
      </div>
    </div>
  `;

  document.body.appendChild(container);

  const bubbleBtn = document.getElementById('chat-bubble-trigger');
  const chatWindow = document.getElementById('chat-assistant-window');
  const closeBtn = document.getElementById('chat-close-trigger');
  const msgContainer = document.getElementById('chat-messages-container');

  // Toggle Window
  bubbleBtn.addEventListener('click', () => {
    const isOpen = chatWindow.classList.toggle('chat-open');
    if (isOpen && msgContainer.children.length === 0) {
      loadInitialChat();
    }
  });

  closeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('chat-open');
  });

  function loadInitialChat() {
    msgContainer.innerHTML = '';
    showBotMessage(CHAT_DATA[currentLang].welcome, () => {
      showOptions(CHAT_DATA[currentLang].options);
    });
  }

  function showBotMessage(text, callback) {
    // Show typing indicator
    const typing = document.createElement('div');
    typing.className = 'chat-typing-indicator';
    typing.innerHTML = `
      <div class="chat-typing-dot"></div>
      <div class="chat-typing-dot"></div>
      <div class="chat-typing-dot"></div>
    `;
    msgContainer.appendChild(typing);
    scrollToBottom();

    setTimeout(() => {
      typing.remove();
      const bubble = document.createElement('div');
      bubble.className = 'chat-message chat-message-bot';
      bubble.innerHTML = text;
      msgContainer.appendChild(bubble);
      scrollToBottom();
      if (callback) callback();
    }, 1000);
  }

  function showUserMessage(text) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-message chat-message-user';
    bubble.innerHTML = text;
    msgContainer.appendChild(bubble);
    scrollToBottom();
  }

  function showOptions(options) {
    const optionsBox = document.getElementById('chat-options-box');
    optionsBox.innerHTML = options.map(opt => `
      <button class="chat-option-btn" data-id="${opt.id}">${opt.text}</button>
    `).join('');

    // Add option click events
    optionsBox.querySelectorAll('.chat-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const text = e.target.innerText;
        handleOptionClick(id, text);
      });
    });
  }

  function handleOptionClick(id, text) {
    // 1. Clear options container to prevent double clicking
    const optionsBox = document.getElementById('chat-options-box');
    optionsBox.innerHTML = '';

    // 2. Add user message bubble
    showUserMessage(text);

    // 3. Handle gift recommendations branching
    if (id === 'recommend') {
      setTimeout(() => {
        showBotMessage(currentLang === 'tr' ? "Harika! Kimin için hediye bakıyorsunuz?" : "Great! Who are you looking for a gift for?", () => {
          showOptions([
            { id: "rec_baby", text: currentLang === 'tr' ? "👶 Bebekler / Yenidoğanlar" : "👶 Babies / Newborns" },
            { id: "rec_child", text: currentLang === 'tr' ? "🧸 Çocuklar / Oyun Severler" : "🧸 Kids / Toy Lovers" },
            { id: "rec_adult", text: currentLang === 'tr' ? "🏡 Yetişkinler / Ev Dekorasyonu" : "🏡 Adults / Home Decor" },
            { id: "back_to_main", text: currentLang === 'tr' ? "🔙 Ana Menüye Dön" : "🔙 Main Menu" }
          ]);
        });
      }, 500);
      return;
    }

    if (id === 'back_to_main') {
      setTimeout(() => {
        showBotMessage(CHAT_DATA[currentLang].welcome, () => {
          showOptions(CHAT_DATA[currentLang].options);
        });
      }, 500);
      return;
    }

    if (id.startsWith('rec_')) {
      const targetGroup = id.replace('rec_', '');
      let recs = [];
      let groupLabel = '';

      if (targetGroup === 'baby') {
        groupLabel = currentLang === 'tr' ? "Bebekler için en çok tercih edilen el yapımı tasarımlar:" : "Most loved soft handmade items for babies:";
        recs = PRODUCTS.filter(p => p.slug === 'bebek-battaniyesi' || p.slug === 'amigurumi-zurafa' || p.slug === 'amigurumi-tavsan');
      } else if (targetGroup === 'child') {
        groupLabel = currentLang === 'tr' ? "Çocukların bayılacağı sevimli amigurumi oyuncaklar ve aksesuarlar:" : "Cute amigurumi toys and accessories kids will love:";
        recs = PRODUCTS.filter(p => p.slug === 'amigurumi-ayicik' || p.slug === 'orgu-sirt-cantasi');
      } else if (targetGroup === 'adult') {
        groupLabel = currentLang === 'tr' ? "Ev dekorasyonu ve şıklık katacak harika örgü tasarımlar:" : "Cozy knitwear and accessories for adults:";
        recs = PRODUCTS.filter(p => p.slug === 'kadife-kirlent' || p.slug === 'hırka-ceket');
      }

      setTimeout(() => {
        let cardsHtml = `<p style="margin: 0 0 10px 0;">${groupLabel}</p>`;
        
        recs.forEach(p => {
          cardsHtml += `
            <div class="chat-rec-card" onclick="window.location.href='products.html?slug=${p.slug}'" style="display: flex; align-items: center; gap: 10px; background: var(--color-bg); border: 1px solid var(--color-border-light); padding: 8px; border-radius: 8px; margin-top: 8px; cursor: pointer; transition: background 0.2s ease;">
              <img src="${p.image}" style="width: 44px; height: 44px; border-radius: 6px; object-fit: cover;">
              <div style="flex: 1; text-align: left;">
                <div style="font-weight: 700; font-size: 0.8rem; color: var(--color-text); line-height: 1.2;">${p.name[currentLang]}</div>
                <div style="font-size: 0.75rem; color: var(--color-primary); font-weight: 700; margin-top: 2px;">${p.price} ${p.currency}</div>
              </div>
              <span style="font-size: 0.95rem; color: var(--color-primary); font-weight: 800;">→</span>
            </div>
          `;
        });

        showBotMessage(cardsHtml, () => {
          setTimeout(() => {
            showBotMessage(CHAT_DATA[currentLang].back, () => {
              showOptions(CHAT_DATA[currentLang].options);
            });
          }, 1200);
        });
      }, 500);
      return;
    }

    // Default static response
    const responseText = CHAT_DATA[currentLang].responses[id];

    // 4. Send bot reply with typing effect
    setTimeout(() => {
      showBotMessage(responseText, () => {
        // Send a follow-up asking if they want anything else
        setTimeout(() => {
          showBotMessage(CHAT_DATA[currentLang].back, () => {
            // Re-render options + an Instagram direct button
            const followUpOptions = [...CHAT_DATA[currentLang].options];
            showOptions(followUpOptions);
            
            // Add Instagram button helper at the bottom
            const igBtn = document.createElement('button');
            igBtn.className = 'chat-option-btn';
            igBtn.style.borderColor = '#e1306c';
            igBtn.style.color = '#e1306c';
            igBtn.innerHTML = `📸 ${currentLang === 'tr' ? 'Instagram DM ile Yazın' : 'Write on Instagram DM'}`;
            igBtn.addEventListener('click', () => {
              window.open('https://www.instagram.com/zeynoscrochet_/', '_blank');
            });
            optionsBox.appendChild(igBtn);
          });
        }, 800);
      });
    }, 500);
  }

  function scrollToBottom() {
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }
}

// --- Custom Order Wizard ---
const WIZARD_DATA = {
  tr: {
    steps: ["Ürün Tipi", "Boyut", "İplik Türü", "Ekstra Detaylar", "Tasarım Özeti"],
    productTypes: {
      title: "1. Ürün Tipini Seçin",
      options: [
        { id: "baby-blanket", name: "Bebek Battaniyesi", price: 500, icon: "👶" },
        { id: "amigurumi", name: "Amigurumi Oyuncak", price: 200, icon: "🧸" },
        { id: "beanie-scarf", name: "Atkı & Bere Seti", price: 150, icon: "🧣" },
        { id: "cardigan", name: "Hırka / Kazak", price: 400, icon: "🧥" },
        { id: "home-decor", name: "Kırlent / Ev Örtüsü", price: 300, icon: "🏡" }
      ]
    },
    sizes: {
      title: "2. Boyut Seçin",
      options: [
        { id: "small", name: "Küçük / Standart (x1.0)", factor: 1.0, desc: "Bebek boy, küçük oyuncak veya standart aksesuar." },
        { id: "medium", name: "Orta Boy (x1.4)", factor: 1.4, desc: "Çocuk boy, orta boy oyuncak veya çift dolamalı atkı." },
        { id: "large", name: "Büyük Boy (x1.8)", factor: 1.8, desc: "Tek/çift kişilik battaniye veya oversize hırka." }
      ]
    },
    yarns: {
      title: "3. İplik Türünü Seçin",
      options: [
        { id: "acrylic", name: "Yumuşak Akrilik (+0 TL)", price: 0, desc: "Ekonomik, dayanıklı ve günlük kullanıma uygun." },
        { id: "organic-cotton", name: "Organik Pamuk (+50 TL)", price: 50, desc: "Anti-alerjik, hassas bebek ciltleri için ideal." },
        { id: "wool-blend", name: "Yumuşak Yün Karışımı (+70 TL)", price: 70, desc: "Kış ayları için sıcacık tutan doğal yün yapısı." },
        { id: "velvet", name: "Kadife İplik (+60 TL)", price: 60, desc: "Pofuduk, yumuşacık ve kalın örgü dokusu." }
      ]
    },
    extras: {
      title: "4. Ekstra Detaylar (İsteğe Bağlı)",
      options: [
        { id: "embroidery", name: "İsim / Desen Nakışı (+80 TL)", price: 80 },
        { id: "lining", name: "Kumaş Astar Ekleme (+100 TL)", price: 100 },
        { id: "pompon", name: "Ponponlar veya Saçaklar (+40 TL)", price: 40 },
        { id: "giftbox", name: "Özel Hediye Paketleme (+30 TL)", price: 30 }
      ]
    },
    summary: {
      title: "5. Sipariş Tasarım Özeti",
      subtitle: "Tasarımınız hazır! Aşağıdaki detayları kopyalayarak Instagram DM üzerinden siparişinizi başlatabilirsiniz.",
      estimateLabel: "Tahmini Fiyat Aralığı",
      copyBtn: "Tasarım Detaylarını Kopyala",
      copiedBtn: "Detaylar Kopyalandı! 📋",
      igBtn: "Instagram DM'e Git",
      tip: "Kopyalanan metni Instagram DM'den göndererek Zeynep Hanım ile iletişime geçebilirsiniz."
    }
  },
  en: {
    steps: ["Product Type", "Size", "Yarn Type", "Extras", "Summary"],
    productTypes: {
      title: "1. Select Product Type",
      options: [
        { id: "baby-blanket", name: "Baby Blanket", price: 500, icon: "👶" },
        { id: "amigurumi", name: "Amigurumi Toy", price: 200, icon: "🧸" },
        { id: "beanie-scarf", name: "Scarf & Beanie Set", price: 150, icon: "🧣" },
        { id: "cardigan", name: "Cardigan / Sweater", price: 400, icon: "🧥" },
        { id: "home-decor", name: "Pillow / Home Throw", price: 300, icon: "🏡" }
      ]
    },
    sizes: {
      title: "2. Select Size",
      options: [
        { id: "small", name: "Small / Standard (x1.0)", factor: 1.0, desc: "Baby size, small toy, or standard accessory." },
        { id: "medium", name: "Medium Size (x1.4)", factor: 1.4, desc: "Child size, medium toy, or double wrap scarf." },
        { id: "large", name: "Large Size (x1.8)", factor: 1.8, desc: "Single/double blanket or oversize cardigan." }
      ]
    },
    yarns: {
      title: "3. Select Yarn Type",
      options: [
        { id: "acrylic", name: "Soft Acrylic (+0 TL)", price: 0, desc: "Affordable, durable, and suitable for daily use." },
        { id: "organic-cotton", name: "Organic Cotton (+50 TL)", price: 50, desc: "Hypoallergenic, ideal for sensitive baby skin." },
        { id: "wool-blend", name: "Soft Wool Blend (+70 TL)", price: 70, desc: "Cozy natural wool structure that keeps warm in winter." },
        { id: "velvet", name: "Velvet Yarn (+60 TL)", price: 60, desc: "Fluffy, extra soft, and thick knitted texture." }
      ]
    },
    extras: {
      title: "4. Extra Details (Optional)",
      options: [
        { id: "embroidery", name: "Name / Motif Embroidery (+80 TL)", price: 80 },
        { id: "lining", name: "Fabric Lining Attachment (+100 TL)", price: 100 },
        { id: "pompon", name: "Pompons or Tassels (+40 TL)", price: 40 },
        { id: "giftbox", name: "Special Gift Wrapping (+30 TL)", price: 30 }
      ]
    },
    summary: {
      title: "5. Custom Design Summary",
      subtitle: "Your design is ready! Copy the details below to start your order via Instagram DM.",
      estimateLabel: "Estimated Price Range",
      copyBtn: "Copy Design Details",
      copiedBtn: "Details Copied! 📋",
      igBtn: "Go to Instagram DM",
      tip: "Paste the copied details in Instagram DM to start custom order consulting."
    }
  }
};

let wizardState = {
  step: 0,
  productType: "baby-blanket",
  size: "small",
  yarn: "acrylic",
  extras: [],
  giftNote: ""
};

function initCustomOrderWizard() {
  const wizardRoot = document.getElementById('wizard-container-root');
  if (!wizardRoot) return;
  
  wizardState = {
    step: 0,
    productType: "baby-blanket",
    size: "small",
    yarn: "acrylic",
    extras: [],
    giftNote: ""
  };

  renderWizard();
  initYarnLibrary();
}

function renderWizard() {
  const root = document.getElementById('wizard-container-root');
  if (!root) return;

  const data = WIZARD_DATA[currentLang];
  const stepsCount = data.steps.length;

  root.innerHTML = `
    <!-- Step progress bar -->
    <div class="wizard-progress-bar" style="display: flex; justify-content: space-between; margin-bottom: 40px; position: relative;">
      <div style="position: absolute; top: 12px; left: 0; right: 0; height: 3px; background: #e0e0e0; z-index: 1;">
        <div style="width: ${(wizardState.step / (stepsCount - 1)) * 100}%; height: 100%; background: var(--color-primary); transition: width 0.3s ease;"></div>
      </div>
      ${data.steps.map((st, i) => `
        <div style="z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <div style="width: 28px; height: 28px; border-radius: 50%; background: ${i <= wizardState.step ? 'var(--color-primary)' : '#e0e0e0'}; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.85rem; transition: background 0.3s;">
            ${i + 1}
          </div>
          <span style="font-size: 0.75rem; font-weight: ${i === wizardState.step ? '700' : '500'}; color: ${i <= wizardState.step ? 'var(--color-text)' : 'var(--color-text-muted)'}; text-align: center;">${st}</span>
        </div>
      `).join('')}
    </div>

    <!-- Step Content Card -->
    <div class="card" style="padding: 40px; background: #fff; border: 1px solid var(--color-border); border-radius: 16px; min-height: 380px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--shadow-md);">
      <div>
        ${renderStepContent()}
      </div>

      <!-- Navigation buttons -->
      <div style="display: flex; justify-content: space-between; margin-top: 30px; border-top: 1px solid var(--color-border); padding-top: 20px;">
        <button class="btn btn-outline" onclick="wizardPrev()" ${wizardState.step === 0 ? 'disabled style="opacity: 0.5; pointer-events: none;"' : ''}>
          ← ${currentLang === 'tr' ? 'Geri' : 'Back'}
        </button>
        ${wizardState.step < stepsCount - 1 ? `
          <button class="btn btn-primary" onclick="wizardNext()">
            ${currentLang === 'tr' ? 'İleri' : 'Next'} →
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

function renderStepContent() {
  const data = WIZARD_DATA[currentLang];
  switch (wizardState.step) {
    case 0:
      return `
        <h2 style="font-size: 1.3rem; margin-bottom: 20px; font-weight: 700;">${data.productTypes.title}</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 15px;">
          ${data.productTypes.options.map(opt => `
            <div class="wizard-option-card ${wizardState.productType === opt.id ? 'active' : ''}" onclick="selectProductType('${opt.id}')">
              <span style="font-size: 2.2rem; display: block; margin-bottom: 8px;">${opt.icon}</span>
              <span style="font-weight: 700; font-size: 0.95rem; display: block;">${opt.name}</span>
              <span style="font-size: 0.85rem; color: var(--color-primary); font-weight: 600; margin-top: 4px; display: block;">Taban: ${opt.price} TL</span>
            </div>
          `).join('')}
        </div>
      `;
    case 1:
      return `
        <h2 style="font-size: 1.3rem; margin-bottom: 20px; font-weight: 700;">${data.sizes.title}</h2>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${data.sizes.options.map(opt => `
            <div class="wizard-option-list-item ${wizardState.size === opt.id ? 'active' : ''}" onclick="selectSize('${opt.id}')">
              <div style="display: flex; align-items: center; gap: 15px;">
                <input type="radio" name="size-group" ${wizardState.size === opt.id ? 'checked' : ''} style="accent-color: var(--color-primary); width: 18px; height: 18px;">
                <div>
                  <span style="font-weight: 700; display: block;">${opt.name}</span>
                  <span style="font-size: 0.85rem; color: var(--color-text-light);">${opt.desc}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    case 2:
      return `
        <h2 style="font-size: 1.3rem; margin-bottom: 20px; font-weight: 700;">${data.yarns.title}</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 15px;">
          ${data.yarns.options.map(opt => `
            <div class="wizard-option-card ${wizardState.yarn === opt.id ? 'active' : ''}" onclick="selectYarn('${opt.id}')" style="text-align: left; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <span style="font-weight: 700; display: block; font-size: 0.95rem; margin-bottom: 6px;">${opt.name}</span>
                <span style="font-size: 0.8rem; color: var(--color-text-light); line-height: 1.4; display: block;">${opt.desc}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    case 3:
      return `
        <h2 style="font-size: 1.3rem; margin-bottom: 20px; font-weight: 700;">${data.extras.title}</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 15px;">
          ${data.extras.options.map(opt => {
            const isChecked = wizardState.extras.includes(opt.id);
            return `
              <div class="wizard-option-card ${isChecked ? 'active' : ''}" onclick="toggleExtra('${opt.id}')" style="text-align: left; padding: 20px; display: flex; align-items: center; gap: 12px; flex-direction: row; justify-content: flex-start;">
                <input type="checkbox" ${isChecked ? 'checked' : ''} style="accent-color: var(--color-primary); width: 18px; height: 18px; pointer-events: none;">
                <span style="font-weight: 700; font-size: 0.9rem;">${opt.name}</span>
              </div>
            `;
          }).join('')}
        </div>
        <div style="margin-top: 25px; border-top: 1px dashed var(--color-border); padding-top: 20px;">
          <label style="font-weight: 700; font-size: 0.9rem; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; color: var(--color-text);">
            🎁 ${currentLang === 'tr' ? 'Hediye Notu Ekleyin (İsteğe Bağlı):' : 'Add Gift Note (Optional):'}
          </label>
          <textarea id="wizard-gift-note-input" placeholder="${currentLang === 'tr' ? 'Sevdiklerinize ulaştırılmak üzere eklemek istediğiniz hediye notunu buraya yazabilirsiniz...' : 'Write your personalized gift message here...'}" style="width: 100%; height: 80px; padding: 12px; border: 1px solid var(--color-border); border-radius: var(--radius-md); font-family: var(--font-body); font-size: 0.9rem; resize: none;" oninput="updateGiftNote(this.value)">${wizardState.giftNote || ''}</textarea>
        </div>
      `;
    case 4:
      const { summaryText, minPrice, maxPrice } = calculateWizardResults();
      return `
        <h2 style="font-size: 1.3rem; margin-bottom: 10px; font-weight: 700; text-align: center;">${data.summary.title}</h2>
        <p style="text-align: center; color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 25px;">${data.summary.subtitle}</p>
        
        <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 30px; align-items: start; flex-wrap: wrap;">
          <!-- Left side: Summary Box -->
          <div>
            <textarea id="wizard-summary-text" readonly style="width: 100%; height: 210px; padding: 15px; border-radius: 12px; border: 1px dashed var(--color-primary); font-family: monospace; font-size: 0.85rem; line-height: 1.5; color: var(--color-text); outline: none; background-color: var(--color-bg-soft); resize: none;">${summaryText}</textarea>
            <button class="btn btn-primary" id="wizard-copy-btn" onclick="copyWizardDetails()" style="width: 100%; margin-top: 15px;">
              ${data.summary.copyBtn}
            </button>
          </div>
          <!-- Right side: Price Estimate & CTA -->
          <div style="background-color: var(--color-bg-soft); padding: 30px; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 15px; min-height: 210px; text-align: center; border: 1px solid var(--color-border-light);">
            <span style="font-size: 0.8rem; font-weight: 800; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 1px;">🏷️ ${data.summary.estimateLabel}</span>
            <div style="font-size: 2.2rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-heading);">
              ${minPrice} - ${maxPrice} TL
            </div>
            <p style="font-size: 0.85rem; color: var(--color-text-light); max-width: 250px;">
              ${data.summary.tip}
            </p>
            <a href="https://www.instagram.com/zeynoscrochet_/" target="_blank" rel="noopener noreferrer" class="btn btn-instagram" style="width: 100%; margin-top: 10px; text-align: center;">
              📸 ${data.summary.igBtn}
            </a>
          </div>
        </div>
      `;
  }
}

function selectProductType(id) {
  wizardState.productType = id;
  renderWizard();
}

function selectSize(id) {
  wizardState.size = id;
  renderWizard();
}

function selectYarn(id) {
  wizardState.yarn = id;
  renderWizard();
}

function toggleExtra(id) {
  const index = wizardState.extras.indexOf(id);
  if (index > -1) {
    wizardState.extras.splice(index, 1);
  } else {
    wizardState.extras.push(id);
  }
  renderWizard();
}

function wizardNext() {
  wizardState.step++;
  renderWizard();
}

function wizardPrev() {
  wizardState.step--;
  renderWizard();
}

function calculateWizardResults() {
  const data = WIZARD_DATA[currentLang];
  
  const prodOpt = data.productTypes.options.find(o => o.id === wizardState.productType);
  const sizeOpt = data.sizes.options.find(o => o.id === wizardState.size);
  const yarnOpt = data.yarns.options.find(o => o.id === wizardState.yarn);
  const selectedExtras = data.extras.options.filter(o => wizardState.extras.includes(o.id));

  const baseVal = prodOpt.price;
  const factor = sizeOpt.factor;
  const yarnPrice = yarnOpt.price;
  const extrasPrice = selectedExtras.reduce((sum, item) => sum + item.price, 0);

  const minPrice = Math.round((baseVal * factor) + yarnPrice + extrasPrice);
  const maxPrice = Math.round(minPrice + (minPrice * 0.15));

  const extrasStr = selectedExtras.length > 0 
    ? selectedExtras.map(e => e.name.split(" (+")[0]).join(", ") 
    : (currentLang === 'tr' ? "Yok" : "None");

  const giftNoteStr = wizardState.giftNote && wizardState.giftNote.trim() !== ''
    ? `\n• ${currentLang === 'tr' ? 'Hediye Notu' : 'Gift Note'}: "${wizardState.giftNote.trim()}"`
    : '';

  const summaryText = `🧶 Zeyno's Crochet - ${currentLang === 'tr' ? 'Özel Sipariş Tasarımı' : 'Custom Order Design'} 🧶\n--------------------------------------------\n• ${currentLang === 'tr' ? 'Ürün Tipi' : 'Product Type'}: ${prodOpt.name}\n• ${currentLang === 'tr' ? 'Boyut' : 'Size'}: ${sizeOpt.name.split(" (x")[0]}\n• ${currentLang === 'tr' ? 'İplik Türü' : 'Yarn Type'}: ${yarnOpt.name.split(" (+")[0]}\n• ${currentLang === 'tr' ? 'Ekstra Detaylar' : 'Extra Details'}: ${extrasStr}${giftNoteStr}\n• ${currentLang === 'tr' ? 'Tahmini Fiyat' : 'Estimated Price'}: ${minPrice} - ${maxPrice} TL\n--------------------------------------------\n${currentLang === 'tr' ? 'Siparişinizi başlatmak için bu metni kopyalayıp Instagram DM\'den bana gönderebilirsiniz! 🌸' : 'Copy this text and send it in Instagram DM to start custom consulting! 🌸'}`;

  return { summaryText, minPrice, maxPrice };
}

function copyWizardDetails() {
  const textarea = document.getElementById('wizard-summary-text');
  if (!textarea) return;

  textarea.select();
  textarea.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(textarea.value);

  const copyBtn = document.getElementById('wizard-copy-btn');
  const data = WIZARD_DATA[currentLang];
  copyBtn.innerText = data.summary.copiedBtn;
  copyBtn.style.backgroundColor = 'var(--color-success)';
  copyBtn.style.borderColor = 'var(--color-success)';
  copyBtn.style.color = '#fff';

  setTimeout(() => {
    copyBtn.innerText = data.summary.copyBtn;
    copyBtn.style.backgroundColor = '';
    copyBtn.style.borderColor = '';
    copyBtn.style.color = '';
  }, 3000);
}

// Bind to window to allow HTML inline event listener triggers
window.wizardPrev = wizardPrev;
window.wizardNext = wizardNext;
window.selectProductType = selectProductType;
window.selectSize = selectSize;
window.selectYarn = selectYarn;
window.toggleExtra = toggleExtra;
window.copyWizardDetails = copyWizardDetails;
window.updateGiftNote = function(val) {
  wizardState.giftNote = val;
};

function initBackToTopButton() {
  let btn = document.getElementById('back-to-top-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top-btn';
    btn.setAttribute('aria-label', 'Yukarı Çık');
    btn.innerHTML = '↑';
    btn.className = 'back-to-top-btn';
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Wishlist Helper Logic ---
function getFavorites() {
  const data = localStorage.getItem('zeyno_favorites');
  return data ? JSON.parse(data) : [];
}

function toggleFavorite(id, btnEl) {
  let favs = getFavorites();
  const index = favs.indexOf(id);
  let isWished = false;

  if (index > -1) {
    favs.splice(index, 1);
    isWished = false;
  } else {
    favs.push(id);
    isWished = true;
  }

  localStorage.setItem('zeyno_favorites', JSON.stringify(favs));

  if (btnEl) {
    if (isWished) {
      btnEl.classList.add('wished');
      btnEl.innerHTML = '❤️';
    } else {
      btnEl.classList.remove('wished');
      btnEl.innerHTML = '🤍';
    }
  }

  if (window.location.pathname.includes('products.html') && activeCategory === 'wishlist') {
    renderProductsGrid();
  }
}

function initWishlistPage() {
  const gridRoot = document.getElementById('wishlist-grid-root');
  if (!gridRoot) return;

  const dict = TRANSLATIONS[currentLang];
  const favs = getFavorites();
  
  const favoritedProducts = PRODUCTS.filter(p => favs.includes(p.id));

  if (favoritedProducts.length === 0) {
    gridRoot.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: var(--color-bg-soft); border-radius: 16px; border: 1px dashed var(--color-border); box-shadow: var(--shadow-sm);">
        <span style="font-size: 3.5rem; display: block; margin-bottom: 15px;">🧶</span>
        <p style="font-size: 1.15rem; color: var(--color-text-light); max-width: 400px; margin: 0 auto 25px; line-height: 1.6;">
          ${dict.wishlist.empty}
        </p>
        <a href="products.html" class="btn btn-primary" style="display: inline-block;">${dict.hero.cta}</a>
      </div>
    `;
    return;
  }

  gridRoot.innerHTML = `
    <div class="product-grid" style="grid-column: 1/-1;">
      ${favoritedProducts.map((p, index) => {
        const badgeText = p.inStock ? dict.products.inStock : dict.products.outOfStock;
        const badgeClass = p.inStock ? 'badge-success' : 'badge-danger';
        return `
          <div class="card product-card" style="animation-delay: ${index * 80}ms">
            <div class="card-image-wrapper">
              <img class="card-image" src="${p.image}" alt="${p.name[currentLang]}">
              <button class="wishlist-btn wished" onclick="toggleFavorite('${p.id}', this)" aria-label="Remove from Wishlist">
                ❤️
              </button>
              <div class="product-card-overlay">
                <a href="products.html?slug=${p.slug}" class="btn btn-primary btn-sm">${dict.products.viewDetails}</a>
              </div>
              <span class="badge ${badgeClass}" style="position: absolute; top: 10px; left: 10px;">${badgeText}</span>
            </div>
            <div class="card-body">
              <h3 class="product-card-name">${p.name[currentLang]}</h3>
              <div class="product-card-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
                <span class="product-card-price">${p.price} ${p.currency}</span>
                <a href="https://www.instagram.com/zeynoscrochet_/" target="_blank" rel="noopener noreferrer" class="btn btn-instagram btn-sm" style="font-size: 0.8rem; padding: 6px 12px;">
                  📸 DM
                </a>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Bulk Wishlist Order Card -->
    <div style="grid-column: 1/-1; background-color: var(--color-bg-soft); padding: 30px; border-radius: 16px; border: 1px solid var(--color-border-light); margin-top: 40px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 15px;">
      <h3 class="font-playfair" style="font-size: 1.4rem;">💖 ${currentLang === 'tr' ? 'Toplu Sipariş Talebi' : 'Bulk Order Request'}</h3>
      <p style="color: var(--color-text-light); max-width: 500px; font-size: 0.95rem;">
        ${currentLang === 'tr' ? 'Favorilerinize eklediğiniz tüm ürünlerin dökümünü tek tıkla kopyalayıp Instagram DM\'den sipariş verebilirsiniz!' : 'Copy the summary of all your favorites with one click and place your order directly via Instagram DM!'}
      </p>
      <button class="btn btn-primary" id="wishlist-order-btn" onclick="copyWishlistDetails()" style="max-width: 320px; width: 100%;">
        ${dict.wishlist.orderAll}
      </button>
      <a href="https://www.instagram.com/zeynoscrochet_/" target="_blank" rel="noopener noreferrer" class="btn btn-instagram btn-outline" style="max-width: 320px; width: 100%; text-align: center; margin-top: 10px;">
        📸 ${currentLang === 'tr' ? "Instagram DM'e Git" : "Go to Instagram DM"}
      </a>
    </div>
  `;
}

function copyWishlistDetails() {
  const dict = TRANSLATIONS[currentLang];
  const favs = getFavorites();
  const favoritedProducts = PRODUCTS.filter(p => favs.includes(p.id));

  if (favoritedProducts.length === 0) return;

  const itemsList = favoritedProducts.map(p => `• ${p.name[currentLang]} (${p.price} TL)`).join('\n');
  const totalPrice = favoritedProducts.reduce((sum, p) => sum + p.price, 0);

  const copyText = `🧶 Zeyno's Crochet - ${currentLang === 'tr' ? 'Favori Ürünler Sipariş Talebi' : 'Favorite Products Order Request'} 🧶\n--------------------------------------------\n${itemsList}\n--------------------------------------------\n💰 ${currentLang === 'tr' ? 'Toplam Tutar' : 'Total Price'}: ${totalPrice} TL\n\n${currentLang === 'tr' ? 'Bu ürünleri sipariş etmek istiyorum! 🌸' : 'I would like to order these items! 🌸'}`;

  navigator.clipboard.writeText(copyText);

  const orderBtn = document.getElementById('wishlist-order-btn');
  orderBtn.innerText = dict.wishlist.copied;
  orderBtn.style.backgroundColor = 'var(--color-success)';
  orderBtn.style.borderColor = 'var(--color-success)';
  orderBtn.style.color = '#fff';

  setTimeout(() => {
    orderBtn.innerText = dict.wishlist.orderAll;
    orderBtn.style.backgroundColor = '';
    orderBtn.style.borderColor = '';
    orderBtn.style.color = '';
  }, 3000);
}

// Bind to window to allow inline DOM clicks
window.toggleFavorite = toggleFavorite;
window.getFavorites = getFavorites;
window.initWishlistPage = initWishlistPage;
window.copyWishlistDetails = copyWishlistDetails;

// --- FAQ Accordion & Advanced Search Logic ---
function initFAQAccordion() {
  const accordion = document.getElementById('faq-accordion');
  if (!accordion || accordion.dataset.initialized) return;

  accordion.dataset.initialized = "true";
  const questions = accordion.querySelectorAll('.faq-question');
  
  // Accordion click toggle
  questions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isActive = item.classList.contains('active');
      item.classList.toggle('active', !isActive);
    });
  });

  // Live Search Filtering
  const searchInput = document.getElementById('faq-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const items = accordion.querySelectorAll('.faq-item');
      const categories = accordion.querySelectorAll('.faq-category-section');
      const emptyMsg = document.getElementById('faq-empty-search');

      let visibleCount = 0;

      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (!query || text.includes(query)) {
          item.style.display = 'block';
          visibleCount++;
          if (query) item.classList.add('active');
        } else {
          item.style.display = 'none';
          if (query) item.classList.remove('active');
        }
      });

      categories.forEach(cat => {
        const hasVisibleItems = Array.from(cat.querySelectorAll('.faq-item')).some(i => i.style.display !== 'none');
        cat.style.display = hasVisibleItems ? 'block' : 'none';
      });

      if (emptyMsg) {
        emptyMsg.style.display = (visibleCount === 0 && query !== '') ? 'block' : 'none';
      }
    });
  }

  // Expand / Collapse All Toggle
  const toggleAllBtn = document.getElementById('faq-toggle-all-btn');
  if (toggleAllBtn) {
    let allExpanded = false;
    toggleAllBtn.addEventListener('click', () => {
      allExpanded = !allExpanded;
      const items = accordion.querySelectorAll('.faq-item');
      items.forEach(i => i.classList.toggle('active', allExpanded));
      toggleAllBtn.innerHTML = allExpanded 
        ? '▲ ' + (currentLang === 'tr' ? 'Tümünü Kapat' : 'Collapse All')
        : '▼ ' + (currentLang === 'tr' ? 'Tümünü Aç' : 'Expand All');
    });
  }

  // Category Pills Filter
  const pills = document.querySelectorAll('.faq-category-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const categoryTarget = pill.getAttribute('data-cat');
      const categories = accordion.querySelectorAll('.faq-category-section');

      categories.forEach(cat => {
        if (categoryTarget === 'all' || cat.getAttribute('data-cat-id') === categoryTarget) {
          cat.style.display = 'block';
          Array.from(cat.querySelectorAll('.faq-item')).forEach(i => i.style.display = 'block');
        } else {
          cat.style.display = 'none';
        }
      });

      if (searchInput) searchInput.value = '';
      const emptyMsg = document.getElementById('faq-empty-search');
      if (emptyMsg) emptyMsg.style.display = 'none';
    });
  });
}

window.initFAQAccordion = initFAQAccordion;

// --- Yarn & Color Library Logic ---
const YARN_LIBRARY_DATA = {
  tr: [
    {
      id: "baby-cotton",
      name: "👶 Organik Bebek Pamuğu",
      desc: "%100 organik pamuk iplik. İnanılmaz yumuşak dokusu sayesinde bebek battaniyeleri, amigurumi oyuncaklar ve bebek giysileri için en ideal seçenektir. Anti-alerjiktir ve tüylenme yapmaz.",
      colors: [
        { name: "Pastel Pembe", hex: "#f3c6cf" },
        { name: "Pastel Mavi", hex: "#b2d8d8" },
        { name: "Mint Yeşili", hex: "#cbe3db" },
        { name: "Sıcak Ekru", hex: "#fbf7f0" },
        { name: "Limon Sarısı", hex: "#faf0af" }
      ]
    },
    {
      id: "chenille-velvet",
      name: "🧸 Yumuşak Kadife İplik",
      desc: "Kalın, dolgun ve kadifemsi pürüzsüz bir dokuya sahiptir. Özellikle kışlık kalın hırkalar, dekoratif oda yastıkları ve ağır yatak battaniyeleri için harika bir sıcaklık sunar.",
      colors: [
        { name: "Sıcak Bej", hex: "#ecdcb9" },
        { name: "Bal Hardalı", hex: "#e3a857" },
        { name: "Kiremit Kızılı", hex: "#b33a1b" },
        { name: "Kar Ekru", hex: "#fbf7f0" },
        { name: "Duman Grisi", hex: "#b2beb5" }
      ]
    },
    {
      id: "wool-blend",
      name: "🧣 Dokulu Yün Karışımı",
      desc: "Sıcak tutma oranı yüksek, dokulu ve otantik el örgüsü görünümü sunan ipliktir. Şık boyunluklar, kışlık atkı-bereler, kalın şallar ve hırkalar için tercih edilir.",
      colors: [
        { name: "Hardal", hex: "#e3a857" },
        { name: "Kömür Grisi", hex: "#3a3b3c" },
        { name: "Orman Yeşili", hex: "#2d5a27" },
        { name: "Kiremit", hex: "#b33a1b" },
        { name: "Doğal Ekru", hex: "#fbf7f0" }
      ]
    },
    {
      id: "puffy-loop",
      name: "☁️ Puffy Pofuduk İplik",
      desc: "Herhangi bir tığ veya şiş kullanılmadan, sadece parmaklarla örülen kendinden ilmekli pofuduk ipliktir. Puf yapısı sayesinde hafif ve inanılmaz derecede yumuşak pofuduk battaniyeler üretir.",
      colors: [
        { name: "Pudra Pembe", hex: "#ecd6d8" },
        { name: "Soft Mint", hex: "#cbe3db" },
        { name: "Bebek Mavisi", hex: "#aec6cf" },
        { name: "Krem", hex: "#fffdd0" },
        { name: "Kar Beyazı", hex: "#ffffff" }
      ]
    }
  ],
  en: [
    {
      id: "baby-cotton",
      name: "👶 Organic Baby Cotton",
      desc: "100% organic cotton yarn. Thanks to its incredibly soft texture, it is the best option for baby blankets, amigurumi toys, and baby garments. Hypoallergenic and anti-pilling.",
      colors: [
        { name: "Pastel Pink", hex: "#f3c6cf" },
        { name: "Pastel Blue", hex: "#b2d8d8" },
        { name: "Mint Green", hex: "#cbe3db" },
        { name: "Warm Ecru", hex: "#fbf7f0" },
        { name: "Lemon Yellow", hex: "#faf0af" }
      ]
    },
    {
      id: "chenille-velvet",
      name: "🧸 Soft Chenille Velvet",
      desc: "Features a thick, dense, and velvety-smooth texture. Provides excellent warmth, especially for winter cardigans, decorative room pillows, and heavy bed blankets.",
      colors: [
        { name: "Warm Beige", hex: "#ecdcb9" },
        { name: "Honey Mustard", hex: "#e3a857" },
        { name: "Brick Red", hex: "#b33a1b" },
        { name: "Snow Ecru", hex: "#fbf7f0" },
        { name: "Smoky Grey", hex: "#b2beb5" }
      ]
    },
    {
      id: "wool-blend",
      name: "🧣 Textured Wool Blend",
      desc: "High warmth retention yarn offering a textured and authentic hand-knitted look. Ideal for elegant neck warmers, winter hats & scarves, thick shawls, and cozy cardigans.",
      colors: [
        { name: "Mustard", hex: "#e3a857" },
        { name: "Charcoal Grey", hex: "#3a3b3c" },
        { name: "Forest Green", hex: "#2d5a27" },
        { name: "Brick", hex: "#b33a1b" },
        { name: "Natural Ecru", hex: "#fbf7f0" }
      ]
    },
    {
      id: "puffy-loop",
      name: "☁️ Puffy Loop Yarn",
      desc: "A self-looped puffy yarn knitted only with fingers, without using crochet hooks or knitting needles. Produces lightweight and incredibly soft baby blankets due to its puffed structure.",
      colors: [
        { name: "Powder Pink", hex: "#ecd6d8" },
        { name: "Soft Mint", hex: "#cbe3db" },
        { name: "Baby Blue", hex: "#aec6cf" },
        { name: "Cream", hex: "#fffdd0" },
        { name: "Snow White", hex: "#ffffff" }
      ]
    }
  ]
};

let activeYarnId = "baby-cotton";

function initYarnLibrary() {
  const tabsRoot = document.getElementById('yarn-tabs-root');
  if (!tabsRoot) return;

  const list = YARN_LIBRARY_DATA[currentLang];
  
  tabsRoot.innerHTML = list.map(y => `
    <button class="yarn-tab-btn ${activeYarnId === y.id ? 'active' : ''}" onclick="selectYarnLibraryTab('${y.id}')">
      ${y.name}
    </button>
  `).join('');

  renderActiveYarnCard();
}

function selectYarnLibraryTab(id) {
  activeYarnId = id;
  initYarnLibrary();
}

function renderActiveYarnCard() {
  const cardRoot = document.getElementById('active-yarn-root');
  if (!cardRoot) return;

  const list = YARN_LIBRARY_DATA[currentLang];
  const y = list.find(item => item.id === activeYarnId);
  if (!y) return;

  cardRoot.innerHTML = `
    <div class="yarn-library-card">
      <h3 class="font-playfair" style="font-size: 1.5rem; color: var(--color-text); margin-bottom: 12px;">${y.name}</h3>
      <p style="color: var(--color-text-light); line-height: 1.7; font-size: 0.95rem; margin-bottom: 25px;">${y.desc}</p>
      
      <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 15px; border-bottom: 1px solid var(--color-border-light); padding-bottom: 8px;">🎨 ${currentLang === 'tr' ? 'MEVCUT RENK SEÇENEKLERİ' : 'AVAILABLE COLORS'}</h4>
      
      <div class="color-swatches-grid">
        ${y.colors.map(c => `
          <div class="color-swatch-item" onclick="toggleColorSwatchActive(this)">
            <div class="color-circle" style="background-color: ${c.hex};"></div>
            <span class="color-name">${c.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function toggleColorSwatchActive(el) {
  const siblings = el.parentElement.querySelectorAll('.color-swatch-item');
  siblings.forEach(s => s.classList.remove('active'));
  el.classList.add('active');
}

window.initYarnLibrary = initYarnLibrary;
window.selectYarnLibraryTab = selectYarnLibraryTab;
window.toggleColorSwatchActive = toggleColorSwatchActive;

// --- Share Product Logic ---
function copyTextFallback(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  textArea.style.padding = "0";
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  textArea.style.background = "transparent";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback copy failed', err);
  }
  document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => {
      copyTextFallback(text);
    });
  } else {
    copyTextFallback(text);
  }
}

function showShareNotification(msg) {
  const notification = document.getElementById('share-notification');
  if (notification) {
    notification.innerText = msg;
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 4000);
  }
}

function shareProduct(name, slug, btnEl) {
  const url = `${window.location.href.split('?')[0]}?slug=${slug}`;
  const shareText = `Zeyno's Crochet - ${name} el emeği örgü tasarımını inceleyin: ${url}`;
  const dict = TRANSLATIONS[currentLang];

  if (navigator.share) {
    navigator.share({
      title: name,
      text: shareText,
      url: url
    }).catch(err => {
      // If user cancels native share, copy to clipboard anyway as fallback
      copyTextToClipboard(shareText);
      showShareNotification(dict.share.copied);
    });
  } else {
    copyTextToClipboard(shareText);
    showShareNotification(dict.share.copied);
  }
}

window.shareProduct = shareProduct;


