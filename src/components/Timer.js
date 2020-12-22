import React from "react";
import "./timer.css";

import { timeUpNotification } from "../utils/notifications";

class Timer extends React.Component {
  startTimer = () => {
    let { minutes } = this.state;

    if (minutes !== 30) this.setState({ minutes: 30 });

    this.setupInterval();
  };

  render() {
    let { minutes } = this.state;
    console.log(" Timer STATE", minutes);

    return <div className="timer">{minutes} mins</div>;
  }

  constructor(props) {
    super(props);

    let minutes = 30;

    this.state = { minutes };
  }

  componentDidMount() {}
  componentWillUnmount() {
    clearInterval(this.minuteInterval);
  }

  setupInterval = () => {
    this.minuteInterval = setInterval(() => {
      let { minutes } = this.state;
      this.setState({ minutes: minutes - 1 }, () => {
        let { minutes } = this.state;
        if (minutes === 0) {
          timeUpNotification();
          clearInterval(this.minuteInterval);
          let { reset } = this.props;
          reset();
        }
      });
    }, 60 * 1000);
  };
}

export default Timer;
