/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (!string.length || size === 0) {
    return "";
  }
  if (size === undefined) {
    return string;
  }

  let letter = "";
  let counter = 0;
  let resultArr = [];

  string.split("").forEach((item) => {
    if (letter !== item) {
      letter = item;
      counter = 1;
      resultArr.push(item);
    } else if (counter < size) {
      counter++;
      resultArr.push(item);
    }
  });

  return resultArr.join("");
}
