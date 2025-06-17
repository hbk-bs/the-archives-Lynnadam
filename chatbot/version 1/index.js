const apiEndpoint = 'https://Lynnadam--0380223df34f429d8389e8e921a7eae9.web.val.run';

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('command');
  const runBtn = document.getElementById('run');
  const undoBtn = document.getElementById('undo');
  const copyCodeBtn = document.getElementById('copy-code');
  const output = document.getElementById('output');
  const content = document.getElementById('content');
  const codeDisplay = document.getElementById('code-display');
  const codeArea = document.getElementById('code-area');
  const dynamicStyles = document.getElementById('dynamic-styles');

  const history = [];
  const jsSnippets = []; 

  saveHistory();

  function saveHistory() {
    history.push(content.innerHTML);
    if (history.length > 50) history.shift();
  }

  function undo() {
    if (history.length > 1) {
      history.pop();
      jsSnippets.pop();

     
      content.innerHTML = history[history.length - 1];


      if (jsSnippets.length > 0) {
        try {
          eval(jsSnippets[jsSnippets.length - 1]);
        } catch (e) {
          console.error('Fehler beim Ausführen von Undo-JS:', e);
          output.style.color = 'red';
          output.textContent = '❌ Fehler beim Ausführen von Undo-JS: ' + e.message;
          setTimeout(() => (output.textContent = ''), 3000);
          return;
        }
      }

      output.style.color = 'green';
      output.textContent = '';
    } else {
      output.style.color = 'orange';
      output.textContent = ' Keine weiteren Änderungen rückgängig.';
    }
    setTimeout(() => (output.textContent = ''), 2000);
  }

  async function onRun() {
    const userInput = input.value.trim();
    if (!userInput) return;

    output.style.color = 'black';
    output.textContent = 'Lade...';

    const messages = [
      {
        role: 'system',
        content: `
Du bist ein JavaScript-Webentwickler. 
Deine Aufgabe ist es, DOM-Elemente innerhalb von #content oder CSS über #dynamic-styles zu verändern. 
- Bestehende Inhalte dürfen NICHT gelöscht werden, außer der Nutzer fordert das explizit an.
- Verwende wenn möglich DOM-Methoden wie appendChild() oder insertAdjacentHTML().
- Kein Zugriff auf outerHTML oder document.documentElement.
Antwort ausschließlich mit JavaScript-Code.
`.trim(),
      },
      {
        role: 'user',
        content: userInput,
      },
    ];

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        output.style.color = 'red';
        output.textContent = ' API-Fehler: ' + (await response.text());
        return;
      }

      const data = await response.json();
      let code = data.completion.choices[0].message.content;

      
      code = code.replace(/```(javascript|js)?\n?/g, '').replace(/```/g, '').trim();

      const forbidden = ['outerHTML', 'document.documentElement'];
      if (forbidden.some(frag => code.includes(frag))) {
        output.style.color = 'red';
        output.textContent = ' Zu gefährlicher Code – Änderung abgelehnt.';
        return;
      }

      try {
        saveHistory();

    
        jsSnippets.length = 0; 
        jsSnippets.push(code);
        eval(code);

        output.textContent = '';
      } catch (e) {
        output.style.color = 'red';
        output.textContent = ' Fehler beim Ausführen: ' + e.message;
      }
    } catch (err) {
      output.style.color = 'red';
      output.textContent = ' Fehler bei Anfrage: ' + err.message;
    }

    input.value = '';
  }

  function onKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onRun();
    }
  }

  runBtn.addEventListener('click', onRun);
  undoBtn.addEventListener('click', undo);
  input.addEventListener('keydown', onKeyDown);

  copyCodeBtn.addEventListener('click', () => {
    const htmlContent = content.innerHTML.trim();
    const dynamicCss = dynamicStyles.textContent.trim();
    const combinedJs = jsSnippets.join('\n\n').trim();

    const fullHtml = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Exportierter Inhalt</title>
  <style>
${dynamicCss}
  </style>
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
      output.style.color = 'green';
      output.textContent = ' Vollständiger HTML-Code kopiert!';
    } catch (e) {
      output.style.color = 'orange';
      output.textContent = 'Code zum Kopieren markiert.';
    }

    setTimeout(() => (output.textContent = ''), 2000);
  });
});
