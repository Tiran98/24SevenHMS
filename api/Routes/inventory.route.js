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


router.get('/getInvMngmnt/:productId', async(req,res) => {
    try{
        const InvMngmnt = await Inventory.findOne({productId:req.params.productId});
        res.json(InvMngmnt);
    }catch (err) {
        res.json({ message: err});
    }
});

router.delete('/deleteInvMngmnt/:productId', async(req,res) => {
    try{
        await Inventory.findOneAndDelete({productId:req.params.productId});
                res.status(200).json({
                    message: data
                })
    }
    catch (err){
        res.json({message: err})
    }
});

// router.delete('/deleteInvMngmnt/:productId', async(req, res) => {

//     Inventory.deleteOne({ _productId: req.params.productId })
//         .then(thing => res.status(200).send(thing))
//         .catch(error => res.status(400).send({ error: error.message }));

// });

module.exports = router;