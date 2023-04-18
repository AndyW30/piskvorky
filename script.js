import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let turn = document.querySelector('#turn').textContent;

//Nastav posluchač události všem políčkům.
const allButtons = document.querySelectorAll('button');

const addText = (e) => {
  let value = e.target.textContent;
  if (!value) {
    e.target.innerHTML = turn;
    if (turn === 'x') {
      document.querySelector('#turn').innerHTML = 'o';
      turn = 'o';
      e.target.classList.add('zoom-in');
    } else {
      document.querySelector('#turn').innerHTML = 'x';
      turn = 'x';
      e.target.classList.add('zoom-in');
    }
  }
};

allButtons.forEach((button) => {
  button.addEventListener('click', addText);
  button.addEventListener('animationend', function () {
    this.classList.remove('zoom-in');
  });
});

const checkWinner = () => {
  const gameFieldArray = Array.from(allButtons).map((button) => {
    if (button.classList.contains('o')) {
      return 'x';
    }
    if (button.classList.contains('o')) {
      return 'o';
    } else {
      return '_';
    }
  });
  //button.classList.contains('o')
  const winner = findWinner(gameFieldArray);
  if (winner === 'o' || winner === 'x') {
    setTimeout(function () {
      alert(`Vyhrál hráč se symbolem ${winner}! `);
      location.reload();
    }, 500);
  }
};

//kontrola vítězství po každém kliknutí na tlačítko
allButtons.forEach((button) => {
  button.addEventListener('click', checkWinner);
});

//restart hry
const restartGame = document.querySelector('.restart');
restartGame.addEventListener('click', function (event) {
  if (!confirm('Opravdu chcete restartovat hru?')) {
    event.preventDefault();
  }
});
