import { time } from "console";
import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  currParticipants: { type: Number, required: true },
  maxParticipants: { type: Number, required: true },
  category: { type: String, required: true },
  time: { type: String, required: true },
});

const Event = model("Event", eventSchema);
export default Event;
