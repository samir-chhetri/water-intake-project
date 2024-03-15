export const getDateString = (date = new Date()) => {
  return date.toISOString().split("T")[0];
};
