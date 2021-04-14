import React from "react";
import "./timer.css";

import { timeUpNotification } from "../../utils/notifications";

import TimeButton from "../TimeButton";

class Timer extends React.Component {
  render() {
    let { minutes, isRunning } = this.state;
    console.log(" Timer STATE", minutes);

    return (
      <div className="timer">
        <div className="minutes">{minutes} mins</div>
        {!isRunning && <TimeButton startTimer={this.startTimer} />}
      </div>
    );
  }

  constructor(props) {
    super(props);

    let minutes = 30;
    let isRunning = false;

    this.state = { minutes, isRunning };
  }

  componentDidMount() {}
  componentWillUnmount() {
    clearInterval(this.minuteInterval);
  }

  recordStartTime = () => {};

  setupInterval = () => {
    this.minuteInterval = setInterval(() => {
      let { minutes } = this.state;
      this.setState({ minutes: minutes - 1 }, () => {
        let { minutes } = this.state;
        if (minutes === 0) {
          this.setState({ isRunning: false }, () => {
            let notification = timeUpNotification();
            notification.onclick = (e) => {
              console.log("NOTIFICATION CLICK", e);
              window.focus();
              let { getFeedback } = this.props;
              getFeedback();
            };
            clearInterval(this.minuteInterval);
          });
        }
      });
    }, 60 * 1000);
  };

  startTimer = () => {
    this.setState({ isRunning: true }, () => {
      let { minutes } = this.state;

      if (minutes !== 30) this.setState({ minutes: 30 });

      let { logStore } = this.props;
      console.log("START LOG", logStore);
      logStore.start().then((logStore) => {
        let { updateLogs } = this.props;
        updateLogs(logStore);
      });

      this.setupInterval();
    });
  };
}

export default Timer;
