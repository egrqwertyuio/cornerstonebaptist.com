// ===== Initialize AOS (Animate On Scroll) =====
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
    delay: 50
  });
});

// ===== Navigation Scroll Effect =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ===== Smooth Scroll for Navigation Links =====
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - navbar.offsetHeight;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== VBS 2025 Carousel =====
const VBS_BASE = 'assets/images/VBS2025/';

// List your VBS media files here
const vbsFiles = [
  // Example files - uncomment and add your actual filenames
  // '20250624_184154.jpg',
  // '20250624_200214.mp4',
  // Add more files as needed
];

function showCarouselError(msg) {
  const container = document.getElementById('vbs-carousel');
  if (!container) return;
  
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    padding: 2rem;
    text-align: center;
    color: #6c757d;
    font-family: var(--font-secondary);
  `;
  errorDiv.innerHTML = `<i class="fas fa-info-circle" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i><p>${msg}</p>`;
  container.innerHTML = '';
  container.appendChild(errorDiv);
  console.info('VBS Carousel:', msg);
}

async function loadGalleryManifest() {
  try {
    const response = await fetch('assets/gallery.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.info('Gallery manifest not found, using inline file list');
    return null;
  }
}

function getMediaType(filename) {
  const lower = String(filename).toLowerCase();
  if (/\.(png|jpe?g|webp|gif|avif)$/.test(lower)) return 'image';
  if (/\.(mp4|webm|ogg|mov|m4v)$/.test(lower)) return 'video';
  return null;
}

function createSlide(item) {
  const slide = document.createElement('div');
  slide.className = 'carousel-slide';
  slide.setAttribute('role', 'listitem');
  
  const type = item.type || item.kind;
  const src = item.src || item.url;
  
  if (type === 'image') {
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = src;
    img.alt = item.name || 'VBS 2025 Photo';
    slide.appendChild(img);
  } else if (type === 'video') {
    const video = document.createElement('video');
    video.controls = true;
    video.preload = 'metadata';
    video.playsInline = true;
    const source = document.createElement('source');
    source.src = src;
    video.appendChild(source);
    slide.appendChild(video);
  }
  
  return slide;
}

function createDots(count, onJump) {
  const dotsContainer = document.getElementById('carouselDots');
  dotsContainer.innerHTML = '';
  
  const dots = [];
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => onJump(i));
    dotsContainer.appendChild(dot);
    dots.push(dot);
  }
  
  return dots;
}

function initCarousel(items) {
  if (!items || items.length === 0) {
    showCarouselError('No VBS 2025 media available yet. Check back soon!');
    return;
  }
  
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  track.innerHTML = '';
  
  // Create slides
  items.forEach(item => {
    track.appendChild(createSlide(item));
  });
  
  const slides = Array.from(track.children);
  let currentIndex = 0;
  
  // Create dots
  const dots = createDots(slides.length, jumpToSlide);
  
  function updateCarousel() {
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
    
    // Pause all videos except current
    slides.forEach((slide, index) => {
      const video = slide.querySelector('video');
      if (video && index !== currentIndex) {
        video.pause();
      }
    });
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }
  
  function jumpToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }
  
  // Button controls
  const hasMultiple = slides.length > 1;
  prevBtn.disabled = !hasMultiple;
  nextBtn.disabled = !hasMultiple;
  
  if (hasMultiple) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
    
    // Auto-play (optional - uncomment to enable)
    // let autoplayInterval;
    // function startAutoplay() {
    //   autoplayInterval = setInterval(nextSlide, 5000);
    // }
    // function stopAutoplay() {
    //   clearInterval(autoplayInterval);
    // }
    // startAutoplay();
    // track.addEventListener('mouseenter', stopAutoplay);
    // track.addEventListener('mouseleave', startAutoplay);
  }
  
  updateCarousel();
}

// Initialize VBS Carousel
async function initVBSGallery() {
  try {
    // First, try to load from gallery.json manifest
    const manifest = await loadGalleryManifest();
    
    if (manifest && manifest.data) {
      // Look for VBS2025 album in manifest
      const vbsAlbum = manifest.data['VBS2025'] || manifest.data['VBS 2025'];
      
      if (vbsAlbum && vbsAlbum.length > 0) {
        console.log(`Loading ${vbsAlbum.length} items from gallery manifest`);
        initCarousel(vbsAlbum);
        return;
      }
    }
    
    // Fallback to inline file list
    if (vbsFiles.length > 0) {
      const items = vbsFiles
        .map(filename => {
          const type = getMediaType(filename);
          return type ? {
            name: filename,
            type: type,
            src: VBS_BASE + filename
          } : null;
        })
        .filter(item => item !== null);
      
      if (items.length > 0) {
        console.log(`Loading ${items.length} items from inline list`);
        initCarousel(items);
        return;
      }
    }
    
    // No media found
    showCarouselError('No VBS 2025 media available yet. Check back soon!');
    
  } catch (error) {
    console.error('VBS Gallery error:', error);
    showCarouselError('Unable to load gallery. Please try again later.');
  }
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVBSGallery);
} else {
  initVBSGallery();
}

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image');
  
  if (heroImage && scrolled < window.innerHeight) {
    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ===== Scroll Reveal Animation for Stats/Numbers =====
function animateNumber(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateNumber() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = target;
    }
  }
  
  updateNumber();
}

// Observe elements with data-count attribute
const countElements = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      const target = parseInt(entry.target.getAttribute('data-count'));
      animateNumber(entry.target, target);
      entry.target.classList.add('counted');
    }
  });
}, { threshold: 0.5 });

countElements.forEach(el => countObserver.observe(el));

// ===== Loading Animation =====
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Refresh AOS after all images are loaded
  setTimeout(() => {
    AOS.refresh();
  }, 500);
});

// ===== Active Navigation Link =====
// Set active state based on current page
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-link');

  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Remove active class from all links first
    link.classList.remove('active');

    // Add active class to current page link
    if (href === currentPage ||
        (currentPage === '' && href === 'index.html') ||
        (currentPage === '/' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show success message (in production, this would submit to a server)
    alert('Thank you for your message! We\'ll get back to you soon.\n\nNote: This is a demo. To make this functional, integrate with a backend service like Formspree or Netlify Forms.');

    // Reset form
    contactForm.reset();

    // In production, you would send this to a server:
    // Example with Formspree:
    // fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // }).then(response => {
    //   if (response.ok) {
    //     alert('Thank you! We\'ll get back to you soon.');
    //     contactForm.reset();
    //   } else {
    //     alert('Sorry, there was an error. Please try again.');
    //   }
    // }).catch(error => {
    //   alert('Sorry, there was an error. Please try again later.');
    // });
  });
}

// ===== Console Welcome Message =====
console.log('%c🏛️ Cornerstone Baptist Church', 'color: #00558c; font-size: 20px; font-weight: bold;');
console.log('%cBuilding Lives on Christ, the Solid Rock', 'color: #f2b428; font-size: 14px;');
console.log('%cWebsite loaded successfully!', 'color: #6c757d; font-size: 12px;');

// ===== Utility Functions =====

// Format phone number
function formatPhoneNumber(phoneNumber) {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phoneNumber;
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ===== Performance Optimizations =====

// Optimize scroll event with throttle
const optimizedScroll = throttle(() => {
  // Scroll-dependent code here
}, 100);

window.addEventListener('scroll', optimizedScroll, { passive: true });

// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading supported
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
} else {
  // Fallback for browsers without native lazy loading
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== Accessibility Enhancements =====

// Focus trap for mobile menu
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  });
}

// Apply focus trap to mobile menu when active
const menuObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.target.classList.contains('active')) {
      trapFocus(navMenu);
    }
  });
});

menuObserver.observe(navMenu, { attributes: true, attributeFilter: ['class'] });

// ===== Error Handling =====
window.addEventListener('error', (e) => {
  console.error('Website error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

// ===== Export for testing (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatPhoneNumber,
    isInViewport,
    debounce,
    throttle
  };
}