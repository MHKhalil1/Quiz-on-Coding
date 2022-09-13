// Variables
var highscoreEl = document.getElementById("highscore")
var timeEl = document.querySelector("#timer")
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

}, 800)
}

var ereseAnswer = function() {
  while (answerbtnEl.firstChild) {
    answerbtnEl.removeChild(answerbtnEl.firstChild)
  };
};
// This function should confirm whether the answer is correct or not.
var answerConfirm = function(event) {
  var pickedanswer = event.target
  if (arrayShuffledQuestions[QuestionCatalog].a === pickedanswer.innerText){
    answerCorrect()
    score = score + 5
  }

  else {
    answerIncorrect()
    timeleft = timeleft - 2;
  };
  
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

  QuestionCatalog++
  if (arrayShuffledQuestions.length > QuestionCatalog + 1) {
    putQuestion()
  }
  else {
    gameover = "true";
    showScore();
  }
}