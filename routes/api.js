const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const shortid = require('shortid')

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

router.post('/notes', (req, res) => {
    const {title, text} = req.body
    
    if (!title || !text) {
        res.status(400).json({error: 'Missing title or text.'})
      return
    }

    const newNote = {
        id: shortid.generate(),
        ...req.body
    }

    fs.readFile(path.join(__dirname, "..", "db", "db.json"), 'utf-8', function(err, data) {
        if (err) {
            res.status(500).json(err)
            return
        }

        const notes = JSON.parse(data)
        notes.push(newNote)
        
        fs.writeFile(path.join(__dirname, "..", "db", "db.json"), JSON.stringify(notes), function(err) {
            if (err) {
                res.status(500).json(err)
                return
            }
            res.status(200).json(newNote)
            console.log(notes)
        })
    })
})

module.exports = router