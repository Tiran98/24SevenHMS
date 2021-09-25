const router = require('express').Router();
const Employee = require('../Models/Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var mongodb = require('mongodb');

router.post('/', async(req, res) => {

    //Checking if the user is already in the database
    const emailExist = await Employee.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123", salt);

    const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        mobile: req.body.mobile,
        address1: req.body.address1,
        address2: req.body.address2,
        gender: req.body.gender,
        dob: req.body.dob,
        marital: req.body.marital,
        position: req.body.position,
        hiredate: req.body.hiredate,
    });

    try {
        const savedEmp = await employee.save();
        res.json(savedEmp);
    } catch (err) {
        res.json({ message: err });
    }

});

router.get('/', async(req, res) => {

    try {
        const employee = await Employee.find();
        res.json(employee);
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete('/empdelete/:id', async(req, res) => {

    // try {
    //     const employee = await Employee.findOne({ _id: req.params.id });
    //     res.json(employee);
    // } catch (err) {
    //     res.json({ message: err });
    // }
    Employee.deleteOne({ _id: req.params.id })
        .then(thing => res.status(200).send(thing))
        .catch(error => res.status(400).send({ error: error.message }));

});

router.get('/allcounts', async(req, res) => {

    try {
        const doctorcount = await Employee.countDocuments({ position: 'doctor' });
        const pharmacistcount = await Employee.countDocuments({ position: 'pharmacist' });
        const accountantcount = await Employee.countDocuments({ position: 'accountant' });
        const assistantcount = await Employee.countDocuments({ position: 'labAssistant' });
        var arr = {
            "doctorcount": doctorcount,
            "pharmacistcount": pharmacistcount,
            "accountantcount": accountantcount,
            "assistantcount": assistantcount
        };
        res.json(arr);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;