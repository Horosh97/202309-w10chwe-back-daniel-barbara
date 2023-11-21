import type {
  UserCredentialsStructure,
  UserDataStructure,
  UsersRepository,
} from "../types";
import type { Request, Response } from "express";
import brypct from "bcrypt";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  registerUser = async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      UserDataStructure
    >,
    res: Response,
  ) => {
    const userData = req.body;

    try {
      const hashedPassword = await brypct.hash(userData.password, 10);
      userData.password = hashedPassword;
      const newUser = await this.usersRepository.createUser(userData);
      res.status(201).json({ user: newUser });
    } catch (error) {
      res.status(500).json({
        error: "Couldn't create the new user" + (error as Error).message,
      });
    }
  };

  loginUser = async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      UserCredentialsStructure
    >,
    res: Response,
  ): Promise<void> => {
    const { username, password } = req.body;

    try {
      const user = await this.usersRepository.loginUser(username, password);
      const userData: JwtPayload = {
        sub: user._id,
        name: user.name,
      };

      const token = jwt.sign(userData, process.env.JWT_SECRET_KEY!, {
        expiresIn: "1d",
      });

      res.status(200).json({ token });
    } catch {
      res.status(401).json({ error: "Wrong credentials" });
    }
  };
}

export default UsersController;
