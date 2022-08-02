import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { HEADER_ACCESS_TOKEN, jwtSecret } from "../constants";

interface Itoken {
  _id: Types.ObjectId;
  email: string;
  iat: number;
  exp: number;
}

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header(HEADER_ACCESS_TOKEN) as string;
  console.log("VERIFY TOKEN MIDDLE");
  console.log(req.cookies, "COOKIES");
  if (!token) {
    return res.status(401).send("Token was not provided.");
  }

  jwt.verify(token, jwtSecret, function (err: any, user) {
    if (err) {
      return res.status(403).send("Token is not valid.");
    }
    const { _id, email } = user as Itoken;
    req.user = { _id, email };
  });
  return next();
}
