import express from "express";
import * as authControllers from "../controllers/auth";

const router = express.Router();

router.post("/register", authControllers.registerUser);
router.post("/login", authControllers.loginUser);
router.get("/refresh", authControllers.refreshMyToken);
/* PROTECT THIS ROUTE */
router.get("/logout", authControllers.logout);

module.exports = router;
