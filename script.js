let turn = document.getElementById('turn').textContent;
const td = document.getElementsByTagName('td');

const addText = (e) => {
  value = e.target.textContent;
  if (!value) {
    e.target.innerHTML = turn;
    if (turn === 'x') {
      document.getElementById('turn').innerHTML = 'o';
      turn = 'o';
      e.target.classList.add('zoom-in');
    } else {
      document.getElementById('turn').innerHTML = 'x';
      turn = 'x';
      e.target.classList.add('zoom-in');
    }
  }
};

for (let i = 0; i < td.length; i++) {
  td[i].addEventListener('click', addText);
  td[i].addEventListener('animationend', function () {
    this.classList.remove('zoom-in');
  });
}

const restartGame = document.getElementById('restart');
restartGame.addEventListener('click', function (event) {
  if (!confirm('Opravdu chcete restartovat hru?')) {
    event.preventDefault();
  }
});
