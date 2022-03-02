var express = require('express');
const { route } = require('express/lib/application');

const controller = require('../controllers/auth-controller');
const authorized = require('../middleware/authorized');

const routes = express.Router();

routes.post('/login', controller.login);
routes.get('/all', authorized.authorized, controller.getAllUsers);
routes.get('/keeplive', controller.keepLive )

module.exports = routes;
