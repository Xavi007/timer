import React from "react";
import "./App.css";

import TimeButton from "./components/TimeButton";
import Timer from "./components/Timer";

import { Button, Header, Content, Footer } from "./util-components";

let beforeInstallPrompt = undefined;

class App extends React.Component {
  render() {
    let { isRunning } = this.state;
    console.log(" App STATE", isRunning);

    return (
      <div className="App">
        <Header>Header</Header>
        <Content>
          <Timer ref={this.timerRef} reset={this.reset} />
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

    let isRunning = false;

    this.state = { isRunning };

    this.timerRef = React.createRef();
  }

  componentDidMount() {
    beforeInstall();
    installUserChoice();
  }
  componentWillUnmount() {}

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
