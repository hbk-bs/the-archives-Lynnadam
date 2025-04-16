const canvas = document.getElementById("motionCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lines = [];  


function createLine() {
    const line = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 0,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 360}, 80%, 60%)`,
    };
    
    lines.push(line);
}


function updateAndDrawLine(line) {
    const endX = line.x + Math.cos(line.angle) * line.length;
    const endY = line.y + Math.sin(line.angle) * line.length;

   
    if (endX < 0 || endX > canvas.width || endY < 0 || endY > canvas.height) return;

    
    line.length += line.speed;

    ctx.beginPath();
    ctx.moveTo(line.x, line.y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = line.color;
    ctx.lineWidth = 2;
    ctx.stroke();
}


function animate() {
    
    lines.forEach(updateAndDrawLine); 

    requestAnimationFrame(animate); 
}

for (let i = 0; i < 50; i++) createLine();
animate();
