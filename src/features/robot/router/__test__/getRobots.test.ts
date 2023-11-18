import "../../../../server/index";
import app from "../../../../server/app";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectToDatabase } from "../../../../database/index";
import mongoose from "mongoose";
import Robot from "../../model/Robot.js";
import robotsMocks from "../../mocks/robotsMocks";
import type { RobotStructure } from "../../types";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoDbUrl = server.getUri();
  await connectToDatabase(mongoDbUrl);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given a GET /robots endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status code 200 and a list of robots 'Wall-A' and 'Isditron'", async () => {
      const expectedStatusCode = 200;
      const path = "/robots";

      await Robot.create(robotsMocks);

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { robots: RobotStructure[] };

      responseBody.robots.forEach((robot, robotPosition) => {
        expect(robot).toHaveProperty("name", robotsMocks[robotPosition].name);
      });
    });
  });
});
