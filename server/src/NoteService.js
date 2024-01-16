import Note from "./Note.js"

export default class NotesService {
  constructor() {
    this.notes = [];
    this.idCounter = 1;
  }

  getAllNotes() {
    return this.notes
      .sort((a, b) => b.lastUpdated - a.lastUpdated)
  }

  addNote(note) {
    const newNote = Note.create(this.idCounter, note);
    this.notes.push(newNote);
    this.idCounter++;
    return { notes: this.getAllNotes(), newNote: newNote };
  }

  updateNote(id, newContent) {
    const updatedNote = new Note(id, newContent, newContent);
    this.notes = this.notes.map((n) => (n.id === id ? updatedNote : n));
    return { notes: this.getAllNotes(), newNote: updatedNote };
  }

  deleteNote(id) {
    this.notes = this.notes.filter((n) => n.id !== id);
    return { notes: this.getAllNotes() };
  }
}