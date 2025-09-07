// Answer selection function (without sound)
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  // disable all buttons after one selection
  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

// Save score and update leaderboard
function showScore() {
  let currentUser = localStorage.getItem("currentUser");
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  leaderboard.push({ user: currentUser, score: score });

  // sort leaderboard descending
  leaderboard.sort((a, b) => b.score - a.score);

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  localStorage.setItem("lastScore", score);

  // go to result page
  window.location.href = "result.html";
}
