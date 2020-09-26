import { getPostHeaders } from "./headers";

import {
  createTrackUrl,
  fetchTracksUrl,
  startTrackUrl,
  stopTrackUrl,
} from "./apis";

const createTrackCall = (track) => {
  if (!track) throw new Error("track not provided to call");

  let payload = {
    label: track.label,
  };

  var data = new FormData();
  data.append("track", JSON.stringify(payload));

  let createTrackPostHeaders = getPostHeaders();
  createTrackPostHeaders.body = data;

  let createTrackRequest = new Request(createTrackUrl, createTrackPostHeaders);

  return new Promise((resolve, reject) => {
    fetch(createTrackRequest)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.success) reject(data.track);
        resolve(data.track);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

const fetchTracksCall = () => {
  return new Promise((resolve, reject) => {
    fetch(fetchTracksUrl, { method: "get" })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.success) reject(false);
        else resolve(data);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

const startTrackCall = (track) => {
  if (!track) throw new Error("track not provided to call");

  var data = new FormData();
  data.append("track", JSON.stringify(track));

  let startTrackPostHeaders = getPostHeaders();
  startTrackPostHeaders.body = data;

  let startTrackRequest = new Request(startTrackUrl, startTrackPostHeaders);

  return new Promise((resolve, reject) => {
    fetch(startTrackRequest)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.success) reject(data.track);
        resolve(data);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

const stopTrackCall = (timer) => {
  if (!timer) throw new Error("Timer not provided to track");

  var data = new FormData();
  data.append("timer", JSON.stringify(timer));

  let stopTrackPostHeaders = getPostHeaders();
  stopTrackPostHeaders.body = data;

  let stopTrackRequest = new Request(stopTrackUrl, stopTrackPostHeaders);

  return new Promise((resolve, reject) => {
    fetch(stopTrackRequest)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.success) reject(data.track);
        resolve(data);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

export { createTrackCall, fetchTracksCall, startTrackCall, stopTrackCall };
