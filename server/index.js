const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const mockNote = {
  id: 99,
  title: `1234567890...`,
  content: `1234567890 qweqwe asdasd qwe qwe asd asd qweqweasdasdqwe qwe  asdasd \n\n\n\ weqwe qweqwe qweqwe`,
  lastUpdated: Date.now()
}

let notes = [mockNote]
let id = 1

app.get('/notes', (req, res) => {
  res.json({ notes });
})

app.post('/notes', (req, res) => {
  const { note } = req.body
  const noteObj = {
    id,
    title: note.length > 10 ? `${note.slice(0, 10)}...` : note,
    content: note,
    lastUpdated: Date.now()
  }
  notes.push(noteObj)
  id++
  res.json({ notes, newNote: noteObj });
})

app.put('/notes/:id', (req, res) => {
  const { note } = req.body

  const updatedNote = {
    id: Number(req.params.id),
    title: note?.length > 10 ? `${note.slice(0, 10)}...` : note,
    content: note,
    lastUpdated: Date.now()
  }
  notes = notes.map(n => Number(n.id) === Number(req.params.id) ? updatedNote : n)
  res.json({ notes, newNote: updatedNote });
})

app.delete('/notes/:id', (req, res) => {
  notes = notes.filter(n => Number(n.id) !== Number(req.params.id))
  res.json({ notes });
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
