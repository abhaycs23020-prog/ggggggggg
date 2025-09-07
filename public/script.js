// ====== Questions with category + level + hints ======
const questions = JSON.parse(localStorage.getItem("questions")) || {
  gk: {
    easy: [
      { question: "Largest planet?", answers: [{text:"Earth",correct:false},{text:"Jupiter",correct:true},{text:"Mars",correct:false},{text:"Saturn",correct:false}], hint:"It's a gas giant." },
      { question: "Father of Nation?", answers: [{text:"Nehru",correct:false},{text:"Gandhi",correct:true},{text:"Patel",correct:false},{text:"Ambedkar",correct:false}], hint:"His surname is Gandhi." }
    ],
    medium: [
      { question: "National animal of India?", answers: [{text:"Lion",correct:false},{text:"Tiger",correct:true},{text:"Elephant",correct:false},{text:"Leopard",correct:false}], hint:"It is a big cat." }
    ],
    hard: [
      { question: "National Anthem author?", answers: [{text:"Tagore",correct:true},{text:"Chatterjee",correct:false},{text:"Naidu",correct:false},{text:"Gandhi",correct:false}], hint:"He wrote 'Jana Gana Mana'." }
    ]
  },
  science: {
    easy: [
      { question:"Chemical symbol for water?", answers:[{text:"H2O",correct:true},{text:"O2",correct:false},{text:"CO2",correct:false},{text:"HO2",correct:false}], hint:"2 hydrogen + 1 oxygen" }
    ],
    medium: [
      { question:"Bones in adult human?", answers:[{text:"206",correct:true},{text:"210",correct:false},{text:"198",correct:false},{text:"250",correct:false}], hint:"It's just over 200." }
    ],
    hard: [
      { question:"Red planet?", answers:[{text:"Mars",correct:true},{text:"Venus",correct:false},{text:"Mercury",correct:false},{text:"Saturn",correct:false}], hint:"Named after Roman god of war." }
    ]
  },
  tech: {
    easy: [
      { question:"Who founded Microsoft?", answers:[{text:"Steve Jobs",correct:false},{text:"Bill Gates",correct:true},{text:"Mark Zuckerberg",correct:false},{text:"Elon Musk",correct:false}], hint:"He is billionaire." }
    ],
    medium: [
      { question:"What does HTML stand for?", answers:[{text:"Hyper Text Markup Language",correct:true},{text:"Hyper Trainer Marking Language",correct:false},{text:"High Text Machine Language",correct:false},{text:"Hyper Tabular Markup Language",correct:false}], hint:"It structures webpages." }
    ],
    hard: [
      { question:"Who founded Facebook?", answers:[{text:"Mark Zuckerberg",correct:true},{text:"Larry Page",correct:false},{text:"Elon Musk",correct:false},{text:"Jeff Bezos",correct:false}], hint:"He created it at Harvard." }
    ]
  },
  history: {
    easy: [
      { question:"First US President?", answers:[{text:"George Washington",correct:true},{text:"Abraham Lincoln",correct:false}], hint:"Led Revolutionary War." }
    ],
    medium: [
      { question:"Who built Taj Mahal?", answers:[{text:"Shah Jahan",correct:true},{text:"Akbar",correct:false},{text:"Aurangzeb",correct:false},{text:"Humayun",correct:false}], hint:"He was Mughal emperor." }
    ],
    hard: [
      { question:"India gained independence?", answers:[{text:"1947",correct:true},{text:"1950",correct:false},{text:"1930",correct:false},{text:"1942",correct:false}], hint:"Year after WWII ended." }
    ]
  }
};

// ====== DOM Elements ======
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const hintBtn = document.getElementById("hint-btn");
const hintText = document.getElementById("hint-text");
const scoreDisplay = document.getElementById("score");
const progressFill = document.getElementById("progress-fill");
const retryBtn = document.getElementById("retry-btn");
const modeBtn = document.getElementById("mode-btn");

// ====== Category & Level ======
let currentCategory = localStorage.getItem("selectedCategory") || "gk";
let currentLevel = localStorage.getItem("selectedLevel") || "easy";

// ====== Quiz State ======
let currentQuestions = [...questions[currentCategory][currentLevel]]; // copy array
currentQuestions.sort(()=>Math.random()-0.5); // randomize questions
let currentQuestionIndex = 0;
let score = 0;
let timer, timeLeft;

// ====== Show Question ======
function showQuestion() {
  resetState();
  const q = currentQuestions[currentQuestionIndex];
  questionElement.innerText = q.question;
  const shuffledAnswers = [...q.answers].sort(()=>Math.random()-0.5);
  shuffledAnswers.forEach(answer=>{
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.classList.add("btn");
    if(answer.correct) btn.dataset.correct = true;
    btn.addEventListener("click", selectAnswer);
    answerButtons.appendChild(btn);
  });
  progressFill.style.width = ((currentQuestionIndex)/currentQuestions.length)*100 + "%";
  startTimer();
  hintText.style.display = "none";
}

// ====== Reset State ======
function resetState() {
  nextButton.style.display = "none";
  while(answerButtons.firstChild) answerButtons.removeChild(answerButtons.firstChild);
  clearInterval(timer);
}

// ====== Select Answer ======
function selectAnswer(e){
  clearInterval(timer);
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect) { selectedBtn.classList.add("correct"); score++; }
  else { selectedBtn.classList.add("wrong"); }
  Array.from(answerButtons.children).forEach(btn=>btn.disabled = true);
  nextButton.style.display = "block";
  scoreDisplay.innerText = "Score: " + score;
}

// ====== Hint Button ======
hintBtn.addEventListener("click", ()=>{
  const hint = currentQuestions[currentQuestionIndex].hint;
  if(hint){
    hintText.innerText = hint;
    hintText.style.display = "block";
    score = score>0 ? score-1 : 0; // reduce 1 point
    scoreDisplay.innerText = "Score: " + score;
  }
});

// ====== Next Button ======
nextButton.addEventListener("click", ()=>{
  currentQuestionIndex++;
  if(currentQuestionIndex < currentQuestions.length) showQuestion();
  else showScore();
});

// ====== Timer ======
function startTimer() {
  timeLeft = 15;
  timerFill.style.width = "100%";
  timer = setInterval(()=>{
    timeLeft--;
    timerFill.style.width = (timeLeft/15*100) + "%";
    if(timeLeft<=0){
      clearInterval(timer);
      currentQuestionIndex++;
      if(currentQuestionIndex < currentQuestions.length) showQuestion();
      else showScore();
    }
  },1000);
}

// ====== Show Score & Leaderboard ======
function showScore(){
  let currentUser = localStorage.getItem("currentUser") || "Guest";
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({user:currentUser, score:score});
  leaderboard.sort((a,b)=>b.score-a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  localStorage.setItem("lastScore", score);
  alert("Quiz Complete! Your Score: " + score);
}

// ====== Retry Quiz ======
retryBtn.addEventListener("click", ()=>{
  currentQuestionIndex = 0;
  score = 0;
  currentQuestions = [...questions[currentCategory][currentLevel]].sort(()=>Math.random()-0.5);
  showQuestion();
});

// ====== Dark / Light Mode ======
modeBtn.addEventListener("click", ()=>{
  document.body.classList.toggle("light-mode");
});

// ====== Start Quiz ======
if(currentQuestions.length>0) showQuestion();
