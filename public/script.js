const questions = {
  gk: [
    { question: "Largest planet?", answers: [{text:"Earth",correct:false},{text:"Jupiter",correct:true},{text:"Mars",correct:false},{text:"Saturn",correct:false}] },
    { question: "Father of Nation?", answers: [{text:"Nehru",correct:false},{text:"Gandhi",correct:true},{text:"Patel",correct:false},{text:"Ambedkar",correct:false}] },
    { question: "National animal of India?", answers: [{text:"Lion",correct:false},{text:"Tiger",correct:true},{text:"Elephant",correct:false},{text:"Leopard",correct:false}] },
    { question: "Pink City?", answers: [{text:"Jaipur",correct:true},{text:"Jodhpur",correct:false},{text:"Udaipur",correct:false},{text:"Delhi",correct:false}] },
    { question: "National Anthem author?", answers: [{text:"Tagore",correct:true},{text:"Chatterjee",correct:false},{text:"Naidu",correct:false},{text:"Gandhi",correct:false}] }
  ],
  science: [
    { question:"Chemical symbol for water?", answers:[{text:"H2O",correct:true},{text:"O2",correct:false},{text:"CO2",correct:false},{text:"HO2",correct:false}] },
    { question:"Gas plants absorb?", answers:[{text:"Oxygen",correct:false},{text:"Carbon Dioxide",correct:true},{text:"Nitrogen",correct:false},{text:"Hydrogen",correct:false}] },
    { question:"Bones in adult human?", answers:[{text:"206",correct:true},{text:"210",correct:false},{text:"198",correct:false},{text:"250",correct:false}] },
    { question:"Cell part with genetic material?", answers:[{text:"Nucleus",correct:true},{text:"Mitochondria",correct:false},{text:"Cytoplasm",correct:false},{text:"Ribosome",correct:false}] },
    { question:"Red planet?", answers:[{text:"Mars",correct:true},{text:"Venus",correct:false},{text:"Mercury",correct:false},{text:"Saturn",correct:false}] }
  ]
};

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerFill = document.getElementById("timer-fill");
let currentCategory = localStorage.getItem("selectedCategory") || "gk";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
  startTimer();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentCategory][currentQuestionIndex];
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

function resetState() {
  nextButton.style.display = "none";
  while(answerButtons.firstChild) answerButtons.removeChild(answerButtons.firstChild);
  resetTimer();
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect) { selectedBtn.classList.add("correct"); score++; }
  else selectedBtn.classList.add("wrong");
  Array.from(answerButtons.children).forEach(btn => btn.disabled = true);
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions[currentCategory].length) showQuestion();
  else showScore();
}

nextButton.addEventListener("click", handleNextButton);

function showScore() {
  let currentUser = localStorage.getItem("currentUser");
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({user:currentUser,score:score});
  leaderboard.sort((a,b)=>b.score-a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  localStorage.setItem("lastScore", score);
  window.location.href = "result.html";
}

// Timer
function startTimer() {
  timeLeft = 15;
  timer = setInterval(() => {
    timeLeft--;
    timerFill.style.width = (timeLeft/15*100)+"%";
    if(timeLeft<=0){clearInterval(timer); handleNextButton();}
  },1000);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}

if(questionElement) startQuiz();
