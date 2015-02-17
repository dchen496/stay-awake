"use strict"

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.alarms.create("checkAwake", {
    periodInMinutes: 1 / 10.0
  });
  chrome.alarms.onAlarm.addListener(alarmListener);
  chrome.runtime.onMessage.addListener(messageListener);
});

function alarmListener(alarm) {
  switch(alarm.name) {
  case "checkAwake":
    checkAwake();
  }
}

function messageListener(message, sender, sendResponse) {
  switch(message) {
  case "closeWindow":
    closeWindow();
  }
}

function checkAwake() {
  chrome.app.window.create("check-awake.html", {
    id: "checkAwakeWindow",
    frame: "none",
    alwaysOnTop: true,
    resizable: false,
    innerBounds: {
      maxWidth: 350,
      maxHeight: 275
    }
  });
}

function closeWindow() {
  var win = chrome.app.window.get("checkAwakeWindow");
  if(win != null) {
    win.close();
  }
}
