// script.js

const ball = document.getElementById("ball");

// Startposition und Geschwindigkeit
let x = 0; // Oben links starten
let y = 0;
let dx = 2; // Geschwindigkeit in x-Richtung
let dy = 2; // Geschwindigkeit in y-Richtung
let acceleration = 0.05; // Beschleunigung pro Frame

function moveBall() {
    // Position aktualisieren
    x += dx;
    y += dy;

    // Geschwindigkeit erhöhen
    dx += dx * acceleration;
    dy += dy * acceleration;

    // Ball-Position anwenden
    ball.style.left = `${x}px`; // Links verschieben
    ball.style.top = `${y}px`;  // Nach unten verschieben


    if (x > window.innerWidth || y > window.innerHeight) {
        x = 0; 
        y = 0;
        dx = 2; 
        dy = 2;
    }

 
    requestAnimationFrame(moveBall);
}

moveBall();
