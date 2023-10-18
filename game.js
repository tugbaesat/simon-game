let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];

let level = 0;
let currentLevel = level;

let started = false;

function play() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
}

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#text-part h2").text("Level " + level);
  $("#text-part p, #text-part button").addClass("hidden");

  let randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    let wrongCase = "wrong";
    playSound(wrongCase);
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#text-part h2").text("GAME OVER!");
    $("#text-part p").text("Press Play to Restart");
    $("#text-part button, #text-part P").removeClass("hidden");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}

function playSound(name) {
  switch (name) {
    case "blue":
      let blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "green":
      let green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "red":
      let red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "yellow":
      let yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    case "wrong":
      let wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      break;

    default:
      console.log(randomChosenColour);
      break;
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
