import React from "react";
import "./logs.css";

import { twoDigitify } from "../utils";

const Logs = (props) => {
  let { dayLog } = props;
  return (
    <div className="logs">
      <div className="title day">
        {twoDigitify(dayLog.day.getDate())}/
        {twoDigitify(dayLog.day.getMonth() + 1)}/{dayLog.day.getFullYear()}
      </div>
      <div className="tracker">
        {dayLog.logs.reverse().map((log, index) => {
          return (
            <div className="tracks">
              {twoDigitify(log.getHours())}:{twoDigitify(log.getMinutes())}{" "}
              <span>Up</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Logs;
