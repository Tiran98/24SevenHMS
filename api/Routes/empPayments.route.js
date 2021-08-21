const router = require('express').Router();
const EmpPayment = require('../Models/EmpPayment');

router.post('/addEmpPay', async(req, res) => {
    const empPayment = new EmpPayment({
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

module.exports = router;