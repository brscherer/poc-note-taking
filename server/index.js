import express, { json } from 'express';
import cors from 'cors';
import NotesService from './src/NoteService.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(json());

const notesService = new NotesService()

app.get('/notes', (req, res) => {
  res.json(notesService.getAllNotes());
})

app.post('/notes', (req, res) => {
  const { note } = req.body
  res.json(notesService.addNote(note));
})

app.put('/notes/:id', (req, res) => {
  const { note } = req.body
  const { id } = req.params;
  res.json(notesService.updateNote(Number(id), note));
})

app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  res.json(notesService.deleteNote(Number(id)));
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
