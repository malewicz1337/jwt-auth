import ApiError from "../errors/api-errors";

export default function (error, req, res, next) {
  if (error instanceof ApiError) {
    return res.status(error.status).json({ message: error.message });
  }

  if (error.name === "ValidationError") {
    return res.status(422).json({
      message: error.message,
      errors: Object.keys(error.errors).reduce((errors, key) => {
        errors[key] = error.errors[key].message;
        return errors;
      }, {}),
    });
  }

  next(error);

  return res.status(500).json({ message: "Internal server error" });
}
