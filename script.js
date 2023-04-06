let turn = document.getElementById('turn').textContent;
const td = document.getElementsByTagName('td');

const addText = (e) => {
  value = e.target.textContent;
  if (!value) {
    e.target.innerHTML = turn;
    if (turn === 'x') {
      document.getElementById('turn').innerHTML = 'o';
      turn = 'o';
    } else {
      document.getElementById('turn').innerHTML = 'x';
      turn = 'x';
    }
  }
};

for (let i = 0; i < td.length; i++) {
  td[i].addEventListener('click', addText);
}
