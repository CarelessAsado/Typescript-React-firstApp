import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
interface Itoken {
  _id: Types.ObjectId;
  email: string;
  iat: number;
  exp: number;
}
export default verifyToken;
async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("auth-token") as string;
  if (!token) {
    return res.status(403).send("Token was not provided.");
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    function (err: any, user: any) {
      if (err) {
        return res.status(403).send("Token is not valid.");
      }
      const { _id, email } = user as Itoken;
      req.user = { _id, email };
    }
  );
  return next();
}
