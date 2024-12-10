// script.js

const ball = document.getElementById("ball");

let angle = 0; // Startwinkel
let radius = 1; // Start-Radius
const speed = 0.05; // Geschwindigkeit der Drehung
const growth = 0.5; // Geschwindigkeit, mit der der Radius wächst

function moveInSpiral() {
    // Berechnung der neuen Position
    const x = window.innerWidth / 2 + radius * Math.cos(angle); // Berechnung der x-Position
    const y = window.innerHeight / 2 + radius * Math.sin(angle); // Berechnung der y-Position

    // Setzen der neuen Position des Balls
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;

    // Update des Winkels und des Radius
    angle += speed; // Der Ball dreht sich weiter
    radius += growth; // Der Ball entfernt sich von der Mitte

    // Rekursiver Aufruf, um die Spiralbewegung fortzusetzen
    requestAnimationFrame(moveInSpiral);
}

// Start der Spiralbewegung
moveInSpiral();
