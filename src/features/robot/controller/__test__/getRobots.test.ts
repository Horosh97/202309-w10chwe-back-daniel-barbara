import robotsMocks from "../../mocks/robotsMocks";
import type { RobotData, RobotsRepository } from "../../types";
import { type Request, type Response } from "express";
import RobotsController from "../RobotsController";

describe("Given a RobotsController's getRobots method", () => {
  describe("When it receives a response", () => {
    const robots: RobotData[] = robotsMocks;

    const robotsRepository: RobotsRepository = {
      getRobots: jest.fn().mockResolvedValue(robots),
    };

    const robotsController = new RobotsController(robotsRepository);

    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;

      await robotsController.getRobots(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with Wall-A and Isditron", async () => {
      const expectedRobots = robots;

      await robotsController.getRobots(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ robots: expectedRobots });
    });
  });
});
