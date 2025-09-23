// ================== Variables ==================
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let bonus = 0;
let timer;
let timeLeft;
let playerName = localStorage.getItem("currentUser") || "Guest";
const questionTime = 30;

const category = localStorage.getItem("selectedCategory") || "gk";
const level = localStorage.getItem("selectedLevel") || "easy";

document.getElementById("cat-name").innerText = category.toUpperCase();

// Example Questions
const allQuestions = {
  gk: [
    {question:"Largest planet?", answers:["Earth","Jupiter","Mars","Saturn"], correct:"Jupiter"},
    {question:"Father of Nation?", answers:["Nehru","Gandhi","Patel","Ambedkar"], correct:"Gandhi"}
  ],
  science: [
    {question:"H2O is?", answers:["Oxygen","Water","Hydrogen","Helium"], correct:"Water"}
  ],
  sports: [
    {question:"Olympics held every?", answers:["2 years","4 years","6 years","Every year"], correct:"4 years"}
  ]
};

currentQuestions = allQuestions[category] || [];
currentQuestions.sort(()=>Math.random()-0.5);

showQuestion();

// ================== Show Question ==================
function showQuestion() {
  resetState();
  if(currentIndex >= currentQuestions.length) return endQuiz();

  const q = currentQuestions[currentIndex];
  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  q.answers.sort(()=>Math.random()-0.5).forEach(ans => {
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.innerText = ans;
    btn.onclick = ()=>checkAnswer(ans, q.correct);
    optionsDiv.appendChild(btn);
  });

  startTimer();
}

// ================== Reset State ==================
function resetState() {
  clearInterval(timer);
  timeLeft = questionTime;
  document.getElementById("time").innerText = timeLeft;
  document.getElementById("options").innerHTML = "";
}

// ================== Timer ==================
function startTimer() {
  timer = setInterval(()=>{
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;
    document.getElementById("timer-fill").style.width = (timeLeft/questionTime*100) + "%";
    if(timeLeft <= 0){
      clearInterval(timer);
      alert(`⏰ Time's up! Correct answer: ${currentQuestions[currentIndex].correct}`);
      currentIndex++;
      showQuestion();
    }
  },1000);
}

// ================== Check Answer ==================
function checkAnswer(selected, correct) {
  clearInterval(timer);
  if(selected === correct){
    score++;
    bonus += timeLeft;
    alert(`✅ Correct! +1 score +${timeLeft} bonus`);
  } else {
    alert(`❌ Wrong! Correct: ${correct}`);
  }
  currentIndex++;
  showQuestion();
}

// ================== End Quiz ==================
function endQuiz() {
  clearInterval(timer);
  localStorage.setItem("lastScore", score + bonus);
  window.location.href = "result.html";
}

// ================== Leaderboard ==================
function saveToLeaderboard(name, score, bonus, total) {
  let leaderboard = JSON.parse(localStorage
