document.addEventListener('DOMContentLoaded', () => {
    // === Navigation Toggle (Hamburger Menu) ===
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times'); // Change icon to 'X'
        });

        // Close nav on link click for mobile
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) { // Only close on mobile
                    navLinks.classList.remove('active');
                    hamburger.querySelector('i').classList.add('fa-bars');
                    hamburger.querySelector('i').classList.remove('fa-times');
                }
            });
        });

        // Close nav if clicking outside when open (desktop fallback)
        document.addEventListener('click', (event) => {
            if (!navLinks.contains(event.target) && !hamburger.contains(event.target) && navLinks.classList.contains('active')) {
                if (window.innerWidth <= 992) {
                    navLinks.classList.remove('active');
                    hamburger.querySelector('i').classList.add('fa-bars');
                    hamburger.querySelector('i').classList.remove('fa-times');
                }
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
            // Add subtle animation for active slide content
            const activeSlideContent = slides[index].querySelector('.carousel-content');
            if (activeSlideContent) {
                activeSlideContent.style.opacity = '0';
                activeSlideContent.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    activeSlideContent.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                    activeSlideContent.style.opacity = '1';
                    activeSlideContent.style.transform = 'translateY(0)';
                }, 50); // Small delay to ensure removal
            }
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
            stopAutoSlide(); // Clear any existing interval
            autoSlideInterval = setInterval(nextSlide, 7000); // Change slide every 7 seconds
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                stopAutoSlide(); // Stop auto-slide on manual interaction
                prevSlide();
                startAutoSlide(); // Restart after a brief pause
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                stopAutoSlide(); // Stop auto-slide on manual interaction
                nextSlide();
                startAutoSlide(); // Restart after a brief pause
            });
        }

        // Initialize carousel
        showSlide(currentIndex);
        startAutoSlide();

        // Optional: Pause on hover
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
            autoTestimonialInterval = setInterval(nextTestimonial, 8000); // Change every 8 seconds
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

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });

    // Add CSS for these classes in styles.css:
    /*
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .animate-on-scroll.is-visible {
        opacity: 1;
        transform: translateY(0);
    }
    .animate-on-scroll.fade-in {
        opacity: 0;
        transition: opacity 1s ease-out;
    }
    .animate-on-scroll.fade-in.is-visible {
        opacity: 1;
    }
    .animate-on-scroll.slide-in-left {
        opacity: 0;
        transform: translateX(-100px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .animate-on-scroll.slide-in-left.is-visible {
        opacity: 1;
        transform: translateX(0);
    }
    .animate-on-scroll.slide-in-right {
        opacity: 0;
        transform: translateX(100px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .animate-on-scroll.slide-in-right.is-visible {
        opacity: 1;
        transform: translateX(0);
    }
    */

    // === Sticky Header on Scroll ===
    const header = document.querySelector('header');
    if (header) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 100) { // When scrolled past 100px
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }

            // Optional: Hide/Show on scroll direction
            // if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            //     // Scrolling down
            //     header.classList.add('header-hidden');
            // } else {
            //     // Scrolling up
            //     header.classList.remove('header-hidden');
            // }
            lastScrollTop = scrollTop;
        });
    }

    // === Accordion for FAQs or expandable content ===
    const accordions = document.querySelectorAll('.accordion-item h3');
    accordions.forEach(accordion => {
        accordion.addEventListener('click', () => {
            const content = accordion.nextElementSibling;
            if (content && content.classList.contains('accordion-content')) {
                accordion.parentNode.classList.toggle('active'); // Toggle parent for styling
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            }
        });
    });

    // === Form Submission (Basic Example) ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const name = contactForm.querySelector('#name').value;
            const email = contactForm.querySelector('#email').value;
            const message = contactForm.querySelector('#message').value;

            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // In a real application, you'd send this data to a server
            // using fetch() or XMLHttpRequest. For now, a simple alert.
            console.log('Form Submitted:', { name, email, message });
            alert('Thank you for your message, ' + name + '! We will get back to you soon.');

            // Clear the form
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
            if (window.pageYOffset > 300) { // Show button after scrolling 300px
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
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    galleryItems.forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = item.href;
            img.alt = item.querySelector('img').alt;
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(img);
        });
    });

    lightbox.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return; // Only close if clicking outside the image
        lightbox.classList.remove('active');
    });

    // Add some CSS for the lightbox:
    /*
    #lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease-in-out;
    }
    #lightbox.active {
        opacity: 1;
        pointer-events: auto;
    }
    #lightbox img {
        max-width: 90%;
        max-height: 90%;
        border: 4px solid white;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }
    */
});