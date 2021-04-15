import React from "react";
import "./App.css";

import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import { ProjectList, ProjectInput } from "./components/Projects";
import { LogParent } from "./components/Logs";

import { Button, Header, Content, Footer } from "./util-components";

let beforeInstallPrompt = undefined;

const syncProjectTracks = () => {
  let url =
    "https://api.sheety.co/8162b8ece6995f7642dc10f4ef024130/persistence/sheet1";
  fetch(url, {
    headers: {
      Authorization: "Bearer $persistence_abcd",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      // Do something with the data
      console.log(json.sheet1S);
    });
};

const App = () => {
  beforeInstall();
  installUserChoice();

  syncProjectTracks();

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
