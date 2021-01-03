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
