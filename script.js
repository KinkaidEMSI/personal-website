// Tab switching logic for the personal website

document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));

      // Add active class to clicked tab and corresponding content
      this.classList.add('active');
      const tabName = this.getAttribute('data-tab');
      document.getElementById(tabName).classList.add('active');
    });
  });

  // Remove confetti screen if it exists
  function removeConfettiScreen() {
    const confettiScreen = document.getElementById('confetti-screen');
    if (confettiScreen) confettiScreen.remove();
    document.querySelector('main').style.display = '';
    document.querySelector('nav ul').style.display = '';
  }

  function dropSquares() {
    removeConfettiScreen();
    let squareContainer = document.createElement('div');
    squareContainer.id = 'confetti-screen';
    squareContainer.style.position = 'fixed';
    squareContainer.style.top = 0;
    squareContainer.style.left = 0;
    squareContainer.style.width = '100vw';
    squareContainer.style.height = '100vh';
    squareContainer.style.pointerEvents = 'none';
    squareContainer.style.zIndex = 10000;
    document.body.appendChild(squareContainer);
    // Add flashing CONFETTI!! text
    let confettiText = document.createElement('div');
    confettiText.className = 'confetti-flash-text';
    confettiText.textContent = 'CONFETTI!!';
    squareContainer.appendChild(confettiText);
    for (let i = 0; i < 240; i++) { // Increased from 120 to 240 for even more confetti
      setTimeout(() => {
        const square = document.createElement('div');
        square.className = 'falling-square';
        square.style.left = Math.random() * 100 + 'vw';
        square.style.backgroundColor = `hsl(${Math.random()*360}, 60%, 70%)`;
        square.style.animationDuration = (3 + Math.random() * 3) + 's';
        squareContainer.appendChild(square);
        setTimeout(() => square.remove(), 7000);
      }, i * 15); // Spawn even faster
    }
    setTimeout(removeConfettiScreen, 7500); // Confetti stays longer
  }

  const siteTitleTab = document.querySelector('.site-title-tab');
  if (siteTitleTab) {
    siteTitleTab.addEventListener('click', function (e) {
      // Only trigger confetti, do not switch to the secret page
      dropSquares();
    });
  }
});
