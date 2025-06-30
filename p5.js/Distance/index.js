const x = (n) => width * n;
const y = (n) => height * n;
const s = (n) => (height > width ? height * n : width * n);

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL, 360, 100, 100, 100);
}

function draw() {
  const myPrimaryColor = color(200, 80, 90);


  background(myPrimaryColor);

  const secondaryColor = color((hue(myPrimaryColor) + 300) % 360, saturation(myPrimaryColor), lightness(myPrimaryColor));
  fill(secondaryColor);

  const tertiaryColor = color((hue(secondaryColor) + 280) % 360, 100, lightness(secondaryColor));


  strokeWeight(s(0.003));

  fill(tertiaryColor);

  triangle(x(0), y(0.6), x(0), y(0.475), x(0.5), y(0.75));
  triangle(x(0.4375), y(0), x(0.5625), y(0), x(0.5), y(0.75));
  triangle(x(-0.05), y(0.05), x(0.05), y(-0.05), x(0.5), y(0.75));
  triangle(x(0.5), y(0.75), x(1.05), y(-0.2), x(1.05), y(0.05));
  triangle(x(0.5), y(0.75), x(1), y(0.5), x(1), y(0.6125));
  circle(x(0.5), y(0.75), s(0.2));

  fill(secondaryColor);
  let h = hue(secondaryColor);
  let sat = saturation(secondaryColor);
  let l = lightness(secondaryColor);

  fill(130, 100, l, 100);
  triangle(x(-0.75), y(1), x(-0.125), y(0.625), x(0.75), y(1));
  triangle(x(0.5), y(1), x(1.125), y(0.625), x(1.25), y(1));
  triangle(x(-0.25), y(1), x(0.25), y(0.625), x(0.75), y(1));
  triangle(x(0.25), y(1), x(0.75), y(0.625), x(1.25), y(1));

  fill(h, 40, 50, 100);
  triangle(x(-0.25), y(1), x(0.125), y(0.75), x(0.5), y(1));
  triangle(0, y(1), x(0.375), y(0.75), x(0.75), y(1));
  triangle(x(0.5), y(1), x(0.875), y(0.75), x(1.25), y(1));

  fill(h, 50, 30, 100);
  triangle(x(-1), y(1), x(0.125), y(0.925), x(0.75), y(1));
  triangle(x(0.1), y(0.95), x(0.1125), y(0.9), x(0.125), y(0.95));
  triangle(20, y(0.95), x(0.0625), y(0.8875), x(0.075), y(0.95));

  fill(h, 50, 30, 100);
  triangle(x(-0.05), y(1), x(0.875), y(0.925), x(2), y(1));
  triangle(x(0.85), y(0.95), x(0.8625), y(0.8875), x(0.875), y(0.95));
  triangle(x(0.9), y(0.95), x(0.9125), y(0.875), x(0.925), y(0.95));
  triangle(x(0.95), y(0.95), x(0.96), y(0.9075), x(0.97), y(0.95));
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
}


function keyPressed() {
  if (key === 's') {
    const name = prompt('Enter name', `out-${Date.now()}.png`);
    save(name); 
  }
}
