chrome.app.runtime.onLaunched.addListener(function() {
  chrome.alarms.create("alarm", {
    periodInMinutes: 1 
  });
  chrome.alarms.onAlarm.addListener(createWindow);
});

function createWindow() {
  chrome.app.window.create("test.html", {
    frame: "none"
  });
}
