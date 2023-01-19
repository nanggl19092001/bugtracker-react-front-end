const logger = require('../utils/logger')
const LogMess = require('../utils/logformat')

interface IndexControllerInterface {

}

class IndexController implements IndexControllerInterface{
    loginPage(req: any,res: any){
        logger.info(LogMess('GET',req.route.path))
        res.render('login')
    }
}

module.exports = new IndexController