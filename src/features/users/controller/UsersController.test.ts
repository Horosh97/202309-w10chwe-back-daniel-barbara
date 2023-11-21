import "dotenv/config";
import { type Response } from "express";
import jwt from "jsonwebtoken";
import type {
  UserCredentialsRequest,
  UserWithoutPasswordStructure,
  UsersRepository,
} from "../types";
import type UsersMongooseReppository from "../repository/UsersMongooseRepository.js";
import UsersController from "./UsersController";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a UsersController's loginUser method", () => {
  const req: Pick<UserCredentialsRequest, "body"> = {
    body: {
      username: "TunoMami",
      password: "QueEsEsaPiedraDelCielo",
    },
  };
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  describe("When it receives a request with a validated password and a username", () => {
    const expectedStatusCode = 200;
    const userData: UserWithoutPasswordStructure = {
      _id: "",
      name: "",
      username: "TunoMami",
    };
    const userRepository: Pick<UsersMongooseReppository, "loginUser"> = {
      loginUser: jest.fn().mockResolvedValue(userData),
    };

    const token = "AHRTPIUHQR3PTIUY53PNTY";
    jwt.sign = jest.fn().mockReturnValue({ token });

    test("Then it should call the status method of the response with status code 200", async () => {
      const res: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const usersController = new UsersController(
        userRepository as UsersRepository,
      );
      await usersController.loginUser(
        req as UserCredentialsRequest,
        res as Response,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the JSON method of the response with the token 'AHRTPIUHQR3PTIUY53PNTY'", async () => {
      const usersController = new UsersController(
        userRepository as UsersRepository,
      );

      await usersController.loginUser(
        req as UserCredentialsRequest,
        res as Response,
      );

      expect(res.json).toHaveBeenCalledWith({ token: { token } });
    });
  });

  describe("When it receives a request with an invalidated password and username", () => {
    const userRepository: Pick<UsersMongooseReppository, "loginUser"> = {
      loginUser: jest.fn().mockRejectedValue("error"),
    };
    const usersController = new UsersController(
      userRepository as UsersRepository,
    );

    const token = "AHRTPIUHQR3PTIUY53PNTY";
    jwt.sign = jest.fn().mockReturnValue({ token });

    test("Then it should call the status method of the response with status code 401", async () => {
      const expectedWrongStatusCode = 401;

      await usersController.loginUser(
        req as UserCredentialsRequest,
        res as Response,
      );

      expect(res.status).toHaveBeenCalledWith(expectedWrongStatusCode);
    });

    test("Then it should call the json method of the response with an error message", async () => {
      const expectedErrorMessage = { error: "Wrong credentials" };

      await usersController.loginUser(
        req as UserCredentialsRequest,
        res as Response,
      );

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});
