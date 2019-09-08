$(document).ready(function(){
    var questions = [
        {
            question: "How many eyelids does a cat have?",
            answerOptions: ["1","4","2","3"],
            correctAnswer: 3,
            img: "../unit-4-game/assets/images/Kitty_1.jpeg",
            img2:"../unit-4-game/assets/images/Kitty_2.jpeg",
            answerExplanation: "In addition to an upper and lower eyelid, cats have a third eyelid which acts as an extra layer of protection."
        },
        {
            question: "Guess the age of the oldest living cat.",
            answerOptions: ["17","25","38","42"],
            correctAnswer: 0,
            img: "../unit-4-game/assets/images/Kitty_1.jpeg",
            img2:"../unit-4-game/assets/images/Kitty_2.jpeg",
            answerExplanation: "A kitty from Texas named Creme Puff lived to be 38 years old!"
        }];

var randomQuestionSelector;
var pick;
var startTime = 20;
var timer1;
var timerRunning = false;
var holder = [];
var newArray = [];
var usersSelection = "";
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
    $("#start").html("<h3>" + startTime + "</h3>");
    startTime--;

    if (startTime === 0) {
        unanswered++;
        stop(); 
        $("#answerArea").html("<p>The correct answer is: " + pick.answerOptions[pick.correctAnswer] + "<br>" + pick.answerExplanation + "</p>");
        hideImg();
    }
  }
  
  function stop() {
    timerRunning = false;
    clearInterval(timer1);
  }
  

  function displayQuestions(){
    randomQuestionSelector = (Math.floor(Math.random() * questions.length));
    pick = questions[randomQuestionSelector];

    $("#questionArea").html("<h2>" + pick.question + "</h2>");
    for(var i = 0; i < pick.answerOptions.length; i++) {
        var usersChoice = $("<div>");
        usersChoice.addClass("answerOpt");
        usersChoice.html(pick.answerOptions[i]);
        usersChoice.attr("questionVal", i);
        $("#answerArea").append(usersChoice);
		}
    
    $(".answerOpt").on("click", function () {
        usersSelection = parseInt($(this).attr("questionVal"));
        if (usersSelection === pick.correctAnswer) {
            stop();
            correctAnswerCount++;
            usersSelection="";
            $("#answerArea").html("<p>Great Job!" + "<br>" + pick.answerExplanation + "</p>");
            hideImg();
    
        } else if (usersSelection !== pick.correctAnswer) {
            stop();
            wrongAnswerCount++;
            usersSelection="";
            $("#answerArea").html("<p>Oh no! That's incorrect. " + "<br>" + "The correct answer is: " + pick.answerOptions[pick.correctAnswer] + "<br>" + pick.answerExplanation + "</p>");
            hideImg();
        }
    })
}

    function hideImg () {
        $("#answerArea").append("<img src=" + pick.img + ">");
        newArray.push(pick);
        questions.splice(randomQuestionSelector,1);
    
        var hideImage = setTimeout(function(){
            $("#answerArea").empty();
            startTime= 20;

        if ((wrongAnswerCount + correctAnswerCount + unanswered) === total) {
            $("#questionArea").empty();
            $("#questionArea").html("<h3>Your scores : </h3>");
            $("#answerArea").append("<h4>Correct: " + correctAnswerCount + "</h4>" );
            $("#answerArea").append("<h4>Incorrect: " + wrongAnswerCount + "</h4>" );
            $("#answerArea").append("<h4>Unanswered: " + unanswered + "</h4>" );
            $("#reset").show();
            correctAnswerCount = 0;
            wrongAnswerCount= 0;
            unanswered = 0;
    
        } else {
            run();
            displayQuestions();
        }
        }, 4000);
    }
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerArea").empty();
        $("#questionArea").empty();
        for(var i = 0; i < holder.length; i++) {
            questions.push(holder[i]);
        }
        run();
        displayQuestions();
    })
    
});
