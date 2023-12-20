import ApiError from "../errors/api-errors";
import tokenService from "../services/token-service";

export default function (req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      next(ApiError.UnauthorizedError());
      return;
    }
    const token = authorization.split(" ")[1];

    if (!token) {
      next(ApiError.UnauthorizedError());
      return;
    }

    const userData = tokenService.validateAccessToken(token);

    if (!userData) {
      next(ApiError.UnauthorizedError());
      return;
    }

    req.token = userData;
    next();
    return;
  } catch (e) {
    next(ApiError.internal(e.message));
    return;
  }
}
