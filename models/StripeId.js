const mongoose = require('mongoose');

const StripeSchema = new mongoose.Schema({
    title : {type : String, required : true},
    product_price : {type : String , required : true},
},{timestamps : true});

//mongoose.models = {};
//      or
export default mongoose.models.StripeId || mongoose.model("StripeId",StripeSchema);