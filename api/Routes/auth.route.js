const router = require("express").Router();
const Employee = require("../Models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validate = require("../middlewares/validate");
const { email, password } = require("../middlewares/commonValidations");

router.post("/adminlogin", validate([email, password]), async (req, res) => {
  var emailExist = "";
  //Checking if the user exist
  emailExist = await Employee.findOne({ email: req.body.email });
  if (!emailExist) return res.status(400).send("Email does not exist");
  if (emailExist.position != "admin")
    return res.status(400).send("You do not have access to admin side.");

  //Checking password
  const validPassword = await bcrypt.compare(
    req.body.password,
    emailExist.password
  );
  if (!validPassword) return res.status(400).send("Email or password is wrong");
  res.send(emailExist);
});

router.post("/login", validate([email, password]), async (req, res) => {
  var emailExist = "";
  //Checking if the user exist
  emailExist = await Employee.findOne({ email: req.body.email });
  if (!emailExist) return res.status(400).send("Email does not exist");

  //Checking password
  const validPassword = await bcrypt.compare(
    req.body.password,
    emailExist.password
  );
  if (!validPassword) return res.status(400).send("Email or password is wrong");
  res.send(emailExist);
});

module.exports = router;
