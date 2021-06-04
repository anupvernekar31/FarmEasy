const router = require("express").Router();

const authContoller = require('../../controllers/authController');
const adminController = require('../../controllers/adminController');

router.use(authContoller.protect);
router.post("/addUser",adminController.addUser);
router.post("/getUser",adminController.getUser);
router.post("/getAll",adminController.getAll);
router.post("/deleteUser",adminController.deleteUser);
router.post("/addProduct",adminController.addProduct);
router.post("/allProducts",adminController.getAllProducts);
router.post("/deleteProduct",adminController.deleteProduct);
router.post("/editMsp",adminController.editMsp);

module.exports = router;