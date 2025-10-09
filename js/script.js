document.addEventListener('DOMContentLoaded', () => {
    // === Enhanced Navigation Toggle (Hamburger Menu) ===
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const header = document.querySelector('header');

    if (hamburger && navLinks) {
        // Toggle mobile menu
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
            
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close nav on link click for mobile
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 1024) {
                    navLinks.classList.remove('active');
                    const icon = hamburger.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    body.style.overflow = '';
                }
            });
        });

        // Close nav if clicking outside
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

        // Handle window resize
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

    // === Set Active Navigation Link Based on Current Page ===
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const allNavLinks = document.querySelectorAll('.nav-link, .nav-link-cta');
    
    allNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // === Header Shadow on Scroll ===
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
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

    // === Scroll-triggered Animations ===
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

    // === Dynamic Copyright Year ===
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
});