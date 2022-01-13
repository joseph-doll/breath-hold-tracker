'use strict';

let minute = 0;
let second = 0;
let millisecond = 0;
let totalSeconds = 0;
let time;

document.getElementById('start').onclick = () => start();
document.getElementById('stop').onclick = () => stop();
document.getElementById('reset').onclick = () => reset();

function start() {
    stop();
    time = setInterval(() => { timer(); }, 10);
};

function stop() {
    clearInterval(time);
};

function reset() {
    minute = 0;
    second = 0;
    millisecond = 0;
    totalSeconds = 0;
    document.getElementById('minute').innerText = '0';
    document.getElementById('second').innerText = '00';

};

function timer() {
    if ((millisecond += 10) == 1000) {
        millisecond = 0;
        second++;
        totalSeconds++;
    };
    if (second == 60) {
        second = 0;
        minute++;
    };
    document.getElementById('minute').innerText = minute;
    document.getElementById('second').innerText = returnData(second);
    document.getElementById('duration').value = totalSeconds;
};

//formats display with leading 0s
function returnData(input) {
    return input > 9 ? input : `0${input}`
};