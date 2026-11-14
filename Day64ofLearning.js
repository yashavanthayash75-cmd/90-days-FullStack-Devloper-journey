
let section = document.getElementById("palette");

let code1 = document.getElementById("hexCode1");
let code2 = document.getElementById("hexCode2");
let code3 = document.getElementById("hexCode3");
let code4 = document.getElementById("hexCode4");
let code5 = document.getElementById("hexCode5");

let generateBtn = document.getElementById("generateBtn");

let colorBoxes = document.querySelectorAll(".color-box");

let codes = [code1, code2, code3, code4, code5];

let colors = ["#06ffff", "#aaff00", "#e22b4c", "#10436f", "#b744bf"];

generateBtn.addEventListener("click", function() {

    for (let i = 0; i < 5; i++) {

        let randomNumber = Math.floor(Math.random() * colors.length);

        let changes = colors[randomNumber];

        colorBoxes[i].style.backgroundColor = changes;

        codes[i].textContent = changes;

    }

});
