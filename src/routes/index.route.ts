const logger = require('../utils/logger')

function route(app: any) {
    app.get('/', (req: any,res: any) => {
        logger.info(`${new Date()} ${"GET"} ${req.route.path}`)
        return res.render('home')
    })
}

module.exports = route