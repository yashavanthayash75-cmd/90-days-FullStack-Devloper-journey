let text = document.getElementById("textToType").innerText.replace(/"/g, "");
let userInput = document.getElementById("userInput");

let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");

let timer = document.getElementById("timer");
let wpm = document.getElementById("wpm");
let accuracy = document.getElementById("accuracy");
let mistakes = document.getElementById("mistakes");

let time = 60;
let interval;

startBtn.addEventListener("click", function() {

    time = 60;
    userInput.disabled = false;
    userInput.value = "";
    userInput.focus();

    startBtn.disabled = true;

    interval = setInterval(function() {

        time--;
        timer.innerText = "Time: " + time;

        if (time == 0) {
            clearInterval(interval);
            userInput.disabled = true;
            startBtn.disabled = false;
        }

    }, 1000);
});

userInput.addEventListener("input", function() {

    let typed = userInput.value;
    let wrong = 0;

    for (let i = 0; i < typed.length; i++) {

        if (typed[i] != text[i]) {
            wrong++;
        }
    }

    let correct = typed.length - wrong;

    let acc = 100;

    if (typed.length > 0) {
        acc = Math.round((correct / typed.length) * 100);
    }

    let speed = Math.round(correct / 5);

    wpm.innerText = "WPM: " + speed;
    accuracy.innerText = "Accuracy: " + acc + "%";
    mistakes.innerText = "Mistakes: " + wrong;

    if (typed == text) {
        clearInterval(interval);
        userInput.disabled = true;
        startBtn.disabled = false;
    }
});

restartBtn.addEventListener("click", function() {

    clearInterval(interval);

    time = 60;
    userInput.value = "";
    userInput.disabled = true;

    timer.innerText = "Time: 60";
    wpm.innerText = "WPM: 0";
    accuracy.innerText = "Accuracy: 100%";
    mistakes.innerText = "Mistakes: 0";

    startBtn.disabled = false;
});