const jwt = require("jsonwebtoken");
const AppError = require("../utils/errors");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return next(new AppError("No token, authorization denied", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = { id: decoded.userId, role: decoded.role };
    next();
  } catch (err) {
    next(new AppError("Token is not valid", 401));
  }
};

module.exports = authMiddleware;
