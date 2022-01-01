'use strict';

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let time;

document.getElementById('start').onclick = () => start();
document.getElementById('stop').onclick = () => stop();
document.getElementById('reset').onclick = () => reset();
// document.form_main.stop.onclick = () => stop();

function start() {
    stop();
    time = setInterval(() => { timer(); }, 10);
};

function stop() {
    clearInterval(time);
};

function reset() {
    hour = 0;
    minute = 0;
    second = 0;
    millisecond = 0;
    // document.getElementById('hour').innerText = '00';
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
    if (minute == 60) {
        minute = 0;
        hour++;
    };
    // document.getElementById('hour').innerText = returnData(hour);
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
    document.getElementById('millisecond').innerText = returnData(millisecond);
};

//makes the display more dynamic by adding a 0 before any digit less than 10
function returnData(input) {
    return input > 9 ? input : `0${input}`
};

function returnMsData(input){
    if(input < 100 && input > 9){
        return `0${input}` 
    };
    if(input < 10) {
        return `00${input}`
    };
    return input;
};
