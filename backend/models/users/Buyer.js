const mongoose = require("mongoose");
const buyerSchema = mongoose.Schema({

    username : {
        type : String,
        unique : true,
        required : true
    },
    password  : {
        type : String,
        required : true,
        unique : true
    },
    
    email : {
        type : String,
        unique : true,
        required : true
    },
    
    contactNumber : {
        type : String,
        required : true
    },
    admin_username : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
    

},{timestamps: true} );

module.exports = mongoose.model("Buyer",buyerSchema);