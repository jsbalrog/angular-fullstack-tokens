'use strict';

var passport = require('passport'),
    jwt = require('jsonwebtoken'),
    secret = require('../config/secret');

/**
 * Login
 */
exports.login = function (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.json(401, { error: 'message' });
    }

    console.log(secret.getSecret());
    //user has authenticated correctly thus we create a JWT token 
    var token = jwt.sign(user, secret.getSecret());
    res.json({ token : token });

  })(req, res, next);
};