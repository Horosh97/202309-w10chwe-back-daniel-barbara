import morgan from "morgan";
import app from "./app.js";
import express from "express";
import cors from "cors";
import pingRouter from "../features/ping/router/pingRouter.js";
import robotsRouter from "../features/robot/router/robotsRouter.js";
import usersRouter from "../features/users/router/usersRouter.js";

app.use(express.json());

app.use(morgan("dev"));

app.use(cors({ origin: "*" }));

app.use("/robots", robotsRouter);

app.use("/users", usersRouter);

app.use("/", pingRouter);
