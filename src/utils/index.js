export const twoDigitify = (value) => ("0" + value).slice(-2);

const feedback = {
  good: 1,
  bad: -1,
  okay: 0,
};

Object.freeze(feedback);

export { feedback };
