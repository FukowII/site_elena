// Three.js Scene Setup
let scene, camera, renderer, tshirt, mouse, targetRotation;

function init3D() {
    // Scene
    scene = new THREE.Scene();
    
    // Camera
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);
    
    const fillLight = new THREE.DirectionalLight(0x888888, 0.6);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);
    
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);
    
    // Create enhanced T-shirt
    createEnhancedTShirt();
    
    // Mouse tracking
    mouse = { x: 0, y: 0 };
    targetRotation = { x: 0, y: 0 };
    
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);
    
    animate();
}

function createEnhancedTShirt() {
    const group = new THREE.Group();
    
    // Main body - more detailed shape
    const bodyShape = new THREE.Shape();
    bodyShape.moveTo(-1, 1.5);
    bodyShape.lineTo(-1, -1.5);
    bodyShape.quadraticCurveTo(-0.8, -1.6, -0.5, -1.6);
    bodyShape.lineTo(0.5, -1.6);
    bodyShape.quadraticCurveTo(0.8, -1.6, 1, -1.5);
    bodyShape.lineTo(1, 1.5);
    bodyShape.lineTo(1, 1.5);
    bodyShape.lineTo(-1, 1.5);
    
    const extrudeSettings = {
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 3
    };
    
    const bodyGeometry = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
    
    // Material with better shading - Noir
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x000000,
        roughness: 0.7,
        metalness: 0.1,
        side: THREE.DoubleSide
    });
    
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);
    
    // Left sleeve - more organic shape
    const sleeveGeometry = new THREE.CylinderGeometry(0.35, 0.4, 1, 16);
    const leftSleeve = new THREE.Mesh(sleeveGeometry, bodyMaterial);
    leftSleeve.position.set(-1.3, 0.8, 0.15);
    leftSleeve.rotation.z = Math.PI / 2.5;
    leftSleeve.rotation.x = Math.PI / 8;
    leftSleeve.castShadow = true;
    group.add(leftSleeve);
    
    // Right sleeve
    const rightSleeve = new THREE.Mesh(sleeveGeometry, bodyMaterial);
    rightSleeve.position.set(1.3, 0.8, 0.15);
    rightSleeve.rotation.z = -Math.PI / 2.5;
    rightSleeve.rotation.x = Math.PI / 8;
    rightSleeve.castShadow = true;
    group.add(rightSleeve);
    
    // Collar - V-neck style
    const collarGeometry = new THREE.TorusGeometry(0.5, 0.08, 8, 16, Math.PI);
    const collarMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a,
        roughness: 0.8,
        metalness: 0.1
    });
    const collar = new THREE.Mesh(collarGeometry, collarMaterial);
    collar.position.set(0, 1.4, 0.15);
    collar.rotation.x = Math.PI / 2;
    collar.castShadow = true;
    group.add(collar);
    
    // Add NATIC text/logo on chest
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 512, 512);
    
    // Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 80px Anton, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('NATIC', 256, 256);
    
    const logoTexture = new THREE.CanvasTexture(canvas);
    const logoMaterial = new THREE.MeshStandardMaterial({ 
        map: logoTexture,
        transparent: true,
        opacity: 0.8,
        roughness: 0.9
    });
    
    const logoGeometry = new THREE.PlaneGeometry(0.8, 0.8);
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 0.3, 0.31);
    group.add(logo);
    
    // Add seam details
    const seamMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a,
        roughness: 0.9,
        metalness: 0
    });
    
    // Side seams
    const seamGeometry = new THREE.CylinderGeometry(0.02, 0.02, 3, 8);
    
    const leftSeam = new THREE.Mesh(seamGeometry, seamMaterial);
    leftSeam.position.set(-1, 0, 0.15);
    group.add(leftSeam);
    
    const rightSeam = new THREE.Mesh(seamGeometry, seamMaterial);
    rightSeam.position.set(1, 0, 0.15);
    group.add(rightSeam);
    
    // Add subtle wrinkles/folds with bump mapping
    const foldGeometry = new THREE.PlaneGeometry(1.8, 0.1);
    const foldMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2a2a2a,
        transparent: true,
        opacity: 0.3,
        roughness: 1
    });
    
    const fold1 = new THREE.Mesh(foldGeometry, foldMaterial);
    fold1.position.set(0, -0.5, 0.31);
    group.add(fold1);
    
    const fold2 = new THREE.Mesh(foldGeometry, foldMaterial);
    fold2.position.set(0, 0, 0.31);
    group.add(fold2);
    
    tshirt = group;
    
    // Réduire la taille globale du t-shirt de 30%
    tshirt.scale.set(0.7, 0.7, 0.7);
    
    scene.add(tshirt);
    
    // Initial rotation for better view
    tshirt.rotation.y = Math.PI / 6;
    tshirt.rotation.x = Math.PI / 12;
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Smooth rotation based on mouse position
    targetRotation.y = mouse.x * Math.PI * 0.5;
    targetRotation.x = mouse.y * Math.PI * 0.3;
    
    tshirt.rotation.y += (targetRotation.y - tshirt.rotation.y) * 0.05;
    tshirt.rotation.x += (targetRotation.x - tshirt.rotation.x) * 0.05;
    
    // Add subtle floating animation
    tshirt.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    
    // Add subtle rotation animation
    tshirt.rotation.y += 0.002;
    
    renderer.render(scene, camera);
}

// GSAP Animations
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Timeline pour l'animation du titre
    const titleTimeline = gsap.timeline();
    
    // Hero title animation - Apparition
    titleTimeline.to('.hero-title', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.3
    });
    
    titleTimeline.from('.hero-title', {
        y: 100,
        scale: 0.7,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.3
    }, 0);
    
    // Hero subtitle animation - Apparition
    titleTimeline.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
    }, '-=0.8');
    
    titleTimeline.from('.hero-subtitle', {
        y: 50,
        duration: 1.2,
        ease: 'power3.out'
    }, '-=1.2');
    
    // Disparition après 3 secondes
    titleTimeline.to('.hero-title', {
        opacity: 0,
        y: -100,
        scale: 1.2,
        duration: 1,
        ease: 'power3.in',
        delay: 2
    });
    
    titleTimeline.to('.hero-subtitle', {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.in'
    }, '-=1');
    
    // Gallery title animation
    gsap.to('.gallery-title', {
        scrollTrigger: {
            trigger: '.gallery-title',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.gallery-title', {
        scrollTrigger: {
            trigger: '.gallery-title',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Gallery items stagger animation - alignement fixé
    gsap.utils.toArray('.gallery-item').forEach((item, index) => {
        gsap.set(item, { clearProps: 'all' }); // Clear any inline styles
        
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            clearProps: 'transform'
        });
        
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 80,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out'
        });
    });
    
    // Gallery CTA animation
    gsap.to('.gallery-cta', {
        scrollTrigger: {
            trigger: '.gallery-cta',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
    });
    
    gsap.from('.gallery-cta', {
        scrollTrigger: {
            trigger: '.gallery-cta',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        scale: 0.8,
        duration: 0.8,
        ease: 'back.out(1.7)'
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init3D();
    initAnimations();
});
