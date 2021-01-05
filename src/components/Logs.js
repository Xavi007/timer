import React from "react";
import "./logs.css";

import { feedback } from "../utils";

import { mockLogs } from "../apis/mocks";

import { twoDigitify } from "../utils";

import Feedback from "./Feedback";

const Logs = (props) => {
  let { logStore } = props;
  console.log("logs", logStore.logs);

  return (
    <div className="logs">
      {logStore.logs.reverse().map((logDay, index) => {
        const refDay = new Date(logDay.day);
        return (
          <div className="log" key={index}>
            <div className="title day">
              {twoDigitify(refDay.getDate())}/
              {twoDigitify(refDay.getMonth() + 1)}/{refDay.getFullYear()}
            </div>
            <div className="tracker">
              {logDay.logs.reverse().map((log, index) => {
                const logTime = new Date(log.time);
                return (
                  <div className="tracks" key={index}>
                    {twoDigitify(logTime.getHours())}:
                    {twoDigitify(logTime.getMinutes())}
                    <Feedback feedback={log.feedback} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Logs;
