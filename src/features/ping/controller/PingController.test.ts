import { type Request, type Response } from "express";
import PingController from "./PingController";

describe("Given a PingController's getPong method", () => {
  describe("When it recieves a response", () => {
    const pingController = new PingController();

    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should call its method status with 200", () => {
      const expectedStatus = 200;

      pingController.getPong(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call its method json with a message '🏓'", () => {
      const expectedMessage = { message: "🏓" };

      pingController.getPong(req as Request, res as Response);

      expect(res.status(200).json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
