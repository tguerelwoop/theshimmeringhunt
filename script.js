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

function checkPagePassword(button) {
  const section = button.closest('.page');
  const input = section.querySelector('input');
  const error = section.querySelector('.error');

  const correct = section.dataset.password.toLowerCase();
  const entered = input.value.trim().toLowerCase();

  if (entered === correct) {
    const next = parseInt(section.dataset.page) + 1;
    localStorage.setItem('currentPage', next);
    showPage(next);
  } else {
    error.textContent = 'That word would ruin one’s reputation.';
  }
}


// Load saved progress
showPage(currentPage);
