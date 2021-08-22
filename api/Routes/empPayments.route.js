const router = require('express').Router();
const EmpPayment = require('../Models/EmpPayment');

router.post('/addEmpPay', async(req, res) => {
    const empPayment = new EmpPayment({
        employeeId: req.body.employeeId,
        employeeType: req.body.employeeType,
        employeeName: req.body.employeeName,
        paymentAmount: req.body.paymentAmount,
        paymentType: req.body.paymentType,
        paymentDate: req.body.paymentDate,
        paymentAccount: req.body.paymentAccount,
        description: req.body.description,
        paymentBank: req.body.paymentBank,
    });

    try {
        const savedEmpPay = await empPayment.save();
        res.json(savedEmpPay);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/viewEmpPay', async(req, res) => {

    try {
        const empPay = await EmpPayment.find();
        res.json(empPay);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/getMaxId', async(req,res) => {
    try {
        const maxId = await EmpPayment.findOne().sort('-employeeId');
        res.json(maxId);
    }catch (err) {
        res.json({ message: err });
    }
});

router.get('/getPayEmp/:id', async(req,res) => {
    try{
        const payEmp = await EmpPayment.findOne({employeeId:req.params.id});
        res.json(payEmp);
    }catch (err) {
        res.json({ message: err});
    }
});
module.exports = router;