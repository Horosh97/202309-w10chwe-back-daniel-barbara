import { Schema, model } from "mongoose";
import type { RobotStructure } from "../types";

const robotSchema = new Schema<RobotStructure>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  speed: {
    type: String,
    required: true,
  },
  resistence: {
    type: String,
    required: true,
  },
});

const Robot = model("Robot", robotSchema, "robots");

export default Robot;
