const express = require('express')
const actions = require('../methods/action')
const router = express.Router()

router.get('/', (req, res) =>{
    res.send('Heeloo mother fucker')
})

router.get('/dashboard', (req, res) =>{
    res.send('bye mother fucker')
})

//@desc adding new user
//@route POST /adduser
router.post('/adduser', actions.addNew)

//@desc Authenticate a user
//@route POST /authenticate
router.post('/authenticate', actions.authenticate)
//@desc Get info on a user
//@route GET /getinfo
router.get('/getinfo', actions.getinfo)


module.exports = router