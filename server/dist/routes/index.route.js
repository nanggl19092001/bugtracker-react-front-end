"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../utils/logger');
const IndexController = require('../controllers/index.controller');
const jwt = require('jsonwebtoken');
function route(app) {
    app.get('/test', (req, res) => {
        return res.send(JSON.stringify({ data: "some data" }));
    });
    app.post('/auth/signin', IndexController.signIn);
    app.post('/auth/signup', IndexController.signUp);
    app.get('/auth');
    app.get('/', (req, res) => {
        return res.render('home');
    });
}
module.exports = route;
