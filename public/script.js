let currentQuestions = [];
let currentIndex = 0;
let score = 0;       // sirf correct answers
let bonus = 0;       // bonus time points
let timer;
let timeLeft;
let playerName = "";

// Check Answer with Bonus
function checkAnswer(selected, correct) {
  clearInterval(timer);
  if (selected === correct) {
    score++;  // normal +1 for correct
    bonus += timeLeft; // ⏳ bonus add hoga
    alert(`✅ Correct! (+1 score +${timeLeft} bonus)`);
  } else {
    alert("❌ Wrong! Correct answer: " + correct);
  }
}

// End Quiz + Leaderboard
function endQuiz() {
  clearInterval(timer);
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  const total = score + bonus;
  document.getElementById("score").innerText = 
    `${playerName}, Your Score: ${score} | Bonus: ${bonus} | Total: ${total}`;

  saveToLeaderboard(playerName, score, bonus, total);
  displayLeaderboard();
}

// Save High Scores
function saveToLeaderboard(name, score, bonus, total) {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ name, score, bonus, total });
  leaderboard.sort((a, b) => b.total - a.total); // sort by total
  leaderboard = leaderboard.slice(0, 5); // top 5 only
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

// Show High Scores
function displayLeaderboard() {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const list = document.getElementById("leaderboard");
  list.innerHTML = "";
  leaderboard.forEach(entry => {
    const li = document.createElement("li");
    li.innerText = `${entry.name} - Score: ${entry.score}, Bonus: ${entry.bonus}, Total: ${entry.total}`;
    list.appendChild(li);
  });
}
