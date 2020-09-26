import React from "react";
import "./track.css";

import { startTrackCall, stopTrackCall } from "../apis/calls";

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: undefined,
    };

    this.totalSeconds = 0.0;
    this.totalMinutes = 0.0;
    this.totalHours = 0.0;
    this.totalDays = 0.0;
  }

  startTrack = () => {
    let { track } = this.props;
    track.start = Date.now();

    startTrackCall(track)
      .then((response) => {
        console.log("start track call", response);
        this.setState({ timer: response.timer });
      })
      .catch((error) => {
        console.error("start track call", error);
      });
  };

  stopTrack = () => {
    let { timer } = this.state;
    if (!timer) return;

    timer.stop = Date.now();
    stopTrackCall(timer)
      .then((data) => {
        console.log("stop track call", data);
      })
      .catch((error) => {
        console.error("stop track call", error);
      });
  };

  totalTrackTime = () => {
    let { track } = this.props;
    for (let i = 0; i < track.timers.length; i++) {
      let timer = track.timers[i];
      if (!timer.stop_time || !timer.start_time) continue;

      let totalMiliSeconds = timer.stop_time - timer.start_time;
      this.totalSeconds = this.totalSeconds + totalMiliSeconds / 1000;
      this.totalMinutes = this.totalMinutes + totalMiliSeconds / (1000 * 60);
      this.totalHours = this.totalHours + totalMiliSeconds / (1000 * 60 * 60);
      this.totalDays +=
        this.totalDays + totalMiliSeconds / (1000 * 60 * 60 * 24);
    }
    this.setState({ calculated: true });
  };

  render() {
    let { track } = this.props;

    return (
      <div className="track">
        <div className="name">{track.track_label}</div>
        <button type="button" onClick={this.startTrack}>
          Start
        </button>
        <button type="button" onClick={this.stopTrack}>
          Stop
        </button>
        <div className="time-info">
          <div className="hours"> H: {this.totalHours.toFixed(1)}</div>
          <div className="minutes">M:{this.totalMinutes.toFixed(1)}</div>
          <div className="seconds">S:{this.totalSeconds.toFixed(1)}</div>
          <div className="days">D: {this.totalDays.toFixed(1)}</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.totalTrackTime();
  }
}

export default Track;
