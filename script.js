// Mobile Menu Functionality
const hamburger = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
});

    document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Scroll Effect and Navigation Highlighting
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header && window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else if (header) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 1px 15px rgba(0, 0, 0, 0.08)';
    }
    
    // Navigation highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Portfolio Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    console.log('Portfolio filtering initialized');
    console.log('Filter buttons found:', filterButtons.length);
    console.log('Portfolio items found:', portfolioItems.length);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Button clicked:', this.textContent);
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            console.log('Filter value:', filterValue);
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                console.log('Item category:', itemCategory, 'Filter:', filterValue);
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                    console.log('Showing item:', item.querySelector('h3').textContent);
    } else {
                    item.style.display = 'none';
                    console.log('Hiding item:', item.querySelector('h3').textContent);
                }
            });
        });
    });
    
    // Initialize with "all" filter active
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.classList.add('active');
        console.log('Initialized with "all" filter active');
    }
});

// Contact Form Handling - Automatic Email via Gmail SMTP
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Debug: Log form data
            console.log('Main form: Form data collected:');
            console.log('  name:', name);
            console.log('  email:', email);
            console.log('  subject:', subject);
            console.log('  message:', message);
            
            // Validate fields
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            console.log('Main form: Sending to send_email_working.php...');
            
            // Send form data to PHP backend for automatic email sending
            fetch('send_email_working.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                console.log('Response status:', response.status);
                return response.text();
            })
            .then(data => {
                console.log('Raw response:', data);
                
                try {
                    // Try to parse as JSON
                    const jsonData = JSON.parse(data);
                    
                    if (jsonData.success) {
                        showNotification(jsonData.message, 'success');
                        this.reset();
                    } else {
                        showNotification(jsonData.message, 'error');
                    }
                } catch (e) {
                    console.error('JSON parse error:', e);
                    console.error('Raw response:', data);
                    showNotification('Server response error. Check console for details.', 'error');
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                showNotification('Network error. Please try again.', 'error');
            })
            .finally(() => {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-message">
                ${type === 'success' ? '<i class="fas fa-check-circle" style="margin-right: 8px; color: #000000;"></i>' : ''}
                ${message}
            </div>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#ffffff' : type === 'error' ? '#000000' : '#f8f9fa'};
        color: ${type === 'success' ? '#000000' : type === 'error' ? '#ffffff' : '#000000'};
        padding: 1rem 1.5rem;
        border-radius: 12px;
        border: 2px solid #000000;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
        font-family: 'Inter', sans-serif;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    `;
    
    if (!document.querySelector('#notification-styles')) {
const style = document.createElement('style');
        style.id = 'notification-styles';
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
            .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1.5rem;
        }
    .notification-message {
        font-size: 0.95rem;
        line-height: 1.4;
        flex: 1;
        display: flex;
        align-items: center;
    }
            .notification-close {
            background: none;
            border: none;
            color: inherit;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            transition: all 0.3s ease;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }
        .notification-close:hover {
            background: rgba(0, 0, 0, 0.1);
            transform: scale(1.1);
            color: #000000;
        }
`;
document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', function() {
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

    const animatedElements = document.querySelectorAll('.skill-category, .service-card, .stat, .portfolio-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mobile Menu Styles
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: rgba(255, 255, 255, 0.98);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.1);
            padding: 2rem 0;
            border-top: 1px solid #e0e0e0;
        }
        
        .nav-links.active {
            left: 0;
        }
        
        .nav-links li {
            margin: 1rem 0;
        }
        
        .mobile-menu.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .mobile-menu.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
`;

if (!document.querySelector('#mobile-menu-styles')) {
    const style = document.createElement('style');
    style.id = 'mobile-menu-styles';
    style.textContent = mobileMenuStyles;
    document.head.appendChild(style);
}

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Section Reveal Animation
document.addEventListener('DOMContentLoaded', function() {
    const revealSections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    revealSections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Reveal Animation Styles
const revealStyles = `
    section {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero {
        opacity: 1 !important;
        transform: none !important;
    }
`;

if (!document.querySelector('#reveal-styles')) {
    const style = document.createElement('style');
    style.id = 'reveal-styles';
    style.textContent = revealStyles;
    document.head.appendChild(style);
}

// Portfolio Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('portfolioModal');
    const modalClose = document.getElementById('modalClose');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Close modal when clicking close button
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });
    
    // Portfolio item click handlers
    portfolioItems.forEach(item => {
        const overlay = item.querySelector('.portfolio-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                e.preventDefault();
                const projectType = item.getAttribute('data-project');
                
                if (projectType === 'analytics') {
                    showAnalyticsModal();
                } else if (projectType === 'booking') {
                    showBookingModal();
                } else if (projectType === 'education') {
                    showEducationModal();
                } else if (projectType === 'funnel') {
                    showFunnelModal();
                } else if (projectType === 'porblog') {
                    showPorblogModal();
                } else if (projectType === 'ecom') {
                    showEcomModal();
                }
            });
        }
    });
    
    function showAnalyticsModal() {
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        modalTitle.textContent = 'Analytics Dashboard';
        
        modalBody.innerHTML = `
            <div class="analytics-description">
                <h3>Real-time Data Visualization Platform</h3>
                <p>A comprehensive analytics dashboard built with Angular, Express.js, and MySQL. This platform provides real-time insights into business performance with interactive charts, customizable widgets, and advanced filtering capabilities.</p>
                <p>The dashboard features responsive design, dark/light theme switching, and seamless data integration from multiple sources.</p>
                
                <div class="analytics-features">
                    <div class="feature-item">
                        <i class="fas fa-chart-line"></i>
                        <span>Real-time Charts</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-filter"></i>
                        <span>Advanced Filtering</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-mobile-alt"></i>
                        <span>Responsive Design</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-palette"></i>
                        <span>Theme Switching</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-database"></i>
                        <span>Data Integration</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-users"></i>
                        <span>User Management</span>
                    </div>
                </div>
            </div>
            
            <div class="analytics-gallery">
                <div class="analytics-item">
                    <img src="analytic/Screenshot 2025-08-29 015322.png" alt="Analytics Dashboard - Main View">
                </div>
                
                <div class="analytics-item">
                    <img src="analytic/Screenshot 2025-08-29 014440.png" alt="Analytics Dashboard - Detailed Analytics">
                </div>
                
                <div class="analytics-item">
                    <img src="analytic/Screenshot 2025-08-29 012323.png" alt="Analytics Dashboard - Mobile View">
                </div>
            </div>
        `;
        
        modal.classList.add('show');
    }
    
    function showBookingModal() {
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        modalTitle.textContent = 'Online Booking System';
        
        modalBody.innerHTML = `
            <div class="analytics-description">
                <h3>Advanced Reservation & Appointment Platform</h3>
                <p>A sophisticated online booking system built with HTML5, Express.js, and MongoDB. This platform enables seamless appointment scheduling, reservation management, and calendar integration for businesses and service providers.</p>
                <p>The system features real-time availability checking, automated confirmations, and a user-friendly interface for both customers and administrators.</p>
                
                <div class="analytics-features">
                    <div class="feature-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Appointment Scheduling</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-clock"></i>
                        <span>Real-time Availability</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-bell"></i>
                        <span>Automated Confirmations</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-users"></i>
                        <span>User Management</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-chart-bar"></i>
                        <span>Booking Analytics</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-mobile-alt"></i>
                        <span>Mobile Responsive</span>
                    </div>
                </div>
            </div>
            
            <div class="analytics-gallery">
                <div class="analytics-item">
                    <img src="booking/Screenshot 2025-08-29 173301.png" alt="Online Booking System - Main Interface">
                </div>
                
                <div class="analytics-item">
                    <img src="booking/Screenshot 2025-08-29 164027.png" alt="Online Booking System - Booking Process">
                </div>
            </div>
        `;
        
        modal.classList.add('show');
    }
    
    function showEducationModal() {
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        modalTitle.textContent = 'E-Learning Platform';
        
        modalBody.innerHTML = `
            <div class="analytics-description">
                <h3>Comprehensive Online Education System</h3>
                <p>A modern e-learning platform built with React, Node.js, and MongoDB. This comprehensive system provides interactive learning experiences with course management, progress tracking, and multimedia content delivery.</p>
                <p>The platform features adaptive learning paths, real-time collaboration tools, and a robust assessment system for both students and educators.</p>
                
                <div class="analytics-features">
                    <div class="feature-item">
                        <i class="fas fa-graduation-cap"></i>
                        <span>Course Management</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-chart-line"></i>
                        <span>Progress Tracking</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-video"></i>
                        <span>Multimedia Content</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-users"></i>
                        <span>Student Collaboration</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-clipboard-check"></i>
                        <span>Assessment System</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-mobile-alt"></i>
                        <span>Mobile Learning</span>
                    </div>
                </div>
            </div>
            
            <div class="analytics-gallery">
                <div class="analytics-item">
                    <img src="educ/Screenshot 2025-08-29 163224.png" alt="E-Learning Platform - Main Interface">
                </div>
                
                <div class="analytics-item">
                    <img src="educ/Screenshot 2025-08-29 161213.png" alt="E-Learning Platform - Course View">
                </div>
            </div>
        `;
        
        modal.classList.add('show');
    }
    
    function showFunnelModal() {
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        modalTitle.textContent = 'Sales Funnel Design';
        
        modalBody.innerHTML = `
            <div class="analytics-description">
                <h3>High-Converting Sales Funnel Platform</h3>
                <p>A sophisticated sales funnel system built with React, Node.js, and MongoDB. This platform creates optimized conversion paths with advanced lead capture, A/B testing capabilities, and comprehensive analytics tracking.</p>
                <p>The system features intelligent funnel optimization, multi-step conversion processes, and real-time performance monitoring to maximize conversion rates and ROI.</p>
                
                <div class="analytics-features">
                    <div class="feature-item">
                        <i class="fas fa-filter"></i>
                        <span>Funnel Optimization</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-mouse-pointer"></i>
                        <span>Lead Capture</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-chart-pie"></i>
                        <span>Conversion Analytics</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-flask"></i>
                        <span>A/B Testing</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-bullseye"></i>
                        <span>Target Optimization</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>Performance Monitoring</span>
                    </div>
                </div>
            </div>
            
            <div class="analytics-gallery">
                <div class="analytics-item">
                    <img src="funnel/Screenshot 2025-08-29 183510.png" alt="Sales Funnel Design - Main Interface">
                </div>
                
                <div class="analytics-item">
                    <img src="funnel/Screenshot 2025-08-29 182728.png" alt="Sales Funnel Design - Funnel Builder">
                </div>
            </div>
        `;
        
        modal.classList.add('show');
    }
    
    function showPorblogModal() {
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        modalTitle.textContent = 'Portfolio & Blog';
        
        modalBody.innerHTML = `
            <div class="analytics-description">
                <h3>Professional Portfolio & Blog Platform</h3>
                <p>A modern portfolio website with integrated blog system built with HTML5, CSS3, and JavaScript. This platform showcases professional work while providing a content management system for sharing insights and updates.</p>
                <p>The system features responsive design, SEO optimization, and a clean, professional interface that highlights your work and expertise effectively.</p>
                
                <div class="analytics-features">
                    <div class="feature-item">
                        <i class="fas fa-briefcase"></i>
                        <span>Portfolio Showcase</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-blog"></i>
                        <span>Blog System</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-mobile-alt"></i>
                        <span>Responsive Design</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-search"></i>
                        <span>SEO Optimized</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-palette"></i>
                        <span>Modern UI/UX</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-rocket"></i>
                        <span>Fast Performance</span>
                    </div>
                </div>
            </div>
            
            <div class="analytics-gallery">
                <div class="analytics-item">
                    <img src="porblog/Screenshot 2025-08-29 143035.png" alt="Portfolio & Blog - Main Interface">
                </div>
                
                <div class="analytics-item">
                    <img src="porblog/Screenshot 2025-08-29 024352.png" alt="Portfolio & Blog - Portfolio View">
                </div>
                
                <div class="analytics-item">
                    <img src="porblog/Screenshot 2025-08-29 023433.png" alt="Portfolio & Blog - Blog Section">
                </div>
            </div>
        `;
        
        modal.classList.add('show');
    }
    
    function showEcomModal() {
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        modalTitle.textContent = 'E-commerce Platform';
        
        modalBody.innerHTML = `
            <div class="analytics-description">
                <h3>Complete Online Shopping Platform</h3>
                <p>A comprehensive e-commerce solution built with React, PHP, and MySQL. This platform provides a complete online shopping experience with product management, secure payment processing, and advanced inventory control.</p>
                <p>The system features responsive design, user authentication, order management, and seamless integration with payment gateways for a professional online store experience.</p>
                
                <div class="analytics-features">
                    <div class="feature-item">
                        <i class="fas fa-shopping-cart"></i>
                        <span>Product Catalog</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-credit-card"></i>
                        <span>Payment Integration</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-boxes"></i>
                        <span>Inventory Management</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-user-shield"></i>
                        <span>User Authentication</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-shipping-fast"></i>
                        <span>Order Management</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-mobile-alt"></i>
                        <span>Mobile Responsive</span>
                    </div>
                </div>
            </div>
            
            <div class="analytics-gallery">
                <div class="analytics-item">
                    <img src="ecom/Screenshot 2025-08-30 230322.png" alt="E-commerce Platform - Main Interface">
                </div>
                
                <div class="analytics-item">
                    <img src="ecom/Screenshot 2025-08-30 225259.png" alt="E-commerce Platform - Product View">
                </div>
                
                <div class="analytics-item">
                    <img src="ecom/Screenshot 2025-08-30 224848.png" alt="E-commerce Platform - Shopping Cart">
                </div>
                
                <div class="analytics-item">
                    <img src="ecom/Screenshot 2025-08-30 223332.png" alt="E-commerce Platform - Checkout Process">
                </div>
            </div>
        `;
        
        modal.classList.add('show');
    }
});
