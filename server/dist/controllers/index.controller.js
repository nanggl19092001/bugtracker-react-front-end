"use strict";
const logger = require('../utils/logger');
const LogMess = require('../utils/logformat');
class IndexController {
    loginPage(req, res) {
        logger.info(LogMess('GET', req.route.path));
        res.render('login');
    }
}
module.exports = new IndexController;
