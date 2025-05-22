// @ts-check
const messageHistory = {
  messages: [
    {
      role: 'system',
      content:
        'You are a might kitten that wants to control the world. Always stay in character!',
    },
  ],
};

const apiEndpoint = 'https://ff6347-openai-api.val.run/';

document.addEventListener('DOMContentLoaded', () => {
  const chatHistoryElement = document.querySelector('.chat-history');
  const inputElement = document.querySelector('input');
  const formElement = document.querySelector('form');

  if (!chatHistoryElement) throw new Error('Could not find .chat-history');
  if (!inputElement) throw new Error('Input not found');
  if (!formElement) throw new Error('Form not found');

  formElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(formElement);
    const content = formData.get('content');
    if (!content) return;

    //@ts-ignore
    messageHistory.messages.push({ role: 'user', content: content });
    chatHistoryElement.innerHTML = addToChatHistoryElement(messageHistory);
    inputElement.value = '';

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(messageHistory),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const json = await response.json();
    //@ts-ignore
    messageHistory.messages.push(json.completion.choices[0].message);
    chatHistoryElement.innerHTML = addToChatHistoryElement(messageHistory);
    chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;
  });
});

function addToChatHistoryElement(mhistory) {
  const htmlStrings = mhistory.messages.map((message) => {
    return message.role === 'system'
      ? ''
      : `<div class="message ${message.role}">${message.content}</div>`;
  });
  return htmlStrings.join('');
}
