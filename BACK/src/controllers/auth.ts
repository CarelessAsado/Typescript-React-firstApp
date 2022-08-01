import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import errorWrapper from "../ERRORS/asyncErrorWrapper";
import { CustomError } from "../ERRORS/customErrors";
import { jwtSecret } from "../constants";
module.exports = {
  registerUser: errorWrapper(async (req, res, next) => {
    const { username, password, email, confirmPassword } = req.body;
    /*------------------TENDRIA Q TRATAR DE HACER TODA LA VALIDATION DE UN SAQUE*/
    if (password !== confirmPassword) {
      return next(new CustomError(401, "Passwords do not match. "));
    }
    /*---NO HACE FALTA BUSCAR USER CON EMAIL PREVIAMENTE YA Q AL
        GUARDARLO AUTOMATICAMENTE MONGOOSE VA TIRAR ERROR*/
    const newUser = new User({ username, password, email });
    await newUser.hashPass();
    await newUser.save();
    return res.sendStatus(201);
  }),
  loginUser: errorWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    let user = await User.findOne<IUser>({ email }).select("+password");

    if (!user) {
      return next(new CustomError(401, "Username or password do not match."));
    }
    console.log(user, "ver xq aca esta completo y abajo no");

    /*---------------JWT INSTANCE METHOD-------------*/

    //MAKE AN INSTANCE METHOD OUT OF THIS

    if (await user.verifyPass(password)) {
      const accessToken = jwt.sign(
        { _id: user._id, email: user.email },
        jwtSecret,
        { expiresIn: 86400 }
      );
      console.log(password, "ver q aca llega");
      res.header("Access-Control-Expose-Headers", "auth-token");

      const cleanUser = user.toObject({
        transform: (doc) => {
          const { _doc } = doc;
          const { password, __v, ...rest } = _doc;
          return rest;
        },
      });

      return res.status(200).header("auth-token", accessToken).json(cleanUser);
    } else {
      return next(new CustomError(401, "Username or password do not match."));
    }
  }),
};
