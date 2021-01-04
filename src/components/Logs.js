import React from "react";
import "./logs.css";

import { twoDigitify } from "../utils";

const Logs = (props) => {
  let { logStore } = props;

  return (
    <div className="logs">
      {logStore.logs.map((logDay, index) => {
        const refDay = new Date(logDay.day);
        return (
          <div className="log" key={index}>
            <div className="title day">
              {twoDigitify(refDay.getDate())}/
              {twoDigitify(refDay.getMonth() + 1)}/{refDay.getFullYear()}
            </div>
            <div className="tracker">
              {logDay.logs.reverse().map((log, index) => {
                const logTime = new Date(log);
                return (
                  <div className="tracks" key={index}>
                    {twoDigitify(logTime.getHours())}:
                    {twoDigitify(logTime.getMinutes())} <span>Up</span>
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
