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

var beginQuiz = function() {
  starterEl.classList.add("hide");
  starterEl.classList.remove("show");
  questionholderEl.classList.remove("hide");
  questionholderEl.classList.add("show");
  arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
  setTime()
  setQuestion()
}

var setQuestion = function() {
  resetAnswers()
  displayQuestion(arrayShuffledQuestions[QuestionCatalog])
}

var showQuestion = function(_index) {
  questionEl.innerText = _index.q
  for (var i = 0; i < _index.choices.length; i++) {
    var answerbtn = document.createElement("button")
    answerbtn.innerText = _index.choices[i].choice
    answerbtn.classList.add("button")
    answerbtn.classList.add("ansbtn")
    answerbtn.addEventListener("click", answerVerification)
    answerbtnEl.appendChild(answerbtn)
  }
};

var answerVerification = function(_event) {
  var selectedanswer = _event.target
  if (arrayShuffledQuestions[QuestionCatalog].a === selectedanswer.innerText){
    answerCorrect()
    score = score + 5
  }

  else {
    answerWrong()
    timeleft = timeleft - 2;
  };

  QuestionCatalog++
    if (arrayShuffledQuestions.length > QuestionCatalog + 1) {
      setQuestion()
    }
    else {
      gameover = "true";
      showScore();
    }

}
startbtnEl.addEventListener("click", beginQuiz)