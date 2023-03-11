import express, { Request, Response, Router } from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
} from "../controllers/noteController";

const router = Router();

//Post Method
router.post("/new", createNote);

//Get all Method
router.get("/getAll/:id", getAllNotes);

//Get by ID Method
router.get("/getOne/:id", (req: Request, res: Response) => {
  res.send("Get a single note");
});

//Update by ID Method
router.put("/update/:id", (req: Request, res: Response) => {
  res.send("Update by ID API");
});

//Delete by ID Method
router.delete("/delete/:id", deleteNote);

export default router;
