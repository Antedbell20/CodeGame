// setting variables
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGame");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var playAgain = document.getElementById("playAgain");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

// sets the quiz questions and answers
var quizQuestions = [{
    question: "Where was Felix born?",
    choiceA: "Korea",
    choiceB: "Indonesia",
    choiceC: "New Zealand",
    choiceD: "Australia",
    correctAnswer: "d"},
  {
    question: "What do they call Felix and Han",
    choiceA: "Pretty boys",
    choiceB: "sunshine twins",
    choiceC: "3RATCHA",
    choiceD: "bad boys",
    correctAnswer: "b"},
   {
    question: "Who is the dad of the group",
    choiceA: "Felix",
    choiceB: "LeeKnow",
    choiceC: "Bang Chan",
    choiceD: "changBin",
    correctAnswer: "c"},
    {
    question: "Whos animal is a rabbit",
    choiceA: "LeeKnow",
    choiceB: "I.N.",
    choiceC: "Bang Chan",
    choiceD: "Hyunjin",
    correctAnswer: "a"},
    {
    question: "Who is on Andi's phone case (creator of this game)",
    choiceA: "Bang Chan",
    choiceB: "LeeKnow",
    choiceC: "Felix",
    choiceD: "Hyunjin",
    correctAnswer: "c"},  
    {
    question: "who plays the mom of the group",
    choiceA: "LeeKnow",
    choiceB: "BangChan",
    choiceC: "Felix",
    choiceD: "seungmin",
    correctAnswer: "a"},
    {
    question: "Who was not present at the MBN performance",
    choiceA: "Changbin",
    choiceB: "Hyunjin",
    choiceC: "I.N.",
    choiceD: "Seungmin",
    correctAnswer: "b"},
        
    
    ];

// generates the questions and also tells the page when to stop asking questions
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// starts the quiz
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer function
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
// Shows the score
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// listens for submit button and checks to make sure there is user input. Then shows initials and score
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// gets the scores but doesnt display them
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";

var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
for (i=0; i<highscores.length; i++){
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    highscoreDisplayName.appendChild(newNameSpan);
    highscoreDisplayScore.appendChild(newScoreSpan);
}
}
// this one shows the scores
function showHighscore(){
startQuizDiv.style.display = "none"
gameoverDiv.style.display = "none";
highscoreContainer.style.display = "flex";
highscoreDiv.style.display = "block";
endGameBtns.style.display = "flex";

generateHighscores();
}

// clears the highscores
function clearHighscore(){
window.localStorage.clear();
highscoreDisplayName.textContent = "";
highscoreDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values 
function playAgain(){

highscoreContainer.style.display = "none";
gameoverDiv.style.display = "none";
startQuizDiv.style.display = "flex";
timeLeft = 76;
score = 0;
currentQuestionIndex = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer){
correct = quizQuestions[currentQuestionIndex].correctAnswer;

if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
    score++;
   
    currentQuestionIndex++;
    generateQuizQuestion();
}else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
    timeLeft = timeLeft - 10
    currentQuestionIndex++;
    generateQuizQuestion();
}else{
    showScore();
}
}

// This button starts the quiz!
startQuizButton.addEventListener("click",startQuiz);