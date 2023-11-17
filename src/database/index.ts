import chalk from "chalk";
import mongoose from "mongoose";

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    mongoose.set("debug", true);
    console.log(chalk.green("connected to database"));
  } catch (error) {
    console.log(chalk.red("Failed connecting to database"));
  }
};
