'use strict';

var path = require('path');

exports.getStrings = function (req, res, next) {
  // send .json file back that is at models/locales/req.param.lang/strings.json
  var langFileName = '../config/locales/' + req.query.lang + '/strings.json';
  res.sendfile(path.join(__dirname, langFileName), function(err) {
    if(err) { console.log(err); }
    else { console.log('file sent'); }
  });
};
