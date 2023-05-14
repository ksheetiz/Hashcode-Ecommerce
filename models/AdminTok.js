const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    email : {type : String, required : true},
    token : {type : String, required : true}
},{timestamps : true});

mongoose.models = {};

export default mongoose.models.AdminTok || mongoose.model("AdminTok",AdminSchema);