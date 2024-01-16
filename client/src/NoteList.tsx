const NoteList = ({ notes, setSelectedNote, deleteNote }) => {
  return (
    <div className="note-list">
      <button className="add-button" onClick={() => setSelectedNote({ content: ""})}>
        Add Note
      </button>
      <ul>
        {notes?.map((note, index) => note && (
          <li key={index}>
            <div>
              <span onClick={() => setSelectedNote(note)}>
                {note.title}
              </span>
              <p className="timestamp">
                {new Date(note.lastUpdated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </p>
            </div>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
          )
        )}
      </ul>
    </div>
  );
};

export default NoteList;
