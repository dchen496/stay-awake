appId = "lpfgnfikggnigahfoflahmjpfeafjiim";

chrome.browserAction.onClicked.addListener(toggleAppState);
chrome.runtime.onMessageExternal.addListener(extMessageListener);

var enabledIcon = getCircle('green', 'darkgreen');
var disabledIcon = getCircle('red', 'darkred');

var enabled = false;
disable();

function extMessageListener(message, sender) {
  console.log("ext message: ", message);
  switch(message) {
  case "enabled":
    enable();
    break;
  case "disabled":
    disable();
    break;
  }
}

function toggleAppState() {
  if(enabled) {
    chrome.runtime.sendMessage(appId, "disable");
  } else {
    chrome.runtime.sendMessage(appId, "enable");
  }
}

function enable() {
  chrome.browserAction.setIcon({imageData: {'38': enabledIcon}});
  enabled = true;
}

function disable() {
  chrome.browserAction.setIcon({imageData: {'38': disabledIcon}});
  enabled = false;
}

function getCircle(fillColor, strokeColor) {
  var c = document.createElement("canvas");
  c.width = 38;
  c.height = 38;
  var ctx = c.getContext("2d");
  var cx = c.width / 2;
  var cy = c.height / 2;

  ctx.beginPath();
  ctx.arc(cx, cy, 16, 0, 2 * Math.PI, false);
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = strokeColor;
  ctx.stroke();

  return ctx.getImageData(0, 0, c.width, c.height);
}
