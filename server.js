const express = require('express')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000

// Unblock static folder
app.use(express.static("public"))
app.use(express.json())

app.use(routes)

// listens for connections on the specified host and port
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})