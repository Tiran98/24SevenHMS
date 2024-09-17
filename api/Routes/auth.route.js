const router = require("express").Router();
const Employee = require("../Models/Employee");
const bcrypt = require("bcrypt");
const validate = require("../middlewares/validate");
const { email, password } = require("../middlewares/commonValidations");
const AppError = require("../utils/errors");
const catchAsync = require("../utils/catchAsync");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

router.post(
  "/adminlogin",
  validate([email, password]),
  catchAsync(async (req, res, next) => {
    const emailExist = await Employee.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!emailExist) {
      throw new AppError("Email does not exist", 400);
    }
    if (emailExist.position !== "admin") {
      throw new AppError("You do not have access to admin side.", 403);
    }

    //Checking password
    const validPassword = await bcrypt.compare(
      req.body.password,
      emailExist.password
    );
    if (!validPassword) {
      throw new AppError("Invalid email or password", 401);
    }

    const accessToken = generateAccessToken(emailExist._id);
    const refreshToken = generateRefreshToken(emailExist._id);

    emailExist.refreshToken = refreshToken;
    await emailExist.save();

    res.json({
      message: "Admin login successful",
      employee: {
        id: emailExist._id,
        firstName: emailExist.firstName,
        lastName: emailExist.lastName,
        email: emailExist.email,
        position: emailExist.position,
      },
      accessToken,
      refreshToken,
    });
  })
);

router.post(
  "/login",
  validate([email, password]),
  catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email }).select("+password");
    if (!employee || !(await bcrypt.compare(password, employee.password))) {
      throw new AppError("Invalid email or password", 401);
    }

    const accessToken = generateAccessToken(employee._id);
    const refreshToken = generateRefreshToken(employee._id);

    employee.refreshToken = refreshToken;
    await employee.save();

    res.json({
      message: "Login successful",
      employee: {
        id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        position: employee.position,
      },
      accessToken,
      refreshToken,
    });
  })
);

router.post(
  "/refresh-token",
  catchAsync(async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError("Refresh token is required", 400);
    }

    const { verifyRefreshToken } = require("../utils/jwt");

    try {
      const decoded = verifyRefreshToken(refreshToken);
      const employee = await Employee.findById(decoded.userId);

      if (!employee || employee.refreshToken !== refreshToken) {
        throw new AppError("Invalid refresh token", 403);
      }

      const accessToken = generateAccessToken(employee._id);
      const newRefreshToken = generateRefreshToken(employee._id);

      employee.refreshToken = newRefreshToken;
      await employee.save();

      res.json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      throw new AppError("Invalid refresh token", 403);
    }
  })
);

router.post(
  "/logout",
  catchAsync(async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError("Refresh token is required", 400);
    }

    const employee = await Employee.findOne({ refreshToken });
    if (employee) {
      employee.refreshToken = null;
      await employee.save();
    }

    res.sendStatus(204);
  })
);

module.exports = router;
