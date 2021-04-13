import React from "react";
import "./project-input.css";

import { Button } from "../../util-components";

import { projectListStore, setProjectList } from "../../utils/redux";

class ProjectInput extends React.Component {
  render() {
    let { projectName } = this.state;
    console.log(" ProjectInput STATE", projectName);

    return (
      <div className="project-input">
        <input
          type="text"
          placeholder="project name"
          value={projectName}
          onChange={this.updateProjectName}
          onKeyPress={this.keyPressDown}
        />
        <Button type="primary" action={this.addProject}>
          Add
        </Button>
      </div>
    );
  }

  constructor(props) {
    super(props);

    let projectName = "";

    this.state = { projectName };
  }

  componentDidMount() {}
  componentWillUnmount() {}

  addProject = () => {
    let { projectName } = this.state;

    console.log("PROJECT NAME", projectName, this.state);
    if (!projectName) return;

    localStorage.setItem("project:" + projectName, "");

    this.setState({ projectName: "" });

    const { projectList } = projectListStore.getState();

    projectList.push(projectName);

    projectListStore.dispatch(setProjectList(projectList));
  };

  updateProjectName = (event) => {
    this.setState({ projectName: event.target.value });
  };

  keyPressDown = (event) => {
    switch (event.key) {
      case "Enter": {
        this.addProject();
        return true;
      }
      default: {
        return false;
      }
    }
  };
}

export default ProjectInput;
