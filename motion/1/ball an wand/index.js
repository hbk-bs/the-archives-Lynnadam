// script.js

// Ball-Element auswählen
const ball = document.getElementById("ball");

// Startposition und Geschwindigkeit
let x = 100;
let y = 100;
let dx = 3;
let dy = 3;

// Anfangsgröße des Balls
const ballSize = 50;
ball.style.width = `${ballSize}px`;
ball.style.height = `${ballSize}px`;

// Funktion zum Zufallsgenerieren einer Farbe
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Funktion zum Bewegen des Balls
function bounceBall() {
    x += dx;
    y += dy;

    // Wenn der Ball den linken oder rechten Rand erreicht, kehrt die Richtung um
    if (x <= 0 || x >= window.innerWidth - ballSize) {
        dx = -dx; // Richtung umkehren
        ball.style.backgroundColor = getRandomColor(); // Farbe ändern
    }

    // Wenn der Ball den oberen oder unteren Rand erreicht, kehrt die Richtung um
    if (y <= 0 || y >= window.innerHeight - ballSize) {
        dy = -dy; // Richtung umkehren
        ball.style.backgroundColor = getRandomColor(); // Farbe ändern
    }

    // Ball-Position aktualisieren
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;

    // Animation fortsetzen
    requestAnimationFrame(bounceBall);
}

// Bewegung starten
bounceBall();
