// GSAP Animations for About Page
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Page title animation
    const isMobile = window.innerWidth < 768;
    
    gsap.to('.page-title', {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
    });
    
    gsap.from('.page-title', {
        x: isMobile ? 0 : -100, // Pas de décalage sur mobile
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
    });
    
    // Page subtitle (line) animation
    gsap.to('.page-subtitle', {
        opacity: 1,
        width: 200,
        duration: 1,
        ease: 'power2.out',
        delay: 0.6
    });
    
    // Story section animations
    gsap.to('.story-text', {
        scrollTrigger: {
            trigger: '.story-text',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.story-text', {
        scrollTrigger: {
            trigger: '.story-text',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: -100,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Story text paragraphs stagger
    gsap.from('.story-text p', {
        scrollTrigger: {
            trigger: '.story-text',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3,
        ease: 'power2.out'
    });
    
    gsap.to('.story-image', {
        scrollTrigger: {
            trigger: '.story-image',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.story-image', {
        scrollTrigger: {
            trigger: '.story-image',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: 100,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Founder section animations
    gsap.to('.founder-image', {
        scrollTrigger: {
            trigger: '.founder-image',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.founder-image', {
        scrollTrigger: {
            trigger: '.founder-image',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: -100,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.to('.founder-text', {
        scrollTrigger: {
            trigger: '.founder-text',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    });
    
    gsap.from('.founder-text', {
        scrollTrigger: {
            trigger: '.founder-text',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: 100,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    });
    
    // Founder text paragraphs stagger
    gsap.from('.founder-text p', {
        scrollTrigger: {
            trigger: '.founder-text',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.5,
        ease: 'power2.out'
    });
    
    // Values section animation
    gsap.to('.values-section', {
        scrollTrigger: {
            trigger: '.values-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.values-section', {
        scrollTrigger: {
            trigger: '.values-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 100,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Value cards stagger animation
    gsap.from('.value-card', {
        scrollTrigger: {
            trigger: '.values-section',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 80,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        delay: 0.3
    });
    
    // CTA section animation
    gsap.to('.cta-section', {
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.cta-section', {
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        scale: 0.9,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Parallax effect for images
    gsap.utils.toArray('.about-image img').forEach(img => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -50,
            ease: 'none'
        });
    });
    
    // Mouse move effect on value cards
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
});

