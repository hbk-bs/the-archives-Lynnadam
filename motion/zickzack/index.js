// script.js

const canvas = document.getElementById("heartMonitorCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Parameters for the wave
const baseHeight = 5; // Base height for small Zickzack
const maxPeakHeight = 60; // Maximum height for peaks (spikes)
const step = 10; // Horizontal step size
const speed = 0.005; // Much slower speed for wave distortion (smaller value makes it slower)

// Array to manage the wave points
const points = [];
const totalPoints = Math.ceil(canvas.width / step) + 2;

// Generate initial wave points
function initializeWave() {
    for (let i = 0; i < totalPoints; i++) {
        points.push({
            x: i * step,
            y: canvas.height / 2,
            height: baseHeight, // Start with base height
            phase: 0, // Phase for build-up and decay
        });
    }
}

// Update peaks for smooth wave build-up and decay
function updatePeaks() {
    for (let i = 0; i < points.length; i++) {
        if (Math.random() < 0.001 && points[i].phase === 0) {
            // Start a new peak build-up randomly
            points[i].phase = 1;
        }

        // Manage phases
        if (points[i].phase === 1) {
            // Build-up phase
            points[i].height += 0.5; // Slow down the height increase
            if (points[i].height >= maxPeakHeight) {
                points[i].phase = 2;
            }
        } else if (points[i].phase === 2) {
            // Decay phase
            points[i].height -= 0.5; // Slow down the height decrease
            if (points[i].height <= baseHeight) {
                points[i].height = baseHeight;
                points[i].phase = 0; // Return to normal
            }
        }
    }
}

// Draw the eckige wave (angular wave) with sharper peaks
function drawWave() {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        const prevPoint = points[i - 1];
        const currentPoint = points[i];

        // Draw the eckige Welle (sharp angular wave)
        ctx.lineTo(prevPoint.x, prevPoint.y - prevPoint.height); // Top sharp corner
        ctx.lineTo(currentPoint.x, currentPoint.y - currentPoint.height); // Bottom sharp corner
    }

    ctx.strokeStyle = "#00ff00"; // Color of the wave
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Apply wave distortion based on eckige (square-like) pattern with random sharp peaks
function distortWave() {
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        // Apply a sharp, random peak for each point
        const randomDistortion = (Math.random() > 0.5 ? 1 : -1) * Math.random() * maxPeakHeight;
        point.height = baseHeight + randomDistortion; // Apply the sharp random distortion
    }
}

// Animation loop with slower update (slower wave movement)
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    updatePeaks(); // Smoothly update peaks (optional)
    distortWave(); // Apply eckige wave distortion with sharp peaks
    drawWave(); // Draw the wave
    setTimeout(() => {
        requestAnimationFrame(animate); // Repeat animation with a delay for slower speed
    }, 100); // Delay of 100ms to slow down the animation
}

// Initialize and start animation
initializeWave();
animate();
