/* ============================================
   MAIN JAVASCRIPT - SHARED FUNCTIONALITY
   Navigation, Scroll Effects, Animations
   ============================================ */

// DOM Elements
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-menu a, .mobile-menu a');
const scrollToTopBtn = document.querySelector('.scroll-to-top');
const body = document.body;

// ============================================
// 1. HAMBURGER MENU TOGGLE
// ============================================
function toggleMobileMenu() {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
}

if (hamburger) {
  hamburger.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (hamburger && hamburger.classList.contains('active')) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      body.style.overflow = 'auto';
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (hamburger && mobileMenu) {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      body.style.overflow = 'auto';
    }
  }
});

// ============================================
// 2. NAVBAR SCROLL EFFECT
// ============================================
function handleNavbarScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll);

// ============================================
// 3. ACTIVE NAV LINK DETECTION
// ============================================
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  navLinks.forEach((link) => {
    const href = link.getAttribute('href').split('/').pop() || 'index.html';
    
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ============================================
// 4. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  });
});

// ============================================
// 5. SCROLL TO TOP BUTTON
// ============================================
function showScrollToTop() {
  if (scrollToTopBtn) {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  }
}

window.addEventListener('scroll', showScrollToTop);

if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

// ============================================
// 6. STATS COUNTER ANIMATION
// ============================================
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  
  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const increment = target / 50;
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
            counter.dataset.animated = 'true';
          }
        };

        updateCounter();
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

document.addEventListener('DOMContentLoaded', animateCounters);

// ============================================
// 7. TESTIMONIALS CAROUSEL
// ============================================
let currentTestimonialIndex = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialCounter = document.querySelector('.testimonial-counter');

function showTestimonial(index) {
  if (testimonialCards.length === 0) return;
  
  // Normalize index
  if (index >= testimonialCards.length) {
    currentTestimonialIndex = 0;
  } else if (index < 0) {
    currentTestimonialIndex = testimonialCards.length - 1;
  } else {
    currentTestimonialIndex = index;
  }

  // Hide all testimonials
  testimonialCards.forEach((card) => {
    card.style.display = 'none';
    card.classList.remove('active');
  });

  // Show current testimonial
  if (testimonialCards[currentTestimonialIndex]) {
    testimonialCards[currentTestimonialIndex].style.display = 'block';
    testimonialCards[currentTestimonialIndex].classList.add('active');
    
    // Update counter if it exists
    if (testimonialCounter) {
      testimonialCounter.textContent = `${currentTestimonialIndex + 1} / ${testimonialCards.length}`;
    }
  }
}

function nextTestimonial() {
  showTestimonial(currentTestimonialIndex + 1);
}

function prevTestimonial() {
  showTestimonial(currentTestimonialIndex - 1);
}

// Auto-rotate testimonials every 5 seconds on mobile/tablet, and show all on desktop
function initTestimonialCarousel() {
  if (window.innerWidth < 1024) {
    // Mobile/Tablet: show one testimonial and auto-rotate
    showTestimonial(0);
    setInterval(nextTestimonial, 5000);
  } else {
    // Desktop: show all testimonials
    testimonialCards.forEach((card) => {
      card.style.display = 'block';
    });
  }
}

document.addEventListener('DOMContentLoaded', initTestimonialCarousel);

// Manual carousel controls
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');

if (prevBtn) {
  prevBtn.addEventListener('click', prevTestimonial);
}

if (nextBtn) {
  nextBtn.addEventListener('click', nextTestimonial);
}

// Pause auto-rotate on hover
testimonialCards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    // Could add pause functionality here if needed
  });
});

// ============================================
// 8. FADE-IN ON SCROLL ANIMATION
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  document.querySelectorAll('section, .card, .blog-card').forEach((el) => {
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);

// ============================================
// 9. TABS FUNCTIONALITY
// ============================================
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove('active'));
      tabContents.forEach((content) => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const activeContent = document.getElementById(tabId);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initTabs);

// ============================================
// 10. ACCORDION FUNCTIONALITY
// ============================================
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const accordionItem = header.closest('.accordion-item');
      
      // Check if this item is already active
      if (accordionItem.classList.contains('active')) {
        accordionItem.classList.remove('active');
      } else {
        // Close other accordion items in the same container
        const accordionContainer = accordionItem.closest('.accordion');
        if (accordionContainer) {
          accordionContainer.querySelectorAll('.accordion-item').forEach((item) => {
            item.classList.remove('active');
          });
        }
        
        // Open this item
        accordionItem.classList.add('active');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initAccordions);

// ============================================
// 11. SMOOTH PAGE TRANSITIONS
// ============================================
function addPageTransition() {
  navLinks.forEach((link) => {
    link.addEventListener('click', function(e) {
      // Don't interfere with external links or hash links
      if (this.host !== window.location.host || this.href.includes('#')) {
        return;
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', addPageTransition);

// ============================================
// 12. FORM UTILITIES
// ============================================

// Format phone number as user types
function formatPhoneNumber(input) {
  const value = input.value.replace(/\D/g, '').substring(0, 10);
  
  if (value.length > 0) {
    if (value.length <= 3) {
      input.value = value;
    } else if (value.length <= 6) {
      input.value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
    } else {
      input.value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
    }
  }
}

// Apply phone formatting to all tel inputs
document.querySelectorAll('input[type="tel"]').forEach((input) => {
  input.addEventListener('input', () => formatPhoneNumber(input));
});

// ============================================
// 13. LIGHT PROJECT UTILITIES
// ============================================

// Format date to readable format
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Get URL parameters
function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// ============================================
// 14. UTILITY FUNCTIONS
// ============================================

// Debounce function for scroll events
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

// ============================================
// 15. KEYBOARD ACCESSIBILITY
// ============================================

// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    body.style.overflow = 'auto';
  }
});

// ============================================
// 16. INITIALIZATION ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink();
  initTabs();
  initAccordions();
  initScrollAnimations();
  animateCounters();
  initTestimonialCarousel();
  addPageTransition();
  
  // Log initialization for debugging
  console.log('Sunshine Sprouts Website Initialized');
});

// Prevent flash of unstyled content
window.addEventListener('load', () => {
  document.documentElement.style.opacity = '1';
});
