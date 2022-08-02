import User, { IUser } from "../models/User";
import errorWrapper from "../ERRORS/asyncErrorWrapper";
import { CustomError } from "../ERRORS/customErrors";
import { COOKIE_KEY } from "../constants";

export const registerUser = errorWrapper(async (req, res, next) => {
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
});
export const loginUser = errorWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  let user = await User.findOne<IUser>({ email }).select("+password");

  if (!user) {
    return next(new CustomError(401, "Username or password do not match."));
  }

  /*---------------JWT INSTANCE METHOD-------------*/
  if (await user.verifyPass(password)) {
    const accessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();
    res.header("Access-Control-Expose-Headers", "auth-token");

    //SET REFRESH TKN COOKIE
    res.cookie(COOKIE_KEY, newRefreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });

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
});

export const logout = errorWrapper(async (req, res, next) => {
  console.log(req.cookies, "COOKIES");

  const cookies = req.cookies;
  if (!cookies?.[COOKIE_KEY]) {
    return res.sendStatus(204);
  }

  res.clearCookie(COOKIE_KEY, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  return res.sendStatus(204);
});
