const parsers = require('./parsers/parsers.js');
const requests = require('./requests/requests.js');

const limitPage = 3;
const limitPosts = 12;

function parsePageUrl(response) {
  console.log('call parsePageUrl!!');
  const paginationHtml = parsers.parsePagination(response.data);
  const pageUrls = parsers.parsePageUrlsWithLimit(paginationHtml, limitPage);

  pageUrls.forEach(function(pageUrl) {
    requests.requestUrl(pageUrl, parsePostUrl);
  });
  parsePostUrl(response);
}

function parsePostUrl(response) {
  console.log('call parsePostUrl!!');
  const postUrls = parsers.parsePostUrlsWithLimit(response.data, limitPosts);

  postUrls.forEach(function(postUrl) {
    requests.requestUrl(postUrl, parsePost);
  });
}

function parsePost(response) {
  console.log('call parsePost!!');
  let post = parsers.parsePost(response.data);
  post.url = response.config.url;
  console.log(post);
}

requests.requestUrl('http://newspeppermint.com/', parsePageUrl);
