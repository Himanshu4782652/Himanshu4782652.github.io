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
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="ri-menu-line"></i>';
            }
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

    var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
    var NODE_COUNT = isMobile ? 35 : 85;
    var MAX_DIST = 2.2;

    // Scene setup
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
    camera.position.z = 6;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: !isMobile });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    var mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    // ── Plexus Nodes Data ──
    var nodes = [];
    var rangeX = 7, rangeY = 4, rangeZ = 4;

    for (var i = 0; i < NODE_COUNT; i++) {
        nodes.push({
            x: (Math.random() - 0.5) * rangeX,
            y: (Math.random() - 0.5) * rangeY,
            z: (Math.random() - 0.5) * rangeZ,
            vx: (Math.random() - 0.5) * 0.006,
            vy: (Math.random() - 0.5) * 0.006,
            vz: (Math.random() - 0.5) * 0.006
        });
    }

    // Points geometry
    var pGeo = new THREE.BufferGeometry();
    var pPos = new Float32Array(NODE_COUNT * 3);
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));

    var pointsMat = new THREE.PointsMaterial({
        color: "#00ffaa",
        size: isMobile ? 0.08 : 0.06,
        transparent: true,
        opacity: 0.8
    });
    var points = new THREE.Points(pGeo, pointsMat);
    scene.add(points);

    // Lines segments geometry
    var lGeo = new THREE.BufferGeometry();
    var maxLines = NODE_COUNT * NODE_COUNT;
    var lPos = new Float32Array(maxLines * 6);
    lGeo.setAttribute("position", new THREE.BufferAttribute(lPos, 3));

    var lineMat = new THREE.LineBasicMaterial({
        color: "#00f2fe",
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });
    var lines = new THREE.LineSegments(lGeo, lineMat);
    scene.add(lines);

    // Events
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

    var clock = new THREE.Clock();

    function tick() {
        requestAnimationFrame(tick);
        if (document.hidden) return;

        var t = clock.getElapsedTime();

        // Mouse tracking
        mouse.x += (mouse.tx - mouse.x) * 0.04;
        mouse.y += (mouse.ty - mouse.y) * 0.04;

        // Fade based on scroll
        var fade = Math.max(0, 1 - scrollPos / (innerHeight * 1.5));
        if (fade <= 0.01) {
            renderer.render(scene, camera);
            return;
        }

        // Update nodes physics
        var idx = 0;
        for (var i = 0; i < NODE_COUNT; i++) {
            var n = nodes[i];
            n.x += n.vx;
            n.y += n.vy;
            n.z += n.vz;

            // Wrap-around bounds checking
            if (Math.abs(n.x) > rangeX/2) n.vx *= -1;
            if (Math.abs(n.y) > rangeY/2) n.vy *= -1;
            if (Math.abs(n.z) > rangeZ/2) n.vz *= -1;

            // Mouse interaction: push/pull nodes slightly
            var dx = n.x - mouse.x * 2.5;
            var dy = n.y - mouse.y * 1.5;
            var distMouse = Math.sqrt(dx*dx + dy*dy);
            if (distMouse < 2.0) {
                var force = (2.0 - distMouse) * 0.01;
                n.x += dx * force;
                n.y += dy * force;
            }

            pPos[idx++] = n.x;
            pPos[idx++] = n.y;
            pPos[idx++] = n.z;
        }
        pGeo.attributes.position.needsUpdate = true;

        // Calculate connections
        var lineIdx = 0;
        var lineCount = 0;
        for (var i = 0; i < NODE_COUNT; i++) {
            var n1 = nodes[i];
            for (var j = i + 1; j < NODE_COUNT; j++) {
                var n2 = nodes[j];
                var dx = n1.x - n2.x;
                var dy = n1.y - n2.y;
                var dz = n1.z - n2.z;
                var dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

                if (dist < MAX_DIST) {
                    lPos[lineIdx++] = n1.x;
                    lPos[lineIdx++] = n1.y;
                    lPos[lineIdx++] = n1.z;
                    lPos[lineIdx++] = n2.x;
                    lPos[lineIdx++] = n2.y;
                    lPos[lineIdx++] = n2.z;
                    lineCount++;
                }
            }
        }
        lGeo.setDrawRange(0, lineCount * 2);
        lGeo.attributes.position.needsUpdate = true;

        // Constellation movement: slow rotation
        points.rotation.y = t * 0.02;
        points.rotation.x = mouse.y * 0.08;
        lines.rotation.y = t * 0.02;
        lines.rotation.x = mouse.y * 0.08;

        pointsMat.opacity = 0.8 * fade;
        lineMat.opacity = 0.15 * fade;

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
        "Git", "PyQt6", "geopy", "LLMs", "dlib", "Supabase",
        "Alembic", "JWT", "SQLite", "GDAL", "ArcGIS", "rasterio",
        "TensorFlow", "Keras", "scikit-learn"
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
