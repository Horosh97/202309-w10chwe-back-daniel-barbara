import Robot from "../model/Robot.js";
import type { RobotData, RobotStructure, RobotsRepository } from "../types";

class RobotsMongooseRepository implements RobotsRepository {
  public async getRobots(): Promise<RobotStructure[]> {
    const robots = await Robot.find();

    return robots;
  }

  public async createRobot(robot: RobotData): Promise<RobotStructure> {
    try {
      const newRobot = await Robot.create(robot);

      return newRobot;
    } catch (error) {
      throw new Error(
        "Error creating the new robot: " + (error as Error).message,
      );
    }
  }
}

export default RobotsMongooseRepository;
