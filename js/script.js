document.addEventListener('DOMContentLoaded', () => {
    // === Enhanced Navigation Toggle (Hamburger Menu) ===
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (hamburger && navLinks) {
        // Toggle mobile menu
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Toggle active class
            navLinks.classList.toggle('active');
            
            // Toggle icon between bars and X
            const icon = hamburger.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close nav on link click for mobile
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 1024) { // lg breakpoint
                    navLinks.classList.remove('active');
                    const icon = hamburger.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    body.style.overflow = '';
                }
            });
        });

        // Close nav if clicking outside when open
        document.addEventListener('click', (event) => {
            if (!navLinks.contains(event.target) && 
                !hamburger.contains(event.target) && 
                navLinks.classList.contains('active') &&
                window.innerWidth < 1024) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                body.style.overflow = '';
            }
        });

        // Handle window resize - close mobile menu if resized to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                body.style.overflow = '';
            }
        });
    }

    // === Hero Carousel (Image Slider) ===
    const carousel = document.querySelector('[data-carousel]');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevButton = carousel.querySelector('[data-carousel-button="prev"]');
        const nextButton = carousel.querySelector('[data-carousel-button="next"]');
        let currentIndex = 0;
        let autoSlideInterval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }

        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(nextSlide, 7000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
        }

        showSlide(currentIndex);
        startAutoSlide();

        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    // === Testimonial Carousel ===
    const testimonialCarousel = document.querySelector('[data-testimonial-carousel]');
    if (testimonialCarousel) {
        const testimonialSlides = testimonialCarousel.querySelectorAll('.testimonial-slide');
        const testimonialPrevButton = testimonialCarousel.querySelector('[data-testimonial-button="prev"]');
        const testimonialNextButton = testimonialCarousel.querySelector('[data-testimonial-button="next"]');
        let currentTestimonialIndex = 0;
        let autoTestimonialInterval;

        function showTestimonial(index) {
            testimonialSlides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.style.opacity = '0';
                slide.style.transform = 'scale(0.9)';
                if (i === index) {
                    slide.classList.add('active');
                    setTimeout(() => {
                        slide.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                        slide.style.opacity = '1';
                        slide.style.transform = 'scale(1)';
                    }, 50);
                }
            });
        }

        function nextTestimonial() {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialSlides.length;
            showTestimonial(currentTestimonialIndex);
        }

        function prevTestimonial() {
            currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
            showTestimonial(currentTestimonialIndex);
        }

        function startAutoTestimonialSlide() {
            stopAutoTestimonialSlide();
            autoTestimonialInterval = setInterval(nextTestimonial, 8000);
        }

        function stopAutoTestimonialSlide() {
            clearInterval(autoTestimonialInterval);
        }

        if (testimonialPrevButton) {
            testimonialPrevButton.addEventListener('click', () => {
                stopAutoTestimonialSlide();
                prevTestimonial();
                startAutoTestimonialSlide();
            });
        }

        if (testimonialNextButton) {
            testimonialNextButton.addEventListener('click', () => {
                stopAutoTestimonialSlide();
                nextTestimonial();
                startAutoTestimonialSlide();
            });
        }

        showTestimonial(currentTestimonialIndex);
        startAutoTestimonialSlide();

        testimonialCarousel.addEventListener('mouseenter', stopAutoTestimonialSlide);
        testimonialCarousel.addEventListener('mouseleave', startAutoTestimonialSlide);
    }

    // === Scroll-triggered Animations (Intersection Observer) ===
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    if (animateOnScrollElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animateOnScrollElements.forEach(element => {
            observer.observe(element);
        });
    }

    // === Sticky Header on Scroll ===
    const header = document.querySelector('header');
    if (header) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
            lastScrollTop = scrollTop;
        });
    }

    // === Accordion for FAQs or expandable content ===
    const accordions = document.querySelectorAll('.accordion-item h3');
    if (accordions.length > 0) {
        accordions.forEach(accordion => {
            accordion.addEventListener('click', () => {
                const content = accordion.nextElementSibling;
                if (content && content.classList.contains('accordion-content')) {
                    accordion.parentNode.classList.toggle('active');
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                }
            });
        });
    }

    // === Form Submission (Basic Example) ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nameField = contactForm.querySelector('#contact-name') || contactForm.querySelector('#name');
            const emailField = contactForm.querySelector('#contact-email') || contactForm.querySelector('#email');
            const messageField = contactForm.querySelector('#contact-message') || contactForm.querySelector('#message');

            if (!nameField || !emailField || !messageField) {
                console.log('Form fields not found');
                return;
            }

            const name = nameField.value;
            const email = emailField.value;
            const message = messageField.value;

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            console.log('Form Submitted:', { name, email, message });
            alert('Thank you for your message, ' + name + '! We will get back to you soon.');

            contactForm.reset();
        });
    }

    // === Dynamic Copyright Year in Footer ===
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // === Back to Top Button ===
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // === Simple Lightbox/Modal for Galleries ===
    const galleryItems = document.querySelectorAll('.gallery-grid a');
    if (galleryItems.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;justify-content:center;align-items:center;z-index:1000;opacity:0;pointer-events:none;transition:opacity 0.3s ease';
        document.body.appendChild(lightbox);

        galleryItems.forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                lightbox.style.opacity = '1';
                lightbox.style.pointerEvents = 'auto';
                
                const img = document.createElement('img');
                img.src = item.href;
                img.alt = item.querySelector('img')?.alt || 'Gallery image';
                img.style.cssText = 'max-width:90%;max-height:90%;border:4px solid white;box-shadow:0 0 20px rgba(0,0,0,0.5)';
                
                while (lightbox.firstChild) {
                    lightbox.removeChild(lightbox.firstChild);
                }
                lightbox.appendChild(img);
            });
        });

        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) {
                lightbox.style.opacity = '0';
                lightbox.style.pointerEvents = 'none';
            }
        });
    }
});