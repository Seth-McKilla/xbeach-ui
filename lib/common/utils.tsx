export const stringToNumber = (value: string) => {
  if (isNaN(Number(value))) {
    return value;
  }
  return Number(value);
};

export const stringToArray = (value: string) => {
  return value.split(",").map((item) => stringToNumber(item.trim()));
};
