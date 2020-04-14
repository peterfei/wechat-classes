const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

/**
 * 针对某一键值进行排序
 *
 */
const arraySort = field => {
  return (a, b) => {
    let val1 = a[field];
    let val2 = b[field];
    return val1 - val2;
  };
};

const renameKeys = (obj, newKeys) => {
  const mapped = Object.keys(obj).map(key => {
    const newKey = newKeys[key] || key;
    return {[newKey]: obj[key]};
  });
  return Object.assign({}, ...mapped);
};

const logMethodAsync = (groupLabel, method) => {
  setTimeout(function() {
    console.group('%c%s', 'color:blue',groupLabel);
    console.log(method)
    console.groupEnd();
  }, 0);
};
module.exports = {
  formatTime: formatTime,
  capitalize: capitalize,
  arraySort: arraySort,
  renameKeys: renameKeys,
  logMethodAsync: logMethodAsync,
};
