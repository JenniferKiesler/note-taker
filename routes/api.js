const router = require('express').Router()
const path = require('path')
const fs = require('fs')

router.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, "..", "db", "db.json"), 'utf-8', function(err, data) {
        if (err) {
            res.status(500).json(err)
            return
        }
        const json = JSON.parse(data)
        res.json(json)
    })
})

module.exports = router