const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const ProductListing = require('../models/products/ProductListings');
const Farmer = require('../models/users/Farmer');
const Buyer = require('../models/users/Buyer');
const Product = require('../models/products/Product');
const Bid = require('../models/products/Bid');

exports.getUser = catchAsync(async (req, res, next) => { 
    const { id } = req.body;
    let admin = await (await Farmer.findById(id)).toObject();
    delete admin.password;
    res.send(admin);
  });
  exports.getAllProducts = catchAsync(async (req, res, next) => { 
    let user = await Product.find();
    res.send(user);
  });

  exports.getAllListing = catchAsync(async (req, res, next) => { 
    let user = await ProductListing.find({farmer_id:req.body.id});
    res.send(user);
  });

  exports.addProductListing = catchAsync(async (req, res, next) => {
    let product = new ProductListing(req.body);
    await product.save();
    res.status(200).send({ "message": "Listing Added Successfully" });
  });

  exports.deleteListing = catchAsync(async (req, res, next) => { 
    await ProductListing.deleteOne({_id:req.body.listingId});
    await Bid.deleteMany({prod_listing_id:req.body.listingId});
    res.status(200).send({ "message": "User Added Successfully" });
  });

  exports.getBids = catchAsync(async (req, res, next) => { 
    let userListings = await ProductListing.find({farmer_id:req.body.id},{_id:1});
    let ids = userListings.map(value=>(value['_id']));
    let bids = await Bid.find({prod_listing_id:{$in:ids},status:{$ne:"rejected"}});
    res.send(bids);
  });

  exports.acceptBid = catchAsync(async (req, res, next) => { 
    var data = await Bid.findOneAndUpdate({_id:req.body.bidId},{$set:{status:"accepted"}},{new:true});
    await Bid.updateMany({_id:{$ne:req.body.bidId},prod_listing_id:data.prod_listing_id},{$set:{status:"rejected"}});
    console.log(data);
    await ProductListing.findByIdAndUpdate(data.prod_listing_id,{$set:{status:"closed"}});
    res.status(200).send({ "message": "Listing Added Successfully" });
  });

  exports.rejectBid = catchAsync(async (req, res, next) => { 
    await Bid.updateOne({_id:req.body.bidId},{$set:{status:"rejected"}});
    res.status(200).send({ "message": "Listing Added Successfully" });
  });