const router = require('express').Router();
const Employee = require('../Models/Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

// router.post('/adminLogin', async(req, res) => {

//     var emailExist = "";
//     //Checking if the user exist
//     emailExist = await Employee.findOne({ email: req.body.email });
//     if (!emailExist) return res.status(400).send('Email does not exist');

//     //Checking password
//     const validPassword = await bcrypt.compare(req.body.password, emailExist.password)
//     if (!validPassword) return res.status(400).send('Email or password is wrong');

//     //Create and assign an token
//     const token = jwt.sign({ _id: emailExist._id }, process.env.TOKEN_SECRET);
//     const user = {
//         user: emailExist,
//         token: token,
//     };
//     res.header('auth-token', token).send(user);

// });

router.delete('/empDelete', async(req, res) => {

    Employee.remove(req.params.empID, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: `Not found Employee with id ${req.params.empID}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Employee with id " + req.params.empID
                });
            }
        } else res.send({ message: `Employee was deleted Successfully!` });
    });

});

module.exports = router;