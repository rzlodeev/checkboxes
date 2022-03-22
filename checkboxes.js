placeChboxes();

function placeChboxes() {
    let chboxAmount = 100; // Загальна кількість чекбоксів
    let chboxes = document.querySelector('.checkboxes'); // контейнер чекбоксів
    for (let i = 0; i < chboxAmount; i++) {
        chboxes.insertAdjacentHTML('afterbegin', `<input type ="checkbox" class = "checkbox">`);
    }
}

let maxOffsetY = 150; // Зміщення останнього чекбоксу у списку (максимальне)
let chboxCurrent = 0;
let chboxsAll = document.querySelectorAll('.checkbox', '.checkboxUsed'); // масив з усіма чекбоксами
let chboxWidth = 20; // Ширина одного чекбоксу в px
let body = document.querySelector('body');
let title = document.querySelector('.title');

refreshChboxes();
calculatePositionX();

function refreshChboxes() {
    for (let i = 0; i < chboxsAll.length; i++) {
        chboxsAll[i].disabled = true;
        chboxsAll[chboxCurrent].disabled = false;
    }
    addEventListenerChboxsAll();
}

function calculatePositionX() {
    let chboxOffsetX = (chboxsAll.length / 2 * chboxWidth) - chboxCurrent * 20 - chboxWidth / 2;
   for (let i = 0; i < chboxsAll.length; i++) {
       chboxsAll[i].style.left = chboxOffsetX + 'px';
   }
};

function calculatePositionY() {
   let chboxOffsetY = (maxOffsetY * (chboxCurrent / chboxsAll.length)) * (Math.random() - 0.5);
       chboxsAll[chboxCurrent].style.bottom = chboxOffsetY + 'px';
}

function addEventListenerChboxsAll() {
        chboxsAll[chboxCurrent].addEventListener('click', () => {
            if (chboxCurrent == chboxsAll.length - 1) {
                gameOver();
            } else {
                if (chboxCurrent != 0) {
                    chboxsAll[chboxCurrent - 1].className = 'checkboxUsed';
                }
                if (chboxCurrent == 0) {
                    setTimer();
                    title.textContent = '';
                }
                chboxCurrent++;
                calculatePositionX();
                calculatePositionY();
                refreshChboxes();
            }
        }, {once: true}
)}

let stopwatch = document.querySelector('.stopwatch');
stopwatch.innerHTML = '00:00:00';
let t;
let ms = 0;
let s = 0;
let m = 0;

function tick () {
    ms++;
    if (ms == 100) {
        ms = 0;
        s++;
        if (s == 60) {
            s = 0;
            m++;
        }
    }
}

function add () {
    tick();
    stopwatch.textContent = (m > 9 ? m : '0' + m)
                    + ':' + (s > 9 ? s : '0' + s)
                    + ':' + (ms > 9 ? ms : '0' + ms)
}

function setTimer() {
    t = setInterval(add, 10);
}

function gameOver() {
    clearInterval(t);
    chboxsAll[chboxCurrent].className = 'checkboxUsed';
    chboxsAll[chboxCurrent].disabled = true;
    title.textContent = 'Great!';
}