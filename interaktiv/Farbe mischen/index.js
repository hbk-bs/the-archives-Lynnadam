const colorBox = document.getElementById("colorBox");
const goalColorBox = document.getElementById("goalColor");
const winMessage = document.getElementById("winMessage");
const restartButton = document.getElementById("restartButton");
const colorButtons = document.querySelectorAll(".colorBtn");
const clickCounts = {
  red: document.getElementById("redCount"),
  blue: document.getElementById("blueCount"),
  yellow: document.getElementById("yellowCount"),
  white: document.getElementById("whiteCount"),
  black: document.getElementById("blackCount")
};

// Startfarbe für den Mischkasten
let currentColor = { r: 127, g: 127, b: 127 };

// Ziel-Farbe (wird zufällig generiert)
let goalColor = { r: 0, g: 0, b: 0 };

// RGB-Werte für jede Farbe
const colors = {
  red: { r: 255, g: 0, b: 0 },
  blue: { r: 0, g: 0, b: 255 },
  yellow: { r: 255, g: 255, b: 0 },
  white: { r: 255, g: 255, b: 255 },
  black: { r: 0, g: 0, b: 0 }
};

// Funktion, um eine zufällige Ziel-Farbe zu generieren (Kombination von 2-3 Farben)
function generateRandomGoalColor() {
  const selectedColors = [];

  // Zufällig 2-3 Farben auswählen
  const colorNames = Object.keys(colors);
  while (selectedColors.length < 2) {  // Minimum 2 Farben mischen
    const randomColor = colorNames[Math.floor(Math.random() * colorNames.length)];
    if (!selectedColors.includes(randomColor)) {
      selectedColors.push(randomColor);
    }
  }

  // Kombinierte Ziel-Farbe generieren
  goalColor = { r: 0, g: 0, b: 0 };
  selectedColors.forEach(colorName => {
    goalColor.r += colors[colorName].r;
    goalColor.g += colors[colorName].g;
    goalColor.b += colors[colorName].b;
  });

  // Mittelwert für die Farbe berechnen
  goalColor.r = Math.floor(goalColor.r / selectedColors.length);
  goalColor.g = Math.floor(goalColor.g / selectedColors.length);
  goalColor.b = Math.floor(goalColor.b / selectedColors.length);

  goalColorBox.style.backgroundColor = `rgb(${goalColor.r}, ${goalColor.g}, ${goalColor.b})`;
}

// Funktion, um die aktuelle Farbe zu mischen
function mixColor(targetColor) {
  const factor = 0.1;

  currentColor.r = Math.round(currentColor.r + (targetColor.r - currentColor.r) * factor);
  currentColor.g = Math.round(currentColor.g + (targetColor.g - currentColor.g) * factor);
  currentColor.b = Math.round(currentColor.b + (targetColor.b - currentColor.b) * factor);

  updateColorBox();
  checkIfWon();
}

// Update der Mischbox
function updateColorBox() {
  const { r, g, b } = currentColor;
  colorBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// Überprüfen, ob die Ziel-Farbe erreicht wurde
function checkIfWon() {
  const { r, g, b } = currentColor;
  const tolerance = 35;

  if (
    Math.abs(r - goalColor.r) < tolerance &&
    Math.abs(g - goalColor.g) < tolerance &&
    Math.abs(b - goalColor.b) < tolerance
  ) {
    winMessage.style.display = "block";  // Zeige Gewinnnachricht an
  }
}

// Event Listener für Farbbuttons
colorButtons.forEach(button => {
  button.addEventListener("click", () => {
    const colorName = button.getAttribute("data-color");
    const targetColor = colors[colorName];
    mixColor(targetColor);

    // Klickzähler erhöhen
    let currentCount = parseInt(clickCounts[colorName].innerText);
    clickCounts[colorName].innerText = currentCount + 1;
  });
});

// Neustart Button
restartButton.addEventListener("click", () => {
  generateRandomGoalColor();  // Neue Ziel-Farbe generieren
  currentColor = { r: 127, g: 127, b: 127 };  // Startfarbe zurücksetzen
  updateColorBox();  // Mischkasten zurücksetzen
  winMessage.style.display = "none";  // Gewinnnachricht ausblenden
  Object.keys(clickCounts).forEach(color => {
    clickCounts[color].innerText = 0;  // Zähler zurücksetzen
  });
});

// Initiale Ziel-Farbe setzen und Mischkasten updaten
generateRandomGoalColor();
updateColorBox();
