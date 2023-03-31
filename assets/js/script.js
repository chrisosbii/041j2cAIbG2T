/* Get Objects from index.html */
// get the timer object
var timer = document.querySelector("#timer");

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
var answerSeconds;
var quizRunning = false;

// start quiz timer function
function startQuiz() {
  //render the questions!
  questions();
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    quizRunning = true;
    secondsLeft--;
    setTime(secondsLeft);
    //if less then 1 then done
    if(secondsLeft < 1 && quizRunning) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      //render finished
      quizFinish();
    }

  }, 1000);
}

function setTime(seconds){
  timer.textContent = "Time: " + seconds; 
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
    main.style.textAlign = "center";

    //make a start quiz button
    var start = document.createElement("button");
    start.textContent = "Start Quiz";
    start.addEventListener("click", function(event) {
      //prevent default
      event.preventDefault();
      //get the input box
      startQuiz();
    })
    buttons.appendChild(start);
}
// render questions
function questions(){
  //clear page
  clearPage();

}
// scramble input
function scrambler(){

}
// when quiz is over do this
function quizFinish() {
  //clear page
  clearPage();
  //set score to secondsLeft ... for now...
  score = secondsLeft;
  //align body.text right
  main.style.textAlign = "left";
  title.textContent = "All done!";
  body.textContent = 'Your final score is ' + score + '.';
//

  var form = document.createElement("form");
  var lable = document.createElement("label");
  lable.textContent = "Enter initials:"
  var input = document.createElement("input");
  input.type = "text";
  input.className = "form-submit-text";
  var submit = document.createElement("input");
  submit.type = "submit";
  submit.className = "form-submit-button";
  submit.textContent = "Submit";
  form.appendChild(lable);
  form.appendChild(input);
  form.appendChild(submit);
  buttons.appendChild(form);
}

function storeHS(name){

}
function printHS(){
  clearPage();
  console.log("in print hs");
}
//make a function to view high scores
function loadHS(){
  
}
/**
 * Update user they provided a right answer
 */
function correctAns(){
  //pring correct response
  showAnswer("Correct!");
}
/**
 * Update user they provided a wrong answer
 */
function wrongAns(){
  showAnswer("Wrong!");
  if(secondsLeft>9){
    secondsLeft = secondsLeft - 10;
  }
  else{
    secondsLeft = 0;
  }
}
/**
 * Takes in the answer that you want to show
 * Sets a timer for the answer then removes it
 * updating is independed of clear
 */
function showAnswer(str){
  answerSeconds = 5;
  answer.textContent = str;
  answer.style.visibility = 'visible';
  var answerTimer = setInterval(function() {
    answerSeconds--;
    if(answerSeconds === 0) {
      // Stops execution of action at set interval
      clearInterval(answerSeconds);
      // Calls function to create and append image
      answer.style.visibility = 'hidden';
    }

  }, 1000);

}
/**
 * Clears the page of content
 */
function clearPage(){
  title.textContent = "";
  body.textContent = "";
  main.style.textAlign = "right";
  while (buttons.firstChild) {
    buttons.removeChild(buttons.firstChild);
  }
}

//landingPage();

//test things here
//landingPage();
//correctAns();
quizFinish();