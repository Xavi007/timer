import React from "react";
import "./log-parent.css";

import { LogStore } from "../../store/LogStore";

import Timer from "./Timer";
import Logs from "./Logs";

class LogParent extends React.Component {
  updateLogs = (logStore) => {
    this.setState({ logStore, isFeedbackTime: false });
  };

  getFeedback = () => {
    this.setState({ isFeedbackTime: true });
  };
  render() {
    let { logStore, isFeedbackTime } = this.state;
    console.log(" LogParent STATE", logStore);

    return (
      <div className="log-parent">
        <h4>{this.props.projectName}</h4>
        <Timer
          ref={this.timerRef}
          reset={this.reset}
          logStore={logStore}
          updateLogs={this.updateLogs}
          getFeedback={this.getFeedback}
        />

        <Logs
          logStore={logStore}
          isFeedbackTime={isFeedbackTime}
          updateLogs={this.updateLogs}
        />
      </div>
    );
  }

  constructor(props) {
    super(props);

    let { projectName } = this.props;
    let logStore = new LogStore("project:" + projectName);
    let isFeedbackTime = false;

    this.state = { logStore, isFeedbackTime };

    this.timerRef = React.createRef();
  }

  componentDidMount() {}
  componentWillUnmount() {}
}

export default LogParent;
