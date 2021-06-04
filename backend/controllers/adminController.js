const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const Admin = require('../models/users/Admin');
const Farmer = require('../models/users/Farmer');
const Buyer = require('../models/users/Buyer');
const Product = require('../models/products/Product');


exports.addUser = catchAsync(async (req, res, next) => {

 
    const { userType } = req.body;
    const password = req.body.password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    let user = "";
    if(userType === "admin")
    {
      user = new Admin(req.body);
 
    }
    if(userType === "farmer")
      user = new Farmer(req.body);
    if(userType === "buyer")
      user = new Buyer(req.body);
     
    await user.save();
    res.status(200).send({ "message": "User Added Successfully" });
  });

  exports.getUser = catchAsync(async (req, res, next) => { 
    const { id } = req.body;
    let admin = await (await Admin.findById(id)).toObject();
    delete admin.password;
    res.send(admin);
  });

  exports.getAll = catchAsync(async (req, res, next) => { 
    const { userType } = req.body;
    let user = "";
    if(userType === "admin")
      user = await Admin.find({},{password:0});
    if(userType === "farmer")
      user = await Farmer.find({},{password:0});
    if(userType === "buyer")
      user = await Buyer.find({},{password:0});
    res.send(user);
  });

  exports.deleteUser = catchAsync(async (req, res, next) => { 
    const { userType } = req.body;
    let user = "";
    if(userType === "admin")
      user = await Admin.deleteOne({_id:req.body.userId});
    if(userType === "farmer")
      user = await Farmer.deleteOne({_id:req.body.userId});
    if(userType === "buyer")
      user = await Buyer.deleteOne({_id:req.body.userId});
      res.status(200).send({ "message": "User Deleted Successfully" });
  });

  exports.addProduct = catchAsync(async (req, res, next) => {
    let product = new Product(req.body);
    await product.save();
    res.status(200).send({ "message": "User Added Successfully" });
  });

  exports.getAllProducts = catchAsync(async (req, res, next) => { 
    let user = await Product.find();
    res.send(user);
  });

  exports.editMsp = catchAsync(async (req, res, next) => { 
    await Product.updateOne({_id:req.body.productId},{$set:{msp:req.body.msp}});
    res.status(200).send({ "message": "User Added Successfully" });
  });

  exports.deleteProduct = catchAsync(async (req, res, next) => { 
    await Product.deleteOne({_id:req.body.productId});
    res.status(200).send({ "message": "User Added Successfully" });
  });