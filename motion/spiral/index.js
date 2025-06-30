const ball = document.getElementById("ball");

let angle = 0; 
let radius = 1; 
const speed = 0.05; 
const growth = 0.5; 

function moveInSpiral() {
    const x = window.innerWidth / 2 + radius * Math.cos(angle); 
    const y = window.innerHeight / 2 + radius * Math.sin(angle); 

    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;

    angle += speed; 
    radius += growth; 

    requestAnimationFrame(moveInSpiral);
}

moveInSpiral();
