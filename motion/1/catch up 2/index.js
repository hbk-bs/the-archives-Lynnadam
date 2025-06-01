// script.js

const target = document.getElementById("target");
const chaser = document.getElementById("chaser");

let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;
let chaserX = 100;
let chaserY = 100;
let chaserSpeed = 0.5;

// Funktion zum Berechnen der Richtung
function moveChaser() {
    const dx = targetX - chaserX;
    const dy = targetY - chaserY;

    // Berechnung des Abstands
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Wenn der Verfolger zu nah ist, stoppen
    if (distance < 5) {
        return;
    }

    // Normalisieren der Richtung (Einheitsvektor)
    const directionX = dx / distance;
    const directionY = dy / distance;

    // Verfolger in Richtung Ziel bewegen
    chaserX += directionX * chaserSpeed;
    chaserY += directionY * chaserSpeed;

    // Setzen der neuen Position des Verfolgers
    chaser.style.left = `${chaserX}px`;
    chaser.style.top = `${chaserY}px`;

    // Ziel zufällig bewegen, um es interessanter zu machen
    moveTarget();

    // Rekursiver Aufruf, um Animation fortzusetzen
    requestAnimationFrame(moveChaser);
}

// Ziel zufällig bewegen
function moveTarget() {
    targetX += (Math.random() - 0.5) * 10; // Ziel zufällig bewegen
    targetY += (Math.random() - 0.5) * 10;
    target.style.left = `${targetX}px`;
    target.style.top = `${targetY}px`;
}

// Start der Animation
moveChaser();
