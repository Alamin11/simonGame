//alert("Connected");
//$("h1").css("color", "green");

var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var startFlag = false;
var level = 0;



$(document).keypress(function () {
    if (!startFlag) {
        $("#level-title").text("Level " + level);
        nextSequence();

        startFlag = true;
    }
});


$(".btn").click(function () {
    var userChoosenColor = $(this).attr("id");
    //console.log(userChoosenColor);
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animateOnPress(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
    //console.log(userClickedPattern);
});

//Checking the answer 
function checkAnswer(currentLevel) {
    //Check the user clicked sequence with the game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // console.log("success, correct color choosen");
        //calling the next sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence(), 1000);
        } else {

        }

    } else {
        //console.log("Choose correct color first");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//restarting the game 
function startOver() {
    level = 0;
    gamePattern = [];
    startFlag = false;
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    //console.log(randomNumber);
    var randomChoosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChoosenColor + ".mp3");
    audio.play();

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//button animation
function animateOnPress(currentColor) {
    let btnSelector = $("#" + currentColor);
    btnSelector.addClass("pressed");
    //setting a time interval before removing a class
    setTimeout(function () {
        btnSelector.removeClass("pressed")
    }, 100);

}



