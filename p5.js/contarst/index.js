const x = (n) => width * n;
const y = (n) => height * n;
const s = (n) => (height > width ? height * n : width * n);

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL, 360, 100, 100, 100);
  noLoop(); 
}

function draw() {
 
  const myPrimaryColor = color(0, 0, 50);
  background(myPrimaryColor);

  const secondaryColor = color(0, 0, 0);
  const tertiaryColor = color(0, 0, 100);

  
  fill(secondaryColor);
  strokeWeight(0);
  triangle(x(0.2), y(0.25), x(0.425), y(0.05), x(0.65), y(0.25));

  
  quad(x(0.35), y(0.25), x(0.5), y(0.25), x(0.5), y(0.75), x(0.35), y(0.75));

  
  fill(tertiaryColor);
  strokeWeight(0);
  triangle(x(0.35), y(0.75), x(0.80), y(0.75), x(0.575), y(0.95));

  
  quad(x(0.5), y(0.25), x(0.65), y(0.25), x(0.65), y(0.75), x(0.5), y(0.75));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw(); 
}

function keyPressed() {
  if (key === 's') {
    const name = prompt('Enter name', `out-${Date.now()}.png`);
    save(name);
  }
}
