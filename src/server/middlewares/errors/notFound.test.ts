import type { Request, Response } from "express";
import { notFoundError } from "./notFound";

describe("Given a Middleware NotFund method", () => {
  describe("When it receives a response", () => {
    const mockStatus = jest.fn().mockReturnThis();

    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: mockStatus,
      json: jest.fn(),
    };

    const expectedStatusCode = 404;

    test("Then it should call it's metod status 200", () => {
      notFoundError(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call it's method with a error: `Endpoint no found`", () => {
      const expectedError = "Endpoint not found";

      notFoundError(req as Request, res as Response);

      expect(res.status(expectedStatusCode).json).toHaveBeenCalledWith(
        expectedError,
      );
    });
  });
});
