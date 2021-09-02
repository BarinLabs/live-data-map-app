export const isDataRecent = (timeStamp, timeLimitInMinutes) => {
  const currTimeStamp = timeStamp.includes("Z") ? timeStamp : timeStamp + "Z";
  const timeStampDate = new Date(currTimeStamp);
  const currentMinutes = new Date();
  const diff = (currentMinutes - timeStampDate) / 60000;

  return diff <= timeLimitInMinutes;
};

export const indexColors = {
  veryLow: "rgba(121, 188, 106, 1)",
  low: "rgba(187, 207, 76, 1)",
  medium: "rgba(238, 194, 11, 1)",
  high: "rgba(242, 147, 5, 1)",
  veryHigh: "rgba(232, 65, 111, 1)",
};

export const font = {
  family: '"Montserrat", sans-serif',
  color: "rgba(22, 18, 63, 1)",
};
