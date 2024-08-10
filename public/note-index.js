// public/note-index.js
//動きを作る

window.addEventListener('DOMContentLoaded', (event) => {
  //noteを送信
  document.querySelector('.send-note-button').addEventListener('click', (event) => {
    const new_content = document.querySelector('.note-content').value;
    const new_title = document.querySelector('.note-title').value;
    fetch('/api/note', { method: 'POST', headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ content: new_content ,title:new_title}) })
  });
});
