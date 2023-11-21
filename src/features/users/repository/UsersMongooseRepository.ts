import User from "../model/User.js";
import type {
  UserDataStructure,
  UserWithoutPasswordStructure,
  UsersRepository,
} from "../types";
import brypct from "bcrypt";

class UsersMongooseReppository implements UsersRepository {
  async createUser(
    userData: UserDataStructure,
  ): Promise<UserWithoutPasswordStructure> {
    try {
      const newUser = await User.create(userData);

      const { password, ...userWithoutPassword } = newUser.toJSON();

      return userWithoutPassword;
    } catch (error) {
      throw new Error("Error on creating user: " + (error as Error).message);
    }
  }

  async loginUser(
    username: string,
    password: string,
  ): Promise<UserWithoutPasswordStructure> {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error("Username not found");
      }

      if (!(await brypct.compare(password, user.password))) {
        throw new Error("Wrong password");
      }

      return user;
    } catch (error) {
      throw new Error("Error on login user: " + (error as Error).message);
    }
  }
}
export default UsersMongooseReppository;
