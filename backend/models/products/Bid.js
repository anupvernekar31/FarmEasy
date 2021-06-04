const mongoose = require("mongoose");
const bidSchema = mongoose.Schema({

    bid_amount : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    buyer_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buyer'
    },
    prod_listing_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductListing'
    }
    

},{timestamps: true} );

module.exports = mongoose.model("Bid",bidSchema);