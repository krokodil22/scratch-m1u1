const game = document.querySelector('.game');
const draggableProps = document.querySelectorAll('.draggable');
const dinos = document.querySelectorAll('.dino');
const foundCount = document.getElementById('found-count');
const totalCount = document.getElementById('total-count');
const winMessage = document.getElementById('win-message');

let found = 0;
totalCount.textContent = String(dinos.length);

let topZ = 6;

const toPercent = (value, max) => `${(value / max) * 100}%`;

draggableProps.forEach((item) => {
  item.addEventListener('pointerdown', (event) => {
    event.preventDefault();

    const gameRect = game.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const shiftX = event.clientX - itemRect.left;
    const shiftY = event.clientY - itemRect.top;

    item.classList.add('dragging');
    item.style.zIndex = String(++topZ);
    item.setPointerCapture(event.pointerId);

    const onMove = (moveEvent) => {
      let leftPx = moveEvent.clientX - gameRect.left - shiftX;
      let topPx = moveEvent.clientY - gameRect.top - shiftY;

      leftPx = Math.max(0, Math.min(leftPx, gameRect.width - itemRect.width));
      topPx = Math.max(0, Math.min(topPx, gameRect.height - itemRect.height));

      item.style.left = toPercent(leftPx, gameRect.width);
      item.style.top = toPercent(topPx, gameRect.height);
    };

    const onEnd = () => {
      item.classList.remove('dragging');
      item.removeEventListener('pointermove', onMove);
      item.removeEventListener('pointerup', onEnd);
      item.removeEventListener('pointercancel', onEnd);
    };

    item.addEventListener('pointermove', onMove);
    item.addEventListener('pointerup', onEnd);
    item.addEventListener('pointercancel', onEnd);
  });
});

dinos.forEach((dino) => {
  dino.addEventListener('click', () => {
    if (dino.classList.contains('found')) {
      return;
    }

    dino.classList.add('found');
    found += 1;
    foundCount.textContent = String(found);

    if (found === dinos.length) {
      winMessage.classList.add('visible');
    }
  });
});
