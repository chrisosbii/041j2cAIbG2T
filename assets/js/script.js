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
var answerSeconds;

// start quiz timer function
function startQuiz() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    setTime(secondsLeft);
    //if less then 1 then done
    if(secondsLeft < 1) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      //render finished
      quizFinish();
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
    main.style.textAlign = "center";
}
// render questions
function questions(){

}

// when quiz is over do this
function quizFinish() {
    //set score to secondsLeft ... for now...
    score = secondsLeft;
    title.textContent = "All done!";
    body.textContent = 'Your final score is ${score}. \n Enter initials: ';
    //create and append input box
    var inputs = document.createElement("INPUT");
    inputs.setAttribute("id", "input");
    inputs.setAttribute("type", "text");
    buttons.appendChild(inputs);
    //create and append button box
    var newHS = document.createElement("button");
    newHS.addEventListener("click", function(event) {
      //prevent default
      event.preventDefault();
      //get the input box
      var temp = document.getElementById("input");
      //check length?
      if(temp.length > 0){
        
      }
    })
    
    
}

//make a function to view high scores
function highScores(){

}
function correctAns(){

}
function wrongAns(){

}
/**
 * Takes in the answer that you want to show
 * Sets a timer for the answer then removes it
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
    main.clildNodes.forEach(element => {
        this.remove();
    });
}

landingPage();