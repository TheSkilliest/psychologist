document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Navbar Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('header-scrolled');
            header.classList.remove('bg-transparent', 'py-5');
        } else {
            header.classList.remove('header-scrolled');
            header.classList.add('bg-transparent', 'py-5');
        }
    });

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    let isMenuOpen = false;
    
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    }
    
    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // 4. Fade-in Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-up');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });
    
    fadeElements.forEach(el => fadeObserver.observe(el));

    // 5. Number Counters (Intersection Observer)
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000;
                const steps = 60;
                const increment = target / steps;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target.toLocaleString();
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current).toLocaleString();
                    }
                }, duration / steps);
                
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));

    // 6. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const button = item.querySelector('.faq-button');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.accordion-icon');
        
        button.addEventListener('click', () => {
            const isOpen = content.classList.contains('open');
            
            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.querySelector('.accordion-content').classList.remove('open');
                otherItem.querySelector('.accordion-icon').classList.remove('rotate');
            });
            
            if (!isOpen) {
                content.classList.add('open');
                icon.classList.add('rotate');
            }
        });
    });

    // 7. Testimonials Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const track = document.getElementById('testimonial-track');
    const dots = document.querySelectorAll('.test-dot');
    const prevBtn = document.getElementById('test-prev');
    const nextBtn = document.getElementById('test-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        dots.forEach(d => {
            d.classList.remove('w-8', 'bg-primary');
            d.classList.add('w-2', 'bg-gray-300');
        });
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
        
        dots[index].classList.remove('w-2', 'bg-gray-300');
        dots[index].classList.add('w-8', 'bg-primary');
        currentSlide = index;
    }
    
    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }
    
    function prevSlide() {
        showSlide((currentSlide - 1 + slides.length) % slides.length);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    let sliderInterval = setInterval(nextSlide, 6000);
    const sliderContainer = track.parentElement;
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => clearInterval(sliderInterval));
        sliderContainer.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(nextSlide, 6000);
        });
    }

    // 8. Contact Form
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const successMsg = document.getElementById('success-message');
    const sendAnotherBtn = document.getElementById('send-another-btn');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !message) {
            alert('Please enter both your name and message.');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
        submitText.textContent = 'Sending...';
        
        const text = `Hi Sehar, I am ${name}.\n\n${message}`;
        const encodedText = encodeURIComponent(text);
        
        window.open(`https://wa.me/923038810635?text=${encodedText}`, '_blank');
        
        setTimeout(() => {
            form.style.display = 'none';
            successMsg.classList.remove('hidden');
            form.reset();
            
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitText.textContent = 'Submit Message';
        }, 500);
    });
    
    sendAnotherBtn.addEventListener('click', () => {
        successMsg.classList.add('hidden');
        form.style.display = 'block';
    });
    
    // 9. Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.pointerEvents = 'auto';
                scrollToTopBtn.style.transform = 'translateY(0)';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.pointerEvents = 'none';
                scrollToTopBtn.style.transform = 'translateY(15px)';
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        scrollToTopBtn.addEventListener('mouseover', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.transform = 'translateY(0) scale(1.1)';
            }
        });
        
        scrollToTopBtn.addEventListener('mouseout', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
            }
        });
    }
});
