// Next.js API route supports.org/docs/api-routes/introduction

import Product from "@/models/Product";
import connectdb from "@/middleware/mongoose";
import StripeId from "@/models/StripeId";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  if (req.method == "POST") {
    try{for (let i = 0; i < req.body.length; i++) {
        let p = new Product({
            title : req.body[i].title,
            slug : req.body[i].slug,
            desc :  req.body[i].desc,
            img : req.body[i].img,
            category : req.body[i].category,
            size : req.body[i].size,
            color : req.body[i].color,
            price : req.body[i].price,
            availableQty : req.body[i].availableQty,
          });
          await p.save();
          const stripe_prod = await stripe.products.create({
            name : req.body[i].slug,
            default_price_data : {
              unit_amount : req.body[i].price * 100,
              currency : 'inr',
            }
          });
          //console.log(stripe_prod);
          let Stripe_id = new StripeId({
            title : req.body[i].slug,
            product_price : stripe_prod.default_price
          })
          await Stripe_id.save();
    }
    res.status(200).json({success : "success"});
  }catch(e){
    res.status(400).json({success : "failure"});
  }
    
  } else {
    res.status(400).json({ error : "method is not allowed !" });
  }
};

export default connectdb(handler);
