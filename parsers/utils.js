const fs = require('fs');

function multiSubstringWithWord(targetHtml, startWithWord, endWithWord, limit) {
  const results = [];
  let currentIndex = 0;
  for (let count = 0; count < limit-1; count++) {
    targetHtml = targetHtml.substring(currentIndex);
    currentIndex = substringWithWordThenReturnEndPosition(targetHtml, results, startWithWord, endWithWord);
  }
  return results;
}

function substringAllWithWord(targetHtml, startWithWord, endWithWord) {
  const results = [];
  let currentIndex = 0;
  while(currentIndex >= 0) {
    targetHtml = targetHtml.substring(currentIndex);
    currentIndex = substringWithWordThenReturnEndPosition(targetHtml, results, startWithWord, endWithWord);
  }
  return results;
}

function substringWithWord(targetHtml, startWithWord, endWithWord) {
  const startWithPagination = targetHtml.substring(targetHtml.search(startWithWord) + startWithWord.length);
  const substringHtml = startWithPagination.substring(0, startWithPagination.search(endWithWord));
  return substringHtml;
}

function substringWithWordThenReturnEndPosition(targetHtml, resultsArray, startWithWord, endWithWord) {
  const targetPosition = targetHtml.indexOf(startWithWord);
  if (targetPosition < 0) {
    return targetPosition;
  }
  const startPosition = targetPosition + startWithWord.length;
  const endPosition = targetHtml.indexOf(endWithWord, startPosition);
  resultsArray.push(targetHtml.substring(startPosition, endPosition));

  return endPosition;
}

function convertDateFormat(date) {
  const result = [];
  date.split(' ').forEach(function(item) {
    result.push(prefixZeroForOneDigit(item.substring(0, item.length - 1)));
  });
  return result.join('-');
}

function prefixZeroForOneDigit(digit) {

  if (parseInt(digit) < 10) {
    return '0' + digit;
  }
  return digit;
}

function saveOutputFile(filename, data) {
  fs.writeFileSync(filename, data, 'utf8');
}

function readOutputFile(filename) {
  const data = fs.readFileSync(filename);
  return JSON.parse(data.toString());
}

function loadUrlMap(posts) {
  const urlMap = new Map();
  posts.forEach(function (item) {
    urlMap.set(item.url, true);
  });
  return urlMap;
}

module.exports = {
  substringWithWord,
  substringWithWordThenReturnEndPosition,
  multiSubstringWithWord,
  substringAllWithWord,
  convertDateFormat,
  saveOutputFile,
  readOutputFile,
  loadUrlMap,
};
