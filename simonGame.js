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
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success, correct color choosen");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence(), 1000);
        }

    } else {
        console.log("Choose correct color first");
    }
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


// nextSequence();
