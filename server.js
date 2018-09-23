const parsers = require('./parsers/parsers.js');
const requests = require('./requests/requests.js');
const { outputFilename, mapFilename } = require('./parsers/constans');
const { saveOutputFile, readOutputFile, loadUrlMap } = require('./parsers/utils');

const limitPage = 3;
const limitPosts = 12;

function parsePageUrl(response) {
  console.log('call parsePageUrl!!');
  const paginationHtml = parsers.parsePagination(response.data);
  const pageUrls = parsers.parsePageUrlsWithLimit(paginationHtml, limitPage);

  const promises = [];
  pageUrls.forEach(function(pageUrl) {
    promises.push(requests.makePromiseForGet(pageUrl));
  });
  requests.requestPages(promises, response, parsePostUrl);
}

function parsePostUrl(responses) {
  console.log('call parsePostUrl!!');
  let postUrls = [];
  responses.forEach(function(response) {
    postUrls = postUrls.concat(parsers.parsePostUrlsWithLimit(response.data, limitPosts));
  });

  const promises = [];
  postUrls.forEach(function(postUrl) {
    if (!urlMap.get(postUrl)) {
      promises.push(requests.makePromiseForGet(postUrl));
    }
  });
  requests.requestPosts(promises, parsePosts);
}

function parsePosts(responses) {
  console.log('call parsePost!!');

  responses.forEach(function(response) {
    let post = parsers.parsePost(response.data);
    const postUrl = response.config.url;
    console.log(postUrl);
    post.url = postUrl;
    posts.push(post);
  });
  saveOutputFile(outputFilename, JSON.stringify(posts));
}

let posts = readOutputFile(outputFilename);
const urlMap = loadUrlMap(posts);
requests.requestUrl('http://newspeppermint.com/', parsePageUrl);
