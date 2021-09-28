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

router.get('/appfind/:id', async(req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        res.json(appointment);
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete = ('/appDelete', async(req, res) => {

    Appointment.remove(req.params.appID, (err, data) => {
        if(err) {
            if(err.kind == "not_found") {
                res.status(404).send({
                    message:`Not found Appointment with id ${req.params.appID}.`
                });
            }else {
                res.status(500).send({
                    message: "Could not delete Appointment with id " + req.params.appID
                });
            }
        } else res.send({ message: `Appointment was deleted Successfully!`});
    });
});


module.exports = router;