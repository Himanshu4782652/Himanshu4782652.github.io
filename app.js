document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("site-header");
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = [...document.querySelectorAll(".nav-link")];
    const sections = [...document.querySelectorAll("main section[id]")];
    const revealNodes = [...document.querySelectorAll(".reveal")];
    const copyEmailButton = document.getElementById("copy-email");
    const footerYear = document.getElementById("footer-year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    revealNodes.forEach((node) => {
        const delay = node.dataset.delay || "0";
        node.style.setProperty("--delay", `${delay}ms`);
    });

    const closeMenu = () => {
        navMenu.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle?.addEventListener("click", () => {
        const willOpen = !navMenu.classList.contains("open");
        navMenu.classList.toggle("open", willOpen);
        menuToggle.classList.toggle("active", willOpen);
        menuToggle.setAttribute("aria-expanded", String(willOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 820) {
                closeMenu();
            }
        });
    });

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const id = entry.target.getAttribute("id");
                navLinks.forEach((link) => {
                    const isActive = link.getAttribute("href") === `#${id}`;
                    link.classList.toggle("active", isActive);
                });
            });
        },
        {
            threshold: 0.45,
            rootMargin: "-10% 0px -35% 0px"
        }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.14,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealNodes.forEach((node) => revealObserver.observe(node));

    const handleHeaderState = () => {
        header.classList.toggle("scrolled", window.scrollY > 24);
    };

    handleHeaderState();
    window.addEventListener("scroll", handleHeaderState, { passive: true });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 820) {
            closeMenu();
        }
    });

    copyEmailButton?.addEventListener("click", async () => {
        const email = "himanshusriwastava111@gmail.com";
        const originalText = copyEmailButton.textContent;

        try {
            await navigator.clipboard.writeText(email);
            copyEmailButton.textContent = "Email Copied";
        } catch (error) {
            copyEmailButton.textContent = "Copy Failed";
        }

        window.setTimeout(() => {
            copyEmailButton.textContent = originalText;
        }, 1800);
    });
});
