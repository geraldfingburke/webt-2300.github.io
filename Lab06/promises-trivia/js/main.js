$(document).ready(()=>{
    let results, question, correctAnswer, answers, selectedAnswer;
    let numberOfQuestions = 10;
    let score = 0;
    let index = 0;

    $(document).load(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=18&type=multiple`, (response) => {
        data = JSON.parse(response);
        results = data.results;
        startGame();
    });

    $("#start-game-button").text("Start Game");
    $("#start-game-button").on("click", () => {
        startGame();
    });

    function startGame() {
        nextQuestion();
        $("#question-div").show();
        $("#start-game-button").hide();
    }

    async function nextQuestion() {
        clearAnswers();
        selectedAnswer = "";
        question = results[index].question;
        correctAnswer = results[index].correct_answer;
        answers = results[index].incorrect_answers;
        answers.push(correctAnswer);
        let candidates = [1, 2, 3, 4];
        for(let i = 0; i < answers.length; i++) {
            const random = Math.floor(Math.random() * (candidates.length));
            const candidate = candidates[random];
            $(`#answer-${candidate}`).html(answers[i]);
            $(`#answer-${candidate}`).on("click", () => {
                selectedAnswer = answers[i];
                clearAnswers();
                $(`#answer-${candidate}`).css("background-color", "#b0b0b0");
            });
            candidates.splice(candidates.indexOf(candidate), 1);
        }
        display();
        await setTimer(10).then(() => {
            checkAnswer(selectedAnswer);
        });
    }

    async function checkAnswer(answer) {
        index++;
        if (answer == correctAnswer) {
            score++;
            display();
            $("#question-tag").text("Correct!");
        }
        else {
            $("#question-tag").html(`Sorry! The correct answer was: ${correctAnswer}`);
        }
        await setTimer(2).then();
        if(index < numberOfQuestions) {
            nextQuestion();
        }
        else {
            endGame();
        }
    }

    function display() {
        $("#question-tag").html(question);
        $("#score-tag").text(score);
    }

    function clearAnswers() {
        for(i = 1; i <= 4; i++) {
            $(`#answer-${i}`).css("background-color", "#cfcfcf");
        }
    }

    async function setTimer(seconds) {
        return new Promise((resolve) => {
            setTimeout(resolve, seconds * 1000);
        }); 
    }

    function endGame() {
        $("#question-div").hide();
        $("#question-tag").text(`Congratulations, you got a score of ${score} out of ${numberOfQuestions}! Do you want to try again?`);
        $("#start-game-button").text("Play Again?");
        $("#start-game-button").show();
        score = 0;
        index = 0;
    }
});
