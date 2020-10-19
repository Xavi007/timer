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

    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.

      this.beforeInstall = e;

      e.prompt();
      // this.setState({ beforeInstall: true });
      // console.log("RESULT PWA PROMPT 2", this.beforeInstall);
    });
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

  saveList = () => {
    // get all tracks;
    // create
  };

  render() {
    let { tracks } = this.state;
    return (
      <div className="time-tracker">
        <div className="new-track">
          <input name="label" type="text" placeholder="Track name" />
          <button type="button" onClick={this.createTrack}>
            Add
          </button>
        </div>
        {tracks && <div className="tracks-title">{tracks.length} tracks:</div>}
        {tracks &&
          tracks.map((track, index) => {
            return <Track key={index} track={track} />;
          })}

        {tracks && (
          <div className="save-list">
            <button type="button" className="save" onClick={this.saveList}>
              Save
            </button>
          </div>
        )}
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
