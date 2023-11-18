import morgan from "morgan";
import app from "./app.js";
import express from "express";
import cors from "cors";
import pingRouter from "../features/ping/router/pingRouter.js";
import robotsRouter from "../features/robot/router/robotsRouter.js";

app.use(morgan("dev"));

app.use("/robots", robotsRouter);

app.use("/", pingRouter);

app.use(cors);

app.use(express.json());
