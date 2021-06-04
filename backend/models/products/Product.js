const mongoose = require("mongoose");
const productSchema = mongoose.Schema({

    productname : {
        type : String,
        unique : true,
        required : true
    },
    msp : {
        type : Number,
        required : true
    }
    

},{timestamps: true} );

module.exports = mongoose.model("Product",productSchema);