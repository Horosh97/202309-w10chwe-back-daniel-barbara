import Robot from "../model/Robot";
import type { RobotStructure, RobotsRepository } from "../types";

class RobotsMongooseRepository implements RobotsRepository {
  public async getRobots(): Promise<RobotStructure[]> {
    const robots = await Robot.find();

    return robots;
  }
}

export default RobotsMongooseRepository;
