var startTimerButton = document.querySelector('.startTimer');
var pauseTimerButton = document.querySelector('.pauseTimer');
var timerDisplay = document.querySelector('.timer');
var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = 0;

function startTimer() {
  if (!running) {
    startTime = new Date().getTime();     // returns time elapsed since 1970
    tInterval = setInterval(getShowTime, 1);
    paused = 0;
    running = 1; // anounces that it is running, not paused
    timerDisplay.style.background = "#CDD6DD";
    timerDisplay.style.cursor = "auto";
    timerDisplay.style.color = "#4E3D42";
    startTimerButton.classList.add('lighter');
    pauseTimerButton.classList.remove('lighter');
    startTimerButton.style.cursor = "auto";
    pauseTimerButton.style.cursor = "pointer";
  }
}

function pauseTimer() {
  if (!difference) {
    // if timer never started, don't allow pause button to do anything
  } else if (!paused) {
    clearInterval(tInterval);
    savedTime = difference;
    paused = 1;
    running = 0;
    timerDisplay.style.background = "#CDD6DD";
    timerDisplay.style.cursor = "pointer";
    startTimerButton.classList.remove('lighter');
    pauseTimerButton.classList.add('lighter');
    startTimerButton.style.cursor = "pointer";
    pauseTimerButton.style.cursor = "auto";
  } else {
    startTimer();
  }
}

function resetTimer() {
  clearInterval(tInterval);
  savedTime = 0;
  difference = 0;
  paused = 0;
  running = 0;
  timerDisplay.innerHTML = 'The future starts today not tomorrow';
  timerDisplay.style.background = "#4E3D42";
  timerDisplay.style.color = "#CDD6DD";
  timerDisplay.style.cursor = "pointer";
  startTimerButton.classList.remove('lighter');
  pauseTimerButton.classList.remove('lighter');
  startTimerButton.style.cursor = "pointer";
  pauseTimerButton.style.cursor = "auto";
}

function getShowTime() {
  updatedTime = new Date().getTime();
  if (savedTime) {
    difference = (updatedTime - startTime) + savedTime;
  } else {
    difference = updatedTime - startTime;
  }
  // var differenceString = String(difference)
  // console.log(differenceString)
  // console.log(differenceString.charAt(differenceString.length-1))
  // timerDisplay.innerHTML = differenceString.charAt(differenceString.length-9) + differenceString.charAt(differenceString.length-8) + ':' + differenceString.charAt(differenceString.length-7) + differenceString.charAt(differenceString.length-6) + ':' + differenceString.charAt(differenceString.length-5) + differenceString.charAt(differenceString.length-4) + ':' + differenceString.charAt(differenceString.length-3) + differenceString.charAt(differenceString.length-2);



  var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);
  var milliseconds = Math.floor((difference % (1000 * 60)) / 100);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
  timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
}