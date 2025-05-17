document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header'); // To add class for X icon

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        header.classList.toggle('nav-open'); // For styling the hamburger icon

        // Aria-expanded for accessibility
        const isExpanded = navLinks.classList.contains('nav-active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                header.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Smooth Scrolling for anchor links (optional if CSS scroll-behavior: smooth is enough)
    // This JS version can be more customizable or offer better browser support for some cases
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only prevent default for actual internal links, not for href="#"
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // Intersection Observer for Scroll Animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation to save resources
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove 'visible' to re-animate if scrolled out and back in
                // entry.target.classList.remove('visible');
            }
        });
    }, {
        rootMargin: '0px', // How far from viewport edge to trigger
        threshold: 0.1   // 10% of item visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });


    // Update footer year
    document.getElementById('year').textContent = new Date().getFullYear();

});