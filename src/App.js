import React from "react";
import "./App.css";

import TimeButton from "./components/TimeButton";
import Timer from "./components/Timer";

let beforeInstallPrompt = undefined;

class App extends React.Component {
  render() {
    let { isApp } = this.state;
    console.log(" App STATE", isApp);
    return (
      <div className="App">
        <Timer ref="timer" />
        <TimeButton startTimer={this.startTimer} />
        <button type="button" onClick={install}>
          Install
        </button>
      </div>
    );
  }

  constructor(props) {
    super(props);

    let isApp = true;

    this.state = { isApp };
  }

  componentDidMount() {
    beforeInstall();
    installUserChoice();
  }
  componentWillUnmount() {}

  startTimer = () => {
    this.refs.timer.startTimer();
  };
}

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
