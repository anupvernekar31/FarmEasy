const mongoose = require("mongoose");
const productListingSchema = mongoose.Schema({

    product_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    status : {
        type : String,
        required : true
    },
    min_price : {
        type : Number,
        required : true
    },
    farmer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer'
    },
    quantity : {
        type : Number,
        required : true
    }
    

},{timestamps: true} );

module.exports = mongoose.model("ProductListing",productListingSchema);