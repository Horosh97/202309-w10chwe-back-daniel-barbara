import { type Response } from "express";
import robotsMocks from "../../mocks/robotsMocks";
import type { RobotCreateRequest, RobotsRepository } from "../../types";
import RobotsController from "../RobotsController";

describe("Given a robotsControllers's method createRobot", () => {
  const robotMock = robotsMocks[0];

  const req: Pick<RobotCreateRequest, "body"> = {
    body: robotMock,
  };
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  describe("When it receives a response", () => {
    const robotsRepository: RobotsRepository = {
      getRobots: jest.fn(),
      createRobot: jest.fn().mockResolvedValue(robotMock),
    };

    const robotsController = new RobotsController(robotsRepository);
    test("Then it should call its methods status 201", async () => {
      const expectedStatusCode = 201;

      await robotsController.createRobot(
        req as RobotCreateRequest,
        res as Response,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with the new robot", async () => {
      const expectedRobot = robotMock;

      await robotsController.createRobot(
        req as RobotCreateRequest,
        res as Response,
      );

      expect(res.json).toHaveBeenCalledWith({ robot: expectedRobot });
    });
  });

  describe("When it receives a response and there's an error when creating a new robot", () => {
    const robotsRepository: RobotsRepository = {
      getRobots: jest.fn(),
      createRobot: jest.fn().mockRejectedValue("error"),
    };

    const robotsController = new RobotsController(robotsRepository);
    test("Then it should call its method status with 500", async () => {
      const expectedStatusCode = 500;

      await robotsController.createRobot(
        req as RobotCreateRequest,
        res as Response,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with a 'Error creating the new robot' error", async () => {
      const expectedErrorMessage = "Error creating the new robot";

      await robotsController.createRobot(
        req as RobotCreateRequest,
        res as Response,
      );

      expect(res.json).toHaveBeenCalledWith({ error: expectedErrorMessage });
    });
  });
});
