import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { HEADER_ACCESS_TOKEN, jwtSecret } from "../constants";
import { CustomError } from "../ERRORS/customErrors";

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header(HEADER_ACCESS_TOKEN) as string;
  console.log("VERIFY TOKEN MIDDLE");
  console.log(req.cookies, "COOKIES");
  console.log(req.url);
  console.log(req.ip);
  if (!token) {
    return next(new CustomError(401, "Token was not provided."));
  }

  jwt.verify(token, jwtSecret, function (err, user) {
    if (err) {
      return next(new CustomError(403, "Token is not valid."));
    }
    const { _id, email } = user as Itoken;
    req.user = { _id, email };
  });
  return next();
}
