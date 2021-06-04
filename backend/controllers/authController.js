const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const config = require('../config/config');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const Admin = require('../models/users/Admin');
const Farmer = require('../models/users/Farmer');
const Buyer = require('../models/users/Buyer');


exports.signup = catchAsync(async (req, res, next) => {

  const { userType } = req.body;
  const password = req.body.password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  req.body.password = hashedPassword;
  
  let user = "";
  if(userType === "admin")
    user = new Admin(req.body);
  if(userType === "farmer")
    user = new Farmer(req.body);
  if(userType === "buyer")
    user = new Buyer(req.body);
  
  await user.save();
  const newUser = JSON.parse(JSON.stringify(user));
  delete newUser.password;

  const expiresIn = 1 * 60 * 60;
  const accessToken = jwt.sign({ id: newUser._id }, config.jwtSecret, {
    expiresIn: expiresIn
  });
  res.status(200).send({ "user": newUser, "access_token": accessToken, "expires_in": expiresIn });
});

exports.signin = catchAsync(async (req, res, next) => {

  const { password , username ,userType} = req.body;
  let user = "";
  if(userType === "admin")
    user = await Admin.findOne({ username });
  else if(userType === "farmer") 
    user = await Farmer.findOne({ username });
  else if(userType === "buyer") 
    user = await Buyer.findOne({ username });
  
  if (!user) {
    return next(new AppError('User not found!', 404));
  }
  //Check if Password is correct
  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    return next(new AppError('Password not valid!', 401));
  }

  const expiresIn = 1 * 60 * 60;
  const accessToken = jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: expiresIn
  });
  const newUser = JSON.parse(JSON.stringify(user));
  delete newUser.password;
  res.status(200).send({ "message": "Successfully Signed In", "access_token": accessToken, "expires_in": expiresIn , "user" : newUser});
});

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Get token, check if it's there
    let token;
    if ('authorization' in req.headers) {
      token = req.headers['authorization'].split(' ')[1];
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, config.jwtSecret);
   
    // 3) Check if user still exists
    const foundUser = await Admin.findById(decoded.id);
    
    if (!foundUser || foundUser._id.toString()!==req.body.id) {
      
      return next(
        new AppError('The user associated with this token no longer exists.', 401)
      );
    }
    next();
  });

  exports.protectFarmer = catchAsync(async (req, res, next) => {
    // 1) Get token, check if it's there
    let token;
    if ('authorization' in req.headers) {
      token = req.headers['authorization'].split(' ')[1];
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, config.jwtSecret);
   
    // 3) Check if user still exists
    const foundUser = await Farmer.findById(decoded.id);
    
    if (!foundUser || foundUser._id.toString()!==req.body.id) {
      
      return next(
        new AppError('The user associated with this token no longer exists.', 401)
      );
    }
    next();
  });
  exports.protectBuyer = catchAsync(async (req, res, next) => {
    // 1) Get token, check if it's there
    let token;
    if ('authorization' in req.headers) {
      token = req.headers['authorization'].split(' ')[1];
    }
    console.log("here1");
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, config.jwtSecret);
    
    // 3) Check if user still exists
    const foundUser = await Buyer.findById(decoded.id);
    console.log("here1");
    
    if (!foundUser || foundUser._id.toString()!==req.body.id) {
      console.log("here2");
      return next(
        new AppError('The user associated with this token no longer exists.', 401)
      );
    }
    next();
  });