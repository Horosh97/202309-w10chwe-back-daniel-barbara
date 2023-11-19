import { Router } from "express";
import RobotsMongooseRepository from "../repository/RobotsMongooseRepository.js";
import RobotsController from "../controller/RobotsController.js";

const robotsRouter = Router();

const robotsRepository = new RobotsMongooseRepository();
const robotsController = new RobotsController(robotsRepository);

robotsRouter.get("/", robotsController.getRobots);
robotsRouter.post("/", robotsController.createRobot);

export default robotsRouter;
