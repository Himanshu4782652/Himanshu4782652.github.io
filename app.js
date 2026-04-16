document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("site-header");
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = [...document.querySelectorAll(".nav-link")];
    const sections = [...document.querySelectorAll("section[id]")];
    const revealNodes = [...document.querySelectorAll(".reveal")];

    // Scroll Reveal Intersection Observer
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealNodes.forEach(node => revealObserver.observe(node));

    // Sticky Header Handle
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Update active nav link
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", handleScroll);

    // Mobile Menu Toggle
    menuToggle?.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        const isOpen = navMenu.classList.contains("open");
        menuToggle.innerHTML = isOpen ? '<i class="ri-close-line"></i>' : '<i class="ri-menu-line"></i>';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
        });
    });

    // Hero Background Parallax (Subtle)
    window.addEventListener("mousemove", (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const blob1 = document.querySelector(".blob-1");
        const blob2 = document.querySelector(".blob-2");
        
        if (blob1) blob1.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
        if (blob2) blob2.style.transform = `translate(${-(x * 50)}px, ${-(y * 50)}px)`;
    });

    // Count Up Animation for Metrics
    const metrics = document.querySelectorAll(".metric-card strong");
    const countUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = target.innerText;
                if (countTo.includes("+") || countTo.includes("year")) {
                    // For strings with non-numeric chars, we just show them
                    target.style.opacity = 1;
                } else {
                    // Simple animation for numeric parts if needed
                    // For now, keeping it simple as per the existing strings
                }
            }
        });
    });

    metrics.forEach(m => countUpObserver.observe(m));

    // Copy Email Functionality
    const copyBtn = document.getElementById("copy-email");
    copyBtn?.addEventListener("click", () => {
        const email = "himanshusriwastava111@gmail.com";
        navigator.clipboard.writeText(email).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = "Copied!";
            setTimeout(() => {
                copyBtn.innerText = originalText;
            }, 2000);
        });
    });
});
