document.addEventListener('DOMContentLoaded', () => {
    const heroVisual = document.querySelector('.hero-visual');

    // Create a simple 3D object with layers for the hero section
    for (let i = 0; i < 5; i++) {
        const layer = document.createElement('div');
        layer.classList.add('hero-visual-layer');
        layer.style.transform = `translateZ(${i * 20}px)`;
        heroVisual.appendChild(layer);
    }

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        heroVisual.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });

    const slider = document.querySelector('.split-slider');
    const before = document.querySelector('.before');

    slider.addEventListener('mousemove', (e) => {
        const x = e.offsetX / slider.offsetWidth;
        before.style.clipPath = `polygon(0 0, ${x * 100}% 0, ${x * 100}% 100%, 0 100%)`;
    });
});