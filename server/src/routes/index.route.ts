import { Express } from "express"

const logger = require('../utils/logger')
const IndexController: IndexController = require('../controllers/index.controller')

function route(app: Express) {

    app.get('/test', (req,res) => {
        return res.send(JSON.stringify({data: "some data"}))
    })

    app.get('/login', IndexController.loginPage)

    app.get('/', (req: any,res: any) => {
        return res.render('home')
    })
}

module.exports = route