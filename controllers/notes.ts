import { Request, Response } from "express";
import { connection } from "../db/db";
import { UserRequest } from "../util/token";
import { ResultSetHeader } from "mysql2";

const createNote = (req: UserRequest, res: Response) => {
  console.log(req.user);

  const user_id = req.user;

  const { note_title, note_body, isPinned, category } = req.body;

  const note_details = [[user_id, note_title, note_body, isPinned, category]];

  const query =
    "INSERT INTO notes(user_id, note_title,note_body,isPinned,category) VALUES ?";

  connection.query(query, [note_details], (err, results, fields) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("results", results);
      res.status(200).send("Note was created successfully");
    }
  });

  return;
};

const updateNote = (req: Request, res: Response) => {
  const note_id = req.params.id;
  console.log(note_id);

  const { note_title, note_body, isPinned, category } = req.body;

  const query =
    "UPDATE notes SET note_title = ?, note_body = ?, isPinned = ?, category = ? WHERE id = ?";

  const newData = [note_title, note_body, isPinned, category, note_id];

  connection.query<ResultSetHeader>(query, newData, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Note not found");
    } else {
      res.status(200).send("Note updated successfully");
    }
  });
};

const deleteNote = (req: Request, res: Response) => {
  const note_id = req.params.id;

  const deleteQuery = "DELETE FROM notes WHERE id = ?";

  connection.query<ResultSetHeader>(deleteQuery, [note_id], (err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Note not found");
    } else {
      res.status(200).send("Note deleted successfully");
    }
  });
};

const getAllNotes = (req: UserRequest, res: Response) => {
  const user = req.user;

  console.log(user);

  const user_id = [[user]];

  const query = "SELECT * FROM `notes` WHERE user_id = ?";

  connection.query(query, [user_id], (err, results) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json(results);
    }
  });
};

const getOneNote = (req: Request, res: Response) => {
  const note_id = req.params.id;

  const query = "SELECT * FROM `notes` WHERE id = ?";
  connection.query(query, [note_id], (err, results) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json(results);
    }
  });
};

export { createNote, getAllNotes, updateNote, getOneNote, deleteNote };
