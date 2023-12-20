import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import userDto from "../dtos/user-dto.js";
import ApiError from "../errors/api-errors.js";

class UserService {
  async register(email, password) {
    const user = await userModel.findOne({ email });

    if (user) {
      throw ApiError.BadRequest("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const activationLink = v4();
    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      activationLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`,
    );

    const dto = new userDto(newUser);

    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(dto.id, tokens.refreshToken);

    return { ...tokens, user: dto };
  }

  async activate(activationLink) {
    const user = await userModel.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest("User not found");
    }

    user.isActivated = true;
    await user.save();
  }
}

export default new UserService();
