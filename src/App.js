import React from "react";
import "./App.css";

let beforeInstallPrompt = undefined;

const App = () => {
  beforeInstall();
  installUserChoice();

  return (
    <div className="App">
      <div className="timer">30 mins</div>
      {Notification.permission !== "granted" && (
        <button type="button" onClick={setupNotify}>
          Notify
        </button>
      )}
      {Notification.permission === "granted" && (
        <button type="button" onClick={startTimer}>
          Start
        </button>
      )}
      <button type="button" onClick={install}>
        Install
      </button>
    </div>
  );
};

const setupNotify = () => {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    new Notification("Permission already granted!");
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Granted!");
      }
    });
  }
};

const startTimer = () => {
  // reset timer to 30 mins
  // start countdown
  // notify on time up
};

const beforeInstall = () => {
  window.addEventListener("beforeinstallprompt", (e) => {
    beforeInstallPrompt = e;
  });
};

const installUserChoice = () => {
  console.log("user choice", beforeInstallPrompt);

  if (!beforeInstallPrompt) return;
  beforeInstallPrompt.userChoice.then((choice) => {
    console.log("USER INSTALL", choice.outcome);
  });
};

const install = () => {
  console.log("install", beforeInstallPrompt);
  if (!beforeInstallPrompt) return;

  beforeInstallPrompt.prompt();
};

export default App;
