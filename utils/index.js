const axios = require('axios');

const getFormatDate =  function (dateType, time) {
  var type = dateType || 'YYYY-MM-DD HH:MM:SS';
  // var val = (time && time.replace(/-/g, '/')) || new Date(); // fix -连接 Safari和IOS会有bug
  var date = new Date(time);
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var timeStr = type
    .replace(/YYYY/, year)
    .replace(/-MM-/, '-' + month + '-')
    .replace(/DD/, strDate)
    .replace(/HH/, hours)
    .replace(/:MM/, ':' + minutes)
    .replace(/:SS/, ':' + seconds);

  return timeStr;
}


const request = function (url, location) {
  return new Promise(function (reslove, reject) {
    const test = 'asdf';
    axios({
      method: 'get',
      url,
      params: {
        key: 'mdhltucgbhi0dtdx',
        language: 'zh-Hans',
        unit: 'c',
        location
      },
    }).then(res => {
      reslove(res.data);
    }).catch(err => {
      reject(err);
    });
  });
}

module.exports = {
  request,
  getFormatDate
};