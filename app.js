// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
const statCards = document.querySelectorAll('.stat-card');
const languageButtons = document.querySelectorAll('.language-btn');
const modals = document.querySelectorAll('.modal');
const modalTriggers = document.querySelectorAll('[data-modal]');
const modalCloseButtons = document.querySelectorAll('[data-close="modal"]');
const donationTypeSelect = document.querySelector('.donation-type-select');
const materialDonationField = document.querySelector('.material-donation-field');

// Language data
const translations = {
  en: {
    'Participate Mumbai': 'Participate Mumbai',
    'A Citizen Engagement Platform': 'A Citizen Engagement Platform',
    'Connecting Citizens, Corporates & Communities for a Better Mumbai': 'Connecting Citizens, Corporates & Communities for a Better Mumbai',
    'Volunteer Now': 'Volunteer Now',
    'CSR Partner Now': 'CSR Partner Now',
    'Donate Now': 'Donate Now'
  },
  mr: {
    'Participate Mumbai': 'सहभागी मुंबई',
    'A Citizen Engagement Platform': 'नागरिक सहभाग मंच',
    'Connecting Citizens, Corporates & Communities for a Better Mumbai': 'चांगल्या मुंबईसाठी नागरिक, कॉर्पोरेट आणि समुदायांना जोडणे',
    'Volunteer Now': 'आता स्वयंसेवक व्हा',
    'CSR Partner Now': 'आता सीएसआर भागीदार व्हा',
    'Donate Now': 'आता दान करा'
  }
};

let currentLanguage = 'en';

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Enhanced Participate Mumbai platform...');
  
  initMobileNav();
  initLanguageToggle();
  initModalSystem();
  initFileUpload();
  initSmoothScrolling();
  initStatsAnimation();
  initScrollAnimations();
  initActiveNavigation();
  initHeaderScrollEffect();
  initFormHandling();
  initButtonEffects();
  initKeyboardNavigation();
  initPageLoading();
  initProjectCardInteractions();
  
  console.log('Enhanced Participate Mumbai platform initialized successfully!');
});

// Mobile Navigation Toggle
function initMobileNav() {
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // Close mobile nav when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
}

// Language Toggle System
function initLanguageToggle() {
  languageButtons.forEach(button => {
    button.addEventListener('click', () => {
      const lang = button.getAttribute('data-lang');
      switchLanguage(lang);
      
      // Update active state
      languageButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
  
  // Set initial active language
  document.querySelector('[data-lang="en"]').classList.add('active');
}

function switchLanguage(lang) {
  currentLanguage = lang;
  
  // Update text content based on language
  const elementsToTranslate = document.querySelectorAll('[data-translate]');
  elementsToTranslate.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  
  // Update placeholders and form labels if needed
  updateFormLanguage(lang);
}

function updateFormLanguage(lang) {
  // This can be expanded to translate form labels and placeholders
  if (lang === 'mr') {
    // Update form labels to Marathi if needed
    console.log('Switched to Marathi');
  } else {
    console.log('Switched to English');
  }
}

// Modal System
function initModalSystem() {
  // Open modals
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(`${modalId}-modal`);
      if (modal) {
        openModal(modal);
      }
    });
  });

  // Close modals
  modalCloseButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const modal = closeBtn.closest('.modal');
      if (modal) {
        closeModal(modal);
      }
    });
  });

  // Close modal when clicking overlay
  modals.forEach(modal => {
    const overlay = modal.querySelector('.modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        closeModal(modal);
      });
    }
  });

  // Initialize donation type toggle
  if (donationTypeSelect && materialDonationField) {
    donationTypeSelect.addEventListener('change', (e) => {
      if (e.target.value === 'material') {
        materialDonationField.style.display = 'block';
      } else {
        materialDonationField.style.display = 'none';
      }
    });
  }
}

function openModal(modal) {
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Focus on first form input
  const firstInput = modal.querySelector('input, select, textarea');
  if (firstInput) {
    setTimeout(() => firstInput.focus(), 100);
  }
}

function closeModal(modal) {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
  
  // Reset form if exists
  const form = modal.querySelector('form');
  if (form) {
    form.reset();
    // Clear file previews
    const previews = modal.querySelectorAll('.file-preview');
    previews.forEach(preview => {
      preview.innerHTML = '';
    });
    // Hide material donation field
    if (materialDonationField) {
      materialDonationField.style.display = 'none';
    }
  }
}

// File Upload System
function initFileUpload() {
  const fileInputs = document.querySelectorAll('.file-input');
  
  fileInputs.forEach(input => {
    const container = input.closest('.file-upload-container');
    const label = container.querySelector('.file-upload-label');
    const preview = container.querySelector('.file-preview');
    
    // File input change event
    input.addEventListener('change', (e) => {
      handleFileSelection(e.target.files, preview, input.multiple);
    });
    
    // Drag and drop events
    label.addEventListener('dragover', (e) => {
      e.preventDefault();
      label.classList.add('dragover');
    });
    
    label.addEventListener('dragleave', () => {
      label.classList.remove('dragover');
    });
    
    label.addEventListener('drop', (e) => {
      e.preventDefault();
      label.classList.remove('dragover');
      
      const files = Array.from(e.dataTransfer.files);
      const validFiles = files.filter(file => 
        file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024
      );
      
      if (validFiles.length > 0) {
        handleFileSelection(validFiles, preview, input.multiple);
      } else {
        showNotification('Please select valid image files (max 5MB each)', 'error');
      }
    });
  });
}

function handleFileSelection(files, preview, multiple = false) {
  if (!preview) return;
  
  // Clear previous previews if not multiple
  if (!multiple) {
    preview.innerHTML = '';
  }
  
  const fileArray = Array.from(files);
  const maxFiles = multiple ? 5 : 1;
  const filesToProcess = fileArray.slice(0, maxFiles);
  
  filesToProcess.forEach((file, index) => {
    if (file.size > 5 * 1024 * 1024) {
      showNotification(`File ${file.name} is too large. Maximum size is 5MB.`, 'error');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      createFilePreview(file, e.target.result, preview);
    };
    reader.readAsDataURL(file);
  });
  
  if (fileArray.length > maxFiles) {
    showNotification(`Only ${maxFiles} file(s) can be uploaded at once.`, 'warning');
  }
}

function createFilePreview(file, src, preview) {
  const previewItem = document.createElement('div');
  previewItem.className = 'file-preview-item';
  
  previewItem.innerHTML = `
    <img src="${src}" alt="${file.name}" class="file-preview-image">
    <div class="file-preview-info">
      <div class="file-preview-name">${file.name}</div>
      <div class="file-preview-size">${formatFileSize(file.size)}</div>
    </div>
    <button type="button" class="file-remove" title="Remove file">&times;</button>
  `;
  
  // Add remove functionality
  const removeBtn = previewItem.querySelector('.file-remove');
  removeBtn.addEventListener('click', () => {
    previewItem.remove();
  });
  
  preview.appendChild(previewItem);
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Form Handling
function initFormHandling() {
  const forms = document.querySelectorAll('.modal-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const modal = form.closest('.modal');
      const modalId = modal.id;
      
      // Simulate form submission
      handleFormSubmission(modalId, formData);
      
      // Close modal
      closeModal(modal);
    });
  });
}

function handleFormSubmission(modalId, formData) {
  let message = '';
  let type = 'success';
  
  switch (modalId) {
    case 'volunteer-modal':
      message = 'Thank you for volunteering! We will contact you soon with opportunities that match your interests.';
      break;
    case 'csr-modal':
      message = 'Your CSR partnership request has been submitted successfully. Our team will review and get back to you within 2 business days.';
      break;
    case 'donate-modal':
      message = 'Thank you for your generous donation offer! We will coordinate with you for the next steps.';
      break;
    default:
      message = 'Your form has been submitted successfully!';
  }
  
  showNotification(message, type);
  
  // Log form data for debugging
  console.log(`Form submitted: ${modalId}`, Object.fromEntries(formData));
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  document.addEventListener('click', (e) => {
    // Check if clicked element is a navigation link
    if (e.target.matches('.nav-link')) {
      e.preventDefault();
      const targetId = e.target.getAttribute('href');
      
      if (targetId && targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const header = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetSection.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  });
}

// Animated Counter for Statistics
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    if (target >= 1000) {
      element.textContent = Math.floor(current).toLocaleString() + '+';
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 16);
}

// Intersection Observer for Statistics Animation
function initStatsAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statCard = entry.target;
        const statNumber = statCard.querySelector('.stat-number[data-target]');
        
        if (statNumber && !statNumber.classList.contains('animated')) {
          const target = parseInt(statNumber.getAttribute('data-target'));
          statNumber.classList.add('animated');
          statCard.classList.add('animate');
          animateCounter(statNumber, target);
        }
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '-50px 0px'
  });

  statCards.forEach(card => {
    observer.observe(card);
  });
}

// Scroll-triggered Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.feature-card, .project-card, .csr-card, .case-study, .step');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '-20px 0px'
  });

  // Set initial state for animated elements
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(element);
  });
}

// Active Navigation Link Highlighting
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Call once on init
}

// Header Scroll Effect
function initHeaderScrollEffect() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  function updateHeader() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.style.background = 'rgba(252, 252, 249, 0.95)';
      header.style.backdropFilter = 'blur(15px)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'var(--color-surface)';
      header.style.backdropFilter = 'blur(10px)';
      header.style.boxShadow = 'none';
    }
  }
  
  window.addEventListener('scroll', updateHeader);
  updateHeader(); // Call once on init
}

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notif => notif.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification-close">&times;</button>
  `;
  
  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 16px 20px;
    box-shadow: var(--shadow-lg);
    z-index: 10001;
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 300px;
    max-width: 500px;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  
  if (type === 'success') {
    notification.style.borderColor = 'var(--color-success)';
    notification.style.background = 'rgba(var(--color-success-rgb), 0.1)';
  } else if (type === 'error') {
    notification.style.borderColor = 'var(--color-error)';
    notification.style.background = 'rgba(var(--color-error-rgb), 0.1)';
  } else if (type === 'warning') {
    notification.style.borderColor = 'var(--color-warning)';
    notification.style.background = 'rgba(var(--color-warning-rgb), 0.1)';
  } else if (type === 'info') {
    notification.style.borderColor = 'var(--color-primary)';
    notification.style.background = 'rgba(var(--color-teal-500-rgb), 0.1)';
  }
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Close functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.style.cssText = `
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: var(--color-text-secondary);
    padding: 0;
    margin-left: auto;
  `;
  
  const closeNotification = () => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  };
  
  closeBtn.addEventListener('click', closeNotification);
  
  // Auto remove after 5 seconds
  setTimeout(closeNotification, 5000);
}

// Button Click Effects
function initButtonEffects() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Ripple effect
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);
      
      setTimeout(() => {
        if (button.contains(ripple)) {
          button.removeChild(ripple);
        }
      }, 600);
    });
  });
  
  // Add ripple animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Keyboard Navigation
function initKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close open modals
      const openModal = document.querySelector('.modal:not(.hidden)');
      if (openModal) {
        closeModal(openModal);
      }
      
      // Close mobile menu
      if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    }
  });
}

// Page Loading Animation
function initPageLoading() {
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero section
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-tagline, .hero-buttons');
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200);
    });
  });
  
  // Set initial states
  const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-tagline, .hero-buttons');
  heroElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  });
}

// Enhanced Project Card Interactions
function initProjectCardInteractions() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const image = card.querySelector('.project-image img');
    
    // Ensure images are visible and properly loaded
    if (image) {
      image.style.opacity = '1';
      image.style.display = 'block';
      
      // Add error handling for images
      image.addEventListener('error', (e) => {
        console.warn('Failed to load project image:', image.src);
        // Set a fallback background color
        const imageContainer = image.closest('.project-image');
        if (imageContainer) {
          imageContainer.style.background = 'var(--color-bg-3)';
          imageContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--color-text-secondary); font-size: var(--font-size-lg);">
              Community Photo
            </div>
            <div class="project-overlay">
              <div class="project-category">${card.querySelector('.project-category').textContent}</div>
            </div>
          `;
        }
      });
      
      // Add load success handling
      image.addEventListener('load', () => {
        image.style.opacity = '1';
      });
    }
    
    // Enhanced hover effects
    card.addEventListener('mouseenter', () => {
      if (image && image.complete) {
        image.style.transform = 'scale(1.05)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      if (image && image.complete) {
        image.style.transform = 'scale(1)';
      }
    });
  });
  
  // Ensure all project images are loaded properly
  const allProjectImages = document.querySelectorAll('.project-image img');
  allProjectImages.forEach(img => {
    img.style.opacity = '1';
    img.style.display = 'block';
    
    // Force image reload if not loaded
    if (!img.complete) {
      const src = img.src;
      img.src = '';
      img.src = src;
    }
  });
}

// Handle window resize
window.addEventListener('resize', () => {
  // Close mobile menu on desktop
  if (window.innerWidth > 768 && navMenu && navToggle) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
  
  // Close modals on very small screens to prevent issues
  if (window.innerWidth < 320) {
    const openModal = document.querySelector('.modal:not(.hidden)');
    if (openModal) {
      closeModal(openModal);
    }
  }
});

// Performance monitoring
function logPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Performance:', {
          loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
          domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
          firstPaint: Math.round(performance.getEntriesByName('first-paint')[0]?.startTime || 0)
        });
      }, 0);
    });
  }
}

logPerformance();