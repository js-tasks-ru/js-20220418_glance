/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const stringArr = path.split(".");

  return function (object) {
    return stringArr.reduce((acc, item) => {
      return acc ? acc[item] : undefined;
    }, object);
  };
}
