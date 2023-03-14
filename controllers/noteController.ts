import { Request, Response } from "express";
import Note from "../models/noteModel";

const createNote = async (req: Request, res: Response) => {
  const { title, text, userId, pinned } = req.body;
  const note = new Note({
    title,
    text,
    user: userId,
    pinned,
  });

  try {
    await note.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

const getAllNotes = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    res.send(await Note.find({ user: id }).sort({ createdAt: -1 }));
  } catch (error) {
    console.log(error);
  }
};

const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  // console.log(id);

  try {
    const response = await Note.findByIdAndDelete(id);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};

export { createNote, getAllNotes, deleteNote };
