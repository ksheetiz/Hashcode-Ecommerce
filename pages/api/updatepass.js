// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectdb from "@/middleware/mongoose";
import User from "@/models/User";
import jwt from 'jsonwebtoken';
import AES from 'crypto-js/aes';
import cryptojs from 'crypto-js'

const handler = async(req, res) => {
    if(req.method == 'POST'){
        const token = req.body.token;

        const data = jwt.verify(token,process.env.JWTSECRET);
        
        let dbuser = await User.findOne({email : data.email});
        
        let encrypt_pass = cryptojs.AES.decrypt(dbuser.password, process.env.SECRET_KEY);

        let decrypted_data = encrypt_pass.toString(cryptojs.enc.Utf8);

        if(decrypted_data == req.body.password && req.body.npassword == req.body.cpassword){
            
            await User.findOneAndUpdate({email : data.email},{password : AES.encrypt(req.body.npassword, process.env.SECRET_KEY).toString()});

            res.status(200).json({success : true});
        }

        res.status(200).json({success : false});
    }
    else{
        res.status(400).json({ error: 'Wrong Credentials' });
    }
  }
  
  export default connectdb(handler);