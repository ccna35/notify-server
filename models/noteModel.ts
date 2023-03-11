import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
