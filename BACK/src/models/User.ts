import { model, Schema, Types,Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  tasks: Types.Array<Types.ObjectId>;
  /*------INSTANCE METHODS-----------------*/
  hashPass: () => Promise<void>;
  verifyPass: (password: string) => Promise<boolean>;
}


export const User = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Username cannot be an empty value. "],
    maxlength: [15, "Username must not have more than 15 characters. "],
  },
  password: {
    type: String,
    required: [true, "Password cannot be an empty value. "],
    select: false,
  },
  email: {
    type: String,
    required: [true, "Email cannot be empty an empty value. "],
    unique: true,
    trim: true,
    lowercase: true,
  },
  tasks: [{ type: "ObjectID", ref: "Task" }],
});
/*-------------------INSTANCE METHODS-----------------------*/
User.methods.hashPass = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};
User.methods.verifyPass = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
/*--------------------------------------------------------*/
/*  animalSchema.methods.findSimilarTypes = function (cb) {
   return mongoose.model("Animal").find({ type: this.type }, cb);
 }; */
/*------------------------------------------------*/
const userModel = model<IUser>("User", User);
export default userModel;
