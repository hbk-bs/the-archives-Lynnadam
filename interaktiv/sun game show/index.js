let circleX, circleY;
let isDragging = false;
let stars = [];
let meteors = [];
let gameStarted = false;
let gameOver = false;

const maxMeteors = 10;
const meteorGenerationRate = 60;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  circleX = width / 2;
  circleY = 0;
  generateStars();

  const restartBtn = document.getElementById("restartBtn");
  restartBtn.addEventListener("click", restartGame);
}

function draw() {
  if (gameStarted) {
    playGame();
  } else {
    drawIntro();
  }
}

function drawIntro() {
  const relativeY = circleY / height;

  const skyColor1 = { r: 135, g: 206, b: 235 };
  const sunsetColor = { r: 255, g: 165, b: 0 };
  const nightColor = { r: 10, g: 10, b: 50 };

  let r, g, b;
  if (relativeY < 0.5) {
    const t = relativeY / 0.5;
    r = lerp(skyColor1.r, sunsetColor.r, t);
    g = lerp(skyColor1.g, sunsetColor.g, t);
    b = lerp(skyColor1.b, sunsetColor.b, t);
  } else {
    const t = (relativeY - 0.5) / 0.5;
    r = lerp(sunsetColor.r, nightColor.r, t);
    g = lerp(sunsetColor.g, nightColor.g, t);
    b = lerp(sunsetColor.b, nightColor.b, t);
  }

  background(r, g, b);

  if (relativeY >= 0.9) {
    drawStars((relativeY - 0.9) / 0.1);
  }

  fill(255, 255, 0);
  ellipse(circleX, circleY, width * 0.1, width * 0.1);

  drawMountains();

  if (circleY >= height) {
    gameStarted = true;
    generateMeteors();
  }
}

function playGame() {
  if (gameOver) {
    document.getElementById("gameOverScreen").style.display = "flex";
    return;
  }

  background(10);
  drawStars(1);
  drawMountains();

  for (let i = meteors.length - 1; i >= 0; i--) {
    let meteor = meteors[i];
    fill(255);
    ellipse(meteor.x, meteor.y, meteor.size);
    meteor.y += meteor.speed;

    if (meteor.y >= y(0.9)) {
      gameOver = true;
    }

    if (meteor.clicked) {
      meteors.splice(i, 1);
    }
  }

  if (frameCount % meteorGenerationRate === 0 && meteors.length < maxMeteors) {
    generateMeteors();
  }
}

function restartGame() {
  gameOver = false;
  meteors = [];
  stars = [];
  generateStars();
  circleY = 0;
  document.getElementById("gameOverScreen").style.display = "none";
  gameStarted = false;
}

function lerp(start, end, t) {
  return start + (end - start) * t;
}

const x = (n) => width * n;
const y = (n) => height * n;
const s = (n) => (height > width ? height * n : width * n);

function mousePressed() {
  if (gameStarted) {
    handleMeteorClick(mouseX, mouseY);
  } else {
    const d = dist(mouseX, mouseY, circleX, circleY);
    if (d < width * 0.05) {
      isDragging = true;
    }
  }
}

function mouseDragged() {
  if (isDragging && !gameStarted) {
    circleY = constrain(mouseY, 0, height);
  }
}

function mouseReleased() {
  isDragging = false;
}

function touchStarted() {
  mousePressed();
}

function touchMoved() {
  mouseDragged();
  return false;
}

function touchEnded() {
  mouseReleased();
}

function generateMeteors() {
  let meteor = {
    x: random(width),
    y: 0,
    size: random(20, 50),
    speed: random(1, 3),
    clicked: false
  };
  meteors.push(meteor);
}

function handleMeteorClick(mx, my) {
  for (let i = meteors.length - 1; i >= 0; i--) {
    let meteor = meteors[i];
    let d = dist(mx, my, meteor.x, meteor.y);
    if (d < meteor.size / 2) {
      meteor.clicked = true;
      break;
    }
  }
}

function drawMountains() {
  fill(120, 140, 140);
  triangle(x(-0.1), y(0.95), x(0.3759), y(0.5), x(0.875), y(0.85));

  fill(100, 120, 120);
  triangle(x(0.125), y(0.9), x(0.625), y(0.55), x(1.125), y(0.9));

  fill(140, 160, 160);
  triangle(x(-0.1), y(0.9), x(0.25), y(0.6), x(0.7), y(0.9));

  fill(160, 180, 180);
  triangle(x(0.3), y(1.0), x(0.8), y(0.7), x(1.3), y(1.0));

  fill(90, 130, 90);
  rect(x(0), y(0.9), x(1), y(0.1));
}

function drawStars(alphaFactor) {
  fill(255, 255, 255, alphaFactor * 255);
  for (let star of stars) {
    ellipse(star.x, star.y, star.size);
  }
}

function generateStars() {
  stars = [];
  const numStars = floor((width + height) * 0.1);
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: random(width),
      y: random(height * 0.5),
      size: random(1, 3)
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  generateStars();
  circleX = width / 2;
}
