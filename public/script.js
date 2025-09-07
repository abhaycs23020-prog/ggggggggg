// Questions organized by category and level
const questions = {
  gk: {
    easy: [
      { question: "Largest planet?", answers: [{text:"Earth",correct:false},{text:"Jupiter",correct:true},{text:"Mars",correct:false},{text:"Saturn",correct:false}] },
      { question: "Father of Nation?", answers: [{text:"Nehru",correct:false},{text:"Gandhi",correct:true},{text:"Patel",correct:false},{text:"Ambedkar",correct:false}] }
    ],
    medium: [
      { question: "National animal of India?", answers: [{text:"Lion",correct:false},{text:"Tiger",correct:true},{text:"Elephant",correct:false},{text:"Leopard",correct:false}] },
      { question: "Pink City?", answers: [{text:"Jaipur",correct:true},{text:"Jodhpur",correct:false},{text:"Udaipur",correct:false},{text:"Delhi",correct:false}] }
    ],
    hard: [
      { question: "National Anthem author?", answers: [{text:"Tagore",correct:true},{text:"Chatterjee",correct:false},{text:"Naidu",correct:false},{text:"Gandhi",correct:false}] }
    ]
  },
  science: {
    easy: [
      { question:"Chemical symbol for water?", answers:[{text:"H2O",correct:true},{text:"O2",correct:false},{text:"CO2",correct:false},{text:"HO2",correct:false}] },
      { question:"Gas plants absorb?", answers:[{text:"Oxygen",correct:false},{text:"Carbon Dioxide",correct:true},{text:"Nitrogen",correct:false},{text:"Hydrogen",correct:false}] }
    ],
    medium: [
      { question:"Bones in adult human?", answers:[{text:"206",correct:true},{text:"210",correct:false},{text:"198",correct:false},{text:"250",correct:false}] },
      { question:"Cell part with genetic material?", answers:[{text:"Nucleus",correct:true},{text:"Mitochondria",correct:false},{text:"Cytoplasm",correct:false},{text:"Ribosome",correct:false}] }
    ],
    hard: [
      { question:"Red planet?", answers:[{text:"Mars",correct:true},{text:"Venus",correct:false},{text:"Mercury",correct:false},{text:"Saturn",correct:false}] }
    ]
  },
  tech: {
    easy: [
      { question:"Who founded Microsoft?", answers:[{text:"Steve Jobs",correct:false},{text:"Bill Gates",correct:true},{text:"Mark Zuckerberg",correct:false},{text:"Elon Musk",correct:false}] },
      { question:"What does HTML stand for?", answers:[{text:"Hyper Text Markup Language",correct:true},{text:"Hyper Trainer Marking Language",correct:false},{text:"High Text Machine Language",correct:false},{text:"Hyper Tabular Markup Language",correct:false}] }
    ],
    medium: [
      { question:"Which company developed iPhone?", answers:[{text:"Apple",correct:true},{text:"Samsung",correct:false},{text:"Google",correct:false},{text:"Microsoft",correct:false}] },
      { question:"CPU stands for?", answers:[{text:"Central Processing Unit",correct:true},{text:"Computer Processing Unit",correct:false},{text:"Central Performance Unit",correct:false},{text:"Control Processing Unit",correct:false}] }
    ],
    hard: [
      { question:"Who founded Facebook?", answers:[{text:"Mark Zuckerberg",correct:true},{text:"Larry Page",correct:false},{text:"Elon Musk",correct:false},{text:"Jeff Bezos",correct:false}] }
    ]
  },
  history: {
    easy: [
      { question:"First US President?", answers:[{text:"Abraham Lincoln",correct:false},{text:"George Washington",correct:true},{text:"Thomas Jefferson",correct:false},{text:"John Adams",correct:false}] },
      { question:"World War II ended in?", answers:[{text:"1945",correct:true},{text:"1939",correct:false},{text:"1918",correct:false},{text:"1950",correct:false}] }
    ],
    medium: [
      { question:"Who built Taj Mahal?", answers:[{text:"Akbar",correct:false},{text:"Shah Jahan",correct:true},{text:"Aurangzeb",correct:false},{text:"Humayun",correct:false}] },
      { question:"First Maurya emperor?", answers:[{text:"Ashoka",correct:false},{text:"Chandragupta Maurya",correct:true},{text:"Bindusara",correct:false},{text:"Harsha",correct:false}] }
    ],
    hard: [
      { question:"India gained independence?", answers:[{text:"1947",correct:true},{text:"1950",correct:false},{text:"1930",correct:false},{text:"1942",correct:false}] }
    ]
  }
};

// Get category & level from localStorage
let currentCategory = localStorage.getItem("selectedCategory") || "gk";
let currentLevel = localStorage.getItem("selectedLevel") || "easy";

// Grab questions for selected category & level
let currentQuestions = questions[currentCategory][currentLevel];
let currentQuestionIndex = 0;
let score = 0;

// DOM elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerFill = document.getElementById("timer-fill");

// Show question
function showQuestion() {
  resetState();
  const currentQuestion = currentQuestions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if(answer.correct) button.dataset.correct = true;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

// Reset state
function resetState() {
  nextButton.style.display = "none";
  while(answerButtons.firstChild) answerButtons.removeChild(answerButtons.firstChild);
  resetTimer();
}

// Select answer
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if(isCorrect){ selectedBtn.classList.add("correct"); score++; }
  else { selectedBtn.classList.add("wrong"); }

  Array.from(answerButtons.children).forEach(btn => btn.disabled = true);
  nextButton.style.display = "block";
  document.getElementById("score").innerText = "Score: " + score;
}

// Next button
nextButton.addEventListener("click", handleNext);

function handleNext() {
  currentQuestionIndex++;
  if(currentQuestionIndex < currentQuestions.length) showQuestion();
  else showScore();
}

// Show final score
function showScore() {
  let currentUser = localStorage.getItem("currentUser") || "Guest";
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({user:currentUser, score:score});
  leaderboard.sort((a,b)=>b.score-a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  localStorage.setItem("lastScore", score);
  window.location.href = "result.html";
}

// Timer
let timer, timeLeft;
function startTimer() {
  timeLeft = 15;
  timerFill.style.width = "100%";
  timer = setInterval(() => {
    timeLeft--;
    timerFill.style.width = (timeLeft/15*100) + "%";
    if(timeLeft <= 0){
      clearInterval(timer);
      handleNext();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}

// Start quiz
if(currentQuestions.length > 0) showQuestion();
