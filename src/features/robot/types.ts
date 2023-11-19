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

export interface RobotsRepository {
  getRobots: () => Promise<RobotStructure[]>;
  createRobot: (robot: RobotData) => Promise<RobotStructure>;
}

export type RobotCreateRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  RobotData
>;
