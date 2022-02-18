/* import { Types } from "mongoose"; */
declare namespace Express {
  interface Request {
    user: { email: string; _id: any };
    /*  no se porque no anda types.objectid aca */
  }
}
