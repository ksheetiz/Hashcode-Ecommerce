import User from "@/models/User";
import connectdb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let user = await User.findOne({email : req.body.email})
      if(user){
        let encrypt_pass = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        let decrypted_data = encrypt_pass.toString(CryptoJS.enc.Utf8);
       
        if(req.body.email == user.email && decrypted_data == req.body.password){
          var token = jwt.sign({email :user.email , name : user.username}, process.env.JWTSECRET,{expiresIn: '1h'});
          res.status(200).json({success : true ,token});
        }
        else{
         
          res.status(400).json({ success : false, error : "Please Check the Credentials !" });

        }
      }
      else{
        
        res.status(400).json({ success : false, error : "Please Check the Credentials !" });

      }
    }catch(e){
      
      res.status(400).json({ success : false, error : "Please Check the Credentials !" });

    }
  } else {
    res.status(400).json({ error : "method is not allowed !" });
  }
};

export default connectdb(handler);