// Code quiz

//score and timer variables
var score = 0;
var currentQuestion = -1;
var timeRemaining = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

    timeRemaining = 75;
    document.getElementById("timeRemaining").innerHTML = timeRemaining;

    timer = setInterval(function() {
        timeRemaining--;
        document.getElementById("timeRemaining").innerHTML = timeRemaining;
        //proceed to end the game function when timer is below 0 at any time
        if (timeRemaining <= 0) {
            clearInterval(timer);
            gameOver(); 
        }
    }, 1000);

    next();
}

//stop the timer to end the game 
function gameOver() {
    clearInterval(timer);

    var quizText = `
    <h2>Game Over</h2>
    <h3>You got ` + score / 20 +  ` questions correct!</h3>
    <h3>Your score is ` + score +  ` out of 100!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score</button><button onclick="newGame()">Play Again!</button>`;
    document.getElementById("quizResult").textContent = '';
    document.getElementById("quizMain").innerHTML = quizText;
}

//store the scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById('name').value);
    playerScore();
}

function playerScore() {
    var quizText = `
    <h2>The highscore for ` + localStorage.getItem("highscoreName") + ` is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 

    <button onclick="clearScore()">Clear score</button><button onclick="newGame()">Play Again!</button>
    `;
    document.getElementById("quizMain").innerHTML = quizText;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    newGame();
}

//reset the game 
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
    <button onclick="start()">Start Quiz</button>`;

    document.getElementById("quizMain").innerHTML = quizText;
}

//deduct 15 seconds from the timer if user chooses an incorrect answer
function incorrect() {
    timeRemaining -= 15;
    	document.getElementById("quizResult").textContent = 'Incorrect 🙁';
        var audioElement = document.createElement("audio");
        audioElement.setAttribute("src", "assets/sounds/incorrect-sound.mp3");
        audioElement.play();

    next();
}

//add 20 to the score when user chooses the correct answer
function correct() {
    score += 20;
    	document.getElementById("quizResult").textContent = 'Correct! 😁';
        var audioElement = document.createElement("audio");
        audioElement.setAttribute("src", "assets/sounds/correct-sound.mp3");
        audioElement.play();

    next();
}

//loops through the questions 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        gameOver();
        return;
    }

    var quizText = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizText += buttonCode
    }


    document.getElementById("quizMain").innerHTML = quizText;
}