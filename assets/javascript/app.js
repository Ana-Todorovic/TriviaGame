$(document).ready(function(){
    var questions = [
        {
            question: "What is 2+2?",
            answerOptions: ["5","4","2","0"],
            correctAnswer: 1,
            img: "../unit-4-game/assets/images/Kitty_1.jpeg",
            answerExplanation: "Adding 2 with another 2 equals to 4."
        },
        {
            question: "What is 2+3?",
            answerOptions: ["5","4","2","0"],
            correctAnswer: 0,
            img: "../unit-4-game/assets/images/Kitty_1.jpeg",
            answerExplanation: "Adding 2 with 3 equals to 5."
        }];

var randomQuestionSelector;
var pick;
var startTime = 20;
var timer1;
var timerRunning = false;
var holder = [];
var newArray = [];
var usersChoice = "";
var wrongAnswerCount = 0;
var correctAnswerCount = 0;
var unanswered = 0;
var total = questions.length;

$("#reset").hide();
$("#startBtn").on("click", function () {
    $("#startBtn").hide();
    displayQuestions();
    run();
    for(var i = 0; i < questions.length; i++) {
holder.push(questions[i]);
}
})

function run() {
    if (!timerRunning){
    timer1 = setInterval(decrement, 1000);
    timerRunning = true;
    }
  }

  function decrement() {
    $("#start").html("<h4>" + startTime + "</h4>");
    startTime--;

    if (startTime === 0) {
        unanswered++;
        stop(); 
      // See why this message doesn't work.
      $("#answerSelector").html("<h4>Time is up! The correct answer is: " + pick.answerOptions[pick.correctAnswer] + "</h4>");
      hideImg();
    }
  }
  function stop() {
    timerRunning = false;
    clearInterval(timer1);
  }
  run();

  function displayQuestions(){
    randomQuestionSelector = (Math.floor(Math.random() * questions.length));
    pick = questions[randomQuestionSelector];

    $("#questionSelector").html("<h2>" + pick.question + "</h2>");
    for(var i = 0; i < pick.answerOptions.length; i++) {
        var usersChoice = $("<div>");
        usersChoice.addClass("answerOpt");
        usersChoice.html(pick.answerOptions[i]);
        usersChoice.attr("questionVal", i);
        $("#answerSelector").append(usersChoice);
		}
    }
    $(".answerOpt").on("click", function () {
        usersChoice = parseInt($(this).attr("questionVal"));
        if (usersChoice === pick.correctAnswer) {
            stop();
            correctAnswerCount++;
            usersChoice="";
            $("#answerSelector").html("<p>Correct!</p>");
            hideImg();
    
        } else {
            stop();
            wrongAnswerCount++;
            usersChoice="";
            $("#answerSelector").html("<p>Wrong! The correct answer is: " + pick.answerOptions[pick.answer] + "</p>");
            hideImg();
        }
    })
    function hideImg () {
        $("#answerSelector").append("<img src=" + pick.img + ">");
        newArray.push(pick);
        questions.splice(randomQuestionSelector,1);
    
        var hideimage = setTimeout(function() {
            $("#answerSelector").empty();
            timer= 20;

        if ((wrongAnswerCount + correctAnswerCount + unanswered) === total) {
            $("#questionSelector").empty();
            $("#questionSelector").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerSelector").append("<h4> Correct: " + correctAnswer + "</h4>" );
            $("#answerSelector").append("<h4> Incorrect: " + wrongAnswer+ "</h4>" );
            $("#answerSelector").append("<h4> Unanswered: " + unanswered + "</h4>" );
            $("#reset").show();
            correctAnswerCount = 0;
            wrongAnswerCount= 0;
            unanswered = 0;
    
        } else {
            run();
            displayQuestions();
    
        }
        }, 3000);
    }
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerSelector").empty();
        $("#questionSelector").empty();
        for(var i = 0; i < holder.length; i++) {
            questions.push(holder[i]);
        }
        run();
        displayQuestions();
    })
    
});


// TODO: When timer reachs 0 send it to a page with an image