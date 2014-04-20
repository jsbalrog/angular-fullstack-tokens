'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    auth = require('./controllers/auth'),
    i18n = require('./controllers/i18n');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  app.get('/locales/strings.json', i18n.getStrings);
  app.post('/login', auth.login);
  app.get('/awesomeThings', api.awesomeThings);
  app.post('/users/create', users.create);

  // Server API Routes
  app.put('/api/users/changePassword', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};
