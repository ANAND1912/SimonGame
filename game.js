var isGamestarted = false;
var level = 0;

var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

function playSound(name) {
  var audioFilePath = 'sounds/' + name + '.mp3';
  var audio = new Audio(audioFilePath);
  audio.play()
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');
  setTimeout(function() {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}


function startGame(){
  if (!isGamestarted) {
    isGamestarted = true;
    level = 0;
    $('#level-title').text("Level 0");
    nextSequence();
  }
}


$(document).keypress(startGame);


$('span').click(startGame);

function nextSequence() {
  level++;
  userClickedPattern = [];
  $('#level-title').text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function endGame() {
  var audio = new Audio('sounds/wrong.mp3');
  audio.play()
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over")
  }, 100);
  isGamestarted = false;
  gamePattern = [];
  userClickedPattern =[];
  $('#level-title').html("Game Over.Press A Key to Start or <span class = 'startSpan'>click here</span> to Start");
  $('span').click(startGame);
}


$(".btn").click(function() {
  debugger;
  if (isGamestarted && (gamePattern.length > userClickedPattern.length)) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var lastIndexInUserClickedPattern = userClickedPattern.length - 1;
    if (gamePattern[lastIndexInUserClickedPattern] === userClickedPattern[lastIndexInUserClickedPattern]) {
      playSound(userChosenColour);
      animatePress(userChosenColour);
      if (gamePattern.length === userClickedPattern.length) {
        setTimeout(nextSequence,600);
      }
    } else {
      endGame();
    }

  } else {
    endGame();
  }

});
