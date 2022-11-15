const router = require('express').Router()
const viewRoutes = require('./views.js')
const apiRoutes = require('./api.js')

router.use(viewRoutes)

module.exports = router