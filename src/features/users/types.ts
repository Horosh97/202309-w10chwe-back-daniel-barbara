import { type Request } from "express";

export interface UserStructure {
  _id: string;
  name: string;
  username: string;
  password: string;
}

export type UserDataStructure = Omit<UserStructure, "_id">;

export type UserWithoutPasswordStructure = Omit<UserStructure, "password">;

export type UserCredentialsStructure = Omit<UserStructure, "_id" | "name">;

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentialsStructure
>;

export interface UsersRepository {
  createUser(
    userData: UserDataStructure,
  ): Promise<UserWithoutPasswordStructure>;
  loginUser(
    username: string,
    password: string,
  ): Promise<UserWithoutPasswordStructure>;
}
