export const twoDigitify = (value) => ("0" + value).slice(-2);

const feedback = {
  good: 1,
  bad: -1,
  okay: 0,
};

Object.freeze(feedback);

export { feedback };

const sortLogDays = (logDay1, logDay2) => {
  const day1 = new Date(logDay1.day);
  const day2 = new Date(logDay2.day);

  if (day1 < day2) return 1;
  else return -1;
};

export { sortLogDays };

const sortLogTracks = (logTrack1, logTrack2) => {
  const track1 = new Date(logTrack1.time);
  const track2 = new Date(logTrack2.time);

  if (track1 < track2) return 1;
  else return -1;
};

export { sortLogTracks };
