import { feedback } from "../utils";

const day = new Date(Date.now());

day.setHours(0);
day.setMinutes(0);
day.setSeconds(0);
day.setMilliseconds(0);

export const dayLog = {
  day: day,
  // logs: ["12:00", "13:00"],
  logs: [],
};

export const mockLogs = [
  {
    day: "2021-01-04T18:30:00.000Z",
    logs: [
      {
        time: "2021-01-05T12:19:58.678Z",
        feedback: feedback.good,
      },
    ],
  },
  {
    day: "2021-01-03T18:30:00.000Z",
    logs: [
      {
        time: "2021-01-05T12:19:58.678Z",
        feedback: feedback.okay,
      },
      {
        time: "2021-01-05T12:19:58.678Z",
        feedback: feedback.bad,
      },
      {
        time: "2021-01-05T12:19:58.678Z",
        feedback: false,
      },
    ],
  },
];
