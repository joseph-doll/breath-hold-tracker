'use strict';

let minute = 0;
let second = 0;
let millisecond = 0;

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
    document.getElementById('minute').innerText = '00';
    document.getElementById('second').innerText = '00';
    document.getElementById('millisecond').innerText = '000';

};

function timer() {
    if ((millisecond += 10) == 1000) {
        millisecond = 0;
        second++;
    };
    if (second == 60) {
        second = 0;
        minute++;
    };
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
    document.getElementById('millisecond').innerText = returnMsData(millisecond);
};

//formats display with leading 0s
function returnData(input) {
    return input > 9 ? input : `0${input}`
};

function returnMsData(input){
    if (input < 100 && input > 9) {
        return `0${input}` 
    };
    if (input < 10) {
        return `00${input}`
    };
    return input;
};
