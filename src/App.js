import React from "react";
import "./App.css";

import TimeButton from "./components/TimeButton";
import Timer from "./components/Timer";

import { Button } from "./util-components";

let beforeInstallPrompt = undefined;

class App extends React.Component {
  render() {
    let { isRunning } = this.state;
    console.log(" App STATE", isRunning);
    return (
      <div className="App">
        <Timer ref="timer" reset={this.reset} />
        {!isRunning && <TimeButton startTimer={this.startTimer} />}
        <Button type="primary" onClick={install}>
          Install
        </Button>
      </div>
    );
  }

  constructor(props) {
    super(props);

    let isRunning = false;

    this.state = { isRunning };
  }

  componentDidMount() {
    beforeInstall();
    installUserChoice();
  }
  componentWillUnmount() {}

  startTimer = () => {
    this.setState({ isRunning: true }, this.refs.timer.startTimer());
  };

  reset = () => {
    this.setState({ isRunning: false });
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
