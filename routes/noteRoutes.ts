import express, { Request, Response, Router } from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
} from "../controllers/noteController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

//Post Method
router.post("/new", protect, createNote);

//Get all Method
router.get("/getAll/:id", protect, getAllNotes);

//Get by ID Method
router.get("/getOne/:id", protect, (req: Request, res: Response) => {
  res.send("Get a single note");
});

//Update by ID Method
router.put("/update/:id", protect, (req: Request, res: Response) => {
  res.send("Update by ID API");
});

//Delete by ID Method
router.delete("/delete/:id", protect, deleteNote);

export default router;
