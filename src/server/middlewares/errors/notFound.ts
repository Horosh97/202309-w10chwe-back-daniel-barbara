import { type Request, type Response } from "express";

export const notFoundError = (_req: Request, res: Response) => {
  res.status(404).json("Endpoint not found");
};
