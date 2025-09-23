const questions = {
  gk: {
    easy: [
      { q: "Largest planet?", options: ["Earth", "Jupiter", "Mars", "Saturn"], ans: "Jupiter" },
      { q: "Capital of India?", options: ["Mumbai", "Delhi", "Kolkata", "Chennai"], ans: "Delhi" }
    ],
    medium: [
      { q: "Who invented telephone?", options: ["Edison", "Bell", "Tesla", "Newton"], ans: "Bell" },
      { q: "Smallest continent?", options: ["Australia", "Europe", "Antarctica", "Africa"], ans: "Australia" }
    ],
    hard: [
      { q: "Year WW2 ended?", options: ["1942", "1945", "1948", "1950"], ans: "1945" },
      { q: "First country to send man to space?", options: ["USA", "Russia", "China", "India"], ans: "Russia" }
    ]
  },
  science: {
    easy: [
      { q: "H2O is chemical name of?", options: ["Oxygen", "Hydrogen", "Water", "Salt"], ans: "Water" },
      { q: "Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], ans: "Mars" }
    ],
    medium: [
      { q: "Speed of light?", options: ["3x10^5 m/s", "3x10^8 m/s", "3x10^6 m/s", "3x10^7 m/s"], ans: "3x10^8 m/s" },
      { q: "Who proposed gravity?", options: ["Einstein", "Newton", "Galileo", "Kepler"], ans: "Newton" }
    ],
    hard: [
      { q: "Atomic number of Carbon?", options: ["5", "6", "7", "8"], ans: "6" },
      { q: "First artificial satellite?", options: ["Apollo", "Sputnik", "Challenger", "Voyager"], ans: "Sputnik" }
    ]
  },
  sports: {
    easy: [
      { q: "Players in cricket team?", options: ["9", "10", "11", "12"], ans: "11" },
      { q: "Which sport uses racket?", options: ["Football", "Tennis", "Hockey", "Golf"], ans: "Tennis" }
    ],
    medium: [
      { q: "First Indian Olympic medal?", options: ["K.D. Jadhav", "Milkha Singh", "P.T. Usha", "Bindra"], ans: "K.D. Jadhav" },
      { q: "FIFA 2018 winner?", options: ["Brazil", "France", "Germany", "Argentina"], ans: "France" }
    ],
    hard: [
      { q: "Highest ODI run scorer?", options: ["Ponting", "Kohli", "Tendulkar", "Sangakkara"], ans: "Tendulkar" },
      { q: "Olympics held in India?", options: ["Never", "1952", "1980", "1960"], ans: "Never" }
    ]
  }
};

let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft;
let playerName = "";

// Start Quiz
function startQuiz() {
  playerName = document.getElementById("playerName").value.trim();
  if (!playerName) {
    alert("⚠️ Please enter your name!");
    return;
  }

  const category = document.getElementById("category").value;
  const difficulty = document.getElementById("difficulty").value;
  currentQuestions = questions[category][difficulty];
  currentIndex = 0;
  score = 0;

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");

  showQuestion();
}

// Show Question
function showQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  document.getElementById("time").innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("⏰ Time's up!");
      nextQuestion();
    }
  }, 1000);

  const q = currentQuestions[currentIndex];
  document.getElementById("question").innerText = q.q;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(opt, q.ans);
    optionsDiv.appendChild(btn);
  });
}

// Check Answer
function checkAnswer(selected, correct) {
  clearInterval(timer);
  if (selected === correct) {
    score++;
    alert("✅ Correct!");
  } else {
    alert("❌ Wrong! Correct answer: " + correct);
  }
}

// Next Question
function nextQuestion() {
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// End Quiz + Leaderboard
function endQuiz() {
  clearInterval(timer);
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
  document.getElementById("score").innerText = `${playerName}, Your Score: ${score}/${currentQuestions.length}`;

  saveToLeaderboard(playerName, score);
  displayLeaderboard();
}

// Save High Scores
function saveToLeaderboard(name, score) {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score); // highest first
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
    li.innerText = `${entry.name} - ${entry.score}`;
    list.appendChild(li);
  });
}

// Restart Quiz
function restartQuiz() {
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
}
