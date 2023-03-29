/* Get Objects from index.html */
// get the timer object
var timer = document.querySelector("#time");

// get the main object
var main = document.getElementById("main");
// get the header object
var header = document.getElementById("header");
var title = document.getElementById("title");
var body = document.getElementById("body");
var buttons = document.getElementById("buttons");
var answer = document.getElementById("answer");

var secondsLeft;
var score;

// start quiz timer function
function startQuiz() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    setTime(secondsLeft);

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }

  }, 1000);
}

function setTime(seconds){
    //timer.textContent = "Time: " + seconds; 
}

// render loading page
function landingPage(){
    //reset timer
    secondsLeft = 75;
    setTime(secondsLeft);
    //set score to 0;
    score = 0;
    title.textContent = "Coding Quiz Challenge";
    body.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    
}
// render questions
function questions(){

}

// when quiz is over do this
function quizFinish() {
    //set score to secondsLeft ... for now...
    score = secondsLeft;
    
}

//make a function to view high scores
function highScores(){

}

landingPage();