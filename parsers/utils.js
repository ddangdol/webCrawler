function multiSubstringWithWord(targetHtml, startWithWord, endWithWord, limit) {
  const results = [];
  let currentIndex = 0;
  for (let count = 0; count < limit; count++) {
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

module.exports = {
  substringWithWord,
  substringWithWordThenReturnEndPosition,
  multiSubstringWithWord,
  substringAllWithWord,
  convertDateFormat,
};