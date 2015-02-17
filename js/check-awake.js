"use strict"

var buttons = ['a', 'b', 'c', 'd'];
var button = buttons[Math.floor(Math.random() * buttons.length)];
$("#letter").html(button.toUpperCase());
$("#a, #b, #c, #d").click(buttonHandler);

var seconds = 60;
writeCountdown();
setTimeout(updateCountdown, 1000);

function updateCountdown() {
  seconds--;
  if(seconds <= 0) {
    hideCountdown();
    makeNoise();
  } else {
    writeCountdown();
    setTimeout(updateCountdown, 1000);
  }
}

function writeCountdown() {
  var suffix = seconds == 1 ? "second" : "seconds";
  var text = seconds + " " + suffix;
  $("#countdown").html(text);
  if(seconds < 20) {
    $("#countdown").css("color", "red");
  }
}

function hideCountdown() {
  $("#countdown-container").hide();
  $("#triggered-container").show();
}

function makeNoise() {
  var audio = new Audio("misc/sound.mp3");
  audio.play();
}

function buttonHandler(ev) {
  console.log($(ev.target).attr("id"));
  if($(ev.target).attr("id") === button) {
    chrome.runtime.sendMessage("closeWindow")
  }
}

