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
  for (let i = 0; i < phraseArray.length; i++){
    const li = document.createElement('li');
    li.textContent = phraseArray[i];
    if(/[a-zA-Z]/.test(phraseArray[i])){
      li.className += ' letter';
    }
    ul.appendChild(li);
  } 
}

addPhraseToDisplay(phraseArray);

function checkLetter(button){
  const letters = document.querySelectorAll('.letter');
  let match = null;
  for(let i = 0; i < letters.length; i++){
    if(button.textContent === letters[i].textContent){
      letters[i].className +=' show';
      match = button.textContent
    }
  }
  return match;
}


qwerty.addEventListener('click', (event) => {
  if(event.target.tagName === 'BUTTON'){
    const button = event.target;
    button.className += ' chosen';
    button.disabled = true;
    const letterFound = checkLetter(button);
    if(!letterFound){
      missed += 1;
      hearts[hearts.length - missed].src = 'images/lostHeart.png';
    }
    checkWin();
  }
});

resetButton.addEventListener('click', () => {
  if(overlay.className.contains('win') || overlay.className.contains('lose')){
    resetButton.textContent = 'Start Game';
    phrase.innerHTML = '';
    const newPhrase = getRandomPhrase(phrases);
    addPhraseToDisplay(newPhrase);
    missed = 0;
    for(let i = 0; i < hearts.length; i++){
      hearts[i].src = 'images/liveHeart.png';
    }
  } else {
    startGame();
  }
})
