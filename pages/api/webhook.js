const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import connectdb from "@/middleware/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";

export const config = {
    api : {
        bodyParser : false,
    },
};

async function buffer(readable){
    const chunks = [];
    for await(const chunk of readable){
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

const handler = async (req, res) => {
    const payload = await buffer(req);
    const rawBody = payload.toString('utf-8');
    
    const sig =  req.headers['stripe-signature'];
    let event;
    let filter;
    let recipt_link;

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, process.env.ENDPOINT_SECRET);
    }catch(err){
        console.log(err.message);
        return res.status(400).send(err);
    }

    if(event.type === 'checkout.session.completed'){
        let cart = JSON.parse(event.data.object.metadata.cart);
        //console.log(JSON.parse(event.data.object.invoice_creation));
        
        for(let item in cart){
            await Product.findOneAndUpdate({slug : item},{$inc : {"availableQty" : - cart[item].qty}});
        }

        filter = {orderId : event.data.object.metadata.oid};
        let update_1 = {status : 'Payment Done'};
        //let update_2 = {paymentInfo : recipt_link};

        await Order.findOneAndUpdate(filter,update_1);
        //await Order.findOneAndUpdate(filter,update_2);
    }

    if(event.type === 'charge.succeeded'){
        //console.log(event.data.object.receipt_url);
        //console.log(event);
        recipt_link = event.data.object.receipt_url;
        let update_2 = {paymentInfo : recipt_link};
        await Order.findOneAndUpdate(filter,update_2);
    }

    res.status(200).end();

};

export default connectdb(handler);