const pages = document.querySelectorAll('.page');

let currentPage = localStorage.getItem('currentPage') || 'password';

// VALID ANSWERS
const validPairs = [
  ['fish', 'red'],
  ['coral', 'pink'],
  ['seaweed', 'green'],
  ['waves', 'blue'],
  ['jellyfish', 'purple'],
  ['pearl', 'white'],
  ['starfish', 'orange'],
  ['octopus', 'black'],
  ['dolphin', 'teal'],
  ['shrimp', 'pink'],
  ['crab', 'red'],
  ['squid', 'red'],
  ['turtle', 'green'],
  ['seahorse', 'orange'],
  ["mermaid's song", 'silver']
];

function showPage(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  const page = document.querySelector(`[data-page="${pageId}"]`);
  if (page) page.classList.add('active');
}

function checkPassword() {
  const color = document.getElementById('colorInput').value.trim().toLowerCase();
  const symbol = document.getElementById('symbolInput').value.trim().toLowerCase();
  const error = document.getElementById('error');

  const isValid = validPairs.some(
    ([c, s]) => c === color && s === symbol
  );

  if (isValid) {
    localStorage.setItem('currentPage', 1);
    showPage(1);
  } else {
    error.textContent = 'Think again, dear.';
  }
}

function nextPage() {
  currentPage = parseInt(localStorage.getItem('currentPage')) + 1;
  localStorage.setItem('currentPage', currentPage);
  showPage(currentPage);
}

function restartGame() {
  localStorage.clear();
  location.reload();
}
const errorMessages = [
  'That word would ruin one’s reputation.',
  'How very bold of you — and quite wrong.',
  'That answer would set tongues wagging.',
  'One must admire the confidence, if not the accuracy.',
  'That choice would cause a most unfortunate scandal.',
  'My dear, that will not do.',
  'A dreadful misstep in polite society.',
  'That word would never survive the Season.',
  'You have spoken too hastily.',
  'Such an answer would be whispered about for weeks.',
  'Regrettably incorrect — and most improper.',
  'One shudders at the thought of it being correct.',
  'An answer best left unspoken.',
  'That is not the sort of thing one admits in public.',
  'A choice that would ruin one’s prospects entirely.',
  'I fear Lady Whistledown would be delighted by this error.',
  'Incorrect, though delightfully daring.',
  'Society would never forgive such a mistake.',
  'A most scandalous attempt — and quite wrong.',
  'That word lacks all refinement.',
  'Let us pretend you never tried that.'
];

function checkPagePassword(button) {
  const section = button.closest('.page');
  const input = section.querySelector('input');
  const error = section.querySelector('.error');

  const correct = section.dataset.password.toLowerCase();
  const entered = input.value.trim().toLowerCase();

  if (entered === correct) {
    const next = Number(section.dataset.page) + 1;
    localStorage.setItem('currentPage', next);
    showPage(next);
    return;
  }

  // increment per-page attempt count
  const attempts = Number(section.dataset.attempts || 0);
  error.textContent = errorMessages[attempts % errorMessages.length];
  section.dataset.attempts = attempts + 1;
}

function showHint(button) {
  const page = button.closest('.page');
  const hintBox = page.querySelector('.hint');

  hintBox.textContent = page.dataset.hint;
}

function hideHint(button) {
  button.closest('.hint').textContent = '';
}

function showHint(button) {
  const page = button.closest('.page');
  const hintBox = page.querySelector('.hint');

  hintBox.textContent =
    hintBox.textContent ? '' : page.dataset.hint;
}

// Load saved progress
showPage(currentPage);
