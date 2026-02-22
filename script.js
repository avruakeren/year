const today = new Date();
const year = today.getFullYear();
const startOfYear = new Date(year, 0, 1);
const startOfNextYear = new Date(year + 1, 0, 1);
const MS_PER_DAY = 86400000;

const daysInYear = Math.round((startOfNextYear - startOfYear) / MS_PER_DAY);
const daysPassed = Math.floor((today - startOfYear) / MS_PER_DAY) + 1;
const daysLeft = daysInYear - daysPassed;
const progressPercent = Number(((daysPassed / daysInYear) * 100).toFixed(1));

const card = document.getElementById('progressCard');
const dotGrid = document.getElementById('dotGrid');
const yearLabel = document.getElementById('yearLabel');
const progressText = document.getElementById('progressText');
const switchButton = document.getElementById('viewSwitch');
const percentValue = document.getElementById('percentValue');
const progressFill = document.getElementById('progressFill');
const progressTrack = document.querySelector('.progress-track');

let showPercent = false;

yearLabel.textContent = year;
percentValue.textContent = `${progressPercent}%`;

function renderProgressText() {
  if (showPercent) {
    card.classList.add('is-percent');
    progressText.innerHTML = '';
    switchButton.textContent = '•';
    switchButton.setAttribute('aria-pressed', 'true');
    progressTrack.setAttribute('aria-valuenow', String(progressPercent));

    requestAnimationFrame(() => {
      progressFill.style.width = `${progressPercent}%`;
    });
    return;
  }

  card.classList.remove('is-percent');
  progressText.innerHTML = `<strong>${daysLeft}</strong>days left`;
  switchButton.textContent = '%';
  switchButton.setAttribute('aria-pressed', 'false');
  progressFill.style.width = '0%';
}

switchButton.addEventListener('click', () => {
  showPercent = !showPercent;
  renderProgressText();
});

for (let i = 0; i < daysInYear; i++) {
  const dot = document.createElement('span');
  dot.className = `dot${i < daysPassed ? ' done' : ''}`;
  dotGrid.appendChild(dot);
}

renderProgressText();
document.addEventListener('copy', (event) => {
  event.preventDefault();
});

document.addEventListener('cut', (event) => {
  event.preventDefault();
});

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();

  if ((event.ctrlKey || event.metaKey) && key === 'c') {
    event.preventDefault();
  }
});