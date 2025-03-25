// Initialisation de AOS
AOS.init({
    duration: 1000,
    once: true
});

// Three.js Scene
const initThreeScene = () => {
    const container = document.getElementById('hero-3d-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Création d'une géométrie complexe (cube déformé)
    const geometry = new THREE.BoxGeometry(2, 2, 2, 3, 3, 3);
    const material = new THREE.MeshPhongMaterial({
        color: 0x8B5CF6, 
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Ajout de lumière
    const light = new THREE.DirectionalLight(0x7C3AED, 1); 
    light.position.set(5, 5, 5);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xA78BFA, 0.4); 
    scene.add(ambientLight);

    camera.position.z = 5;

    // Animation de la géométrie
    const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
        renderer.render(scene, camera);
    };

    animate();

    // Responsive
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
};

// GSAP Animations
const initGSAPAnimations = () => {
    // Animation du titre
    gsap.from('#title', {
        duration: 1.5,
        y: -100,
        opacity: 0,
        ease: 'power4.out'
    });

    // Animation des cartes de service
    gsap.from('.service-card', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#services',
            start: 'top center'
        }
    });

    // Animation des projets
    gsap.from('.project-card', {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#projects',
            start: 'top center'
        }
    });

    // Animation des liens sociaux
    gsap.from('.social-links a', {
        duration: 0.5,
        x: -30,
        opacity: 0,
        stagger: 0.1
    });
};

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Initialisation de Tilt.js pour les effets 3D sur les photos
const initTiltEffects = () => {
    const profileWrapper = document.querySelector('.profile-3d-wrapper');
    if (profileWrapper) {
        VanillaTilt.init(profileWrapper, {
            max: 20,
            speed: 400,
            glare: true,
            'max-glare': 0.5,
            scale: 1.05
        });
    }
};

// Animation des sections au scroll
const initSectionAnimations = () => {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animation spéciale pour la photo de profil
                if (entry.target.querySelector('.profile-3d-wrapper')) {
                    gsap.from('.profile-3d-wrapper', {
                        duration: 1.5,
                        rotationY: 180,
                        opacity: 0,
                        scale: 0.8,
                        ease: 'power3.out'
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
};

// Effet de parallaxe avancé pour les images
const initParallaxEffect = () => {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth - 0.5) * 20;
            const yPos = (clientY / innerHeight - 0.5) * 20;

            gsap.to(profileImage, {
                duration: 1,
                x: xPos,
                y: yPos,
                rotationY: xPos * 0.5,
                rotationX: -yPos * 0.5,
                ease: 'power2.out'
            });
        });
    }
};

// Animation de transition de page
const initPageTransitions = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            
            if (target) {
                // Animation de sortie
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 70
                    },
                    ease: 'power3.inOut'
                });

                // Animation des éléments de la section cible
                gsap.from(target.children, {
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    stagger: 0.2,
                    delay: 0.5
                });
            }
        });
    });
};

// Effet de morphing sur les images
const initImageMorphing = () => {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', () => {
            gsap.to(profileImage, {
                duration: 0.5,
                scale: 1.05,
                borderRadius: '30px',
                boxShadow: '0 30px 60px rgba(124, 58, 237, 0.4)', 
                ease: 'power2.out'
            });
        });

        profileImage.addEventListener('mouseleave', () => {
            gsap.to(profileImage, {
                duration: 0.5,
                scale: 1,
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(124, 58, 237, 0.3)', 
                ease: 'power2.in'
            });
        });
    }
};

// Animation du formulaire de contact
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animation de soumission
        gsap.to(form, {
            duration: 0.2,
            scale: 0.98,
            yoyo: true,
            repeat: 1
        });

        // Ici vous pouvez ajouter la logique d'envoi du formulaire
        // Par exemple avec fetch() vers votre backend
    });
}

// Effet de parallaxe sur l'image de profil
window.addEventListener('mousemove', (e) => {
    const profileImg = document.querySelector('.right-side img');
    if (profileImg) {
        const moveX = (e.clientX * 0.005);
        const moveY = (e.clientY * 0.005);
        
        gsap.to(profileImg, {
            duration: 0.5,
            x: moveX,
            y: moveY,
            ease: 'power1.out'
        });
    }
});

// Gestion du menu mobile
const initMobileMenu = () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    // Fonction pour fermer le menu
    const closeMenu = () => {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
            if (navbarToggler) {
                navbarToggler.classList.add('collapsed');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        }
    };

    // Ajouter l'événement de clic à chaque lien
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            closeMenu();
            
            // Animation du lien cliqué
            gsap.from(e.target, {
                scale: 0.9,
                duration: 0.3,
                ease: 'back.out'
            });
        });
    });

    // Fermer le menu lors du clic en dehors
    document.addEventListener('click', (e) => {
        const isNavbar = e.target.closest('.navbar');
        const isToggler = e.target.closest('.navbar-toggler');
        
        if (!isNavbar || (isNavbar && !isToggler && !e.target.classList.contains('nav-link'))) {
            closeMenu();
        }
    });

    // Fermer le menu lors du défilement
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (Math.abs(currentScroll - lastScroll) > 50) {
            closeMenu();
            lastScroll = currentScroll;
        }
    });
};

// Animation du formulaire de contact améliorée
const initContactFormAnimations = () => {
    const form = document.querySelector('.contact-form');
    const inputs = document.querySelectorAll('.contact-form .form-control');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                duration: 0.3,
                scale: 1.02,
                borderColor: '#8B5CF6',
                ease: 'power2.out'
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {
                duration: 0.3,
                scale: 1,
                borderColor: 'rgba(124, 58, 237, 0.2)',
                ease: 'power2.in'
            });
        });
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Animation de soumission
            gsap.to(form, {
                duration: 0.2,
                scale: 0.98,
                yoyo: true,
                repeat: 1
            });

            // Animation des icônes sociales
            gsap.from('.social-icon', {
                duration: 0.5,
                scale: 0,
                rotation: 180,
                stagger: 0.1
            });
        });
    }
};

// Animations de la section À propos
const initAboutAnimations = () => {
    // Animation des barres de progression
    const animateProgressBars = () => {
        gsap.from('.progress-bar', {
            width: 0,
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.skills-card',
                start: 'top center+=100'
            }
        });
    };

    // Animation de la timeline
    const animateTimeline = () => {
        gsap.from('.timeline-item', {
            opacity: 0,
            x: -50,
            duration: 0.8,
            stagger: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top center+=100'
            }
        });
    };

    // Animation des cartes d'intérêts
    const animateInterests = () => {
        gsap.from('.interest-item', {
            scale: 0,
            rotation: -15,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.interests-grid',
                start: 'top center+=100'
            }
        });
    };

    // Animation des icônes
    const animateIcons = () => {
        gsap.from('.card-icon', {
            scale: 0,
            rotation: 180,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '#about',
                start: 'top center'
            },
            stagger: 0.2
        });
    };

    // Effet de survol sur les cartes
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                y: -10,
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(124, 58, 237, 0.25)'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                y: 0,
                scale: 1,
                boxShadow: '0 10px 30px rgba(124, 58, 237, 0.15)'
            });
        });
    });

    // Initialisation des animations
    animateProgressBars();
    animateTimeline();
    animateInterests();
    animateIcons();
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    initThreeScene();
    initGSAPAnimations();
    initTiltEffects();
    initSectionAnimations();
    initParallaxEffect();
    initPageTransitions();
    initImageMorphing();
    initMobileMenu();
    initContactFormAnimations();
    initAboutAnimations();
});