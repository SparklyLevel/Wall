const toggleBtn = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if (saved === 'light') document.body.classList.add('light');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

function getRandomWord() {
  return baseWords[Math.floor(Math.random() * baseWords.length)];
}

async function insertPrint(element, newText, speed = 140) {
  element.style.backgroundColor = '#fff2';
  element.style.color = '#fff';

  while (element.textContent.length) {
    element.textContent = element.textContent.slice(0, -1);
    await new Promise(r => setTimeout(r, speed));
  }

  for (const ch of newText) {
    element.textContent += ch;
    await new Promise(r => setTimeout(r, speed));
  }

  setTimeout(() => {
    element.style.backgroundColor = '';
    element.style.color = '';
  }, 600);
}

function spookyInsert() {
  const words = document.querySelectorAll('.word');
  if (!words.length) return;
  const el = words[Math.floor(Math.random() * words.length)];
  insertPrint(el, getRandomWord());
}

function scheduleNext() {
  const delay = 7000 + Math.random() * 8000;
  setTimeout(() => {
    spookyInsert();
    scheduleNext();
  }, delay);
}
scheduleNext();