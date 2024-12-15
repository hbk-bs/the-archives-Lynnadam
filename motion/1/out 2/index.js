// script.js

const canvas = document.getElementById("outwardCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to store particles
const particles = [];

// Create a particle
function createParticle(x, y) {
    const angle = Math.random() * 2 * Math.PI; // Random direction
    const speed = Math.random() * 3 + 1; // Random speed
    const size = Math.random() * 10 + 5; // Random size
    const color = `hsl(${Math.random() * 360}, 80%, 60%)`; // Random color
    return { x, y, dx: Math.cos(angle) * speed, dy: Math.sin(angle) * speed, size, color };
}

// Draw a particle
function drawParticle(particle) {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
    ctx.closePath();
}

// Update a particle's position
function updateParticle(particle) {
    particle.x += particle.dx;
    particle.y += particle.dy;
    particle.size *= 0.98; // Gradually shrink
}

// Remove particles that are too small or out of bounds
function cleanUpParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.size < 0.5 || p.x < 0 || p.y < 0 || p.x > canvas.width || p.y > canvas.height) {
            particles.splice(i, 1);
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    particles.forEach(particle => {
        drawParticle(particle);
        updateParticle(particle);
    });

    cleanUpParticles();

    requestAnimationFrame(animate); // Repeat the animation
}

// Add a burst of particles at the center when the canvas is clicked
canvas.addEventListener("click", (event) => {
    const burstCount = 20; // Number of particles in a burst
    for (let i = 0; i < burstCount; i++) {
        particles.push(createParticle(event.clientX, event.clientY));
    }
});

// Start with a central burst
for (let i = 0; i < 30; i++) {
    particles.push(createParticle(canvas.width / 2, canvas.height / 2));
}

// Start the animation
animate();
