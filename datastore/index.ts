import { NoteDAO } from "./NoteDAO";
import { UserDAO } from "./UserDAO";

export interface Datastore extends UserDAO, NoteDAO {}
