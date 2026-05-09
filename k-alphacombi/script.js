/* ============================================
   K-POP AlphaCombi Landing Page — Script
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // --- Concert Calendar Tab Switching ---
    const tabs = document.querySelectorAll('.cal-tab');
    const panels = document.querySelectorAll('.cal-panel');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            // Remove active from all tabs and panels
            tabs.forEach(function (t) { t.classList.remove('active'); });
            panels.forEach(function (p) { p.classList.remove('active'); });

            // Activate clicked tab
            tab.classList.add('active');

            // Activate corresponding panel
            var group = tab.getAttribute('data-group');
            var panel = document.getElementById('cal-' + group);
            if (panel) {
                panel.classList.add('active');
            }
        });
    });

    // --- Scroll Fade-in Animation ---
    var animatedElements = document.querySelectorAll(
        '.pain-card, .feature-card, .screenshot-showcase, .section-note p'
    );

    // Set initial state
    animatedElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    function revealOnScroll() {
        var windowHeight = window.innerHeight;
        animatedElements.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < windowHeight - 80) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    // Check on load and scroll
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll, { passive: true });

    // --- Smooth stagger for pain cards and feature cards ---
    function staggerCards(selector, delay) {
        var cards = document.querySelectorAll(selector);
        cards.forEach(function (card, i) {
            card.style.transitionDelay = (i * delay) + 'ms';
        });
    }
    staggerCards('.pain-card', 120);
    staggerCards('.feature-card', 100);

});
/* ============================================ */
/* Auto-hide past concerts                      */
/* ============================================ */
(function () {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    document.querySelectorAll('.cal-table tbody tr[data-end-date]').forEach(row => {
        const endDateStr = row.getAttribute('data-end-date');
        if (!endDateStr) return;
        const endDate = new Date(endDateStr + 'T23:59:59');
        if (endDate < today) {
            row.classList.add('cal-past');
        }
    });

    /* Show past concerts toggle */
    const toggle = document.getElementById('show-past-toggle');
    if (toggle) {
        toggle.addEventListener('change', function () {
            document.querySelectorAll('.cal-table').forEach(table => {
                if (this.checked) {
                    table.classList.add('show-past');
                } else {
                    table.classList.remove('show-past');
                }
            });
        });
    }
})();

/* ============================================ */
/* Mobile Sticky CTA — show after Hero          */
/* ============================================ */
(function () {
    const sticky = document.getElementById('mobileStickyCta');
    const hero = document.getElementById('hero');
    if (!sticky || !hero) return;

    function updateSticky() {
        if (window.innerWidth > 768) {
            sticky.classList.remove('visible');
            document.body.classList.remove('has-sticky-cta');
            return;
        }
        const heroBottom = hero.getBoundingClientRect().bottom;
        if (heroBottom < 0) {
            sticky.classList.add('visible');
            document.body.classList.add('has-sticky-cta');
        } else {
            sticky.classList.remove('visible');
            document.body.classList.remove('has-sticky-cta');
        }
    }

    window.addEventListener('scroll', updateSticky, { passive: true });
    window.addEventListener('resize', updateSticky);
    updateSticky();
})();
