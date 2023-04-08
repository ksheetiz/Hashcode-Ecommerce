const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import StripeId from "@/models/StripeId";
import connectdb from "@/middleware/mongoose";
import Order from "@/models/Order";

const handler = async (req, res) => {
    if (req.method == "POST") {
        // console.log(req.temp_data);
        // res.status(200).send("Resolved");
        console.log(req.body);
        // let line_items = [];
        // let order = new Order({
        //     email : req.body.email,
        //     orderId : req.body.oid,
        //     address : req.body.address,
        //     amount : parseInt(req.body.subTotal),
        //     products : req.body.cart
        // }) 

        // await order.save();

        // // TODO - Check if the cart is tampered with

        // //  TODO - Check if the cart items are in stock

        // // TODO -  Check if details is valid 

        // for (let item in req.body.cart){
        //     let prod = await StripeId.findOne({title : item});
        //     let items = {
        //         price : prod.product_price,
        //         quantity : req.body.cart[item].qty
        //     }
        //     line_items.push(items);
        //     //console.log(item + " = " + req.body.cart[item].qty);
        // }

        // //console.log(line_items);

        // const session = await stripe.checkout.sessions.create({
        //     line_items : line_items,
        //     mode : 'payment',
        //     metadata : {
        //         "oid" : req.body.oid
        //     },
        //     success_url : `${process.env.NEXT_PUBLIC_HOST}/order`,
        //     cancel_url : `${process.env.NEXT_PUBLIC_HOST}`,
        // });
        // //console.log(session.url);
        // //res.status(200).json({url : session.url});
        // res.redirect(session.url,200);
        res.status(200).send("The data is recieved !");
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
  };
  
  export default connectdb(handler);
  