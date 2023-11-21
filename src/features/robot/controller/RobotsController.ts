import { type Request, type Response } from "express";
import type { RobotCreateRequest, RobotsRepository } from "../types.js";

class RobotsController {
  constructor(private readonly robotsRepository: RobotsRepository) {}

  public getRobots = async (req: Request, res: Response): Promise<void> => {
    const robots = await this.robotsRepository.getRobots();
    res.status(200).json({ robots });
  };

  public createRobot = async (
    req: RobotCreateRequest,
    res: Response,
  ): Promise<void> => {
    const robotData = req.body;
    try {
      const newRobot = await this.robotsRepository.createRobot(robotData);
      res.status(201).json({ robot: newRobot });
    } catch (error) {
      res.status(500).json({
        error: "Error creating the new robot",
      });
    }
  };
}
export default RobotsController;
