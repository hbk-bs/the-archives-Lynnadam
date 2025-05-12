const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let targetX = canvas.width / 2;
let targetY = canvas.height / 2;
let chaserX = 100; 
let chaserY = 100;
const targetSpeed = 2; 
const chaserSpeed = 1.5; 

function drawRabbit(ctx, x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);

    ctx.moveTo(x - size / 4, y - size);
    ctx.ellipse(x - size / 4, y - size / 1, size / 6, size / 2, 0, 0, Math.PI * 2);

    ctx.moveTo(x + size / 4, y - size);
    ctx.ellipse(x + size / 4, y - size / 1, size / 6, size / 2, 0, 0, Math.PI * 2);

    ctx.stroke();
}

function drawWolf(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - size / 2, y + size / 1.5);
    ctx.lineTo(x + size / 2, y + size / 1.5);
    ctx.closePath();

   
    ctx.moveTo(x - size / 4, y - size / 6);
    ctx.arc(x - size / 4, y - size / 6, size / 8, 0, Math.PI * 2);

    ctx.moveTo(x + size / 4, y - size / 6);
    ctx.arc(x + size / 4, y - size / 6, size / 8, 0, Math.PI * 2); // rechtes Auge

    
    ctx.moveTo(x - size / 2, y - size / 2);
    ctx.lineTo(x - size / 1.5, y - size);
    ctx.lineTo(x - size / 3, y - size / 2);
    
    ctx.moveTo(x + size / 2, y - size / 2);
    ctx.lineTo(x + size / 1.5, y - size);
    ctx.lineTo(x + size / 3, y - size / 2);

    
    ctx.moveTo(x, y + size / 3);
    ctx.arc(x, y + size / 3, size / 10, 0, Math.PI * 2);

    ctx.stroke();
}

function moveTarget() {
    if (keysPressed["ArrowUp"]) targetY -= targetSpeed;
    if (keysPressed["ArrowDown"]) targetY += targetSpeed;
    if (keysPressed["ArrowLeft"]) targetX -= targetSpeed;
    if (keysPressed["ArrowRight"]) targetX += targetSpeed;

   
    targetX = Math.max(0, Math.min(canvas.width - 30, targetX));
    targetY = Math.max(0, Math.min(canvas.height - 30, targetY));
}

function moveChaser() {
    const dx = targetX - chaserX;
    const dy = targetY - chaserY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 5) return;

    const moveFactor = Math.min(1, chaserSpeed / distance);
    chaserX += dx * moveFactor;
    chaserY += dy * moveFactor;
}

const keysPressed = {};
window.addEventListener("keydown", (e) => {
    keysPressed[e.key] = true;
});
window.addEventListener("keyup", (e) => {
    keysPressed[e.key] = false;
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    
    targetX = Math.min(targetX, canvas.width - 30); 
    targetY = Math.min(targetY, canvas.height - 30);
    chaserX = Math.min(chaserX, canvas.width - 30); 
    chaserY = Math.min(chaserY, canvas.height - 30);
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    moveTarget();
    moveChaser();

    drawRabbit(ctx, targetX, targetY, 30);
    drawWolf(ctx, chaserX, chaserY, 50); 

    requestAnimationFrame(animate);
}

animate(); 