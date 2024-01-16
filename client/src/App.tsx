import { useEffect, useState } from "react";
import NoteList from "./NoteList";
import NoteEditor from "./NoteEditor";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState({ content: "" });

  const addNote = async (note: string) => {
    try {
      const res = await fetch("http://localhost:3000/notes", {
        method: "POST",
        body: JSON.stringify({ note }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      setNotes(json.notes);
      setSelectedNote(json.newNote);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/notes/${id}`, { method: "DELETE" });
      const json = await res.json();
      setNotes(json.notes);
    } catch (error) {
      console.error(error);
    }
  };

  const editNote = async (id: number, note: string) => {
    try {
      const res = await fetch(`http://localhost:3000/notes/${id}`, {
        method: "PUT",
        body: JSON.stringify({ note }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      setNotes(json.notes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = (note: string) => {
    if (selectedNote.id) {
      editNote(selectedNote.id, note);
    } else {
      addNote(note);
    }
  };

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await fetch("http://localhost:3000/notes");
        const json = await res.json();
        setNotes(json.notes);
      } catch (error) {
        console.error(error);
      }
    }
    fetchNotes();
  }, []);

  return (
    <div className="app-container">
      <NoteList
        notes={notes}
        setSelectedNote={setSelectedNote}
        deleteNote={deleteNote}
      />
      <NoteEditor selectedNote={selectedNote} handleSave={handleSave} />
    </div>
  );
};

export default App;
