// script.js

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Zentrum des Canvas
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Parameter für Zickzack-Muster
const stepSize = 20; // Schrittgröße für die Zickzack-Bewegung
const maxZickzackHeight = 40; // Maximale Höhe des Zickzacks
const lineCount = 20; // Anzahl der Linien, die zum Zentrum führen

// Funktion zum Zeichnen einer Zickzack-Linie
function drawZigzagLine(startX, startY, direction) {
    ctx.beginPath();
    ctx.moveTo(startX, startY); // Startpunkt der Linie

    let currentX = startX;
    let currentY = startY;

    // Zeichnen der Zickzack-Linie
    while (currentX !== centerX && currentY !== centerY) {
        // Zufällige Höhe für Zickzack
        const randomHeight = (Math.random() * maxZickzackHeight) - (maxZickzackHeight / 2); // Zufällige Höhe nach oben oder unten

        // Zickzack-Bewegung je nach Richtung
        if (direction === 'horizontal') {
            currentX += stepSize;
        } else if (direction === 'vertical') {
            currentY += stepSize;
        } else if (direction === 'diagonal') {
            currentX += stepSize;
            currentY += randomHeight;
        }
        
        ctx.lineTo(currentX, currentY); // Nächster Punkt

        // Umkehrung der Richtung (auf und ab)
        currentY -= randomHeight * 2; // Zurückbewegen in die entgegengesetzte Richtung
        ctx.lineTo(currentX, currentY); // Nächster Punkt
    }

    // Zum Zentrum der Linie führen
    ctx.lineTo(centerX, centerY);

    // Stil und Farbe setzen
    ctx.strokeStyle = "#00ff00"; // grün
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Funktion zum Zeichnen aller Linien
function drawAllLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas leeren

    const lineSpacing = canvas.width / lineCount; // Abstand zwischen den Linien

    // Linien von der oberen Kante
    for (let i = 0; i < lineCount; i++) {
        const startX = i * lineSpacing; // Startposition der Linie (auf der oberen Kante)
        const startY = 0; // Alle Linien starten am oberen Rand
        drawZigzagLine(startX, startY, 'horizontal'); // Zickzack-Linie von oben
    }

    // Linien von der unteren Kante
    for (let i = 0; i < lineCount; i++) {
        const startX = i * lineSpacing; // Startposition der Linie (auf der unteren Kante)
        const startY = canvas.height; // Alle Linien starten am unteren Rand
        drawZigzagLine(startX, startY, 'horizontal'); // Zickzack-Linie von unten
    }

    // Linien von der linken Kante
    for (let i = 0; i < lineCount; i++) {
        const startX = 0; // Alle Linien starten am linken Rand
        const startY = i * lineSpacing; // Startposition der Linie (auf der linken Kante)
        drawZigzagLine(startX, startY, 'vertical'); // Zickzack-Linie von links
    }

    // Linien von der rechten Kante
    for (let i = 0; i < lineCount; i++) {
        const startX = canvas.width; // Alle Linien starten am rechten Rand
        const startY = i * lineSpacing; // Startposition der Linie (auf der rechten Kante)
        drawZigzagLine(startX, startY, 'vertical'); // Zickzack-Linie von rechts
    }
}

// Initialisieren und starten
drawAllLines();
