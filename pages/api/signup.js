// Next.js API route supports.org/docs/api-routes/introduction

import User from "@/models/User";
import connectdb from "@/middleware/mongoose";
import AES from 'crypto-js/aes';
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const {username , email, password} = req.body;
      let u = new User({username, email, password : AES.encrypt(password, process.env.SECRET_KEY).toString()});
      await u.save();
      res.status(200).json({success : "success"});
    }catch(e){
      res.status(400).json({ error : "Please Check the Credentials !" });
    }
  } else {
    res.status(400).json({ error : "method is not allowed !" });
  }
};

export default connectdb(handler);
