const router = require("express").Router();

const authContoller = require('../../controllers/authController');
const farmerController = require('../../controllers/farmerController');

// router.use(authContoller.protectFarmer);
router.post("/getUser",farmerController.getUser);
router.post("/getAllProducts",farmerController.getAllProducts);
router.post("/addListing",farmerController.addProductListing);
router.post("/allListing",farmerController.getAllListing);
router.post("/deleteListing",farmerController.deleteListing);
router.post("/getBids",farmerController.getBids);
router.post("/acceptBid",farmerController.acceptBid);
router.post("/rejectBid",farmerController.rejectBid);


module.exports = router;