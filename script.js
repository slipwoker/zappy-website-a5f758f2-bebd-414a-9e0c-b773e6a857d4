// FANTASTIC BURGERS - INTERACTIVE JAVASCRIPT

(function() {
    'use strict';
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle icons
            if (navMenu.classList.contains('active')) {
                hamburgerIcon.style.display = 'none';
                closeIcon.style.display = 'block';
            } else {
                hamburgerIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburgerIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburgerIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        });
    }
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ============================================
    // ANIMATE ON SCROLL (Simple fade-in effect)
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.feature-card, .burger-card, .testimonial-card, .menu-item, .value-card, .team-member, .order-card'
    );
    
    animateElements.forEach(el => {

        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ============================================
    // FORM VALIDATION & HANDLING
    // ============================================
    
    window.zappyContactFormLoaded = true;

const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            
        // Zappy API Integration
        try {
            console.log('📧 Zappy: Sending contact form to backend...');
            const zappyResponse = await fetch('http://localhost:5001/api/email/contact-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    websiteId: 'a5f758f2-bebd-414a-9e0c-b773e6a857d4',
                    name: data.name || formData.get('name') || '',
                    email: data.email || formData.get('email') || '',
                    subject: data.subject || formData.get('subject') || 'Contact Form Submission',
                    message: data.message || formData.get('message') || '',
                    phone: data.phone || formData.get('phone') || null
                })
            });
            const zappyResult = await zappyResponse.json();
            console.log('✅ Zappy: Email sent successfully', zappyResult);
        } catch (zappyError) {
            console.error('❌ Zappy: Failed to send email', zappyError);
        }
        });
            
            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#F5A5A0';
                } else {
                    field.style.borderColor = '#E0E0E0';
                }
            });
            
            if (isValid) {
                // Show success message
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = '#C5FF5C';
                submitBtn.style.color = '#3D2817';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '#F5A5A0';
                    submitBtn.style.color = '#FFF';
                }, 2000);
            } else {
                // Show error message
                alert('Please fill in all required fields.');
            }
        });
        
        // Remove error styling on input
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#E0E0E0';
                }
            });
        });
    }
    
    // ============================================
    // PHONE BUTTON FUNCTIONALITY
    // ============================================
    
    const phoneBtn = document.querySelector('.phone-header-btn');
    
    if (phoneBtn) {
        phoneBtn.addEventListener('click', function() {
            const phone = '[business_phone]';
            window.location.href = 'tel:' + phone;
        });
    }
    
    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
    
    // ============================================
    // ADD TO CART FUNCTIONALITY (if needed later)
    // ============================================
    
    // This can be expanded when adding e-commerce features
    
    // ============================================
    // ACTIVE PAGE HIGHLIGHTING
    // ============================================
    
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
    
})();

/* Cookie Consent */

// Helper function to check cookie consent
function hasConsentFor(category) {
  if (typeof window.CookieConsent === 'undefined') {
    return false; // Default to no consent if cookie consent not loaded
  }
  
  return window.CookieConsent.validConsent(category);
}

// Helper function to execute code only with consent
function withConsent(category, callback) {
  if (hasConsentFor(category)) {
    callback();
  } else {
    console.log(`[WARNING] Skipping ${category} code - no user consent`);
  }
}

// Cookie Consent Initialization

(function() {
  'use strict';
  
  let initAttempts = 0;
  const maxAttempts = 50; // 5 seconds max wait
  
  // Wait for DOM and vanilla-cookieconsent to be ready
  function initCookieConsent() {
    initAttempts++;
    
    
    if (typeof window.CookieConsent === 'undefined') {
      if (initAttempts < maxAttempts) {
        setTimeout(initCookieConsent, 100);
      } else {
      }
      return;
    }

    const cc = window.CookieConsent;
    
    
    // Initialize cookie consent
    try {
      cc.run({
  "autoShow": true,
  "mode": "opt-in",
  "revision": 0,
  "categories": {
    "necessary": {
      "enabled": true,
      "readOnly": true
    },
    "analytics": {
      "enabled": false,
      "readOnly": false,
      "autoClear": {
        "cookies": [
          {
            "name": "_ga"
          },
          {
            "name": "_ga_*"
          },
          {
            "name": "_gid"
          },
          {
            "name": "_gat"
          }
        ]
      }
    },
    "marketing": {
      "enabled": false,
      "readOnly": false,
      "autoClear": {
        "cookies": [
          {
            "name": "_fbp"
          },
          {
            "name": "_fbc"
          },
          {
            "name": "fr"
          }
        ]
      }
    }
  },
  "language": {
    "default": "en",
    "translations": {
      "en": {
        "consentModal": {
          "title": "We use cookies 🍪",
          "description": "Fantastic Burgers uses cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. You can manage your preferences anytime.",
          "acceptAllBtn": "Accept All",
          "acceptNecessaryBtn": "Accept Necessary",
          "showPreferencesBtn": "Manage Preferences",
          "footer": "<a href=\"#privacy-policy\">Privacy Policy</a> | <a href=\"#terms-conditions\">Terms & Conditions</a>"
        },
        "preferencesModal": {
          "title": "Cookie Preferences",
          "acceptAllBtn": "Accept All",
          "acceptNecessaryBtn": "Accept Necessary",
          "savePreferencesBtn": "Save Preferences",
          "closeIconLabel": "Close",
          "sections": [
            {
              "title": "Essential Cookies",
              "description": "These cookies are necessary for the website to function and cannot be disabled.",
              "linkedCategory": "necessary"
            },
            {
              "title": "Analytics Cookies",
              "description": "These cookies help us understand how visitors interact with our website.",
              "linkedCategory": "analytics"
            },
            {
              "title": "Marketing Cookies",
              "description": "These cookies are used to deliver personalized advertisements.",
              "linkedCategory": "marketing"
            }
          ]
        }
      }
    }
  },
  "guiOptions": {
    "consentModal": {
      "layout": "box",
      "position": "bottom right",
      "equalWeightButtons": true,
      "flipButtons": false
    },
    "preferencesModal": {
      "layout": "box",
      "equalWeightButtons": true,
      "flipButtons": false
    }
  }
});
      
      // Optional: Handle consent changes (check if onChange is available)
      if (typeof cc.onChange === 'function') {
        cc.onChange(function(cookie, changed_preferences) {
      
      // Enable/disable analytics based on consent
      if (changed_preferences.includes('analytics')) {
        if (cc.validConsent('analytics')) {
          // Enable analytics (e.g., Google Analytics)
          // Example: gtag('consent', 'update', { analytics_storage: 'granted' });
        } else {
          // Example: gtag('consent', 'update', { analytics_storage: 'denied' });
        }
      }
      
      // Enable/disable marketing based on consent
      if (changed_preferences.includes('marketing')) {
        if (cc.validConsent('marketing')) {
          // Example: gtag('consent', 'update', { ad_storage: 'granted' });
        } else {
          // Example: gtag('consent', 'update', { ad_storage: 'denied' });
        }
      }
        });
      } else {
      }

      // Note: Cookie Preferences button removed per marketing guidelines
      // Footer should be clean and minimal - users can manage cookies via banner
    } catch (error) {
    }
  }

  // Initialize when DOM is ready - multiple approaches for reliability
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
    // Backup timeout in case DOMContentLoaded doesn't fire
    setTimeout(initCookieConsent, 1000);
  } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initCookieConsent();
  } else {
    // Fallback - try after a short delay
    setTimeout(initCookieConsent, 500);
  }
  
  // Additional fallback - try after page load
  if (typeof window !== 'undefined') {
    if (window.addEventListener) {
      window.addEventListener('load', initCookieConsent, { once: true });
    }
  }
})();

/* Accessibility Features */

/* Mickidum Accessibility Toolbar Initialization - Zappy Style */

window.onload = function() {
    
    try {
        window.micAccessTool = new MicAccessTool({
            buttonPosition: 'left', // Position on left side
            forceLang: 'en-US', // Force language
            icon: {
                position: {
                    bottom: { size: 50, units: 'px' },
                    left: { size: 20, units: 'px' },
                    type: 'fixed'
                },
                backgroundColor: 'transparent', // Transparent to allow CSS styling
                color: 'transparent', // Let CSS handle coloring
                img: 'accessible',
                circular: false // Square button for consistent styling
            },
            menu: {
                dimensions: {
                    width: { size: 300, units: 'px' },
                    height: { size: 'auto', units: 'px' }
                }
            }
        });
        
    } catch (error) {
    }
    
    // Keyboard shortcut handler: ALT+A (Option+A on Mac) to toggle accessibility widget visibility (desktop only)
    document.addEventListener('keydown', function(event) {
        // Check if ALT+A is pressed (ALT on Windows/Linux, Option on Mac)
        var isAltOrOption = event.altKey || event.metaKey;
        var isAKey = event.keyCode === 65 || event.which === 65 || 
                      (event.key && (event.key.toLowerCase() === 'a' || event.key === 'å' || event.key === 'Å'));
        
        if (isAltOrOption && isAKey) {
            // Only work on desktop (screen width > 768px)
            if (window.innerWidth > 768) {
                event.preventDefault();
                event.stopPropagation();
                
                // Toggle visibility class on body
                var isVisible = document.body.classList.contains('accessibility-widget-visible');
                
                if (isVisible) {
                    // Hide the widget
                    document.body.classList.remove('accessibility-widget-visible');
                } else {
                    // Show the widget
                    document.body.classList.add('accessibility-widget-visible');
                    
                    // After a short delay, click the button to open the menu
                    setTimeout(function() {
                        var accessButton = document.getElementById('mic-access-tool-general-button');
                        if (accessButton) {
                            accessButton.click();
                        }
                    }, 200);
                }
            }
        }
    }, true);
};