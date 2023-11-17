import morgan from "morgan";
import app from "./app.js";
import express from "express";

app.use(morgan("dev"));

app.use(express.json());
