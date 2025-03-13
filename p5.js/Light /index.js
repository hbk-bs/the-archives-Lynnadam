const x = (n) => width * n;
const y = (n) => height * n;
const s = (n) => (height > width ? height * n : width * n);

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL, 360, 100, 100, 100);
  noLoop(); 
}

function draw() {
  const myPrimaryColor = color(0, 0, 0);
  background(myPrimaryColor);

  const secondaryColor = color(40, 90, 50);


  const complementaryColor = color(
    (hue(secondaryColor) + 180) % 360,
    saturation(secondaryColor),
    lightness(secondaryColor)
  );

  strokeWeight(0);

  let h = hue(secondaryColor);
  let sat = saturation(secondaryColor);
  let l = lightness(secondaryColor);

 
  fill(h, sat, l, 100);
  circle(x(0.5), y(0.5), s(1.125));
  
  fill(h, sat, 70, 100);
  circle(x(0.5), y(0.5), s(0.75));
  
  fill(h, sat, 85, 100);
  circle(x(0.5), y(0.5), s(0.375));


  fill(complementaryColor);
  quad(x(0.425), y(0.625), x(0.575), y(0.625), x(0.575), y(1), x(0.425), y(1));

 
  strokeWeight(3);
  stroke(0, 0, 100); 
  line(x(0.5), y(0.625), x(0.5), y(0.575));

 
  strokeWeight(0);
  fill(h, sat, 100, 100);
  beginShape();
  vertex(x(0.5), y(0.575));
  vertex(x(0.4625), y(0.5375));
  vertex(x(0.5), y(0.45));
  vertex(x(0.4625), y(0.4));
  vertex(x(0.525), y(0.4625));
  vertex(x(0.5), y(0.525));
  endShape(CLOSE);
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
