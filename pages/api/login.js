import User from "@/models/User";
import connectdb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
import AdminTok from "@/models/AdminTok";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let user = await User.findOne({email : req.body.email})
      if(user){
        let encrypt_pass = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        let decrypted_data = encrypt_pass.toString(CryptoJS.enc.Utf8);

        if(req.body.email == user.email && decrypted_data == req.body.password && user.admin){
          
          var token = jwt.sign({email :user.email , name : user.username, admin : user.admin}, process.env.JWTSECRET,{expiresIn: '1h'});
          let admintok = new AdminTok({email : user.email, token});
          await admintok.save();
          console.log("HERE");
          res.status(200).json({success : true ,token, email : user.email, admin : user.admin });
       }
        else if(req.body.email == user.email && decrypted_data == req.body.password){
          var token = jwt.sign({email :user.email , name : user.username, admin : user.admin}, process.env.JWTSECRET,{expiresIn: '1h'});
          res.status(200).json({success : true ,token, email : user.email, admin : user.admin });
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