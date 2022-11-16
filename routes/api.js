const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const shortid = require('shortid')

// GET Route that reads db.json and returns all saved notes as JSON
router.get('/notes', (req, res) => {
    // reads db.json file
    fs.readFile(path.join(__dirname, "..", "db", "db.json"), 'utf-8', function(err, data) {
        if (err) {
            res.status(500).json(err)
            return
        }
        const json = JSON.parse(data)
        
        // responds with parsed data
        res.json(json)
    })
})

// POST Route that adds a new note to db.json and returns it to the client
router.post('/notes', (req, res) => {
    const {title, text} = req.body
    
    if (!title || !text) {
        res.status(400).json({error: 'Missing title or text.'})
      return
    }

    const newNote = {
        // creates unique id
        id: shortid.generate(),
        ...req.body
    }

    // reads contents of db.json
    fs.readFile(path.join(__dirname, "..", "db", "db.json"), 'utf-8', function(err, data) {
        if (err) {
            res.status(500).json(err)
            return
        }

        const notes = JSON.parse(data)
        
        // adds new note to the db.json file
        notes.push(newNote)
        
        // stringify notes array and saves file
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


// DELETE Route that uses the unique id to delete the corresponding note
router.delete('/notes/:id', (req, res) => {
   const id = req.params.id

   if(!id) {
    res.status(400).json({ error: "We need an id"})
    return
  }

  // reads all notes from db.json
  fs.readFile(path.join(__dirname, "..", "db", "db.json"), "utf-8", function(err, data) {
    const notes = JSON.parse(data)
    
    // modify notes array so it doesn't include the note with the given id
    const updatedNotes = notes.filter(note => id != note.id)

    // rewrites the notes to db.json
    fs.writeFile(path.join(__dirname, "..", "db", "db.json"), JSON.stringify(updatedNotes), function(err) {
        if (err) {
            res.status(500).json(err)
            return
        }
        res.json(updatedNotes)
    })
  })

  console.log("Delete note route!")
})

module.exports = router