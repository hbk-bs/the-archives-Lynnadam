// script.js

const canvas = document.getElementById("spiralCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size to be the full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let angle = 0;  // Startwinkel
let radius = 1;  // Start-Radius
const speed = 0.05;  // Geschwindigkeit der Drehung
const growth = 0.5;  // Geschwindigkeit, mit der der Radius wächst
const ballSize = 10;  // Ballgröße

function moveInSpiral() {
    // Clear the canvas before each new frame (so no trail is left)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Berechnung der neuen Position des Balls
    const x = canvas.width / 2 + radius * Math.cos(angle);  // x-Position
    const y = canvas.height / 2 + radius * Math.sin(angle);  // y-Position

    // Ball zeichnen
    ctx.beginPath();
    ctx.arc(x, y, ballSize, 0, 2 * Math.PI);  // Ball als Kreis
    ctx.fillStyle = 'red';  // Ballfarbe
    ctx.fill();  // Ball füllen

    // Update des Winkels und des Radius für die nächste Bewegung
    angle += speed;
    radius += growth;  // Der Ball entfernt sich weiter von der Mitte

    // Rekursiver Aufruf, um die Spiralbewegung fortzusetzen
    requestAnimationFrame(moveInSpiral);
}

// Start der Spiralbewegung
moveInSpiral();
