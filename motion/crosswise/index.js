// script.js

const canvas = document.getElementById("crosswiseCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to store moving objects
const objects = [];
const rows = 5; // Number of horizontal rows
const cols = 5; // Number of vertical columns
const objectSize = 20; // Size of the objects
const speed = 2; // Speed of the objects

// Create objects moving in crosswise directions
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        // Horizontal movers
        objects.push({
            x: 0,
            y: (canvas.height / rows) * i + canvas.height / (rows * 2),
            dx: speed,
            dy: 0,
            color: "blue",
        });

        // Vertical movers
        objects.push({
            x: (canvas.width / cols) * j + canvas.width / (cols * 2),
            y: 0,
            dx: 0,
            dy: speed,
            color: "red",
        });
    }
}

// Draw an object
function drawObject(obj) {
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, objectSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = obj.color;
    ctx.fill();
    ctx.closePath();
}

// Update an object's position
function updateObject(obj) {
    obj.x += obj.dx;
    obj.y += obj.dy;

    // Wrap around the canvas
    if (obj.x > canvas.width) obj.x = 0;
    if (obj.y > canvas.height) obj.y = 0;
}

// Detect if two objects intersect
function checkCollision(obj1, obj2) {
    const dx = obj1.x - obj2.x;
    const dy = obj1.y - obj2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < objectSize;
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    for (let i = 0; i < objects.length; i++) {
        drawObject(objects[i]);
        updateObject(objects[i]);
    }

    // Check for collisions between objects
    for (let i = 0; i < objects.length; i++) {
        for (let j = i + 1; j < objects.length; j++) {
            if (checkCollision(objects[i], objects[j])) {
                objects[i].color = "yellow";
                objects[j].color = "yellow";
            }
        }
    }

    requestAnimationFrame(animate); // Repeat the animation
}

// Start the animation
animate();
