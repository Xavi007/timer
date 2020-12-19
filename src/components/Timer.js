import React from "react";
import "./timer.css";

class Timer extends React.Component {
  startTimer = () => {
    this.minuteInterval = setInterval(() => {
      let { minutes } = this.state;
      this.setState({ minutes: minutes - 1 }, () => {
        let { minutes } = this.state;
        if (minutes === 0) {
          new Notification("Times up!");
          clearInterval(this.minuteInterval);
        }
      });
    }, 60 * 1000);
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
}

export default Timer;
