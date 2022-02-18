import User from "../models/User";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
module.exports = {
  registerUser: async (req: Request, res: Response): Promise<Response> => {
    const { username, password, email, confirmPassword } = req.body;
    /*------------------TENDRIA Q TRATAR DE HACER TODA LA VALIDATION DE UN SAQUE*/
    if (password !== confirmPassword) {
      return res.status(404).json("Passwords do not match. ");
    }
    /*---NO HACE FALTA BUSCAR USER CON EMAIL PREVIAMENTE YA Q AL
        GUARDARLO AUTOMATICAMENTE MONGOOSE VA TIRAR ERROR*/
    const newUser = new User({ username, password, email });
    await newUser.hashPass();
    try {
      await newUser.save();
      return res.status(201).json({ success: "Registration was successful." });
    } catch (error: any) {
      console.log(error);
      /*---------AGREGAR EL VALIDATION ERROR DEL DOC FORM Y VER ERROR WRAPPER----------*/
      if (error.code === 11000) {
        return res.status(404).json("Username already registered.");
      }
      return res.status(500).json(error.message);
    }
  },
  loginUser: async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json("Username or password do not match.");
      }
      /*---------------JWT INSTANCE METHOD-------------*/
      if (await user.verifyPass(password)) {
        const accessToken = jwt.sign(
          { _id: user._id, email: user.email },
          process.env.JWT_SECRET || "jwtsecret",
          { expiresIn: 86400 }
        );
        res.header("Access-Control-Expose-Headers", "auth-token");
        /*---SI ENVIO EL USUARIO NO MANDAR PASSWORD--------------*/
        /*  const { password, ...rest } = user._doc; */
        user.password = "";
        return res.status(200).header("auth-token", accessToken).json(user);
      } else {
        return res.status(401).json("Username or password do not match.");
      }
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  },
};
