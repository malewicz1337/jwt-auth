import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import userDto from "../dtos/user-dto.js";
import ApiError from "../errors/api-errors.js";

class UserService {
  async registration(email, password) {
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

  async login(email, password) {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest("User not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw ApiError.BadRequest("Wrong password");
    }

    const dto = new userDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(dto.id, tokens.refreshToken);

    return { ...tokens, user: dto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await userModel.findById(userData.id);
    const dto = new userDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(dto.id, tokens.refreshToken);

    return { ...tokens, user: dto };
  }

  async getAllUsers() {
    const users = await userModel.find();
    return users;
  }
}

export default new UserService();
