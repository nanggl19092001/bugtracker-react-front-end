"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../utils/logger');
const IndexController = require('../controllers/index.controller');
function route(app) {
    app.get('/login', IndexController.loginPage);
    app.get('/', (req, res) => {
        return res.render('home');
    });
}
module.exports = route;
