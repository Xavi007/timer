import React from "react";
import "./App.css";

import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import { ProjectList, ProjectInput } from "./components/Projects";
import { LogParent } from "./components/Logs";

import { Button, Header, Content, Footer } from "./util-components";

let beforeInstallPrompt = undefined;

const App = () => {
  beforeInstall();
  installUserChoice();

  return (
    <Router>
      <div className="App">
        <Link to="/">
          <Header>My projects</Header>
        </Link>

        <Content>
          <Switch>
            <Route path="/" exact>
              <ProjectList />
            </Route>
            <Route
              path="/project/:projectID/:projectName"
              render={({ match }) => {
                console.log("Log parent props", match.params);
                return <LogParent projectName={match.params.projectName} />;
              }}
            />
          </Switch>
        </Content>
        <Footer>
          <Switch>
            <Route path="/" exact>
              <ProjectInput />
            </Route>
            <Route path="/project/:projectID">
              <Button type="primary" onClick={install}>
                Install
              </Button>
            </Route>
          </Switch>
        </Footer>
      </div>
    </Router>
  );
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
