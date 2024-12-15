
const box = document.getElementById("box");


let x = 100; 
let y = 100; 

// Bewegungsgeschwindigkeit
const speed = 5;

// Funktion für die Bewegung
function moveBox(event) {
    switch (event.key) {
        case "ArrowUp":
            y -= speed; // Nach oben
            break;
        case "ArrowDown":
            y += speed; // Nach unten
            break;
        case "ArrowLeft":
            x -= speed; // Nach links
            break;
        case "ArrowRight":
            x += speed; // Nach rechts
            break;
    }

    // Position setzen
    box.style.transform = `translate(${x}px, ${y}px)`;
}

// Event-Listener für Tasteneingaben
window.addEventListener("keydown", moveBox);
