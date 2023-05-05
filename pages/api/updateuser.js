// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectdb from "@/middleware/mongoose";
import User from "@/models/User";
import jwt from 'jsonwebtoken';

const handler = async(req, res) => {
    if(req.method == 'POST'){
        const token = req.body.token;

        const data = jwt.verify(token,process.env.JWTSECRET);

        let user = await User.findOneAndUpdate({email : data.email},{address : req.body.address, pincode : req.body.pincode, phone : req.body.phone, name : req.body.name});

        res.status(200).json({success : true});
    }
    else{
        res.status(400).json({ error: 'Wrong Credentials' });
    }
  }
  
  export default connectdb(handler);