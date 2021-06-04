const catchAsync = require('../utils/catchAsync');
const Bid = require('../models/products/Bid');
const Buyer = require('../models/users/Buyer');
const Product = require('../models/products/Product');
const ProductListing = require('../models/products/ProductListings');

exports.getUser = catchAsync(async (req, res, next) => { 
    const { id } = req.body;
    let admin = await (await Buyer.findById(id)).toObject();
    delete admin.password;
    res.send(admin);
  });

exports.getListings = catchAsync(async (req, res, next) => { 
  let bid=await Bid.find({buyer_id:req.body.id});
  console.log(bid);
  let user = await ProductListing.find({product_id:req.body.productId,status:"open",_id:{$nin:bid}});
    res.send(user);
  });

  exports.addBid = catchAsync(async (req, res, next) => {
    let product = new Bid(req.body);
    await product.save();
    res.status(200).send({ "message": "Listing Added Successfully" });
  });

  exports.getAllProducts = catchAsync(async (req, res, next) => { 
    let user = await Product.find();
    res.send(user);
  });

  exports.getBids = catchAsync(async (req, res, next) => { 
    let user = await Bid.find({buyer_id:req.body.id});
    res.send(user);
  });
  exports.deleteBid = catchAsync(async (req, res, next) => { 
    await Bid.deleteOne({_id:req.body.bidId});
    res.status(200).send({ "message": "User Added Successfully" });
  });