
const canvas = document.getElementById("heartMonitorCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const baseHeight = 5; 
const maxPeakHeight = 60; 
const step = 10; 
const speed = 0.005; 


const points = [];
const totalPoints = Math.ceil(canvas.width / step) + 2;


function initializeWave() {
    for (let i = 0; i < totalPoints; i++) {
        points.push({
            x: i * step,
            y: canvas.height / 2,
            height: baseHeight, 
            phase: 0, 
        });
    }
}


function updatePeaks() {
    for (let i = 0; i < points.length; i++) {
        if (Math.random() < 0.001 && points[i].phase === 0) {
            points[i].phase = 1;
        }

        if (points[i].phase === 1) {
            points[i].height += 0.5; 
            if (points[i].height >= maxPeakHeight) {
                points[i].phase = 2;
            }
        } else if (points[i].phase === 2) {
            points[i].height -= 0.5; 
            if (points[i].height <= baseHeight) {
                points[i].height = baseHeight;
                points[i].phase = 0; 
            }
        }
    }
}

function drawWave() {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        const prevPoint = points[i - 1];
        const currentPoint = points[i];

        ctx.lineTo(prevPoint.x, prevPoint.y - prevPoint.height); 
        ctx.lineTo(currentPoint.x, currentPoint.y - currentPoint.height);
    }

    ctx.strokeStyle = "#00ff00"; 
    ctx.lineWidth = 2;
    ctx.stroke();
}

function distortWave() {
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const randomDistortion = (Math.random() > 0.5 ? 1 : -1) * Math.random() * maxPeakHeight;
        point.height = baseHeight + randomDistortion; 
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    updatePeaks(); 
    distortWave(); 
    drawWave(); 
    setTimeout(() => {
        requestAnimationFrame(animate); 
    }, 100); 
}


initializeWave();
animate();