import express from "express";
import { getUserByEmail, createUser } from "../services/auth";
import { random } from "../helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      res.sendStatus(400);
    }
    const exixtingUser = await getUserByEmail(email);
    if (exixtingUser) {
      return res.sendStatus(400);
    }
    const salt = random();
    const user = await createUser({
      username,
      email,
      password,
    });
    //console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
