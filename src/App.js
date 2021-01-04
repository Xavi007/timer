import React from "react";
import "./App.css";

import Timer from "./components/Timer";
import Logs from "./components/Logs";

import { dayLog as mocksLogs } from "./apis/mocks";

import { Button, Header, Content, Footer } from "./util-components";

import { LogStore } from "./store/LogStore";

let beforeInstallPrompt = undefined;

class App extends React.Component {
  updateLogs = (logStore) => {
    this.setState({ logStore });
  };

  render() {
    let { dayLogs, logStore } = this.state;
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
          />
          <Logs logStore={logStore} />
        </Content>
        <Footer>
          <Button type="primary" onClick={install}>
            Install
          </Button>
        </Footer>
      </div>
    );
  }

  constructor(props) {
    super(props);

    // let dayLogs = mocksLogs;
    let logStore = new LogStore();

    this.state = { logStore };

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
