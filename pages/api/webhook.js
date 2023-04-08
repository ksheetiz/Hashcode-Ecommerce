const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
    //console.log(rawBody.metadata)
    
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(rawBody,sig,process.env.ENDPOINT_SECRET);
    } catch(err){
        return res.status(400).send(`Webhook Error : ${err.message}`);
    }

    if(event.type === 'checkout.session.completed'){
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            {
                expand : ['line_items'],
            }
        );
        const lineItems = sessionWithLineItems.line_items;
        console.log(lineItems);
        console.log("Payment")
    }

    res.status(200).end();
};

export default handler;