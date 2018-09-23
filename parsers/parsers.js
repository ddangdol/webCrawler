const { startWithPaginationWord,
  endWithPaginationWord,
  startWithPageAttrHref, endWithPageAttrHerf,
  startWithPostUrlWord, endWithPostUrlWord,
  startWithWriterWord, endWithWriterWord,
  startWithDateWord, endWithDateWord,
  startWithCategoryWord, endWithCategoryWord } = require('./constans');

const { substringWithWord, substringWithWordThenReturnEndPosition,
  multiSubstringWithWord, substringAllWithWord, convertDateFormat } = require('./utils');

// 메인 문서 응답 마크업을 인수로 받고 파싱하여 페이지네이션 부분을 반환한다.
exports.parsePagination = function parsePagination(targetHtml) {
  console.log('call parsePagination!!');
  return parseWithPagination(targetHtml);
};

// 페이지네이션 마크업과 제한 페이지를 인수로 받아 파싱하여 페이지별로 링크를 리턴한다.
exports.parsePageUrlsWithLimit = function parsePagesWithLimit(paginationHtml, limit) {
  console.log('call parsePagesWithLimit!!');
  return multiSubstringWithWord(paginationHtml, startWithPageAttrHref, endWithPageAttrHerf, limit);
};

// 페이지 마크업을 인수로 받아 각 포스트의 url을 파싱한다.
exports.parsePostUrlsWithLimit = function parsePostUrls(pageHtml) {
  console.log('call parsePostUrls!!');
  return substringAllWithWord(pageHtml, startWithPostUrlWord, endWithPostUrlWord);
};

// 포스트 마크업을 인수로 받아 writer, date, category를 파싱한다.
exports.parsePost = function parsePost(postHtml) {
  let post = {};
  let categories = [];

  post.writer = substringWithWord(postHtml, startWithWriterWord, endWithWriterWord);
  post.date = convertDateFormat(substringWithWord(postHtml, startWithDateWord, endWithDateWord));

  let currentIndex = 0;
  while(currentIndex >= 0) {
    currentIndex = substringWithWordThenReturnEndPosition(postHtml, categories,
      startWithCategoryWord, endWithCategoryWord);
    postHtml = postHtml.substring(currentIndex);
  }
  post.category = categories;
  return post;
};

function parseWithPagination(paginationHtml) {
  console.log('call substringWithPagination!!');
  return substringWithWord(paginationHtml, startWithPaginationWord, endWithPaginationWord);
}
