const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startBtn = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const hearts = document.querySelectorAll('.tries img');
const resetButton = document.getElementById('btn__reset');
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

function getRandomPhraseAsArray(arr){
const randomIndex = Math.floor(Math.random()* arr.length);
const phrase = arr[randomIndex];
return phrase.split('');
}

const phraseArray = getRandomPhraseAsArray(phrases);


function addPhraseToDisplay(arr){
  const ul = document.querySelector('#phrase ul');
  ul.innerHTML = '';
  for (let i = 0; i < arr.length; i++){
    const char = arr[i];
    if (char === ' '){
      const li = document.createElement('li');
      li.classList.add('space');
      ul.appendChild(li);
    }else if (/[a-zA-Z]/.test(char)){
      const li = document.createElement('li');
      li.textContent = char;
      li.classList.add('letter');
      ul.appendChild(li);
    }
}
}

addPhraseToDisplay(phraseArray);

function checkLetter(button){
  const letters = document.querySelectorAll('.letter, .space');
  let match = null;
  for(let i = 0; i < letters.length; i++){
    if(button.textContent === letters[i].textContent){
      letters[i].classList.add('show');
      match = button.textContent
    }
  }
  return match;
}

function resetGame(){
  addPhraseToDisplay(getRandomPhraseAsArray(phrases));
  resetKeyboard();
  missed = 0;
  for(let i=0; i < hearts.length; i++){
    hearts[i].src = 'images/liveHeart.png';
  }
}

function checkWin() {
  const shownLetters = document.querySelectorAll('.show');
  const letters = document.querySelectorAll('.letter');
  if(shownLetters.length === letters.length){
    overlay.classList.add('win');
    overlay.style.display = '';
    resetButton.textContent = 'Play again';
  } else if(missed >= 5) {
    overlay.classList.add('lose');
    overlay.style.display = '';
    resetButton.textContent = 'Try again';
  }
  }



qwerty.addEventListener('click', (event) => {
  if(event.target.tagName === 'BUTTON'){
    const button = event.target;
    button.classList.add('chosen');
    button.disabled = true;
    const letterFound = checkLetter(button);
    if(!letterFound){
      missed += 1;
      hearts[hearts.length - missed].src = 'images/lostHeart.png';
    }
    checkWin();
  }
});

function resetKeyboard(){
  const buttons = document.querySelectorAll('#qwerty button');
  for(let i = 0; i < buttons.length; i++){
    buttons[i].classList.remove('chosen');
    buttons[i].disabled = false;
  }
}

resetButton.addEventListener('click', () => {
  if(overlay.classList.contains('win') || overlay.classList.contains('lose')){
    overlay.classList.remove('win', 'lose');
    overlay.style.display = 'none';
    resetButton.textContent = 'Start Game';
    addPhraseToDisplay(getRandomPhraseAsArray(phrases));
    missed = 0;
    for(let i = 0; i < hearts.length; i++){
      hearts[i].src = 'images/liveHeart.png';
    }
    resetKeyboard();
  }
});
