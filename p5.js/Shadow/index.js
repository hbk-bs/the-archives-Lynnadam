const x = (n) => width * n;
const y = (n) => height * n;
const s = (n) => (height > width ? height * n : width * n);

let myPrimaryColor;

function setup() {
  createCanvas(windowWidth, windowHeight);  
  
  colorMode(HSL, 360, 100, 100, 100);
  myPrimaryColor = color(380, 93, 0);  
}

function draw() {

  background(myPrimaryColor);  

  const secondaryColor = color((hue(myPrimaryColor) + 750) % 9500, 90, 50);

  fill(secondaryColor);  
  strokeWeight(0);  

  quad(x(0.55), y(0.15), x(0.75), x(0.2125), x(0.75), y(0.55), x(0.575), y(0.5));
  quad(x(0.575), y(0.5), x(0.75), y(0.55), x(0.375), y(0.925), x(0.05), y(0.775));

  fill(myPrimaryColor); 
  strokeWeight(0);  


  circle(x(0.65), y(0.275), s(0.037));
  triangle(x(0.625), y(0.5125), x(0.63), y(0.41), x(0.65), y(0.41));
  triangle(x(0.6625), y(0.525), x(0.645), y(0.41), x(0.665), y(0.41));
  
  quad(x(0.625), y(0.5125), x(0.6625), y(0.525), x(0.575), y(0.75), x(0.25), y(0.75));

  beginShape();
  vertex(x(0.625), y(0.2875));
  vertex(x(0.675), y(0.2975));
  vertex(x(0.6875), y(0.4));
  vertex(x(0.675), y(0.375));
  vertex(x(0.675), y(0.4175));
  vertex(x(0.625), y(0.41));
  vertex(x(0.6275), y(0.355));
  vertex(x(0.6125), y(0.375));
  endShape(CLOSE);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);  
  background(myPrimaryColor);  
}


function keyPressed() {
  if (key === 's') {
    const name = prompt('Enter name', `out-${Date.now()}.png`);
    save(name);  
  }
}
