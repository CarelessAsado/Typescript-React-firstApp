import User, { IUser } from "../models/User";
import errorWrapper from "../ERRORS/asyncErrorWrapper";
import { CustomError } from "../ERRORS/customErrors";

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

    /*---------------JWT INSTANCE METHOD-------------*/
    if (await user.verifyPass(password)) {
      const accessToken = user.generateAccessToken();
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
