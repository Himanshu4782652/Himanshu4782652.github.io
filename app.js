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
    // This section has been completely updated to reflect the new professional resume structure
    // encompassing Enterprise projects, CI/CD, Docker, and Cloud experience.
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
                    body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
                    h1 { color: #2c5282; border-bottom: 2px solid #2c5282; padding-bottom: 10px; margin-bottom: 5px; }
                    h2 { color: #2d3748; margin-top: 25px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; text-transform: uppercase; font-size: 1.1em; letter-spacing: 0.5px; }
                    .header-info { background: #f7fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2c5282; }
                    .experience-item, .project-item { margin-bottom: 20px; }
                    .role-title { font-weight: bold; color: #2c5282; font-size: 1.05em; }
                    .company-date { color: #718096; font-style: italic; display: block; margin-bottom: 5px; font-size: 0.95em; }
                    .tech-stack { font-family: Consolas, monospace; background: #edf2f7; padding: 2px 6px; border-radius: 4px; font-size: 0.85em; color: #4a5568; }
                    ul { margin-top: 5px; padding-left: 20px; margin-bottom: 10px; }
                    li { margin-bottom: 4px; }
                    a { color: #2c5282; text-decoration: none; }
                </style>
            </head>
            <body>
                <h1>Himanshu Srivastav</h1>
                <div class="header-info">
                    <strong>Python Full Stack Developer & AI Enthusiast</strong><br>
                    Email: himanshusriwastaval11@gmail.com | Phone: +91-983-576-2937<br>
                    Location: Ujjain, India | Links: <a href="https://github.com/Himanshu4782652">GitHub</a> | <a href="https://linkedin.com/in/himanshu-srivastav-925484236/">LinkedIn</a>
                </div>

                <h2>Career Objective</h2>
                <p>
                    Results-oriented Python Full Stack Developer with experience engineering robust web applications and enterprise
                    solutions utilizing Django, FastAPI, and Cloud Technologies. I excel at integrating hardware interfaces (RFID, Biometrics), 
                    developing LLM-based agents, and implementing CI/CD pipelines. My proven ability to translate complex requirements into 
                    scalable software solutions is complemented by a strong focus on optimizing system performance.
                </p>

                <h2>Professional Experience</h2>
                
                <div class="experience-item">
                    <span class="role-title">Software Developer (Python Full Stack)</span>
                    <span class="company-date">MR Softwares | May 2025 - Present</span>
                    <ul>
                        <li>Led development of multiple production-grade Django applications, optimizing database queries to handle high-volume enterprise records.</li>
                        <li><strong>DevOps & Cloud:</strong> Implemented CI/CD pipelines and managed Oracle Cloud (OCI) S3 storage integrations using Docker containers.</li>
                        <li><strong>Hardware Integration:</strong> Bridged software with hardware (RFID, Biometrics) and external APIs (Meta, Government Data Standards).</li>
                        <li><strong>AI & Automation:</strong> Developed and deployed LLM-based chatbots to automate user support queries, significantly reducing manual ticket volume.</li>
                    </ul>
                </div>

                <div class="experience-item">
                    <span class="role-title">Python Developer Intern</span>
                    <span class="company-date">CodeAlpha | Oct 2023 - Jan 2024</span>
                    <ul>
                        <li>Developed modular Python scripts to automate data processing tasks, improving workflow efficiency by 15%.</li>
                    </ul>
                </div>

                <div class="experience-item">
                    <span class="role-title">Software Developer Intern</span>
                    <span class="company-date">Oasis Infobyte | Apr 2023 - May 2023</span>
                    <ul>
                        <li>Completed an internship in web development and design, delivering projects such as a landing page and portfolio.</li>
                    </ul>
                </div>

                <h2>Key Enterprise Projects</h2>
                
                <div class="project-item">
                    <span class="role-title">eSchool Biometric & AI System</span> <span class="tech-stack">[FastAPI, LLM, Biometrics]</span>
                    <ul>
                        <li>Attendance verification system using biometric punches and selfies. Deployed an AI chatbot for automated support.</li>
                    </ul>
                </div>

                <div class="project-item">
                    <span class="role-title">MAA Application</span> <span class="tech-stack">[Django, Data Visualization, Analytics]</span>
                    <ul>
                        <li>Child nutrition monitoring system calculating malnutrition status via WHO standards. Built dashboards for government officials.</li>
                    </ul>
                </div>

                <div class="project-item">
                    <span class="role-title">Nitiraj Licensing & Stamping</span> <span class="tech-stack">[Django, OCI, RBAC]</span>
                    <ul>
                        <li>Dual-purpose enterprise app for software licensing and document stamping with Oracle Cloud integration.</li>
                    </ul>
                </div>

                 <div class="project-item">
                    <span class="role-title">Waahapp</span> <span class="tech-stack">[Django, Meta API, Webhooks]</span>
                    <ul>
                        <li>WhatsApp messaging platform using Meta's Official API with complex scheduling and webhook handling.</li>
                    </ul>
                </div>

                <div class="project-item">
                    <span class="role-title">SCS (Legal Tech)</span> <span class="tech-stack">[Python, Scraping, Automation]</span>
                    <ul>
                        <li>Real-time cause list delivery system scraping and parsing court data for advocates.</li>
                    </ul>
                </div>

                <h2>Technical Skills</h2>
                <p>
                    <strong>Languages/Frameworks:</strong> Python, Django, FastAPI, Flask, JavaScript, HTML/CSS<br>
                    <strong>DevOps & Cloud:</strong> Docker, CI/CD Pipelines, Oracle Cloud (OCI), AWS, Linux, Shell Scripting<br>
                    <strong>Specialized:</strong> LLMs, Machine Learning, OpenCV, RFID/Biometric Hardware Integration, Web Scraping (Selenium/Scrapy)
                </p>
                
                <h2>Education</h2>
                 <div class="experience-item">
                    <span class="role-title">B.Tech in Computer Science & IT</span>
                    <span class="company-date">IES IPS Academy, Indore | 2021 - 2025 | GPA: 7.50/10</span>
                </div>
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