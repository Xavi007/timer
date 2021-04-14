import React from "react";
import "./project-list.css";

import { Link } from "react-router-dom";

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
      {projectList.map((projectName, index) => {
        const project = JSON.parse(
          localStorage.getItem("project:" + projectName)
        );

        return (
          <Link
            to={`/project/${project.projectID}/${projectName}`}
            key={project.projectID}
          >
            <div className="project">
              <span>{projectName}</span>{" "}
              <Button type="secondary">
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button
                type="secondary"
                action={(e) => {
                  console.log("action event", e);
                  e.preventDefault();
                  deleteProject(projectName);
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </div>
          </Link>
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
