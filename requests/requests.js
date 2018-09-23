const axios = require('axios');

// url을 인수로 받아 요청 후 응답문서를 반환한다.
exports.requestUrl = function requestUrl(url, success) {
  axios.get(url)
    .then(function (response) {
      console.log('success request', url);
      success(response);
    })
    .catch(function (error) {
      console.log('error :', error);
    });
};
