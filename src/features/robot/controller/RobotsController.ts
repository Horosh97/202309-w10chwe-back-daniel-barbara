import { type Request, type Response } from "express";
import type { RobotsRepository } from "../types.js";

class RobotsController {
  constructor(private readonly robotsRepository: RobotsRepository) {}

  public getRobots = async (req: Request, res: Response): Promise<void> => {
    const robots = await this.robotsRepository.getRobots();
    res.status(200).json({ robots });
  };
}
export default RobotsController;
