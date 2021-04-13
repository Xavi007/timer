import React from "react";
import "./App.css";

import Timer from "./components/Timer";
import Logs from "./components/Logs";

import { ProjectList, ProjectInput } from "./components/Projects";

import { Button, Header, Content, Footer } from "./util-components";

import { LogStore } from "./store/LogStore";

let beforeInstallPrompt = undefined;

class App extends React.Component {
  updateLogs = (logStore) => {
    this.setState({ logStore, isFeedbackTime: false });
  };

  getFeedback = () => {
    this.setState({ isFeedbackTime: true });
  };

  render() {
    let { dayLogs, logStore, isFeedbackTime } = this.state;
    console.log(" App STATE", dayLogs);

    return (
      <div className="App">
        <Header>Header</Header>
        <Content>
          <Timer
            ref={this.timerRef}
            reset={this.reset}
            logStore={logStore}
            updateLogs={this.updateLogs}
            getFeedback={this.getFeedback}
          />
          <ProjectList />
          {/*<Logs
            logStore={logStore}
            isFeedbackTime={isFeedbackTime}
            updateLogs={this.updateLogs}
          /> */}
        </Content>
        <Footer>
          {/*
          <Button type="primary" onClick={install}>
            Install
          </Button>
          */}
          <ProjectInput />
        </Footer>
      </div>
    );
  }

  constructor(props) {
    super(props);

    // let dayLogs = mocksLogs;
    let logStore = new LogStore();
    let isFeedbackTime = false;

    this.state = { logStore, isFeedbackTime };

    this.timerRef = React.createRef();
  }

  componentDidMount() {
    beforeInstall();
    installUserChoice();
  }
  componentWillUnmount() {}
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
