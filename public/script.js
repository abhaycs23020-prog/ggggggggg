// ================== Variables ==================
let currentQuestions = [];
let currentIndex = 0;
let score = 0;       // correct answers
let bonus = 0;       // bonus points from remaining time
let timer;
let timeLeft;
let playerName = "";
const questionTime = 30; // seconds

// ================== Start Quiz ==================
function startQuiz() {
  playerName = document.getElementById("playerName").value.trim() || "Guest";
  const category = document.getElementById("category").value;
  
  // Example questions (you can expand or fetch dynamically)
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
  currentQuestions.sort(()=>Math.random() - 0.5); // shuffle questions

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  currentIndex = 0;
  score = 0;
  bonus = 0;

  showQuestion();
}

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
    btn.addEventListener("click", ()=>checkAnswer(ans, q.correct));
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
    if(timeLeft <= 0){
      clearInterval(timer);
      alert(`⏰ Time's up! Correct answer: ${currentQuestions[currentIndex].correct}`);
      currentIndex++;
      showQuestion();
    }
  }, 1000);
}

// ================== Check Answer ==================
function checkAnswer(selected, correct) {
  clearInterval(timer);
  if(selected === correct){
    score++;
    bonus += timeLeft;
    alert(`✅ Correct! +1 score +${timeLeft} bonus`);
  } else {
    alert(`❌ Wrong! Correct answer: ${correct}`);
  }
  currentIndex++;
  showQuestion();
}

// ================== End Quiz ==================
function endQuiz() {
  clearInterval(timer);
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  const total = score + bonus;
  document.getElementById("score").innerText = `${playerName}, Score: ${score} | Bonus: ${bonus} | Total: ${total}`;

  saveToLeaderboard(playerName, score, bonus, total);
  displayLeaderboard();
}

// ================== Leaderboard ==================
function saveToLeaderboard(name, score, bonus, total) {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({name, score, bonus, total});
  leaderboard.sort((a,b)=>b.total - a.total);
  leaderboard = leaderboard.slice(0,5); // top 5
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function displayLeaderboard() {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const list = document.getElementById("leaderboard");
  if(!list) return;
  list.innerHTML = "";
  leaderboard.forEach(entry=>{
    const li = document.createElement("li");
    li.innerText = `${entry.name} - Score: ${entry.score}, Bonus: ${entry.bonus}, Total: ${entry.total}`;
    list.appendChild(li);
  });
}

// ================== Retry Quiz ==================
function restartQuiz() {
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
}
