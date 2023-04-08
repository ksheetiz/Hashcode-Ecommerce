import Link from 'next/link'
import React from 'react'
import Product from "@/models/Product";
import mongoose from 'mongoose';

function Hoodies({products}) {
  
  return (
    <div className='z-1'>
      <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4 justify-center">
      
      {Object.keys(products).length === 0 && <p className='font-semibold'>Sorry ! Currently Hoodies are out of stock right now But Stay Tuned As we will soon bring them back in Stock</p>}
      {Object.keys(products).map((item)=>{
        return(
        <div key={products[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-md m-5">
        <Link href={`/product/${products[item].slug}`}><div className="block relative rounded overflow-hidden">
          <img alt="ecommerce" className="h:[26vh] md:h-[30vh] block m-auto" src={products[item].img}/>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Hoodies</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
          <p className="mt-1">₹{products[item].price}</p>
          <div className='mt-3'>
            {products[item].size.includes('s') &&   <span className='border border-gray-300 p-1 mx-1'>S </span>}
            {products[item].size.includes('m') &&   <span className='border border-gray-300 p-1 mx-1'>M </span>}
            {products[item].size.includes('l') &&   <span className='border border-gray-300 p-1 mx-1'>L </span>}
            {products[item].size.includes('xl') &&  <span className='border border-gray-300 p-1 mx-1'>XL</span>}
            {products[item].size.includes('xxl') && <span className='border border-gray-300 p-1 mx-1'>XXL</span>}
          </div>
          <div className='mt-3'>
            {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
            {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
            {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
            {products[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}
            {products[item].color.includes('white') && <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
          </div>
        </div>
        </Link>
      </div>
      )}) }

      
    </div>
  </div>
</section>
    </div>
  )
}

export async function getServerSideProps(context){
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI);
  }
  
  let products = await Product.find({category : 'hoodies'});
  let Hoodies = {}
    for(let item of products) {
        if(item.title in Hoodies){
            if(!Hoodies[item.title].color.includes(item.color) && item.availableQty > 0){
                Hoodies[item.title].color.push(item.color)
            }
            if(!Hoodies[item.title].size.includes(item.size) && item.availableQty > 0){
                Hoodies[item.title].size.push(item.size)
            }
        }else{
            Hoodies[item.title] = JSON.parse(JSON.stringify(item))
            if(item.availableQty > 0){
                Hoodies[item.title].color = [item.color];
                Hoodies[item.title].size = [item.size];
            }
        }
    }

  return {
    props : {products : JSON.parse(JSON.stringify(Hoodies))},
  }
}
 
export default Hoodies

