const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import StripeId from "@/models/StripeId";
import connectdb from "@/middleware/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
import pincode from '../../pincode.json'

const handler = async (req, res) => {
    if (req.method == "POST") {
        let item_cart = await JSON.parse(req.body.cart);

        //? DONE - Check if the cart is tampered with
        //? DONE - Check if the cart items are in stock
        //? DONE - Check if the pincode is serviceable

        if(!Object.keys(pincode).includes(req.body.pincode)){
            res.redirect(303,`${process.env.NEXT_PUBLIC_HOST}/error`);
            //The Pincode is not Servicable
            return
        }

        let sumTotal = 0;
        let product;
        if(req.body.subTotal <= 0 ){
            console.log("Wrong subtotal");
            res.redirect(303,`${process.env.NEXT_PUBLIC_HOST}/error`);
            return;
        }
        for(let item in item_cart){
            console.log(item_cart);
            product = await Product.findOne({slug : item});
            sumTotal += (item_cart[item].price * item_cart[item].qty);
            if(product.price != item_cart[item].price){
                console.log("Wrong Price!!");
                res.redirect(303,`${process.env.NEXT_PUBLIC_HOST}/error`);
                return
            }
            if(product.availableQty < item_cart[item].qty) {
                console.log("Wrong qty");
                res.redirect(303,`${process.env.NEXT_PUBLIC_HOST}/error`);
                return
            }
        }
        if(sumTotal != parseInt(req.body.subTotal)){
            console.log("sumTotal = "+sumTotal+" subtotal = "+req.body.subTotal);
            res.redirect(303,`${process.env.NEXT_PUBLIC_HOST}/error`);
            return
        }
        
        //console.log(OrderId);
        
        if(req.body.phone.length !== 10 || !Number.isInteger(Number(req.body.phone))){
            console.log("Wrong phone");
            res.redirect(303,`${process.env.NEXT_PUBLIC_HOST}/error`);
        }
        if(req.body.pincode.length !== 6 || !Number.isInteger(Number(req.body.pincode))){
            console.log("Wrong pincode");
            res.redirect(303,`${process.env.NEXT_PUBLIC_HOST}/error`);
        }
        // TODO -  Check if details is valid 

        console.log("This is here !")

        let line_items = [];
        let order = new Order({
            name : req.body.name,
            email : req.body.email,
            orderId : req.body.oid,
            address : req.body.address,
            city : req.body.city,
            state : req.body.state,
            phone : req.body.phone,
            amount : sumTotal,
            products : item_cart
        }) 

        let OrderId = await order.save();

        for (let item in item_cart){
            let prod = await StripeId.findOne({title : item});
            let items = {
               price : prod.product_price,
               quantity : item_cart[item].qty
            }
            line_items.push(items);
        }

        try{
            const session = await stripe.checkout.sessions.create({
            line_items : line_items,
            mode : 'payment',
            metadata : {
                "oid" : req.body.oid,
                "cart" : req.body.cart
            },
            success_url : `${process.env.NEXT_PUBLIC_HOST}/order?id=`+`${OrderId._id}`+`&clearCart=1`,
            cancel_url : `${process.env.NEXT_PUBLIC_HOST}/error`,
        });

        res.redirect(303, session.url);
        }catch(err){
            res.status(err.statusCode || 500).json(err.message);
        }
        
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
  };
  
  export default connectdb(handler);
  