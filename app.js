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

    // Update footer year
    const yearSpan = document.getElementById("footer-year");
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }

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

// ==========================================
// THREE.JS 3D PARTICLE GALAXY + FLOATING SHAPES
// ==========================================
(function initThreeScene() {
    if (typeof THREE === "undefined") return;
    var canvas = document.getElementById("three-canvas");
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.body.classList.add("three-active");

    var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    var PARTICLE_COUNT = isMobile ? 800 : 2000;

    // Scene setup
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
    camera.position.z = 5;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: !isMobile });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Smooth mouse tracking
    var mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    // ── Spiral Galaxy Particles ──
    var pGeo = new THREE.BufferGeometry();
    var pPos = new Float32Array(PARTICLE_COUNT * 3);
    var pCol = new Float32Array(PARTICLE_COUNT * 3);

    var palette = [
        new THREE.Color("#3b82f6"),
        new THREE.Color("#06b6d4"),
        new THREE.Color("#8b5cf6"),
        new THREE.Color("#ec4899")
    ];

    for (var i = 0; i < PARTICLE_COUNT; i++) {
        var i3 = i * 3;
        var r = Math.random() * 4.5 + 0.2;
        var spin = r * 2.8;
        var branch = ((i % 3) / 3) * Math.PI * 2;
        var scatter = Math.pow(Math.random(), 3);

        pPos[i3]     = Math.cos(branch + spin) * r + (scatter - 0.5) * r * 0.35;
        pPos[i3 + 1] = (Math.pow(Math.random(), 3) - 0.5) * 0.8;
        pPos[i3 + 2] = Math.sin(branch + spin) * r + (scatter - 0.5) * r * 0.35;

        var c = palette[i % palette.length].clone();
        c.lerp(new THREE.Color("#ffffff"), Math.random() * 0.25);
        pCol[i3] = c.r;
        pCol[i3 + 1] = c.g;
        pCol[i3 + 2] = c.b;
    }

    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));

    var particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
        size: isMobile ? 0.04 : 0.025,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    }));
    scene.add(particles);

    // ── Floating Wireframe Shapes ──
    var shapeData = [
        { g: new THREE.IcosahedronGeometry(0.5, 0),        p: [-3.5, 2, -2],     c: "#3b82f6", s: [0.003, 0.005] },
        { g: new THREE.TorusKnotGeometry(0.3, 0.1, 64, 8), p: [4, -1.5, -3],     c: "#8b5cf6", s: [0.004, 0.002] },
        { g: new THREE.OctahedronGeometry(0.45, 0),         p: [-2.5, -2.5, -1.5], c: "#ec4899", s: [0.002, 0.004] },
        { g: new THREE.TetrahedronGeometry(0.4, 0),         p: [2.5, 2.5, -2],    c: "#06b6d4", s: [0.005, 0.003] },
        { g: new THREE.DodecahedronGeometry(0.35, 0),       p: [4.5, 1, -4],      c: "#3b82f6", s: [0.003, 0.006] },
        { g: new THREE.IcosahedronGeometry(0.3, 1),         p: [-4.5, 0.5, -3.5], c: "#8b5cf6", s: [0.004, 0.002] }
    ];

    var shapeMeshes = [];
    if (!isMobile) {
        shapeData.forEach(function(s) {
            var mat = new THREE.MeshBasicMaterial({
                color: s.c,
                wireframe: true,
                transparent: true,
                opacity: 0.12
            });
            var mesh = new THREE.Mesh(s.g, mat);
            mesh.position.set(s.p[0], s.p[1], s.p[2]);
            mesh.userData = { speed: s.s, baseY: s.p[1] };
            scene.add(mesh);
            shapeMeshes.push(mesh);
        });
    }

    // ── Events ──
    document.addEventListener("mousemove", function(e) {
        mouse.tx = (e.clientX / innerWidth) * 2 - 1;
        mouse.ty = -(e.clientY / innerHeight) * 2 + 1;
    });

    var scrollPos = 0;
    window.addEventListener("scroll", function() { scrollPos = window.pageYOffset; }, { passive: true });

    window.addEventListener("resize", function() {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
    });

    // ── Render Loop ──
    var clock = new THREE.Clock();

    function tick() {
        requestAnimationFrame(tick);
        if (document.hidden) return;

        var t = clock.getElapsedTime();

        // Smooth mouse interpolation
        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;

        // Scroll-based fade (particles fade as you scroll down)
        var fade = Math.max(0, 1 - scrollPos / (innerHeight * 2));

        // Particle galaxy: slow rotation + mouse reactivity
        particles.rotation.y = t * 0.06;
        particles.rotation.x = mouse.y * 0.25;
        particles.position.x = mouse.x * 0.4;
        particles.material.opacity = 0.8 * Math.max(0.1, fade);

        // Floating shapes: rotate + bob + parallax fade
        for (var j = 0; j < shapeMeshes.length; j++) {
            var m = shapeMeshes[j];
            m.rotation.x += m.userData.speed[0];
            m.rotation.y += m.userData.speed[1];
            m.position.y = m.userData.baseY + Math.sin(t * 0.5 + j * 1.5) * 0.25;
            m.material.opacity = 0.12 * Math.max(0.3, fade + 0.3);
        }

        renderer.render(scene, camera);
    }

    tick();
})();

// ==========================================
// 3D TILT EFFECT ON CARDS
// ==========================================
(function initTiltCards() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ("ontouchstart" in window) return; // Skip on touch devices

    var cards = document.querySelectorAll(".project-card, .metric-card, .impact-card, .skill-card");

    cards.forEach(function(card) {
        var glow = document.createElement("div");
        glow.className = "tilt-glow";
        card.appendChild(glow);

        card.addEventListener("mousemove", function(e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var rotX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
            var rotY = ((x - rect.width / 2) / (rect.width / 2)) * 10;

            card.style.transform = "perspective(800px) rotateX(" + rotX + "deg) rotateY(" + rotY + "deg) translateY(-8px) scale3d(1.03,1.03,1.03)";
            glow.style.opacity = "1";
            glow.style.background = "radial-gradient(circle at " + x + "px " + y + "px, rgba(59,130,246,0.12), transparent 50%)";
        });

        card.addEventListener("mouseleave", function() {
            card.style.transform = "";
            card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
            glow.style.opacity = "0";
            setTimeout(function() { card.style.transition = ""; }, 500);
        });
    });
})();

// ==========================================
// INTERACTIVE 3D SKILLS GLOBE
// ==========================================
(function initSkillsGlobe() {
    var el = document.getElementById("skills-globe");
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var skills = [
        "Python", "Django", "FastAPI", "Flask", "Celery", "Redis",
        "PostgreSQL", "MySQL", "Docker", "Linux", "Nginx",
        "DeepFace", "OpenCV", "PyTorch", "Qdrant", "OpenSearch",
        "aiomysql", "SQLAlchemy", "DRF", "Playwright", "Selenium",
        "Scrapy", "WebSocket", "RFID", "Azure", "OCI",
        "Git", "PyQt6", "geopy", "LLMs", "dlib"
    ];

    var R = 160;
    var PHI = (1 + Math.sqrt(5)) / 2;
    var tags = [];

    skills.forEach(function(skill, idx) {
        var theta = Math.acos(1 - 2 * (idx + 0.5) / skills.length);
        var phi = 2 * Math.PI * idx / PHI;

        var span = document.createElement("span");
        span.className = "globe-tag";
        span.textContent = skill;
        el.appendChild(span);

        tags.push({
            el: span,
            x: R * Math.sin(theta) * Math.cos(phi),
            y: R * Math.sin(theta) * Math.sin(phi),
            z: R * Math.cos(theta)
        });
    });

    var ax = 0, ay = 0, mx = 0, my = 0;
    var drag = false, lx = 0, ly = 0;

    el.addEventListener("mousedown", function(e) {
        drag = true; lx = e.clientX; ly = e.clientY; mx = my = 0;
    });
    document.addEventListener("mousemove", function(e) {
        if (!drag) return;
        mx = (e.clientX - lx) * 0.008;
        my = (e.clientY - ly) * 0.008;
        lx = e.clientX; ly = e.clientY;
    });
    document.addEventListener("mouseup", function() { drag = false; });

    // Touch support
    el.addEventListener("touchstart", function(e) {
        drag = true; lx = e.touches[0].clientX; ly = e.touches[0].clientY;
    }, { passive: true });
    document.addEventListener("touchmove", function(e) {
        if (!drag) return;
        mx = (e.touches[0].clientX - lx) * 0.008;
        my = (e.touches[0].clientY - ly) * 0.008;
        lx = e.touches[0].clientX; ly = e.touches[0].clientY;
    }, { passive: true });
    document.addEventListener("touchend", function() { drag = false; });

    // Only animate when visible (performance)
    var isVisible = false;
    var globeObs = new IntersectionObserver(function(entries) {
        isVisible = entries[0].isIntersecting;
    }, { threshold: 0.1 });
    globeObs.observe(el);

    function updateGlobe() {
        requestAnimationFrame(updateGlobe);
        if (!isVisible) return;

        // Auto-rotate when idle; apply momentum and decay when not dragging
        if (!drag) {
            ay += 0.003;
            ax += 0.0008;
            mx *= 0.95;
            my *= 0.95;
        }
        ay += mx;
        ax += my;

        var ca = Math.cos(ax), sa = Math.sin(ax);
        var cb = Math.cos(ay), sb = Math.sin(ay);

        for (var k = 0; k < tags.length; k++) {
            var t = tags[k];

            // Rotate around Y axis
            var x1 = t.x * cb - t.z * sb;
            var z1 = t.x * sb + t.z * cb;

            // Rotate around X axis
            var y1 = t.y * ca - z1 * sa;
            var z2 = t.y * sa + z1 * ca;

            // Scale and opacity based on depth
            var scale = (z2 + R * 2) / (R * 4);

            t.el.style.transform = "translate(-50%,-50%) translate3d(" + x1 + "px," + y1 + "px,0)";
            t.el.style.opacity = Math.max(0.15, Math.min(1, scale * 1.5));
            t.el.style.fontSize = (9 + scale * 10) + "px";
            t.el.style.zIndex = Math.round(z2 + R);
        }
    }

    updateGlobe();
})();
