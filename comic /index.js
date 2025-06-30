const startBtn = document.getElementById('startBtn');
const figur = document.querySelector('.figur');
const sprechblase = document.querySelector('.sprechblase');
const textElement = document.getElementById('text');
const arrow = document.querySelector('.sprechblase .arrow');

let currentScene = 0;
let charIndex = 0;

// 🎬 Szenen definieren
const scenes = [
  {
    text: "Hallo! Fang mich doch!",
    image: "comic%201.png"
  },
  {
    text: "Du hast mich gefunden! Hier bin ich.",
    image: "comic%202.png"
  },
  {
    text: "Ich verstecke mich schon wieder...!",
    image: "comic%202.png"
  },
  {
    choices: [
      { text: "Links lang", next: 4 },
      { text: "Rechts lang", next: 5 }
    ]
  },
  {
    text: "Du bist links gegangen.",
    image: "comic%202.png"
  },
  {
    text: "Du bist rechts gegangen.",
    image: "comic%202.png"
  }
];

function typeText(text, callback) {
  textElement.textContent = "";
  charIndex = 0;
  const interval = setInterval(() => {
    if (charIndex < text.length) {
      textElement.textContent += text.charAt(charIndex);
      charIndex++;
    } else {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 70);
}

function showScene(index) {
  // Lösche alte Auswahlbuttons (falls vorhanden)
  const oldChoices = document.querySelector(".choices");
  if (oldChoices) oldChoices.remove();

  if (index >= scenes.length) {
    arrow.classList.remove('visible');
    return;
  }

  const scene = scenes[index];
  currentScene = index;

  // Falls Auswahlmöglichkeiten vorhanden sind:
  if (scene.choices) {
    arrow.classList.remove('visible');
    textElement.textContent = ""; // Leere Text
    

    const choicesContainer = document.createElement("div");
    choicesContainer.classList.add("choices");

    scene.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.addEventListener("click", () => {
        choicesContainer.remove(); // Auswahl löschen
        showScene(choice.next);    // Weiter mit gewählter Szene
      });
      choicesContainer.appendChild(btn);
    });

    sprechblase.appendChild(choicesContainer);
    return;
  }

  // Normale Szene
  figur.classList.remove('hidden');
  figur.src = `https://hbk-bs.github.io/the-archives-Lynnadam/assets/images/${scene.image}`;

  typeText(scene.text, () => {
    arrow.classList.add('visible');
  });
}

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  figur.classList.remove('hidden');
  setTimeout(() => {
    figur.classList.add('visible');
  }, 50);

  setTimeout(() => {
    sprechblase.classList.remove('hidden');
    sprechblase.classList.add('visible');
  }, 1800);

  setTimeout(() => {
    showScene(currentScene);
  }, 2300);
});

arrow.addEventListener('click', () => {
  const scene = scenes[currentScene];
  // Falls es sich um eine Choice-Szene handelt → nichts tun
  if (scene.choices) return;

  arrow.classList.remove('visible');
  currentScene++;
  showScene(currentScene);
});
