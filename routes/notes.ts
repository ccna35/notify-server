import { Router } from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getOneNote,
  updateNote,
} from "../controllers/notes";
import { verifyToken } from "../util/token";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

// Middleware
router.use(verifyToken);

//Add new note
router.post("/", createNote);

//Get all notes
router.get("/", getAllNotes);

// Get all notes created by a specific user
// router.get("/getAll/:id", getAllNotesByUser);

//Get by ID
router.get("/:id", getOneNote);

//Update by ID
router.put("/:id", updateNote);

//Delete by ID
router.delete("/:id", deleteNote);

export default router;
