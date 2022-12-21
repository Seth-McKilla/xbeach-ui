export const stringToNumber = (value: string) => {
  if (isNaN(Number(value))) {
    return value;
  }
  return Number(value);
};

export const stringToArray = (value: string) => {
  return value.split(",").map((item) => stringToNumber(item.trim()));
};

export const deepSearchAndReplace = (
  srcObj: any,
  replacementsObj: { [key: string]: any }
) => {
  const replacementKeys = Object.keys(replacementsObj);
  const result: any = {};

  Object.keys(srcObj).forEach((key) => {
    if (typeof srcObj[key] === "object") {
      result[key] = deepSearchAndReplace(srcObj[key], replacementsObj);
    } else {
      replacementKeys.forEach((replacementKey) => {
        if (
          typeof srcObj[key] === "string" &&
          srcObj[key].includes(replacementKey)
        ) {
          srcObj[key] = srcObj[key].replace(
            replacementKey,
            replacementsObj[replacementKey]
          );
        } else {
          result[key] = srcObj[key];
        }
      });
    }
  });
  return result;
};
