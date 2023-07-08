// Audio
let bgMusic = new Audio('assets/canon.mp3');
let alarm = new Audio('assets/alarm.mp3');


let startingMinute = 25;
let time = startingMinute * 60;

// Variables
const startBtn = document.querySelector('.controlls__start');
const pauseBtn = document.querySelector('.controlls__pause');
const resetBtn = document.querySelector('.controlls__reset');
const modal = document.getElementById('modal-1');
const afterBreakModal = document.getElementById('modal-2');
const clockTime = document.querySelector('.clock__time');
let actionIndicator = document.querySelector('.menu__work');

let timeInterval;
let takeBreak = false;

window.addEventListener('load', displayTimer);

// Timer Functions
function displayTimer() {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    seconds = seconds < 10? '0' + seconds : seconds;
    clockTime.innerHTML = `${minutes} : ${seconds}`;
}

function startTimer() {
    timeInterval = setInterval(timer, 1000);
}

function timer() {
    time--;   
    displayTimer();
    if(time <= 0) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
        alarm.play();
        alarm.loop = true;
        clearInterval(timeInterval);
        if(takeBreak == false) {
            openModal(1);
        } else {
            openModal(2);
        }
        
    }
}


// Button Enabler and Disabler Functions
function startEnabled() {
    startBtn.removeAttribute('disabled');
    startBtn.classList.remove("disabled");
}

function startDisabled() {
    startBtn.setAttribute('disabled', 'true');
    startBtn.classList.add("disabled");
}

function pauseEnabled() {
    pauseBtn.removeAttribute('disabled');
    pauseBtn.classList.remove("disabled");
}

function pauseDisabled() {
    pauseBtn.setAttribute('disabled', 'true');
    pauseBtn.classList.add("disabled");
}

function resetEnabled() {
    resetBtn.removeAttribute('disabled');
    resetBtn.classList.remove('disabled');
}

function resetDisabled() {
    resetBtn.setAttribute('disabled', 'true');
    resetBtn.classList.add('disabled');
}


// Three Main Buttons (start, pause, and reset Button) click event listener
startBtn.addEventListener('click', ()=>{  
    if(takeBreak == true) {
        startTimer();
    } else {
        startTimer();
        bgMusic.play();
        bgMusic.loop = true;
    }
    startDisabled();
    pauseEnabled();

    setTimeout(() => {
        resetEnabled();
    }, 1000);
});

pauseBtn.addEventListener('click', ()=>{
    bgMusic.pause();
    clearInterval(timeInterval);
    startEnabled();
    pauseDisabled();
});

resetBtn.addEventListener('click', ()=>{
    startingMinute = 25;
    time = startingMinute * 60;
    bgMusic.pause();
    bgMusic.currentTime = 0;
    clearInterval(timeInterval);
    displayTimer();
    resetDisabled();
    startEnabled();
    pauseDisabled();
    actionIndicator.innerHTML = 'WORK';
});


// Modal Functions and Variables
const modalYes = document.getElementById('modal__button--yes');
const modalNo = document.getElementById('modal__button--no');
const continueBtn = document.getElementById('modal-continueBtn');

function closeModal(modalNumber) {
    if(modalNumber == 1) {
        modal.style.display = "none";
    } else if(modalNumber == 2){
        afterBreakModal.style.display = "none";
    }
}

function openModal(modalNumber) {
    if(modalNumber == 1) {
        modal.style.display = "flex";
    } else if(modalNumber == 2){
        afterBreakModal.style.display = "flex";
    }
    
}

modalYes.addEventListener('click', ()=>{
    time = 5 * 60;
    takeBreak = true;
    displayTimer();
    startEnabled();
    resetDisabled();
    pauseDisabled();
    closeModal(1);
    alarm.pause();
    alarm.currentTime = 0;
    actionIndicator.innerHTML = 'BREAK';
});


modalNo.addEventListener('click', ()=>{
    time = 25 * 60;
    takeBreak = false;
    displayTimer();
    startEnabled();
    resetDisabled();
    pauseDisabled();
    closeModal(1);
    alarm.pause();
    alarm.currentTime = 0;
    actionIndicator.innerHTML = 'WORK';
});

continueBtn.addEventListener('click',()=>{
    closeModal(2);
    time = 25 * 60;
    takeBreak = false;
    displayTimer();
    startEnabled();
    resetDisabled();
    pauseDisabled();
    alarm.pause();
    alarm.currentTime = 0;
    actionIndicator.innerHTML = 'WORK';
});






