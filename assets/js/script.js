// Code quiz

// timer and score variables
var timer;
var timeRemaining = 0;
var currentQuestion = -1;
var score = 0;

// start button starts countdown timer - 1000 ms = 1 second
function startTimer() {

    timeRemaining = 75;
    document.getElementById("timeRemaining").innerHTML = timeRemaining;

    timer = setInterval(function() {
        timeRemaining--;
        document.getElementById("timeRemaining").innerHTML = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);

    nextQuestion();
}

// stop the timer to end the game 
function gameOver() {
    clearInterval(timer);

    var quizText = `
    <h1>Game Over</h1>
    <h3>You got ` + score / 20 +  ` questions correct!</h3>
    <h3>Your score is ` + score +  ` out of 100!</h3>
    <input type="text" id="initials" placeholder="initials"> 
    <button onclick="setScore()">Set score</button><button onclick="newGame()">Play Again!</button>`;
    document.getElementById("quizResult").textContent = '';
    document.getElementById("quizMain").innerHTML = quizText;
}

// scores stored in local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreInitials", document.getElementById('initials').value);
    playerScore();
}

function playerScore() {
    var quizText = `
    <h2>The highscore for ` + localStorage.getItem("highscoreInitials") + ` is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 

    <button onclick="clearScore()">Clear score</button><button onclick="newGame()">Play Again!</button>
    `;
    document.getElementById("quizMain").innerHTML = quizText;
}

function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreInitials",  "");

    newGame();
}

// game reset
function newGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeRemaining = 0;
    timer = null;

    document.getElementById("timeRemaining").innerHTML = timeRemaining;

    var quizText = `
    <h1>
        Coding Quiz Challenge
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button onclick="startTimer()">Start Quiz</button>`;

    document.getElementById("quizMain").innerHTML = quizText;
}

// 15 seconds deducted for an incorrect answer
function incorrect() {
    timeRemaining -= 15;
    	document.getElementById("quizResult").textContent = 'Incorrect 🙁';
        var audioElement = document.createElement("audio");
        audioElement.setAttribute("src", "assets/sounds/incorrect-sound.mp3");
        audioElement.play();

    nextQuestion();
}

// 20 points added to the score for a correct answer
function correct() {
    score += 20;
    	document.getElementById("quizResult").textContent = 'Correct! 😁';
        var audioElement = document.createElement("audio");
        audioElement.setAttribute("src", "assets/sounds/correct-sound.mp3");
        audioElement.play();

    nextQuestion();
}

// loops through the questions 
function nextQuestion() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        gameOver();
        return;
    }

    var quizText = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonText = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonText = buttonText.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonText = buttonText.replace("[ANS]", "correct()");
        } else {
            buttonText = buttonText.replace("[ANS]", "incorrect()");
        }
        quizText += buttonText
    }

    document.getElementById("quizMain").innerHTML = quizText;
}