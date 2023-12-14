export const numberOfWeeks = (firstDate, lastDate) => {
  const startDate = new Date(firstDate);
  const endDate = new Date(lastDate);
  const timeDifference = endDate - startDate;

  return Math.round(timeDifference / (7 * 24 * 60 * 60 * 1000));
};
