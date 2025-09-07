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

// Portfolio Modal Functionality with Swipeable Gallery
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('portfolioModal');
    const modalClose = document.getElementById('modalClose');
    const galleryModal = document.getElementById('galleryModal');
    const galleryClose = document.getElementById('galleryClose');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    const galleryImage = document.getElementById('galleryImage');
    const galleryTitle = document.getElementById('galleryTitle');
    const galleryCounter = document.getElementById('galleryCounter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    let currentImages = [];
    let currentIndex = 0;
    let currentProject = '';
    
    // Project data with images
    const projectData = {
        virtualassistentportfolio: {
            title: 'Virtual Assistant Portfolio',
            images: [
                'virtualassistentportfolio/Screenshot 2025-09-08 002831.png',
                'virtualassistentportfolio/Screenshot 2025-09-08 002844.png',
                'virtualassistentportfolio/Screenshot 2025-09-08 002855.png',
                'virtualassistentportfolio/Screenshot 2025-09-08 002910.png',
                'virtualassistentportfolio/Screenshot 2025-09-08 002922.png',
                'virtualassistentportfolio/Screenshot 2025-09-08 002929.png',
                'virtualassistentportfolio/Screenshot 2025-09-08 002937.png',
                'virtualassistentportfolio/Screenshot 2025-09-08 002946.png',
                'virtualassistentportfolio/Screenshot 2025-09-08 002956.png'
            ]
        },
        utensilcraft: {
            title: 'Utensil Craft',
            images: [
                'UtensilCraft/Screenshot 2025-09-07 235248.png',
                'UtensilCraft/Screenshot 2025-09-07 235301.png',
                'UtensilCraft/Screenshot 2025-09-07 235311.png',
                'UtensilCraft/Screenshot 2025-09-07 235320.png',
                'UtensilCraft/Screenshot 2025-09-07 235338.png',
                'UtensilCraft/Screenshot 2025-09-07 235346.png',
                'UtensilCraft/Screenshot 2025-09-07 235356.png',
                'UtensilCraft/Screenshot 2025-09-07 235404.png'
            ]
        },
        teacherportfolio: {
            title: 'Teacher Portfolio',
            images: [
                'Teacherportfolio/Screenshot 2025-09-08 002132.png',
                'Teacherportfolio/Screenshot 2025-09-08 002153.png',
                'Teacherportfolio/Screenshot 2025-09-08 002201.png',
                'Teacherportfolio/Screenshot 2025-09-08 002208.png',
                'Teacherportfolio/Screenshot 2025-09-08 002217.png',
                'Teacherportfolio/Screenshot 2025-09-08 002225.png'
            ]
        },
        stylehub: {
            title: 'Style Hub',
            images: [
                'StyleHub/Screenshot 2025-09-07 234821.png',
                'StyleHub/Screenshot 2025-09-07 234833.png',
                'StyleHub/Screenshot 2025-09-07 234843.png',
                'StyleHub/Screenshot 2025-09-07 234903.png',
                'StyleHub/Screenshot 2025-09-07 234914.png',
                'StyleHub/Screenshot 2025-09-07 234924.png',
                'StyleHub/Screenshot 2025-09-07 234935.png',
                'StyleHub/Screenshot 2025-09-07 234945.png',
                'StyleHub/Screenshot 2025-09-07 234955.png',
                'StyleHub/Screenshot 2025-09-07 235003.png',
                'StyleHub/Screenshot 2025-09-07 235012.png',
                'StyleHub/Screenshot 2025-09-07 235022.png',
                'StyleHub/Screenshot 2025-09-07 235034.png'
            ]
        },
        pureluxsoap: {
            title: 'Pure Lux Soap',
            images: [
                'PureLuxSoap/Screenshot 2025-09-07 233744.png',
                'PureLuxSoap/Screenshot 2025-09-07 233805.png',
                'PureLuxSoap/Screenshot 2025-09-07 233816.png',
                'PureLuxSoap/Screenshot 2025-09-07 233827.png',
                'PureLuxSoap/Screenshot 2025-09-07 233837.png',
                'PureLuxSoap/Screenshot 2025-09-07 233847.png',
                'PureLuxSoap/Screenshot 2025-09-07 234002.png',
                'PureLuxSoap/Screenshot 2025-09-07 234014.png',
                'PureLuxSoap/Screenshot 2025-09-07 234023.png',
                'PureLuxSoap/Screenshot 2025-09-07 234031.png',
                'PureLuxSoap/Screenshot 2025-09-07 234043.png'
            ]
        },
        paradiseretreat: {
            title: 'Paradise Retreat',
            images: [
                'ParadiseRetreat/Screenshot 2025-09-07 235801.png',
                'ParadiseRetreat/Screenshot 2025-09-07 235810.png',
                'ParadiseRetreat/Screenshot 2025-09-07 235818.png',
                'ParadiseRetreat/Screenshot 2025-09-07 235826.png',
                'ParadiseRetreat/Screenshot 2025-09-07 235835.png',
                'ParadiseRetreat/Screenshot 2025-09-07 235841.png',
                'ParadiseRetreat/Screenshot 2025-09-07 235849.png',
                'ParadiseRetreat/Screenshot 2025-09-07 235859.png',
                'ParadiseRetreat/Screenshot 2025-09-07 235909.png',
                'ParadiseRetreat/Screenshot 2025-09-07 235917.png',
                'ParadiseRetreat/Screenshot 2025-09-07 235923.png'
            ]
        },
        modelportfolio: {
            title: 'Model Portfolio',
            images: [
                'Modelportfolio/Screenshot 2025-09-08 001709.png',
                'Modelportfolio/Screenshot 2025-09-08 001717.png',
                'Modelportfolio/Screenshot 2025-09-08 001726.png',
                'Modelportfolio/Screenshot 2025-09-08 001733.png',
                'Modelportfolio/Screenshot 2025-09-08 001741.png',
                'Modelportfolio/Screenshot 2025-09-08 001750.png',
                'Modelportfolio/Screenshot 2025-09-08 001802.png',
                'Modelportfolio/Screenshot 2025-09-08 001810.png',
                'Modelportfolio/Screenshot 2025-09-08 001817.png',
                'Modelportfolio/Screenshot 2025-09-08 001824.png',
                'Modelportfolio/Screenshot 2025-09-08 001834.png',
                'Modelportfolio/Screenshot 2025-09-08 001843.png',
                'Modelportfolio/Screenshot 2025-09-08 001853.png'
            ]
        },
        lotion: {
            title: 'Lotion Brand',
            images: [
                'Lotion/Screenshot 2025-09-07 234312.png',
                'Lotion/Screenshot 2025-09-07 234405.png',
                'Lotion/Screenshot 2025-09-07 234417.png',
                'Lotion/Screenshot 2025-09-07 234425.png',
                'Lotion/Screenshot 2025-09-07 234434.png',
                'Lotion/Screenshot 2025-09-07 234443.png',
                'Lotion/Screenshot 2025-09-07 234451.png',
                'Lotion/Screenshot 2025-09-07 234458.png',
                'Lotion/Screenshot 2025-09-07 234511.png',
                'Lotion/Screenshot 2025-09-07 234524.png',
                'Lotion/Screenshot 2025-09-07 234532.png',
                'Lotion/Screenshot 2025-09-07 234540.png',
                'Lotion/Screenshot 2025-09-07 234551.png',
                'Lotion/Screenshot 2025-09-07 234601.png',
                'Lotion/Screenshot 2025-09-07 234608.png',
                'Lotion/Screenshot 2025-09-07 234617.png',
                'Lotion/Screenshot 2025-09-07 234629.png'
            ]
        },
        engineerportfolio: {
            title: 'Engineer Portfolio',
            images: [
                'Engineerportfolio/Screenshot 2025-09-08 001425.png',
                'Engineerportfolio/Screenshot 2025-09-08 001432.png',
                'Engineerportfolio/Screenshot 2025-09-08 001439.png',
                'Engineerportfolio/Screenshot 2025-09-08 001445.png',
                'Engineerportfolio/Screenshot 2025-09-08 001533.png',
                'Engineerportfolio/Screenshot 2025-09-08 001600.png',
                'Engineerportfolio/Screenshot 2025-09-08 001610.png'
            ]
        },
        edukids: {
            title: 'EduKids',
            images: [
                'EduKids/Screenshot 2025-09-08 000449.png',
                'EduKids/Screenshot 2025-09-08 000457.png',
                'EduKids/Screenshot 2025-09-08 000506.png',
                'EduKids/Screenshot 2025-09-08 000517.png',
                'EduKids/Screenshot 2025-09-08 000526.png',
                'EduKids/Screenshot 2025-09-08 000535.png',
                'EduKids/Screenshot 2025-09-08 000816.png',
                'EduKids/Screenshot 2025-09-08 000823.png',
                'EduKids/Screenshot 2025-09-08 000831.png',
                'EduKids/Screenshot 2025-09-08 000840.png',
                'EduKids/Screenshot 2025-09-08 000850.png',
                'EduKids/Screenshot 2025-09-08 000857.png',
                'EduKids/Screenshot 2025-09-08 000904.png',
                'EduKids/Screenshot 2025-09-08 000917.png',
                'EduKids/Screenshot 2025-09-08 000925.png',
                'EduKids/Screenshot 2025-09-08 000934.png',
                'EduKids/Screenshot 2025-09-08 000942.png',
                'EduKids/Screenshot 2025-09-08 000950.png',
                'EduKids/Screenshot 2025-09-08 000959.png',
                'EduKids/Screenshot 2025-09-08 001007.png',
                'EduKids/Screenshot 2025-09-08 001019.png'
            ]
        },
        educonnect: {
            title: 'EduConnect',
            images: [
                'EduConnect/Screenshot 2025-09-08 000007.png',
                'EduConnect/Screenshot 2025-09-08 000015.png',
                'EduConnect/Screenshot 2025-09-08 000025.png',
                'EduConnect/Screenshot 2025-09-08 000034.png',
                'EduConnect/Screenshot 2025-09-08 000043.png',
                'EduConnect/Screenshot 2025-09-08 000049.png',
                'EduConnect/Screenshot 2025-09-08 000102.png',
                'EduConnect/Screenshot 2025-09-08 000113.png',
                'EduConnect/Screenshot 2025-09-08 000121.png',
                'EduConnect/Screenshot 2025-09-08 000132.png',
                'EduConnect/Screenshot 2025-09-08 000145.png',
                'EduConnect/Screenshot 2025-09-08 000155.png',
                'EduConnect/Screenshot 2025-09-08 000205.png',
                'EduConnect/Screenshot 2025-09-08 000211.png',
                'EduConnect/Screenshot 2025-09-08 000219.png',
                'EduConnect/Screenshot 2025-09-08 000227.png',
                'EduConnect/Screenshot 2025-09-08 000236.png'
            ]
        },
        cinebook: {
            title: 'Cinebook',
            images: [
                'Cinebook/Screenshot 2025-09-07 235539.png',
                'Cinebook/Screenshot 2025-09-07 235551.png',
                'Cinebook/Screenshot 2025-09-07 235600.png',
                'Cinebook/Screenshot 2025-09-07 235611.png',
                'Cinebook/Screenshot 2025-09-07 235621.png',
                'Cinebook/Screenshot 2025-09-07 235630.png',
                'Cinebook/Screenshot 2025-09-07 235637.png',
                'Cinebook/Screenshot 2025-09-07 235644.png'
            ]
        }
    };
    
    // Close modals
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }
    
    if (galleryClose) {
        galleryClose.addEventListener('click', () => {
            galleryModal.classList.remove('show');
            // Reset to first image when closing
            currentIndex = 0;
        });
    }
    
    // Close modals when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
    
    if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                galleryModal.classList.remove('show');
                // Reset to first image when closing
                currentIndex = 0;
            }
        });
    }
    
    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal.classList.contains('show')) {
                modal.classList.remove('show');
            }
            if (galleryModal.classList.contains('show')) {
                galleryModal.classList.remove('show');
                // Reset to first image when closing
                currentIndex = 0;
            }
        }
    });
    
    // Gallery navigation
    if (galleryPrev) {
        galleryPrev.addEventListener('click', () => {
            navigateGallery(-1);
        });
    }
    
    if (galleryNext) {
        galleryNext.addEventListener('click', () => {
            navigateGallery(1);
        });
    }
    
    // Keyboard navigation for gallery
    document.addEventListener('keydown', (e) => {
        if (galleryModal.classList.contains('show')) {
            if (e.key === 'ArrowLeft') {
                navigateGallery(-1);
            } else if (e.key === 'ArrowRight') {
                navigateGallery(1);
            }
        }
    });
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    if (galleryModal) {
        galleryModal.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        galleryModal.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                navigateGallery(1); // Swipe left - next image
            } else {
                navigateGallery(-1); // Swipe right - previous image
            }
        }
    }
    
    function navigateGallery(direction) {
        currentIndex += direction;
        
        if (currentIndex < 0) {
            currentIndex = currentImages.length - 1;
        } else if (currentIndex >= currentImages.length) {
            currentIndex = 0;
        }
        
        updateGalleryImage();
    }
    
    function updateGalleryImage() {
        if (currentImages.length > 0) {
            galleryImage.src = currentImages[currentIndex];
            galleryImage.alt = `${currentProject} - Image ${currentIndex + 1}`;
            galleryCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
        }
    }
    
    function openGallery(projectType) {
        const project = projectData[projectType];
        if (project) {
            currentImages = project.images;
            currentIndex = 0; // Always start with the first image
            currentProject = project.title;
            
            galleryTitle.textContent = project.title;
            
            // Force show the first image
            if (currentImages.length > 0) {
                // Reset to first image
                currentIndex = 0;
                
                // Use updateGalleryImage to ensure consistency
                updateGalleryImage();
                
                // Show modal immediately
                galleryModal.classList.add('show');
            }
        }
    }
    
    // Portfolio item click handlers
    portfolioItems.forEach(item => {
        const overlay = item.querySelector('.portfolio-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                e.preventDefault();
                const projectType = item.getAttribute('data-project');
                openGallery(projectType);
            });
        }
    });
});
