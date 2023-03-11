import { Note } from "../types";

export interface NoteDAO {
  createNote(note: Note): void;
  getNote(id: string): Note | undefined;
  getNotes(email: string): Note[] | undefined;
  updateNote(id: string): void;
  deleteNote(id: string): void;
}
