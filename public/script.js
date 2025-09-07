const questions = {
  gk: {
    easy:[{question:"Largest planet?",answers:[{text:"Earth",correct:false},{text:"Jupiter",correct:true},{text:"Mars",correct:false},{text:"Saturn",correct:false}]}],
    medium:[{question:"Father of Nation?",answers:[{text:"Nehru",correct:false},{text:"Gandhi",correct:true},{text:"Patel",correct:false},{text:"Ambedkar",correct:false}]}],
    hard:[{question:"National Anthem author?",answers:[{text:"Tagore",correct:true},{text:"Chatterjee",correct:false},{text:"Naidu",correct:false},{text:"Gandhi",correct:false}]}]
  },
  science: {
    easy:[{question:"H2O stands for?",answers:[{text:"H2O",correct:true},{text:"O2",correct:false},{text:"CO2",correct:false},{text:"HO2",correct:false}]}],
    medium:[{question:"Gas plants absorb?",answers:[{text:"Oxygen",correct:false},{text:"Carbon Dioxide",correct:true},{text:"Nitrogen",correct:false},{text:"Hydrogen",correct:false}]}],
    hard:[{question:"Bones in adult human?",answers:[{text:"206",correct:true},{text:"210",correct:false},{text:"198",correct:false},{text:"250",correct:false}]}]
  },
  tech: {
    easy:[{question:"Who founded Microsoft?",answers:[{text:"Steve Jobs",correct:false},{text:"Bill Gates",correct:true},{text:"Mark Zuckerberg",correct:false},{text:"Elon Musk",correct:false}]}],
    medium:[{question:"What does HTML stand for?",answers:[{text:"Hyper Text Markup Language",correct:true},{text:"High Text Machine Language",correct:false}]}],
    hard:[{question:"CPU stands for?",answers:[{text:"Central Processing Unit",correct:true},{text:"Control Processing Unit",correct:false}]}]
  },
  history: {
    easy:[{question:"First US President?",answers:[{text:"George Washington",correct:true},{text:"Abraham Lincoln",correct:false}]}],
    medium:[{question:"World War II ended in?",answers:[{text:"1945",correct:true},{text:"1939",correct:false}]}],
    hard:[{question:"India gained independence?",answers:[{text:"1947",correct:true},{text:"1950",correct:false}]}]
  }
};

let currentCategory = localStorage.getItem("selectedCategory") || "gk";
let currentLevel = localStorage.getItem("selectedLevel") || "easy";
let currentQuestions = [...questions[currentCategory][currentLevel]]; // clone
let currentQuestionIndex=0;
let score=0;
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");
const timerFill=document.getElementById("timer-fill");
let timer,timeLeft;

function startQuiz(){
  currentQuestionIndex=0;
  score=0;
  shuffle(currentQuestions);
  showQuestion();
  startTimer();
}

function showQuestion(){
  resetState();
  const q=currentQuestions[currentQuestionIndex];
  questionElement.innerText=q.question;
  shuffle(q.answers).forEach(ans=>{
    const btn=document.createElement("button");
    btn.innerText=ans.text;
    btn.classList.add("btn");
    if(ans.correct) btn.dataset.correct=true;
    btn.addEventListener("click",selectAnswer);
    answerButtons.appendChild(btn);
  });
}

function resetState(){
  nextButton.style.display="none";
  while(answerButtons.firstChild) answerButtons.removeChild(answerButtons.firstChild);
  resetTimer();
}

function selectAnswer(e){
  const btn=e.target;
  const correct=btn.dataset.correct==="true";
  if(correct){btn.classList.add("correct");score++;} else btn.classList.add("wrong");
  Array.from(answerButtons.children).forEach(b=>b.disabled=true);
  nextButton.style.display="block";
  document.getElementById("score") && (document.getElementById("score").innerText="Score: "+score);
}

nextButton && nextButton.addEventListener("click",()=>{
  currentQuestionIndex++;
  if(currentQuestionIndex<currentQuestions.length) showQuestion();
  else showScore();
});

function showScore(){
  let currentUser=localStorage.getItem("currentUser")||"Guest";
  let leaderboard=JSON.parse(localStorage.getItem("leaderboard"))||[];
  leaderboard.push({user:currentUser,score:score});
  leaderboard.sort((a,b)=>b.score-a.score);
  localStorage.setItem("leaderboard",JSON.stringify(leaderboard));
  localStorage.setItem("lastScore",score);
  window.location.href="result.html";
}

function startTimer(){
  timeLeft=15;
  timerFill.style.width="100%";
  timer=setInterval(()=>{
    timeLeft--;
    timerFill.style.width=(timeLeft/15*100)+"%";
    if(timeLeft<=0){clearInterval(timer); handleNext();}
  },1000);
}

function resetTimer(){clearInterval(timer);startTimer();}
function handleNext(){currentQuestionIndex++;currentQuestionIndex<currentQuestions.length?showQuestion():showScore();}
function shuffle(arr){for(let i=arr.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];} return arr;}
window.addEventListener("load",()=>{if(questionElement) startQuiz();});
