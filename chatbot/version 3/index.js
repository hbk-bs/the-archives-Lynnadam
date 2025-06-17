const apiEndpoint = 'https://Lynnadam--0380223df34f429d8389e8e921a7eae9.web.val.run';

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('command');
  const runBtn = document.getElementById('run');
  const undoBtn = document.getElementById('undo');
  const copyCodeBtn = document.getElementById('copy-code');
  const output = document.getElementById('output');
  const content = document.getElementById('content');
  const teacherBox = document.getElementById('teacher-box');
  const teacherText = document.getElementById('teacher-text');
  const teacherOptions = document.getElementById('teacher-options');
  const teacherButtons = document.getElementById('teacher-buttons');
  const acceptBtn = document.getElementById('accept-btn');
  const rejectBtn = document.getElementById('reject-btn');
  const explainBtn = document.getElementById('explain-btn');
  const codeDisplay = document.getElementById('code-display');
  const codeArea = document.getElementById('code-area');
  const closeExplanationBtn = document.getElementById('close-explanation-btn');
 // Splash Screen schließen
 const splash = document.getElementById('splash-screen');
 const splashClose = document.getElementById('splash-close');
 splashClose.addEventListener('click', () => {
   splash.style.display = 'none';
 });

 // Code-Fenster schließen
 const closeCodeBtn = document.getElementById('close-code');
 closeCodeBtn.addEventListener('click', () => {
   codeDisplay.style.display = 'none';
   closeCodeBtn.style.display = 'none';
 });

 // Zeige Schließen-Button, wenn Code-Fenster erscheint
 copyCodeBtn.addEventListener('click', () => {
   closeCodeBtn.style.display = 'block';
 });

  let history = [];
  let jsSnippets = [];
  let currentCode = '';

 
  saveHistory();

  function saveHistory(jsCode = '') {
    history.push({
      html: content.innerHTML,
      js: jsCode
    });
    if (history.length > 50) history.shift();
  }

  function undo() {
    if (history.length > 1) {
      history.pop();
      const last = history[history.length - 1];
      content.innerHTML = last.html;

      if (last.js) {
        try {
          new Function(last.js)();
        } catch (e) {
          displayError('Fehler beim Undo-JS: ' + e.message);
          return;
        }
      }
      displayInfo('🔄 Änderung rückgängig gemacht.');
    } else {
      displayInfo('🛑 Keine weiteren Änderungen rückgängig.');
    }
  }

  async function onRun() {
    const userInput = input.value.trim();
    if (!userInput) return;

    displayInfo('⏳ Frage den Lehrer...');

    
    const messages = [
      {
        role: 'system',
        content: `
Du bist ein sakastischer Lehrer, der dem Nutzer verschiedene Optionen erklärt, bevor er Änderungen an der Webseite macht. Für die Änderungen passe den bestehenden Code so an, dass du sie ausführen kannst. Wenn du neue Elemente erzeugst, gib ihnen eine eindeutige id, wie id="blauerBall" oder ähnlich, damit man sie später verändern kann.
Antworte immer mit folgendem Format:

EXPLANATION:
<Deine Erklärung, was passieren soll, in einfachen Worten>

OPTIONS:
- Option 1: <kurze Beschreibung>
- Option 2: <kurze Beschreibung>
- Option 3: <kurze Beschreibung>

CODE:
\`\`\`js
<JS-Code für Option 1> 
\`\`\`

\`\`\`js
<JS-Code für Option 2> 
\`\`\`

\`\`\`js
<JS-Code für Option 3> 
\`\`\`

Am Ende frage: "Möchtest du eine dieser Optionen umsetzen? Klicke die gewünschte an." Danach wird eine neue Anfrage gestellt, mit der du dann den Code weiter veränderst.
      `.trim()
      },
      {
        role: 'user',
        content: userInput
      }
    ];

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
      });

      if (!response.ok) {
        const errorText = await response.text();
        return displayError('API-Fehler: ' + errorText);
      }

      const data = await response.json();
      const reply = data.completion.choices[0].message.content;

     
      const explanationMatch = reply.match(/EXPLANATION:\s*([\s\S]+?)\nOPTIONS:/i);
      const optionsMatch = reply.match(/OPTIONS:\s*([\s\S]+?)\nCODE:/i);
      const codeMatches = [...reply.matchAll(/```js\s*([\s\S]+?)\s*```/g)];

      if (!explanationMatch || !optionsMatch || codeMatches.length === 0) {
        return displayError('Antwort konnte nicht korrekt verarbeitet werden.');
      }

      const explanation = explanationMatch[1].trim();
      const optionsText = optionsMatch[1].trim();

   
      const optionLines = optionsText.split('\n').filter(line => line.trim().startsWith('- Option'));
      if (optionLines.length !== codeMatches.length) {
        return displayError('Anzahl der Optionen und Codes stimmt nicht überein.');
      }

      teacherText.innerHTML = explanation
      .split('\n')
  .filter(p => p.trim() !== '')
  .map(p => `<p>${p.trim()}</p>`)
  .join('');
      teacherOptions.innerHTML = '';
      teacherButtons.style.display = 'none';

     
      optionLines.forEach((line, i) => {
        const btn = document.createElement('button');
        btn.textContent = line.replace(/^- Option \d+: /, '').trim();
        btn.onclick = () => {
          currentCode = codeMatches[i][1].trim();

       
          if (currentCode.includes('<') || /html/i.test(currentCode)) {
            displayError('⛔ Code enthält unerlaubte HTML-Tags oder Text.');
            return;
          }

          teacherButtons.style.display = 'flex';
          acceptBtn.focus();
        };
        teacherOptions.appendChild(btn);
      });

      teacherBox.style.display = 'flex';
    } catch (err) {
      displayError('🌐 Netzwerkfehler: ' + err.message);
    }

    input.value = '';
  }

  acceptBtn.onclick = () => {
    teacherBox.style.display = 'none';

    try {
      if (currentCode.includes('<') || /html/i.test(currentCode)) {
        displayError('⛔ Unerlaubter Code mit HTML, nicht ausführbar.');
        return;
      }
      explainBtn.onclick = async () => {
        teacherBox.style.display = 'none';
        displayInfo('Erklärung wird geladen...');
    
        try {
          const messages = [
            {
              role: 'system',
              content: `
    Du bist ein hilfsbereiter Lehrassistent. Analysiere den folgenden JavaScript-Code und erkläre Schritt für Schritt, was er tut und wie er die Webseite verändert. Es ist auch wichtig, dass du den text gut strukturiert mit absätzen Verwende einfache, aber präzise Sprache und verwende Beispiele aus der DOM-Manipulation. Nutze wenn sinnvoll Aufzählungen oder Codebeispiele.
              `.trim()
            },
            {
              role: 'user',
              content: currentCode
            }
          ];
    
          const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages })
          });
    
          if (!response.ok) {
            const errorText = await response.text();
            return displayError('API-Fehler: ' + errorText);
          }
    
          const data = await response.json();
          const reply = data.completion.choices[0].message.content;
    
          teacherText.textContent = reply;
          teacherOptions.innerHTML = '';
          teacherButtons.style.display = 'none';
          teacherBox.style.display = 'flex';
        } catch (err) {
          displayError('🌐 Netzwerkfehler bei Erklärung: ' + err.message);
        }

       
        teacherButtons.style.display = 'flex';
acceptBtn.style.display = 'none';
rejectBtn.style.display = 'none';
explainBtn.style.display = 'none';
closeExplanationBtn.style.display = 'inline-block';

      };
      
      closeExplanationBtn.onclick = () => {
        teacherBox.style.display = 'none';
        teacherText.textContent = '';
        teacherOptions.innerHTML = '';
        teacherButtons.style.display = 'none';
      

        acceptBtn.style.display = 'inline-block';
        rejectBtn.style.display = 'inline-block';
        explainBtn.style.display = 'inline-block';
        closeExplanationBtn.style.display = 'none';
      
      
        try {
          if (currentCode.includes('<') || /html/i.test(currentCode)) {
            displayError('⛔ Unerlaubter Code mit HTML, nicht ausführbar.');
            return;
          }
      
       
          autoCreateMissingElements(currentCode);
      
          new Function(currentCode)();
          saveHistory(currentCode);
          jsSnippets.push(currentCode);
          displaySuccess('✅ Änderung erfolgreich!');
        } catch (e) {
          displayError('❌ Fehler beim Ausführen nach Erklärung: ' + e.message);
        }
      };
      

      function autoCreateMissingElements(code) {
        const idMatches = [...code.matchAll(/getElementById\s*\(\s*['"]([^'"]+)['"]\s*\)/g)];
        const created = new Set();
      
        idMatches.forEach(match => {
          const id = match[1];
          if (!document.getElementById(id) && !created.has(id)) {
            const el = document.createElement('div');
            el.id = id;
            el.style.border = '1px dashed red';
            el.style.margin = '5px';
            el.style.padding = '5px';
            el.textContent = `(Auto-erzeugt: #${id})`;
            content.appendChild(el);
            created.add(id);
          }
        });
      }

      new Function(currentCode)();
      saveHistory(currentCode);
      jsSnippets.push(currentCode);
      displaySuccess('✅ Änderung erfolgreich!');
    } catch (e) {
      displayError('❌ Fehler beim Ausführen: ' + e.message);
    }
  };

  rejectBtn.onclick = () => {
    teacherBox.style.display = 'none';
    displayInfo('Änderung abgebrochen. Du kannst neu fragen.');
  };

  function displayError(msg) {
    output.style.color = 'red';
    output.textContent = msg;
    clearOutput();
  }

  function displaySuccess(msg) {
    output.style.color = 'green';
    output.textContent = msg;
    clearOutput();
  }

  function displayInfo(msg) {
    output.style.color = 'black';
    output.textContent = msg;
    clearOutput();
  }

  function clearOutput() {
    setTimeout(() => output.textContent = '', 7000);
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      onRun();
    }
  }
  function autoCreateMissingElements(code) {
    const idMatches = [...code.matchAll(/getElementById\s*\(\s*['"]([^'"]+)['"]\s*\)/g)];
    const created = new Set();
  
    idMatches.forEach(match => {
      const id = match[1];
      if (!document.getElementById(id) && !created.has(id)) {
        const el = document.createElement('div');
        el.id = id;
        el.style.border = '1px dashed red';
        el.style.margin = '5px';
        el.style.padding = '5px';
        el.textContent = `(Auto-erzeugt: #${id})`;
        content.appendChild(el);
        created.add(id);
      }
    });
  }
  
  runBtn.addEventListener('click', onRun);
  undoBtn.addEventListener('click', undo);
  input.addEventListener('keydown', onKeyDown);

  copyCodeBtn.addEventListener('click', () => {
    const htmlContent = content.innerHTML.trim();
    const combinedJs = jsSnippets.join('\n\n').trim();

    const fullHtml = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Exportierter Inhalt</title>
  <style>/* Dynamische Styles kommen hier rein, falls implementiert */</style>
</head>
<body>
  <div id="content">
${htmlContent}
  </div>
  <script>
${combinedJs}
  </script>
</body>
</html>
    `.trim();

    codeArea.value = fullHtml;
    codeDisplay.style.display = 'block';
    codeArea.focus();
    codeArea.select();

    try {
      document.execCommand('copy');
      displaySuccess('📋 Code kopiert!');
    } catch {
      displayInfo('Code markiert – bitte manuell kopieren.');
    }
 

  
 
  });
});
