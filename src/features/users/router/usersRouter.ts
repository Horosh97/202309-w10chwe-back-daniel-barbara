import { Router } from "express";
import UsersController from "../controller/UsersController.js";
import UsersMongooseRepository from "../repository/UsersMongooseRepository.js";

const usersRouter = Router();

const usersRepository = new UsersMongooseRepository();
const usersController = new UsersController(usersRepository);

usersRouter.post("/login", usersController.loginUser);
usersRouter.post("/register", usersController.registerUser);

export default usersRouter;
