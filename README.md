# Note Taker

## Description

An application that can be used to write and save notes. This application uses an [Express.js](https://expressjs.com/) back end and will save and retrieve note data from a JSON file. It also uses the npm package: [shortid](https://www.npmjs.com/package/shortid) to give each note a unique id.

On the notes page, the user will be presented with existing notes listed in the left-hand column and empty fields in the right-hand column to enter a new note's title and text. After the new note is saved, it shows up in the left-hand column with other notes. When an existing note is clicked, the note appears in the right-hand column.