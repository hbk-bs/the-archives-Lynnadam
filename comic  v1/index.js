const startBtn = document.getElementById('startBtn');
const figur = document.querySelector('.figur');
const sprechblase = document.querySelector('.sprechblase');
const textElement = document.getElementById('text');
const arrow = document.querySelector('.sprechblase .arrow');

const texts = [
  "Hallo! Fang mich doch!",
  "Du hast mich gefunden! Hier bin ich."
];
let currentTextIndex = 0;
let charIndex = 0;

function typeText(text, callback) {
  textElement.textContent = "";
  charIndex = 0;
  const interval = setInterval(() => {
    if (charIndex < text.length) {
      textElement.textContent += text.charAt(charIndex);
      charIndex++;
    } else {
      clearInterval(interval);
      callback();
    }
  }, 70);
}

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';  // Button ausblenden

  // Figur rein sliden
  figur.classList.remove('hidden');
  setTimeout(() => {
    figur.classList.add('visible');
  }, 50);

  // Sprechblase sichtbar machen
  setTimeout(() => {
    sprechblase.classList.remove('hidden');
    sprechblase.classList.add('visible');
  }, 1800);

  // Text tippen
  setTimeout(() => {
    typeText(texts[currentTextIndex], () => {
      // Wenn erster Text fertig getippt ist, Pfeil einblenden
      arrow.classList.add('visible');
    });
  }, 2300);
});

// Klick auf Pfeil: Figur und Text ändern
arrow.addEventListener('click', () => {
  arrow.classList.remove('visible'); // Pfeil ausblenden
  currentTextIndex++;

  // Bild ändern
  figur.src = "https://hbk-bs.github.io/the-archives-Lynnadam/assets/images/comic%202.png";

  // Neuen Text tippen
  typeText(texts[currentTextIndex], () => {
    // Optional: hier kannst du weitere Aktionen nach dem 2. Text machen
  });
});
