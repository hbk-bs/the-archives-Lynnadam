const x = (n) => width * n;
const y = (n) => height * n;
const s = (n) => (height > width ? height * n : width * n);

function setup() {
  createCanvas(windowWidth, windowHeight); 
  colorMode(HSL, 360, 100, 100, 100);
}

function draw() {
  const myPrimaryColor = color(330, 80, 60); 


  background(myPrimaryColor);

  const secondaryColor = color(0, 0, 10); 
  const lighterPrimaryColor = color(hue(myPrimaryColor), saturation(myPrimaryColor), lightness(myPrimaryColor) + 30); 
  const lightersecondaryColor = color(hue(secondaryColor), saturation(secondaryColor), lightness(secondaryColor) + 40); 


  fill(secondaryColor);
  strokeWeight(0);
  quad(x(0.375), y(0.25), x(0.75), y(0.25), x(0.75), y(0.75), x(0.375), y(0.75));

 
  fill(lighterPrimaryColor);
  strokeWeight(0);
  quad(x(0.25), y(0.375), x(0.375), y(0.375), x(0.375), y(0.625), x(0.25), y(0.625));

 
  fill(lightersecondaryColor);
  strokeWeight(0);
  quad(x(0.375), y(0.375), x(0.5), y(0.375), x(0.5), y(0.625), x(0.375), y(0.625));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
}
