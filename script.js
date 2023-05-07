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
    if (button.textContent === 'x') {
      return 'x';
    }
    if (button.textContent === 'o') {
      return 'o';
    } else {
      return '_';
    }
  });

  const winner = findWinner(gameFieldArray);
  if (winner === 'o' || winner === 'x') {
    setTimeout(function () {
      alert(`Vyhrál hráč se symbolem ${winner} ! `);
      location.reload();
    }, 500);
  } else if (winner === `tie`) {
    setTimeout(() => {
      alert(`Hra skončila neroznodně.`);
      location.reload();
    }, 500);
  }

  //když je na tahu hráč s křížky, tak se vypne možnost klikat na další tlačítka a hráč ovládající kolečka musí počkat, až hráč s křížky provede tah.
  if (turn === 'x') {
    allButtons.forEach((btn) => (btn.disabled = true));

    //odešli požadavek na API a získej navrhovaný tah
    fetch('https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        board: gameFieldArray,
        player: turn,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const { x, y } = data.position;
        // board 10x10
        const index = x + y * 10;
        const field = allButtons[index];
        field.click();
      });

    // Pokud tlačítko již obsahuje text "o" nebo "x", zůstane vypnuté a nebude reagovat na uživatelské interakce.
    allButtons.forEach((btn) => {
      if (!btn.textContent.includes('o') && !btn.textContent.includes('x')) {
        btn.disabled = false;
      }
    });
  }
};
//kontrola vítězství po každém kliknutí na tlačítko
allButtons.forEach((button) => {
  button.addEventListener('click', checkWinner);
});

//restart hry - kratší zápis, arrow function
document.querySelector('.restart').addEventListener('click', (event) => {
  if (!confirm('Opravdu chcete restartovat hru?')) {
    event.preventDefault();
  }
});
