// Portfolio App JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Resume Download Functionality
    const downloadResumeBtn = document.getElementById('download-resume');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function() {
            // Create resume content as a text/HTML file
            const resumeContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Himanshu Srivastav - Resume</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
                    h1 { color: #2c5282; border-bottom: 2px solid #2c5282; padding-bottom: 10px; }
                    h2 { color: #2d3748; margin-top: 30px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
                    .header-info { background: #f7fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
                    .experience-item, .project-item { margin-bottom: 25px; }
                    .role-title { font-weight: bold; color: #2c5282; font-size: 1.1em; }
                    .company-date { color: #718096; font-style: italic; margin-bottom: 10px; display: block; }
                    .tech-stack { color: #4a5568; font-family: monospace; background: #edf2f7; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
                    ul { margin-top: 5px; padding-left: 20px; }
                </style>
            </head>
            <body>
                <h1>Himanshu Srivastav</h1>
                <div class="header-info">
                    <strong>Python Full Stack Developer</strong><br>
                    Email: himanshusriwastava111@gmail.com | Phone: +91-983-576-2937<br>
                    Location: Ujjain, India | Links: <a href="https://github.com/Himanshu4782652">GitHub</a>
                </div>

                <h2>Professional Experience</h2>
                
                <div class="experience-item">
                    <span class="role-title">Software Developer (Python Full Stack)</span>
                    <span class="company-date">MR Softwares | May 2025 - Present</span>
                    <ul>
                        <li>Developed features using Django & MySQL; managed S3 buckets (Oracle Cloud) for data storage.</li>
                        <li><strong>Key Project: Waahapp</strong> - Django-based WhatsApp messaging app using Meta API, Webhooks, and Scheduler.</li>
                        <li><strong>Key Project: Nitiraj Licensing</strong> - Dual-purpose Django app for software licensing and stamping with OCI integration.</li>
                        <li><strong>Key Project: Desktop Hotel Lock System</strong> - Python GUI application interfacing with RFID hardware.</li>
                    </ul>
                </div>

                <div class="experience-item">
                    <span class="role-title">Python Developer Intern</span>
                    <span class="company-date">CodeAlpha | Oct 2023 - Jan 2024</span>
                    <ul>
                        <li>Focused on upscaling skills and contributing to team development goals.</li>
                    </ul>
                </div>

                <div class="experience-item">
                    <span class="role-title">Software Developer Intern</span>
                    <span class="company-date">Oasis Infobyte | Apr 2023 - May 2023</span>
                    <ul>
                        <li>Delivered web development projects including a landing page and portfolio.</li>
                    </ul>
                </div>

                <h2>Key Projects</h2>
                
                <div class="project-item">
                    <span class="role-title">Vulnerability Scanner</span> <span class="tech-stack">[Python, Django, Security]</span>
                    <ul>
                        <li>Security tool designed to identify vulnerabilities in web applications (Feb 2025 - Apr 2025).</li>
                    </ul>
                </div>

                <div class="project-item">
                    <span class="role-title">Process Monitoring System</span> <span class="tech-stack">[Python, Django REST, Windows API]</span>
                    <ul>
                        <li>System monitoring Windows processes with a Python agent and Django backend (Jul 2025 - Aug 2025).</li>
                    </ul>
                </div>

                <h2>Technical Skills</h2>
                <p>
                    <strong>Languages & Frameworks:</strong> Python, Django, Flask, FastAPI, JavaScript, HTML/CSS<br>
                    <strong>Tools & Cloud:</strong> AWS, Oracle Cloud (OCI), Docker, Git/GitHub, Linux<br>
                    <strong>Specialized:</strong> Machine Learning, OpenCV, Web Scraping (Selenium/Scrapy), REST APIs
                </p>
            </body>
            </html>
            `;

            // Create and download the file
            const blob = new Blob([resumeContent], { type: 'text/html' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'Himanshu_Srivastav_Resume.html';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            // Show success message
            showResumeDownloadMessage();
        });
    }

    // Show resume download message
    function showResumeDownloadMessage() {
        const button = document.getElementById('download-resume');
        const originalText = button.innerHTML;
        
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px;">
                <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
            </svg>
            Downloaded!
        `;
        button.style.background = 'var(--color-success)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(31, 33, 33, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(31, 33, 33, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Scroll animations
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.fade-in-up');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Skills progress bar animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0 && !bar.classList.contains('animated')) {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth;
                bar.classList.add('animated');
            }
        });
    }

    // Add fade-in-up class to elements that should animate
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.stat-card, .timeline-item, .project-card, .skill-category, .education-card, .certification-card');
        animatedElements.forEach(element => {
            element.classList.add('fade-in-up');
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formEntries = Object.fromEntries(formData);
            
            // Basic form validation
            if (!formEntries.name || !formEntries.email || !formEntries.subject || !formEntries.message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(formEntries.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Form validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show form message
    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Add styles
        messageDiv.style.cssText = `
            margin-top: 16px;
            padding: 12px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            ${type === 'success' ? 
                'background: rgba(33, 128, 141, 0.15); color: var(--color-success); border: 1px solid rgba(33, 128, 141, 0.25);' : 
                'background: rgba(192, 21, 47, 0.15); color: var(--color-error); border: 1px solid rgba(192, 21, 47, 0.25);'
            }
        `;
        
        contactForm.appendChild(messageDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add subtle parallax effect to hero section
    function handleParallaxEffect() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }

    // Typing animation for hero title
    function initTypingAnimation() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.innerHTML;
            heroTitle.innerHTML = '';
            heroTitle.style.opacity = '1';
            
            let index = 0;
            function typeWriter() {
                if (index < text.length) {
                    heroTitle.innerHTML = text.slice(0, index + 1);
                    index++;
                    setTimeout(typeWriter, 50);
                }
            }
            
            setTimeout(typeWriter, 500);
        }
    }

    // Social link hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    // Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when skills section comes into view
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Initialize scroll-based features
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNavLink();
                handleNavbarScroll();
                handleScrollAnimations();
                handleParallaxEffect();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', function() {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Initialize
    initScrollAnimations();
    initTypingAnimation();
    updateActiveNavLink();
    handleNavbarScroll();

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            handleScrollAnimations();
            animateSkillBars();
        }, 100);
    });

    // Add smooth reveal animation for page load
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) * {
            animation-play-state: paused !important;
        }
        
        .loaded .hero-content {
            animation: fadeInUp 1s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Enhanced button click effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
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
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    console.log('Portfolio loaded successfully! 🚀');
});