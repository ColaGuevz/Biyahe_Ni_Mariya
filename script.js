document.addEventListener('DOMContentLoaded', () => {

    // Initialize EmailJS
    emailjs.init("90z3Dk_k7tzH9s1b0");

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

    // Form handling
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show loading state
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        contactForm.classList.add('form-submitting');

        // Get form data
        const formData = {
            user_name: document.getElementById('user_name').value,
            user_email: document.getElementById('user_email').value,
            message: document.getElementById('message').value
        };

        // Send email using EmailJS
        emailjs.send('service_r01yfpa', 'template_850pd9r', formData)
            .then(function() {
                // Show success message
                formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
                formStatus.className = 'form-status success';
                
                // Reset form
                contactForm.reset();
            })
            .catch(function(error) {
                // Show error message
                formStatus.textContent = 'Sorry, there was an error sending your message. Please try again later.';
                formStatus.className = 'form-status error';
                console.error('EmailJS error:', error);
            })
            .finally(function() {
                // Reset button state
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
                contactForm.classList.remove('form-submitting');
            });
    });

});