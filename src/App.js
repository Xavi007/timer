import React from "react";
import "./App.css";

import { createTrackCall, fetchTracksCall } from "./apis/calls";

import Track from "./Track/Track";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };
  }
  createTrack = () => {
    const label = this.labelInput.value;
    if (!label) return;
    console.log("LABEL", label);
    createTrackCall({ label: label })
      .then(() => {
        console.log("response 1");
        this.fetchTracks();
      })
      .catch((error) => {
        console.error("CREATE track call", error);
      });
  };

  render() {
    let { tracks } = this.state;
    return (
      <div className="time-tracker">
        {tracks &&
          tracks.map((track, index) => {
            return <Track key={index} track={track} />;
          })}

        <div className="new-track">
          <input name="label" type="text" />
          <button type="button" onClick={this.createTrack}>
            Add
          </button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log("fetch 3", fetchTracksCall);
    this.fetchTracks();
    this.labelInput = document.querySelector('input[name="label"]');
  }

  fetchTracks = () => {
    fetchTracksCall()
      .then((data) => {
        console.log("FETCH tracks call", data);
        this.setState({ tracks: data.tracks });
      })
      .catch((error) => {
        console.error("FETCH tracks call", error);
      });
  };
}

export default App;
