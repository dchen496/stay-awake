appId = "lpfgnfikggnigahfoflahmjpfeafjiim";

chrome.browserAction.onClicked.addListener(toggleAppState);
chrome.runtime.onMessageExternal.addListener(extMessageListener);


chrome.runtime.sendMessage(appId, "getState", function(state) {
  setIcon(state);
});

function extMessageListener(message, sender) {
  console.log("ext message: ", message);
  setIcon(message);
}

function setIcon(message) {
  switch(message) {
  case "enabled":
    var icon = getCircle('green', 'darkgreen');
    chrome.browserAction.setIcon({imageData: {'38': icon}});
    break;
  case "disabled":
    var icon = getCircle('red', 'darkred');
    chrome.browserAction.setIcon({imageData: {'38': icon}});
    break;
  }
}

function toggleAppState() {
  chrome.runtime.sendMessage(appId, "getState", {}, function(state) {
    if(state === "enabled") {
      chrome.runtime.sendMessage(appId, "disable");
    } else {
      chrome.runtime.sendMessage(appId, "enable");
    }
  })
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
