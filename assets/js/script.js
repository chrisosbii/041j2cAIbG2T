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
var order = [];
var number = 0;
var hs = [];

// start quiz timer function
function startQuiz() {
  //resets if its running
  quizRunning = true;
  //reset number of qs
  number = 0;
  //scramble the order
  order = scrambler();
  //render the questions!
  displayQs();
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    setTime(secondsLeft);
    //if less then 1 then done
    if(secondsLeft < 1 || !quizRunning) {
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
  //clear page
  clearPage();
  header.style.visibility = 'visable';
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
function displayQs(){
  //clear page
  clearPage();
  
  //check if we are on prob #5
  if(number > 4){
    quizRunning = false;
    console.log(quizRunning + "");
    quizFinish();
    return;
  }

  //set q to title
  title.textContent = questionList[order[number]].question;
  // loop through answers and append functions
  for (var i = 0; i < questionList[order[number]].options.length; i ++){
    //make a new button
    var tempButton = document.createElement("button");
    tempButton.textContent = i + ". " + questionList[order[number]].options[i];
    tempButton.className = "quizButton";
    //check if right answer
    if(i == questionList[order[number]].answer){
      tempButton.addEventListener("click", function(event) {
        //prevent default
        event.preventDefault();
        //get the input box
        correctAns();
      })
    }else{
      tempButton.addEventListener("click", function(event) {
        //prevent default
        event.preventDefault();
        //get the input box
        wrongAns();
      })
    }
    buttons.appendChild(tempButton);
  }
}
// scramble input
function scrambler(){
  var output = [];
  var tempNum = 0;
  for (var i = 0; i < 5; i++){
    tempNum = Math.floor(Math.random()*questionList.length);
    if(output.includes(tempNum)){
      i--;
    }
    else{
      output.push(tempNum);
    }
  }
  return output;
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
  submit.addEventListener("click", storeHS);
  form.appendChild(lable);
  form.appendChild(input);
  form.appendChild(submit);
  buttons.appendChild(form);
}
/**
 * Function to store new HS (high scores) into local storage in the browser
 * @param {*} event 
 */
function storeHS(){

  var currentName = document.querySelector(".form-submit-text").value.trim();
  var currentScore = {
    name: currentName,
    score: score
  }
  hs.push(currentScore);

  localStorage.setItem("hs", JSON.stringify(hs));

  printHS();

}

function printHS(){
  // clear the page
  clearPage();
  header.setAttribute("hidden", "hidden");
  title.textContent = "High Scores:";
  //create sorted list object
  var order = document.createElement("ol");
  var temp;

  //sort the High scores highest to lowest
  for (var i = 0; i < hs.length; i++){
    for (var j = i; j < hs.length; j++){
      if(hs[i].score < hs [j].score){
        temp = hs[i];
        hs[i] = hs[j];
        hs[j] = temp;
      }
    }
  }

  //append all hs items to the list
  for (var i = 0; i < hs.length; i++){
    var item = document.createElement("li");
    item.textContent = hs[i].name + " - " + hs[i].score;
    order.appendChild(item);
  }

  //add list to body
  body.appendChild(order);

  //add button to go back to landing page 
  var back = document.createElement("button");
  back.textContent = "Main Menu";
  back.addEventListener("click", function(event) {
    //prevent default
    event.preventDefault();
    //get the input box
    landingPage();
  })
  buttons.appendChild(back);

  //add button to clear the local storage
  var clear = document.createElement("button");
  clear.textContent = "Clear High Score List";
  clear.addEventListener("click", function(event) {
    //prevent default
    event.preventDefault();
    //delete local storage
    localStorage.setItem("hs", null);
    //reload HS
    loadHS();
    //reload HS page
    printHS();
  })
  buttons.appendChild(clear);


}
/**
 * Check the local storage for HS and if there load them
 */
function loadHS(){
  // get hs from local storage
  var temp = JSON.parse(localStorage.getItem("hs"));
  // if not null store as hs
  if (temp !== null){
    hs=temp;
  }
  //if null make empty
  else{
    hs=[];
  }
}
/**
 * Update user they provided a right answer
 */
function correctAns(){
  //pring correct response
  showAnswer("Correct!");
  number ++;
  displayQs()
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
  number ++;
  displayQs()
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
  //check if header is hidden
  
  var test = header.getAttribute("hidden");
  if(test){
    header.removeAttribute("hidden");
  }
  title.textContent = "";
  body.textContent = "";
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }
  main.style.textAlign = "left";
  while (buttons.firstChild) {
    buttons.removeChild(buttons.firstChild);
  }
}

//init activities
landingPage();
loadHS();

//test things here

//landingPage();
//correctAns();
//quizFinish();

//////////////////////////////
/* Add in quiz objects here */
//////////////////////////////

let questionList = [
  {
    "question": "Javascript is an _______ language?", 
    "options": ["Object-Oriented", "Object-Based", "Procedural", "None of the above"], 
    "answer": 0
  },
  {
    "question": "Which of the following keywords is used to define a variable in Javascript?", 
    "options": ["var", "let", "var and let", "None of the above"], 
    "answer":2 
  },
  {
    "question": "Which of the method is used to get HTML element in javascript?", 
    "options":["getElementbyId()", "getElementsByClassName()", "Both getElementbyId() and getElementsByClassName()", "None of the above"], 
    "answer":2
  },
  {
    "question": "What does NaN means?", 
    "options": ["Negative Number", "Not a Number", "Negative Nancy"], 
    "answer": 1
  },
  {
    "question": "How do we put Javascript inside HTML?", 
    "options":["js", "javascript", "scripting", "script"], 
    "answer":3
  },
  {
    "question": "The 'let' and 'var' are known as:", 
    "options":["Declaration statements", "Prototypes", "Data Types", "Keywords"], 
    "answer":1
  },
  {
    "question": "Which one is not a comparison operator?", 
    "options":["=", "<", ">", "!="], 
    "answer":0
  },
  {
    "question": "What does DOM stands for in javascript?", 
    "options":["Document Object Model", "Document Object Manipulation", "Document Objective Model"], 
    "answer":1
  },
  {
    "question": "Where do you add javacript in the html file?", 
    "options":["<head>", "<body>", "<footer>"], 
    "answer":1
  }
];
//questionList[1] = {question: "", options:["", "", "", ""], answer:2};
//questionList[1] = {question: "", options:["", "", "", ""], answer:2};
//questionList[1] = {question: "", options:["", "", "", ""], answer:2};