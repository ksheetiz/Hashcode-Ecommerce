// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectdb from "@/middleware/mongoose"
import Order from "@/models/Order"
import jwt from 'jsonwebtoken';

const handler = async(req, res) => {

    const token = req.body.token;

    const data = jwt.verify(token,process.env.JWTSECRET);

    //console.log(data);

    let orders = await Order.find({email : data.email, status :"Payment Done"})

    res.status(200).json({ orders }); 
}

export default connectdb(handler);
  