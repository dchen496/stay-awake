"use strict"

var extensionId = "doopekeglgjblaaglpmmfnhbhbbahkaf";
chrome.alarms.onAlarm.addListener(alarmListener);
chrome.runtime.onMessage.addListener(messageListener);
chrome.runtime.onMessageExternal.addListener(extMessageListener);
chrome.app.runtime.onLaunched.addListener(function() {
  enable();
});
chrome.runtime.onInstalled.addListener(function() {
  disable();
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

function extMessageListener(message, sender, sendResponse) {
  console.log("ext message: ", message);
  switch(message) {
  case "enable":
    enable();
    break;
  case "disable":
    disable();
    break;
  case "getState":
    chrome.alarms.getAll(function(alarms) {
      if(alarms.length == 0) {
        sendResponse("disabled");
      } else {
        sendResponse("enabled");
      }
    });
    // asynchronous response
    return true;
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
  chrome.alarms.create("checkAwake", {
    periodInMinutes: 5
  });
  chrome.runtime.sendMessage(extensionId, "enabled");
}

function disable() {
  chrome.alarms.clear("checkAwake");
  chrome.runtime.sendMessage(extensionId, "disabled");
}
