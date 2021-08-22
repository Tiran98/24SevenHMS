const router = require('express').Router();
const Appointment = require('../Models/Appointment');

router.post('/addApp', async(req, res) => {

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

});

router.get('/', async(req, res) => {

    try {
        const appointment = await Appointment.find();
        res.json(appointment);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;