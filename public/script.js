// ====== Questions with category + level + hints ======
const questions = JSON.parse(localStorage.getItem("questions")) || {
  gk: {
    easy: [
      { question: "Largest planet?", answers: [{text:"Earth",correct:false},{text:"Jupiter",correct:true},{text:"Mars",correct:false},{text:"Saturn",correct:false}], hint:"It's a gas giant." },
      { question: "Father of Nation?", answers: [{text:"Nehru",correct:false},{text:"Gandhi",correct:true},{text:"Patel",correct:false},{text:"Ambedkar",correct:false}], hint:"His surname is Gandhi." }
    ]
  },
  science: {
    easy: [
      { question:"Chemical symbol for water?", answers:[{text:"H2O",correct:true},{text:"O2",correct:false},{text:"CO2",correct:false},{text:"HO2",correct:false}], hint:"2 hydrogen + 1 oxygen" }
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
const timerFill = document.getElementById("timer-fill");

// ====== Quiz State ======
let currentCategory = localStorage.getItem("selectedCategory") || "gk";
let currentLevel = localStorage.getItem("selectedLevel") || "easy";
let currentQuestions = [...questions[currentCategory][currentLevel]];
let currentQuestionIndex = 0;
let score = 0;
let timer, timeLeft;

// ====== Show Question ======
function showQuestion() {
  resetState();
  const q = currentQuestions[currentQuestionIndex];
  questionElement.innerText = q.question;

  q.answers.forEach(answer=>{
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.classList.add("btn");
    if(answer.correct) btn.dataset.correct = true;
    btn.addEventListener("click", selectAnswer);
    answerButtons.appendChild(btn);
  });

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

  if(isCorrect){ selectedBtn.classList.add("correct"); score++; }
  else { selectedBtn.classList.add("wrong"); }

  Array.from(answerButtons.children).forEach(btn=>btn.disabled = true);
  nextButton.style.display = "block";
  scoreDisplay.innerText = "Score: " + score;
}

// ====== Hint Button ======
hintBtn.addEventListener("click", ()=>{
  const hint = currentQuestions[currentQuestionIndex].hint;
  if(hint){
    hintText.innerText = "💡 Hint: " + hint;
    hintText.style.display = "block";
    if(score > 0) score--; // minus 1 point
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
    if(timeLeft <= 0){
      clearInterval(timer);
      nextButton.click(); // auto next
    }
  },1000);
}

// ====== Show Score ======
function showScore(){
  alert("✅ Quiz finished! Your Score: " + score);
  localStorage.setItem("lastScore", score);
  // yaha pe result.html redirect karna ho to use karo:
  // window.location.href = "result.html";
}

// ====== Start Quiz ======
if(currentQuestions.length > 0) showQuestion();
