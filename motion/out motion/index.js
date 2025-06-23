const canvas = document.getElementById("outwardCanvas");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

function createParticle(x, y) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 3 + 1; 
    const size = Math.random() * 10 + 5;
    const color = `hsl(${Math.random() * 360}, 80%, 60%)`;
    return { x, y, dx: Math.cos(angle) * speed, dy: Math.sin(angle) * speed, size, color };
}


function drawParticle(particle) {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
    ctx.closePath();
}

function updateParticle(particle) {
    particle.x += particle.dx;
    particle.y += particle.dy;
    particle.size *= 0.98; 
}


function cleanUpParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.size < 0.5 || p.x < 0 || p.y < 0 || p.x > canvas.width || p.y > canvas.height) {
            particles.splice(i, 1);
        }
    }
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    particles.forEach(particle => {
        drawParticle(particle);
        updateParticle(particle);
    });

    cleanUpParticles();

    requestAnimationFrame(animate); 
}

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect(); 
    const x = event.clientX - rect.left; 
    const y = event.clientY - rect.top; 

    const burstCount = 20; 
    for (let i = 0; i < burstCount; i++) {
        particles.push(createParticle(x, y));  
    }
});

for (let i = 0; i < 30; i++) {
    particles.push(createParticle(canvas.width / 2, canvas.height / 2));
}

animate();
