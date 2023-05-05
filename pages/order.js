import React, { useEffect } from 'react'
import Order from "@/models/Order";
import mongoose from 'mongoose';
import { useRouter } from 'next/router';

function MyOrder({order,clearCart}) {
  const router = useRouter();
  useEffect(() => {
    if(router.query.clearCart == 1){
      clearCart();
    }
  }, [])
  
  
  const products = order.products;

  //console.log(products);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">HashCode.com</h2>
        <h1 className="text-gray-900 md:text-3xl text-xl title-font font-medium mb-4">Order Id : #{order.orderId}</h1>
        <p className="leading-relaxed mb-4">Your Order has been Placed. Your Payment status is 
          {order.status === 'Pending' ? <p className='text-md text-red-600 text-lg font-bold'>Pending !</p>:<p className='text-green-600 text-lg font-bold'>Payment Done !</p>}</p>
        <div className="flex mb-4">
          <a className="flex-grow border-gray-300 text-center text-lg px-1">Item Description</a>
          <a className="flex-grow border-gray-300 text-center text-lg px-1">Quantity</a>
          <a className="flex-grow border-gray-300 text-center text-lg px-1">Item Total</a>
        </div>


        {Object.keys(products).map((item) =>{
          return(<div key={item} className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">{products[item].name} ({products[item].size})/({products[item].variant})</span>
                <span className="m-auto text-gray-900">{products[item].qty}</span>
                <span className="m-auto text-gray-900">₹ {products[item].price * products[item].qty}</span>
                </div>)
        }) }
        
        <div className='border-t border-gray-200 py-2'></div>
        <div className="flex flex-col">
          <span className="title-font font-medium my-8 text-2xl text-gray-900">SubTotal : ₹{order.amount}</span>
          <div className=' my-5'>
          <button className="flex mx-0 text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">Track Order</button>
          </div>
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="/order_img.jpg"/>
    </div>
  </div>
</section>
  )
}

export async function getServerSideProps(context){
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI);
  }
  
  let order = await Order.findById(context.query.id);

  return {
    props : {order : JSON.parse(JSON.stringify(order))},
  }
}


export default MyOrder
