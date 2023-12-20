import userService from "../services/user-service.js";
import { validationResult } from "express-validation";
import ApiError from "../errors/api-errors.js";

class UserController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Registration error", errors.array()));
      }

      const { email, password } = req.body;
      const userData = await userService.register(email, password);

      // *: If https, add secure flag
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const userData = await userService.login(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      res.json({ message: "Logout" });
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const link = req.params.link;
      await userService.activate(link);
      return res.redirect(process.env.CLIENT_URL); // *: If https, add secure flag
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      res.json({ message: "Refresh" });
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json({ message: "Get Users" });
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
