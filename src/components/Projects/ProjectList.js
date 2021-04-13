import React from "react";
import "./project-list.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

import { projectListStore, setProjectList } from "../../utils/redux";
import { getLocalProjects } from "../../utils";

import { Button } from "../../util-components";

const ProjectList = () => {
  const { projectList } = projectListStore.getState();

  console.log("PROJECT LIST", projectList);

  return (
    <div className="project-list">
      {projectList.map((project, index) => {
        return (
          <div className="project" key={index}>
            <span>{project}</span>{" "}
            <Button type="secondary">
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button
              type="secondary"
              action={() => {
                deleteProject(project);
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

const deleteProject = (name) => {
  if (window.confirm("Are you sure?")) {
    localStorage.removeItem("project:" + name);

    const { projectList } = getLocalProjects();
    projectListStore.dispatch(setProjectList(projectList));
  }
};

export default ProjectList;
