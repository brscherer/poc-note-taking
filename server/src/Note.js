export default class Note {
  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.lastUpdated = Date.now();
  }

  static create(id, note) {
    const title = note.length > 10 ? `${note.slice(0, 10)}...` : note;
    return new Note(id, title, note);
  }
}
