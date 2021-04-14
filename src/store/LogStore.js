import { feedback } from "../utils";

export class LogStore {
  constructor(project) {
    this.project = project;
    const oldStore = JSON.parse(localStorage.getItem(project));
    this.projectStore = oldStore;
    this.logs = oldStore.logs || [];

    return this;
    // get from local storage
    // or initiate a fresh
  }

  start = () => {
    return new Promise((resolve, reject) => {
      const currentTime = new Date(Date.now());
      const log = {
        time: currentTime,
        feedback: feedback.okay,
      };

      const isDayLogged = this.logs.some((logDay, i) => {
        if (!logDay) return false;

        if (this.matchDate(new Date(logDay.day), currentTime)) {
          logDay.logs.push(log);
          return true;
        } else return false;
      });

      if (!isDayLogged) {
        const dayRef = new Date(Date.now());

        dayRef.setHours(0);
        dayRef.setMinutes(0);
        dayRef.setSeconds(0);
        dayRef.setMilliseconds(0);

        const dayLog = {
          day: dayRef,
          logs: [],
        };

        dayLog.logs.push(log);
        this.logs.push(dayLog);
      }

      try {
        this.projectStore.logs = this.logs;
        localStorage.setItem(this.project, JSON.stringify(this.projectStore));
        resolve(this);
      } catch {
        reject();
      }
    });
  };

  update = () => {
    return new Promise((resolve, reject) => {
      try {
        this.projectStore.logs = this.logs;
        localStorage.setItem(this.project, JSON.stringify(this.projectStore));
        resolve(this);
      } catch (err) {
        reject(err);
      }
    });
  };

  matchDate = (date1, date2) => {
    if (!(date1 instanceof Date)) console.error("Date1 is not type date");
    if (!(date2 instanceof Date)) console.error("Date2 is not type date");

    const isSameDate = date1.getDate() === date2.getDate();
    const isSameMonth = date1.getMonth() === date2.getMonth();
    const isSameYear = date1.getFullYear() === date2.getFullYear();

    return isSameDate && isSameMonth && isSameYear;
  };
}
