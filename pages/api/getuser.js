// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectdb from "@/middleware/mongoose";
import User from "@/models/User";
import jwt from 'jsonwebtoken';


const handler = async(req, res) => {
    if(req.method == 'POST'){
        const token = req.body.token;

        const data = jwt.verify(token,process.env.JWTSECRET);

        let user = await User.findOne({email : data.email});

        const {username, email, address, pincode,phone} = user;

        res.status(200).json({username, email, address, pincode,phone});
    }
    else{
        res.status(400).json({ error: 'Wrong Credentials' });
    }
  }
  
  export default connectdb(handler);