
const CorrectAnswers = {
    q1: "JavaScript",
    q2: "HTML",
    q3: "CSS"
};

const SubmitButton = document.getElementById("submitAnswer");

SubmitButton.addEventListener("click", function () {
    let score = 0;
    let unanswered = false;

    for (let question in CorrectAnswers) {
        const selectedAnswer = document.querySelector(
            `input[name="${question}"]:checked`
        );

        if (selectedAnswer === null) {
            unanswered = true;
        } else if (selectedAnswer.value === CorrectAnswers[question]) {
            score++;
        }
    }

    const result = document.getElementById("result");
    const scoredisplay = document.getElementById("scoredisplay");

    scoredisplay.textContent = `Score: ${score}/3`;

    if (unanswered) {
        result.textContent = "Please answer all three questions!";
    } else {
        result.textContent = score === 3
            ? "Excellent! All answers are correct!"
            : "Quiz completed! Keep practising!";
    }
});
