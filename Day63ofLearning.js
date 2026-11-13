let  userInput = document.getElementById("userValue");
let typeInput = document.getElementById("converstionType");
let convertBtn = document.getElementById("convertBtn");

convertBtn.addEventListener("click" , function(){
let userNumber = Number(userInput.value);
let answer;
let unit;


 if(userInput.value === ""){
        document.getElementById("result").textContent= alert("😊 Please Enter a Number 😊");

        return;
    }

    else if (typeInput.value === "celsius"){

         answer = (userNumber*9/5)+32;
         unit = "°F";
    }

    else if (typeInput.value === "kilometers"){

        answer = userNumber * 0.621371;
        unit = "Miles";
    }

    else if (typeInput.value === "kilograms"){

        answer = userNumber * 2.20462;
        unit = "Pounds";
    }
   
   document.getElementById("result").textContent = answer.toFixed(2) + " " + unit;

});

