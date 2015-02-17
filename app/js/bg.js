"use strict"

var extensionId = "doopekeglgjblaaglpmmfnhbhbbahkaf";
var enabled = false;
disable();
chrome.alarms.onAlarm.addListener(alarmListener);
chrome.runtime.onMessage.addListener(messageListener);
chrome.runtime.onMessageExternal.addListener(extMessageListener);
chrome.app.runtime.onLaunched.addListener(function() {
  enable();
});

function alarmListener(alarm) {
  // Just in case the extension died at some point.
  chrome.runtime.sendMessage(extensionId, "enabled");
  switch(alarm.name) {
  case "checkAwake":
    checkAwake();
    break;
  }
}

function messageListener(message, sender, sendResponse) {
  console.log("message: ", message);
  switch(message) {
  case "closeWindow":
    closeWindow();
    break;
  }
}

function extMessageListener(message, sender) {
  console.log("ext message: ", message);
  switch(message) {
  case "enable":
    enable();
    break;
  case "disable":
    disable();
    break;
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

function enable() {
  enabled = true;
  chrome.alarms.create("checkAwake", {
    periodInMinutes: 1
  });
  chrome.runtime.sendMessage(extensionId, "enabled");
}

function disable() {
  enabled = false;
  chrome.alarms.clear("checkAwake");
  chrome.runtime.sendMessage(extensionId, "disabled");
}
