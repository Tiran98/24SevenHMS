const { body, param } = require("express-validator");

const commonValidations = {
  email: body("email").isEmail().normalizeEmail(),
  password: body("password").isString().trim().isLength({ min: 6 }),
  mongoId: param("id").isMongoId(),
  firstName: body("firstName").isString().trim().isLength({ min: 2, max: 50 }),
  lastName: body("lastName").isString().trim().isLength({ min: 2, max: 50 }),
  mobile: body("mobile").isMobilePhone(),
  gender: body("gender").isIn(["male", "female", "other"]),
  dob: body("dob").isDate(),
};

module.exports = commonValidations;
