export const getLastNumOfDates = (numberOfDates) => {
  let result = [];
  for (let i = 0; i < numberOfDates; i++) {
    let d = new Date();
    d.setDate(d.getDate() - i);
    result.push(formatDate(d));
  }

  return result.reverse();
};

const formatDate = (date) => {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  //   let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  date = dd + "/" + mm;
  return date;
};
