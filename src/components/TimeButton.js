import React from "react";
import "./time-button.css";

import { Button } from "../util-components";

class TimeButton extends React.Component {
  render() {
    let { isNotifyPermit } = this.state;
    console.log(" TimeButton STATE", isNotifyPermit);
    let { startTimer } = this.props;
    return (
      <div className="time-button">
        {!isNotifyPermit && (
          <Button type="secondary" action={this.setupNotify}>
            Notify
          </Button>
        )}
        {isNotifyPermit && (
          <Button type="secondary" action={startTimer}>
            Start
          </Button>
        )}
      </div>
    );
  }

  constructor(props) {
    super(props);

    let isNotifyPermit = Notification.permission === "granted";

    this.state = { isNotifyPermit };
  }

  componentDidMount() {}
  componentWillUnmount() {}

  setupNotify = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification("Permission already granted!");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Granted!");
          this.setState({ isNotifyPermit: true });
        }
      });
    }
  };
}

export default TimeButton;
