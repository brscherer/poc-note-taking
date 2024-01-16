import { useState, useEffect, ChangeEvent, useRef, useCallback } from 'react';
import useDebounce from './useDebouce';

const NoteEditor = ({ selectedNote, handleSave }) => {
  const [note, setNote] = useState(selectedNote.content);
  const ref = useRef<() => void>();

  const onChange = useCallback(() => {
    handleSave(note)
  }, [handleSave, note]);

  const debouncedOnChange = useDebounce(onChange);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    debouncedOnChange()
    setNote(e.target.value)
  }

  useEffect(() => {
    ref.current = onChange;
  }, [onChange]);

  useEffect(() => {
    setNote(selectedNote.content)
  }, [selectedNote])
  
  return (
    <div className="note-editor">
      <textarea
        autoFocus
        value={note}
        onChange={handleChange}
        placeholder="Enter your note content here"
      />
    </div>
  );
};


export default NoteEditor;
