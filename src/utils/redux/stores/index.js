import { createStore } from "redux";

import { projectListReducer } from "../reducers";

import { getLocalProjects } from "../../";

export const projectListStore = createStore(
  projectListReducer,
  getLocalProjects()
);
