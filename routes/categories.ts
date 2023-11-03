import { Request, Response, Router } from "express";
import { verifyToken } from "../util/token";
import dotenv from "dotenv";
import { createCategory, getAllCategories } from "../controllers/categories";
dotenv.config();

const router = Router();

// Middleware
router.use(verifyToken);

//Add new note
router.post("/", createCategory);

//Get all notes
router.get("/", getAllCategories);

// Get all notes created by a specific user
// router.get("/getAll/:id", getAllNotesByUser);

//Get by ID
router.get("/getOne/:id", (req: Request, res: Response) => {
  res.send("Get a single note");
});

//Update by ID
router.put("/update/:id", (req: Request, res: Response) => {
  res.send("Update by ID API");
});

//Delete by ID
// router.delete("/delete/:id", deleteNote);

export default router;
