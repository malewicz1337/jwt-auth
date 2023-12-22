import { Router } from "express";
import userController from "../controller/user-controller.js";
const router = Router();
import { body } from "express-validation";
import authMiddleware from "../middlewares/auth-middleware.js";

router.get("/", (req, res) => {
  res.send("<h1>Hello, World</h1>");
});

router.post(
  "/registration",
  body("email").isEmail(),
  body("passwprd").isLength({ min: 10, max: 30 }),
  userController.registration,
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

export default router;
