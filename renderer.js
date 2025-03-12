/* Este código é responsável por gerenciar a lógica do timer Pomodoro no processo de renderização (front-end) de um aplicativo Electron. 
Ele controla o início, a parada e o reinício do timer, além de atualizar a interface do usuário. */

let interval;
let isRunning = false;
let workTime = 0.1 * 60; 
let currentTime = workTime;

const alarm = new Audio('./assets/alarm.mp3');
const clickButton = new Audio('./assets/click-button.mp3');

// Atualiza o display
function updateDisplay() {
  const minutes = Math.floor(currentTime / 60).toString().padStart(2, '0');
  const seconds = (currentTime % 60).toString().padStart(2, '0');
  document.getElementById('time').textContent = `${minutes}:${seconds}`;
}
// Função para parar e resetar um som
function stopSound(alarm) {
  if (!alarm.paused) {
    alarm.pause();
    alarm.currentTime = 0;
    alarm.load(); // Garante que o som seja recarregado e pare completamente
  }
}


// Inicia o timer
function startTimer() {
  if (!isRunning && currentTime > 0) {
    isRunning = true;
    clickButton.play().catch(() => {
      console.error('Erro ao tocar o som', erro);
    });
    interval = setInterval(() => {
      currentTime--;
      updateDisplay();
      if (currentTime <= 0) {
        clearInterval(interval);
        isRunning = false;
        // Toca o som
        alarm.play().catch(() => {
          console.error('Erro ao tocar o som', erro);
        });
        currentTime = workTime;
      }
    }, 1000);
  }
}

// Reinicia o timer
function resetTimer() {
  clearInterval(interval);
  currentTime = workTime;
  isRunning = false;
  updateDisplay();
  stopSound(alarm);

  soundReset.play().catch((erro) => {
    console.error('Erro ao reproduzir o som de reset:', erro);
  });

  soundReset.play().catch((erro) => {
    console.error('Erro ao reproduzir o som de reset:', erro);
  });
}

// Eventos de clique para iniciar e resetar
document.getElementById('startStop').addEventListener('click', () => {
  window.electronAPI.startTimer();
});

document.getElementById('reset').addEventListener('click', () => {
  window.electronAPI.resetTimer();
});

// Eventos recebidos do processo principal
window.electronAPI.onStartTimer(() => {
  startTimer();
});

window.electronAPI.onResetTimer(() => {
  resetTimer();
});

// Inicializa o display
updateDisplay();