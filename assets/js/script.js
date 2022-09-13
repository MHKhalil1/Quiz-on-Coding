// Variables
var highscoreEl = document.getElementById("highscore")
var timeEl = document.querySelector("#time")
var starterEl = document.getElementById("starter")
var startbtnEl = document.querySelector("#start")
var questionholderEl = document.getElementById("questionholder")
var questionEl = document.getElementById("question")
var answerbtnEl = document.getElementById("answerbtn")
var endholderEl = document.getElementById("endholder")
var scoreEl = document.getElementById("score")
var initialssheetEl = document.getElementById("initialssheet")
var highscore1El = document.getElementById("highscore1")
var highscoresEl = document.getElementById("highscores")
var backbtnEl = document.querySelector("#back")
var clearscoresbtnEl = document.querySelector("#clearscores")
var timeleft;
var score = 0
var Highscore = [];
var QuestionCatalog = 0
var arrayShuffledQuestions
// Questions being asked along with choices and answers
var questions = [
    { question: "What does HTML stand for?",
      answer: "3. HyperText Markup Language",
      choices: [{choice: "1. HyperText Markup Link"}, {choice: "2. Hypertext Markup Lead"}, {choice: "3. HyperText Markup Language"}, {choice: "4. None of the Above"}]     
    },
    { question: "What does CSS stand for?",
      answer: "1. Cascading Style Sheets",
      choices: [{choice: "1. Cascading Style Sheets"}, {choice: "2. Color and Style Sheets"}, {choice: "3. Coloured Special Sheets"}, {choice: "4. None of the Above"}]     
    },
    { question: "What element changes the background color?",
      answer: "2. background-color",
      choices: [{choice: "1. color"}, {choice: "2. background-color"}, {choice: "3. Both A and B"}, {choice: "4. None of the above"}]     
    },
    { question: "Which are CSS position property values?",
      answer: "4. All of the Above",
      choices: [{choice: "1. static"}, {choice: "2. relative"}, {choice: "3. fixed"}, {choice: "4. All of the Above"}]     
    },
    { question: "Which keywords define a variable in Javascript?",
      answer: "4. Both A and B",
      choices: [{choice: "1. var"}, {choice: "2. let "}, {choice: "3. for"}, {choice: "4. Both A and B"}]     
    },
];
// This function allows the quiz screen to be displayed and to be hidden
var beginQuiz = function() {
  starterEl.classList.add("hide");
  starterEl.classList.remove("show");
  questionholderEl.classList.add("show");
  questionholderEl.classList.remove("hide");
  arrayShuffledQuestions = questions.sort(() => Math.random() - 0.2)
  putQuestion()
  placeTime()
}

// This function both reveals the questions as well as contains the answer button.
var revealQuestion = function(index) {
  questionEl.innerText = index.question
  for (var i = 0; i < index.choices.length; i++) {
    var answerbtn2 = document.createElement("button")
    answerbtn2.innerText = index.choices[i].choice
    answerbtn2.classList.add("button")
    answerbtn2.classList.add("answerbtn")
    answerbtn2.addEventListener("click", answerConfirm)
    answerbtnEl.appendChild(answerbtn2)
  }
};

// This function will display the questions in a randomized order by pulling it from the catalog
var putQuestion = function() {
ereseAnswer()
revealQuestion(arrayShuffledQuestions[QuestionCatalog])
}

// This function allows the webpage to understand when the quiz is over or not
var placeTime = function () {
  timeleft = 20;

var timecheck = setInterval(function() {
  timeEl.innerText = timeleft;
  timeleft--

  if (quizover) {
    clearInterval(timecheck)
  }

  if (timeleft < 0 ) {
    showScore()
    timeEl.innerText = 0
    clearInterval(timecheck)
  }

}, 1000)
}

var ereseAnswer = function() {
  while (answerbtnEl.firstChild) {
    answerbtnEl.removeChild(answerbtnEl.firstChild)
  };
};
// Allows the questions to be answered
var correctAnswer = function() {

}
// Allows the questions to be answered
var incorrectAnswer = function() {

}

// This function should confirm whether the answer is correct or not.
var answerConfirm = function(event) {
  var pickedanswer = event.target
  if (arrayShuffledQuestions[QuestionCatalog].a === pickedanswer.innerText){
    correctAnswer();
    score = score + 5
  }
  else {
    incorrectAnswer()
    timeleft = timeleft - 2;
  };

// This is a simple input to allow the quiz to go on if there is remaining questions.
  QuestionCatalog++
  if (arrayShuffledQuestions.length > QuestionCatalog + 1) {
    putQuestion()
  }
  else {
    gameover = "true";
    showScore();
  }
}
// This function will return the user to the beginning of the webpage
var displayBeginningPage = function () {
  highscore1El.classList.add("hide")
  highscore1El.classList.remove("show")
  starterEl.classList.remove("show")
  starterEl.classList.add("show")
  scoreEl.classList.removeChild(scoreEl.lastChild)
  QuestionCatalog = 0
  gameover = ""
  timeEl.textContent = 0
  score = 0
}
// This should reveal your score when the quiz is completed
var showScore = function() {
  questionholderEl.classList.add("hide");
  endholderEl.classList.remove("hide");
  endholderEl.classList.add("show");

  var scorePresented = document.createElement("p");
  scorePresented.innerText = ("You Scored " + score);
  scoreEl.appendChild(scorePresented);
}

var makeScores = function(event) {
  event.preventDefault()
  var initials = document.querySelector("#initials").value;
  if (!initials) {
    alert("Initials");
    return;
  }

  initialssheetEl.reset();

  var HS = {
    initials: initials,
    score: score
  }

  Highscore.push(HS);
  Highscore.sort((a, b) => {return b.score-a.score});

  while(highscoresEl.firstChild) {
    highscoresEl.removeChild(highscoresEl.firstChild)
  }
  for (var i = 0; i < Highscore.length; i++) {
    var hsEl = document.createElement("li");
    hsEl.className = "hiscore";
    hsEl.innerHTML = Highscore[i].initials + " - " + Highscore[i].score;
    highscoresEl.appendChild(hsEl);
  }

  keepHS();
  showScore();

}

var keepHS = function() {
  localStorage.setItem("Highscore", JSON.stringify(Highscore))
}

var renderHS = function () {
  var renderedHS = localStorage.getItem("Highscore")
  if (!renderedHS) {
    return false;
  }

  renderedHS = JSON.parse(renderedHS);
  renderedHS.sort((a, b) => {return b.score-a.score})

  for (var i = 0; i < renderedHS.length; i++) {
    var hsEl = document.createElement("li");
    hsEl.className = "hiscore";
    hsEl.innerText = renderedHS[i].initials + " - " + renderedHS;
    highscoresEl.appendChild(hsEl);

    Highscore.push(renderedHS[i]);

  }
}

var showHS = function() {
  highscore1El.classList.remove("hide");
  highscore1El.classList.add("show");
  gameover = "true"

  if (endholderEl.className = "show") {
    endholderEl.classList.remove("show");
    endholderEl.classList.add("hide");
  }
  if (starterEl.className = "show") {
    starterEl.classList.remove("show");
    starterEl.classList.add("hide");
  }
  if (questionholderEl.className = "show") {
    questionholderEl.classList.remove("show");
    questionholderEl.classList.add("hide");
  }
}

var eraseScore = function () {
  Highscore = [];

  while (highscoresEl.firstChild) {
    highscoresEl.removeChild(highscoresEl.firstChild);
  }

  localStorage.clear(Highscore);
}
renderHS()
// This is the buttons allowing a function of whats asked when clicked
startbtnEl.addEventListener("click", beginQuiz)
highscoresEl.addEventListener("click", showHS)
backbtnEl.addEventListener("click", displayBeginningPage)
clearscoresbtnEl.addEventListener("click", eraseScore)
initialssheetEl.addEventListener("submit", makeScores)