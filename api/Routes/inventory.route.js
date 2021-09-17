const router = require('express').Router();
const Inventory = require('../Models/Inventory');

router.post('/AddInvMngmnt', async(req, res) => {
    
    const inventory = new Inventory({
        productId: req.body.productId,
        productType: req.body.productType,
        productName: req.body.productName,
        quantity: req.body.quantity,
        pricePerItem: req.body.pricePerItem,
        manufactureDate: req.body.manufactureDate,
        expiredDate: req.body.expiredDate,
        description: req.body.description,
        brand: req.body.brand,
    });

    try {
        const savedInvMngmnt = await inventory.save();
        res.json(savedInvMngmnt);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/viewInvMngmnt', async(req, res) => {

    try {
        const invMngmnt = await Inventory.find();
        res.json(invMngmnt);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/getInvMngmnt', async(req,res) => {
    try {
        const maxId = await Inventory.findOne().sort('-productId');
        res.json(maxId);
    }catch (err) {
        res.json({ message: err });
    }
});

router.get('/getInvMngmnt/:id', async(req,res) => {
    try{
        const InvMngmnt = await Inventory.findOne({productId:req.params.id});
        res.json(InvMngmnt);
    }catch (err) {
        res.json({ message: err});
    }
});
module.exports = router;