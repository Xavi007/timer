import environments from "../environments";

let environment = process.env.NODE_ENV;

const createTrackUrl = [
  environments[environment]["base_url"],
  "/analytics",
  "/create_track",
].join("");

const fetchTracksUrl = [
  environments[environment]["base_url"],
  "/analytics",
  "/fetch_tracks",
].join("");

const startTrackUrl = [
  environments[environment]["base_url"],
  "/analytics",
  "/start_track",
].join("");

const stopTrackUrl = [
  environments[environment]["base_url"],
  "/analytics",
  "/stop_track",
].join("");

export { createTrackUrl, fetchTracksUrl, startTrackUrl, stopTrackUrl };
