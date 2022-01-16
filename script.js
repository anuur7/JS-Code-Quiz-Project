let timeLeft = 0;
let timer;
let score = 0;
let currentQuestion = -1;

let questions = [
  {
    title: "How do you create a function in JavaScript?",
    choices: ["function = myFunction()", "function myFunction()", "function:myFunction()", "(myFunction) = function",],
    answer: "function = myFunction()",
  },
  {
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["<script>", "<js>", "<scripting>", "<javascript>",],
    answer: "<script>",
  },
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers",],
    answer: "alerts",
  },
  {
    title: "Arrays in Javascript can be used to store ____.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above",],
    answer: "all of the above",
  },
  {
    title: "hat does DOM stand for",
    choices: ["Do Overnight Modules", "Document Object Model", "Divas Obviously Model", "Don't Open Me",
    ],
    answer: "Document Object Model",
  },
];

function start() {
  timeLeft = 100;
  document.getElementById("timeLeft").innerHTML = timeLeft;

  timer = setInterval(function () {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);

  next();
}

function endGame() {
  clearInterval(timer);

  let quizContent =
    ` <h2>Game over!</h2>

<h3>You got a ` +
    score +
    ` /100!</h3>

<h3>That means you got ` +
    score / 20 +
    ` questions correct!</h3>

<input type="text" id="name" placeholder="First name"> 

<button onclick="setScore()">Set score!</button>`;

  document.getElementById("quizBody").innerHTML = quizContent;
}

function setScore() {
  localStorage.setItem("highscore", score);
  localStorage.setItem("highscoreName", document.getElementById("name").value);
  getScore();
}

function getScore() {
  let quizContent =
    `
<h2>` +
    localStorage.getItem("highscoreName") +
    `'s highscore is:</h2>
<h1>` +
    localStorage.getItem("highscore") +
    `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

  document.getElementById("quizBody").innerHTML = quizContent;
}

function clearScore() {
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName", "");

  resetGame();
}

function resetGame() {
  clearInterval(timer);
  score = 0;
  currentQuestion = -1;
  timeLeft = 0;
  timer = null;

  document.getElementById("timeLeft").innerHTML = timeLeft;

  document.getElementById("quizBody").innerHTML = quizContent;
}

function incorrect() {
  timeLeft -= 15;
  next();
}

function correct() {
  score += 20;
  next();
}

function next() {
  currentQuestion++;

  if (currentQuestion > questions.length - 1) {
    endGame();
    return;
  }

  let quizContent = "<h2>" + questions[currentQuestion].title + "</h2>";

  for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
    let btn = '<button onclick="[ANS]">[CHOICE]</button>';
    btn = btn.replace("[CHOICE]", questions[currentQuestion].choices[i]);

    if (
      questions[currentQuestion].choices[i] == questions[currentQuestion].answer
    ) {
      btn = btn.replace("[ANS]", "correct()");
    } else {
      btn = btn.replace("[ANS]", "incorrect()");
    }
    quizContent += btn;
  }

  document.getElementById("quizBody").innerHTML = quizContent;
}
