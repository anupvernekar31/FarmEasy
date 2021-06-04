const router = require("express").Router();

const authContoller = require('../../controllers/authController');
const buyerController = require('../../controllers/buyerController');

router.use(authContoller.protectBuyer);
router.post("/getUser",buyerController.getUser);
router.post("/getListings",buyerController.getListings);
router.post("/getAllProducts",buyerController.getAllProducts);
router.post("/addBid",buyerController.addBid);
router.post("/getBids",buyerController.getBids);
router.post("/deleteBid",buyerController.deleteBid);

module.exports = router;