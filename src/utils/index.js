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

export const getLocalProjects = () => {
  let projectList = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);

    let keySplit = key.split(":");

    if (keySplit[0].toLowerCase().includes("project")) {
      projectList.push(keySplit[1]);
    }
  }

  return { projectList };
};

export const updateRowToSheety = (log) => {
  let url =
    "https://api.sheety.co/8162b8ece6995f7642dc10f4ef024130/persistence/sheet1";
  let body = {
    sheet1: {
      ...log,
    },
  };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    mode: "cors",
    headers: {
      Authorization: "Bearer $persistence_abcd",
      ContentType: "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      // Do something with object
      console.log(json.sheet1);
    });
};

export const getDateString = (day) =>
  twoDigitify(day.getDay()) +
  "/" +
  twoDigitify(day.getMonth()) +
  "/" +
  twoDigitify(day.getYear());
