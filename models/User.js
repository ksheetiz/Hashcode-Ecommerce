const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {type : String, required : true },
    email : {type : String, required : true, unique : true },
    password : {type : String, required : true},
    address : {type : String, default : ''},
    pincode : {type : String, default : ''},
    phone : {type : String, default : ''},
    admin : {type : Boolean, default : false}
},{timestamps : true});

mongoose.models = {};

export default mongoose.models.User || mongoose.model("User",UserSchema);