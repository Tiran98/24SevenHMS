const router = require("express").Router();
const Appointment = require("../Models/Appointment");
const validate = require("../middlewares/validate");
const { body, param } = require("express-validator");
const {
  firstName,
  lastName,
  email,
  mobile,
  gender,
  dob,
  mongoId,
} = require("../middlewares/commonValidations");

router.post(
  "/addApp",
  validate([
    firstName,
    lastName,
    email,
    mobile,
    gender,
    dob,
    body("consultant").isString().trim(),
    body("appdate").isDate(),
    body("apptime").matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  ]),
  async (req, res) => {
    const appointment = new Appointment({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobile: req.body.mobile,
      gender: req.body.gender,
      dob: req.body.dob,
      consultant: req.body.consultant,
      appdate: req.body.appdate,
      apptime: req.body.apptime,
    });

    try {
      const savedApp = await appointment.save();
      res.json(savedApp);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const appointment = await Appointment.find();
    res.json(appointment);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/appfind/:id", validate([mongoId]), async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    res.json(appointment);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/appdelete/:id", validate([mongoId]), async (req, res) => {
  Appointment.deleteOne({ _id: req.params.id })
    .then((thing) => res.status(200).send(thing))
    .catch((error) => res.status(400).send({ error: error.message }));
});

router.put(
  "/appupdate/:id",
  validate([
    mongoId,
    firstName,
    lastName,
    email,
    mobile,
    gender,
    dob,
    body("consultant").isString().trim(),
    body("appdate").isDate(),
    body("apptime").matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  ]),
  async (req, res) => {
    try {
      const savedAppointment = await Appointment.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { useFindAndModify: false, new: true }
      );
      res.json(savedAppointmet);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

module.exports = router;
