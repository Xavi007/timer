import React from "react";
import "./logs.css";

import { feedback } from "../../utils";

// import { mockLogs } from "../apis/mocks";

import { twoDigitify, sortLogDays, sortLogTracks } from "../../utils";

import Feedback from "../Feedback";

const Logs = (props) => {
  let { logStore, isFeedbackTime } = props;
  console.log("logs", logStore.logs);

  return (
    <div className="logs">
      {logStore.logs.sort(sortLogDays).map((logDay, dayIndex) => {
        const refDay = new Date(logDay.day);
        return (
          <div className="log" key={dayIndex}>
            <div className="title day">
              {twoDigitify(refDay.getDate())}/
              {twoDigitify(refDay.getMonth() + 1)}/{refDay.getFullYear()}
            </div>
            <div className="tracker">
              {logDay.logs.sort(sortLogTracks).map((log, logIndex) => {
                const logTime = new Date(log.startTime);
                return (
                  <div className="tracks" key={logIndex}>
                    {twoDigitify(logTime.getHours())}:
                    {twoDigitify(logTime.getMinutes())}
                    {!isFeedbackTime && <Feedback feedback={log.feedback} />}
                    {isFeedbackTime && log.feedback === feedback.okay && (
                      <div className="feedback-buttons">
                        <button
                          type="button"
                          className="good"
                          onClick={() => {
                            goodFeedback(
                              logStore,
                              dayIndex,
                              logIndex,
                              props.updateLogs
                            );
                          }}
                        >
                          Up
                        </button>
                        <button
                          type="button"
                          className="bad"
                          onClick={() => {
                            badFeedback(
                              logStore,
                              dayIndex,
                              logIndex,
                              props.updateLogs
                            );
                          }}
                        >
                          Down
                        </button>
                      </div>
                    )}
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

const goodFeedback = (logStore, day, log, updateLogs) => {
  logStore.logs[day].logs[log].feedback = feedback.good;
  logStore
    .update()
    .then((newLogStore) => {
      updateLogs(newLogStore);
    })
    .catch((err) => {
      console.error(err);
    });
};

const badFeedback = (logStore, day, log, updateLogs) => {
  logStore.logs[day].logs[log].feedback = feedback.bad;
  logStore
    .update()
    .then((newLogStore) => {
      updateLogs(newLogStore);
    })
    .catch((err) => {
      console.error(err);
    });
};
export default Logs;
