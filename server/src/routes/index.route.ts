import { Express } from "express"

const logger = require('../utils/logger')
const IndexController: IndexController = require('../controllers/index.controller')
const jwt = require('jsonwebtoken')

function route(app: Express) {

    app.get('/test', (req,res) => {
        return res.send(JSON.stringify({data: "some data"}))
    })

    app.post('/auth/signin', IndexController.signIn)

    app.post('/auth/signup', IndexController.signUp)
    app.get('/auth', )

    app.get('/', (req: any,res: any) => {
        return res.render('home')
    })
}

module.exports = route