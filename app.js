const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startBtn = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
let missed = 0;

startBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
});

const phrases = [
  'i love javascript',
  'hello world',
  'i love chocolate',
  'morning coffee',
  'this game is fun'
];