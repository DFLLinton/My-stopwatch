//Define some of the key variables
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
ClearLap();

function startTimer() {
  if (!running) {
    startTime = new Date().getTime();     // returns time elapsed since 1970
    tInterval = setInterval(getShowTime, 10);//sets how often it runs
    paused = 0;
    running = 1; // records whether it is running
    timerDisplay.style.background = "#CDD6DD";
    timerDisplay.style.cursor = "auto";
    timerDisplay.style.color = "#4E3D42";
    startTimerButton.classList.add('active');
    pauseTimerButton.classList.remove('active');
    startTimerButton.style.cursor = "auto";
    pauseTimerButton.style.cursor = "pointer";
  }
}

function pauseTimer() {
  if (!difference) {
    // if timer never started, don't allow pause button to do anything
  } else if (!paused) {
    clearInterval(tInterval); //stops it from running
    savedTime = difference;
    paused = 1; //sets to paused
    running = 0;
    timerDisplay.style.background = "#CDD6DD";
    timerDisplay.style.cursor = "pointer";
    startTimerButton.classList.remove('active');
    pauseTimerButton.classList.add('active');
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
  timerDisplay.innerHTML = 'The future starts today not tomorrow...';
  timerDisplay.style.background = "#4E3D42";
  timerDisplay.style.color = "#CDD6DD";
  timerDisplay.style.cursor = "pointer";
  startTimerButton.classList.remove('active');
  pauseTimerButton.classList.remove('active');
  startTimerButton.style.cursor = "pointer";
  pauseTimerButton.style.cursor = "auto";
}

function getShowTime() {
  updatedTime = new Date().getTime();
  if (savedTime) {
        //outputs the difference between when timer started and the time it is now + any previous amount timed
    difference = (updatedTime - startTime) + savedTime;
  } else {
    //outputs the difference between when timer started and the time it is now
    difference = updatedTime - startTime; 
  }

//extracting centiseconds for the difference output
  var differenceString = String(difference);
  var centiseconds = differenceString.charAt(differenceString.length-3) + differenceString.charAt(differenceString.length-2);

  //formatting sexagesimal measures
  var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);

//making format consistent with two zeroes
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds + ':' + centiseconds;
}

//saves current time to local storage and renders DOM
function LapTimer(){
    var i = localStorage.length + 1;
  console.log('i is' + i);
  if (running ==1){
  localStorage.setItem(i, timerDisplay.innerText);
  RenderLaps();
  }else{};
}

//Function which checks local storage for laps and updates DOm
function RenderLaps(){
  var LapContainer = document.querySelector('.lapcontainer');
     LapContainer.innerHTML = `Laps:<br>    ${fetchinglaps(1)}
${fetchinglaps(2)}
${fetchinglaps(3)}
${fetchinglaps(4)}
${fetchinglaps(5)}
${fetchinglaps(6)}
${fetchinglaps(7)}
${fetchinglaps(8)}
${fetchinglaps(9)}
${fetchinglaps(11)}
${fetchinglaps(12)}
${fetchinglaps(13)}`;
}
RenderLaps();

//Function which formats local storage data so that it is presentable to user
function fetchinglaps(x){
 if (localStorage.getItem(x) !== null){
   return `<br>${x}.   ` + localStorage.getItem(x);
 }else{
   return '';
 }
}

// function which clears local storage and therefore lap counter
function ClearLap(){
  localStorage.clear();
  RenderLaps();
}