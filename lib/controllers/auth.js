'use strict';

var passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
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

exports.loginFacebook = function(req, res, next) {
  console.log(req.body);
  User.findOne({
    'facebook.id': req.body.id
  }, function(err, user) {
    if (err) {
      console.log('error', err);
    }
    if (!user) {
      console.log('user not found, creating new one');
      user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        provider: 'facebook',
        facebook: req.body
      });
      user.save(function(err) {
        if (err) console.log('error saving user', err);
        console.log('new user saved', user);
        //user has authenticated correctly thus we create a JWT token
        var token = jwt.sign(user, secret.getSecret(), { expiresInMinutes: 60*5 });
        res.json({ token : token });
      });
    } else {
      console.log('user found');
      //user has authenticated correctly thus we create a JWT token
      var token = jwt.sign(user, secret.getSecret(), { expiresInMinutes: 60*5 });
      res.json({ token : token });
    }
  });
};
