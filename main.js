// Gallery items data
const galleryItems = [
    { 
        id: 1, 
        title: 'Klasik Kuksa', 
        description: 'Geleneksel birch ahşabından el yapımı kuksa bardak', 
        category: 'classic',
        tags: ['geleneksel', 'birch', 'doğal']
    },
    { 
        id: 2, 
        title: 'Spiderman Kuksa', 
        description: 'Özel tasarım Spiderman karakterli ahşap bardak', 
        category: 'character',
        tags: ['spiderman', 'süper kahraman', 'özel']
    },
    { 
        id: 3, 
        title: 'Yoda Master Kuksa', 
        description: 'Star Wars evreninden Yoda temalı ahşap sanatı', 
        category: 'character',
        tags: ['yoda', 'star wars', 'jedi']
    },
    { 
        id: 4, 
        title: 'Özel Tasarım', 
        description: 'İsminize özel gravürlü ahşap kuksa bardak', 
        category: 'custom',
        tags: ['kişisel', 'gravür', 'özel']
    },
    { 
        id: 5, 
        title: 'Batman Kuksa', 
        description: 'Gotham\'ın karanlık kahramanı Batman temalı bardak', 
        category: 'character',
        tags: ['batman', 'süper kahraman', 'gotham']
    },
    { 
        id: 6, 
        title: 'Doğal Kuksa', 
        description: 'Ham ahşaptan minimal tasarımlı kuksa bardak', 
        category: 'classic',
        tags: ['minimal', 'doğal', 'sade']
    },
    { 
        id: 7, 
        title: 'Mandalorian Kuksa', 
        description: 'This is the Way! Mandalorian temalı özel tasarım', 
        category: 'character',
        tags: ['mandalorian', 'star wars', 'bounty hunter']
    },
    { 
        id: 8, 
        title: 'Aile Seti', 
        description: 'Aile için özel tasarlanmış 4\'lü kuksa seti', 
        category: 'custom',
        tags: ['aile', 'set', 'çoklu']
    }
];

// DOM Elements
const loading = document.getElementById('loading');
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const galleryGrid = document.getElementById('gallery-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contact-form');

// Initialize website
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    setTimeout(() => {
        loading.classList.add('fade-out');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 2000);

    // Initialize components
    initNavigation();
    initGallery();
    initAnimations();
    initContactForm();
    initSmoothScroll();
});

// Navigation functionality
function initNavigation() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link
        updateActiveNavLink();
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all links
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            // Add active class to current link
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Gallery functionality
function initGallery() {
    renderGalleryItems(galleryItems);
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items
            const filterValue = btn.getAttribute('data-filter');
            const filteredItems = filterValue === 'all' 
                ? galleryItems 
                : galleryItems.filter(item => item.category === filterValue);
            
            // Animate out current items
            const currentItems = document.querySelectorAll('.gallery-item');
            currentItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                }, index * 50);
            });
            
            // Render new items after animation
            setTimeout(() => {
                renderGalleryItems(filteredItems);
            }, 300);
        });
    });
}

// Render gallery items
function renderGalleryItems(items) {
    galleryGrid.innerHTML = '';
    
    items.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item fade-in';
        galleryItem.innerHTML = `
            <div class="gallery-image"></div>
            <div class="gallery-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="gallery-tags">
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
        
        // Animate in with delay
        setTimeout(() => {
            galleryItem.style.opacity = '1';
            galleryItem.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Smooth scrolling
function initSmoothScroll() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to section function (for buttons)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation classes to sections
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('fade-in');
    });

    document.querySelectorAll('.feature').forEach((feature, index) => {
        feature.classList.add('slide-in-left');
        feature.style.animationDelay = `${index * 0.2}s`;
    });

    document.querySelectorAll('.character-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Contact form functionality
function initContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Lütfen tüm alanları doldurun.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Gönderiliyor...</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağız.', 'success');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#F44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Character card interactions
document.addEventListener('DOMContentLoaded', function() {
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('click', function() {
            const character = this.getAttribute('data-character');
            showCharacterModal(character);
        });
    });
});

// Show character modal (placeholder function)
function showCharacterModal(character) {
    const characterInfo = {
        spiderman: {
            title: 'Spiderman Kuksa',
            description: 'Web slinger\'ın gücünü elinizde hissedin! Özel tasarım Spiderman temalı ahşap kuksa bardak.',
            features: ['El oyması detaylar', 'Özel kırmızı renk', 'Dayanıklı birch ahşabı']
        },
        yoda: {
            title: 'Yoda Master Kuksa',
            description: 'Güçlü olmak, büyüklük değildir. Yoda\'nın bilgeliğini her yudumda yaşayın.',
            features: ['Antik yeşil renk', 'Detaylı el işçiliği', 'Star Wars lisanslı']
        },
        batman: {
            title: 'Batman Kuksa',
            description: 'Gotham\'ın karanlık kahramanının gücü artık elinizde. Gece bekçisinin kupası.',
            features: ['Mat siyah finish', 'Batman logosu', 'Premium ahşap kalite']
        },
        mandalorian: {
            title: 'Mandalorian Kuksa',
            description: 'This is the Way! Galaksinin en ünlü ödül avcısının kupası.',
            features: ['Beskar metal görünümü', 'El gravürü', 'Özel tasarım']
        }
    };
    
    const info = characterInfo[character];
    showNotification(`${info.title} - ${info.description}`, 'success');
}

// Floating particles animation
function createFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(245, 230, 211, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${4 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 4}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles after DOM load
document.addEventListener('DOMContentLoaded', createFloatingParticles);

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll handler
window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
}, 10));

// Make functions available globally
window.scrollToSection = scrollToSection;
