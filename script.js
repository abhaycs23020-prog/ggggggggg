// Questions organized by category and difficulty
const questions = {
  gk: {
    easy: [
      { question: "Largest planet?", answers: [
        {text:"Earth", correct:false},
        {text:"Jupiter", correct:true},
        {text:"Mars", correct:false},
        {text:"Saturn", correct:false}
      ]},
      { question: "National bird of India?", answers: [
        {text:"Peacock", correct:true},
        {text:"Sparrow", correct:false},
        {text:"Parrot", correct:false},
        {text:"Eagle", correct:false}
      ]}
    ],
    medium: [
      { question: "First president of India?", answers: [
        {text:"Rajendra Prasad", correct:true},
        {text:"Nehru", correct:false},
        {text:"Sardar Patel", correct:false},
        {text:"APJ Abdul Kalam", correct:false}
      ]}
    ],
    hard: [
      { question: "Year of French Revolution?", answers: [
        {text:"1789", correct:true},
        {text:"1804", correct:false},
        {text:"1776", correct:false},
        {text:"1812", correct:false}
      ]}
    ]
  },
  science: {
    easy: [
      { question: "H2O is the chemical name of?", answers: [
        {text:"Oxygen", correct:false},
        {text:"Water", correct:true},
        {text:"Hydrogen", correct:false},
        {text:"Carbon Dioxide", correct:false}
      ]}
    ],
    medium: [
      { question: "Speed of light?", answers: [
        {text:"3x10^8 m/s", correct:true},
        {text:"1.5x10^8 m/s", correct:false},
        {text:"3x10^6 m/s", correct:false},
        {text:"1x10^9 m/s", correct:false}
      ]}
    ],
    hard: [
      { question: "Avogadro’s number?", answers: [
        {text:"6.022x10^23", correct:true},
        {text:"3.14", correct:false},
        {text:"9.8", correct:false},
        {text:"1.67x10^-27", correct:false}
      ]}
    ]
  },
  tech: {
    easy: [
      { question: "Founder of Microsoft?", answers: [
        {text:"Steve Jobs", correct:false},
        {text:"Bill Gates", correct:true},
        {text:"Elon Musk", correct:false},
        {text:"Mark Zuckerberg", correct:false}
      ]}
    ],
    medium: [
      { question: "HTML stands for?", answers: [
        {text:"Hyper Text Markup Language", correct:true},
        {text:"High Tech Machine Language", correct:false},
        {text:"Hyperlink and Text Mark Language", correct:false},
        {text:"None of these", correct:false}
      ]}
    ],
    hard: [
      { question: "Year Java was released?", answers: [
        {text:"1995", correct:true},
        {text:"1990", correct:false},
        {text:"2000", correct:false},
        {text:"1985", correct:false}
      ]}
    ]
  }
};

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizArea = document.getElementById("quiz-area");

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const timerElement = document.getElementById("timer");

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 45;

// Start quiz
startBtn.addEventListener("click", () => {
  const category = document.getElementById("category").value;
  const difficulty = document.getElementById("difficulty").value;

  currentQuestions = questions[category][difficulty];
  currentQuestionIndex = 0;
  score = 0;

  startScreen.style.display = "none";
  quizArea.style.display = "block";

  startQuiz();
});

function startQuiz() {
  showQuestion();
  startTimer();
}

function showQuestion() {
  resetState();
  let currentQuestion = currentQuestions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearInterval(timer);
  timeLeft = 45;
  timerElement.innerHTML = `Time: ${timeLeft}`;
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  nextButton.style.display = "none";
}

function selectAnswer(answer) {
  if (answer.correct) {
    score += 10; // Base score
    if (timeLeft > 20) {
      score += 5; // Bonus for answering quickly
    }
  }
  nextButton.style.display = "block";
  clearInterval(timer);
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    showQuestion();
    startTimer();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerHTML = "Quiz Finished!";
  scoreContainer.innerHTML = `Your Score: ${score}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  nextButton.onclick = () => {
    location.reload();
  };
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerHTML = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextButton.style.display = "block";
    }
  }, 1000);
}
