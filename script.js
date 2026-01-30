document.querySelectorAll('a[href^="#"]:not(.project-link)').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Mobile menu toggle
        const menuBtn = document.getElementById('menuBtn');
        if (menuBtn) {
            menuBtn.addEventListener('click', function() {
                alert('Mobile menu would open here. Add your mobile menu implementation.');
            });
        }

        // Scroll animations
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

        document.querySelectorAll('.service-card, .section-text').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });

document.addEventListener("DOMContentLoaded", () => {
    // Select filter buttons from filter-nav class
    const buttons = document.querySelectorAll(".filter-nav button");
    const projects = document.querySelectorAll(".project-link");

    console.log("Buttons found:", buttons.length);
    console.log("Projects found:", projects.length);

    // Set initial state - show all projects and mark "All" as active
    buttons.forEach(button => {
        if (button.dataset.filter === "all") {
            button.classList.add("active");
        }
    });

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const filter = button.dataset.filter;

            console.log("Filter clicked:", filter);

            // Active button styling
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Filter projects
            projects.forEach(project => {
                const category = project.dataset.category;
                const match = filter === "all" || category === filter;

                console.log(`Project: ${category}, Match: ${match}`);
                project.style.display = match ? "block" : "none";
            });
        });
    });

    // ========== Video modal behavior ==========
    const videoModal = document.getElementById('video-modal');
    const videoEl = document.getElementById('project-video');
    const closeBtn = videoModal && videoModal.querySelector('.video-modal-close');

    function closeVideoModal() {
        if (!videoModal || !videoEl) return;
        try { videoEl.pause(); } catch(e){}
        videoEl.removeAttribute('src');
        videoEl.load();
        videoModal.classList.remove('open');
        videoModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    document.querySelectorAll('.project-link[data-video]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const src = link.dataset.video;
            if (!src || !videoModal || !videoEl) return;
            videoEl.src = src;
            videoModal.classList.add('open');
            videoModal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
            setTimeout(() => {
                videoEl.play().catch(() => {});
                if (closeBtn) closeBtn.focus();
            }, 100);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeVideoModal);

    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeVideoModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeVideoModal();
    });

});

