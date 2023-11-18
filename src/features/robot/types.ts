import { type Request } from "express";

export interface RobotData {
  name: string;
  image: string;
  speed: string;
  resistence: string;
}

export interface RobotStructure extends RobotData {
  id: string;
}

export interface MotosRepository {
  getRobots: () => Promise<RobotStructure[]>;
}
