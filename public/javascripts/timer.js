'use strict';

let minute = 0;
let second = 0;
let millisecond = 0;
let totalSeconds = 0;
let time;
let squares = 299;

document.getElementById('start').onclick = () => start();
document.getElementById('stop').onclick = () => stop();
document.getElementById('reset').onclick = () => reset();

let minuteNum = document.getElementById('minute');
let secondNum = document.getElementById('second');
let minuteText = document.getElementById('minText');
let secondText = document.getElementById('secText');

function start() {
    stop();
    minuteNum.style.color = 'black';
    minuteText.style.color = 'black';
    secondNum.style.color = 'black';
    secondText.style.color = 'black';
    time = setInterval(() => {
        timer();
    }, 10);
}

function stop() {
    minuteNum.style.color = 'white';
    minuteText.style.color = 'white';
    secondNum.style.color = 'white';
    secondText.style.color = 'white';
    clearInterval(time);
}

function reset() {
    // minute = 0;
    // second = 0;
    // millisecond = 0;
    // totalSeconds = 0;
    // document.getElementById('minute').innerText = '0';
    // document.getElementById('second').innerText = '0';
    location.reload();
}

function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

let numList = [];

for (let i = 0; i < squares; i++) {
    numList.push(i);
}

let numOfDivs = squares;

function timer() {
    if ((millisecond += 10) == 1000) {
        millisecond = 0;
        second++;
        totalSeconds++;

        let randomNumber = getRandomNumber(numOfDivs); //gets random number
        numOfDivs--; //decrements number of squares' divs so that getRandomNumber is constrained to current num of squares divs remaining
        let randomDiv = numList.splice(randomNumber, 1)[0]; //remove a random number from generated range of numbers
        const coloredSecond = document.getElementById(`${randomDiv}`); //set div equal to index
        setColor(coloredSecond); //set color
    }
    if (second == 60) {
        second = 0;
        minute++;
    }
    document.getElementById('minute').innerText = minute;
    document.getElementById('second').innerText = second;
    document.getElementById('duration').value = totalSeconds;
}

// //formats display with leading 0s
// function returnData(input) {
//     return input > 9 ? input : `0${input}`
// };

const container = document.getElementById('container');
const neonColors = ['#0CF2DB', '#1B1259', '#4E0FA6', '#C007D9'];
const brightColors = ['#F50DFF', '#BE0DFF', '#8100FF', '#500CFF', '#2013FF'];

//draws div board
for (let i = 0; i < squares; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.id = i;
    dotContainer.appendChild(square);
}

function setColor(element) {
    const color = getRandomColor();
    element.style.background = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(element) {
    element.style.background = '#000';
    element.style.boxShadow = '0 0 2px #000';
}

function getRandomColor() {
    return brightColors[Math.floor(Math.random() * brightColors.length)];
}
