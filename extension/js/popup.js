$("#toggle").click(function() {
  console.log("here");
  chrome.runtime.sendMessage("toggle");
});
