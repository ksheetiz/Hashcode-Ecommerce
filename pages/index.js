import Head from 'next/head'
import Image from 'next/image'
import Product from "@/models/Product";
import mongoose from 'mongoose';
import {BsArrowRightShort,BsTruck} from 'react-icons/bs'
import {TfiHeadphoneAlt} from 'react-icons/tfi'
import {GiReturnArrow} from 'react-icons/gi'
import Link from 'next/link';

export default function Home({products}) {
  console.log(products);
  return (
    <>
      <Head>
        <title>HashCode.com - Debug your Fashion</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <section className="text-gray-600 body-font">
        <section className='relative flex h-[100vh]'>
          
          <Image src='/background.jpg' className='absolute top-0' width='1900' height='1000'/>
          <Image src='/street.png' className='absolute top-12' width='1900' height='1000'/>
          <Image src='/shop-front.png' className='absolute top-0 left-5' width='1900' height='1000'/>
          <div className='absolute p-5 mt-5 top-14'>
            <h2 className='text-2xl font-semibold p-5 text-orange-600'>Dive into the World Of NFT's</h2>
            <h2 className='text-7xl font-semibold text-black pl-5'>We are HashCode <br/><span className='font-bold text-orange-500'> Community </span> <br/>and we <br/><span className='font-bold text-red-500'>Revolutionize </span><br/> the field.</h2>
            <div className='pl-5 flex'>
              <button className="flex items-center m-2 mt-12 text-white bg-orange-500 border-0 py-2 px-5 focus:outline-none hover:bg-orange-600 rounded-3xl text-lg font-semibold">Login<BsArrowRightShort className='text-3xl '/></button>
              <button className="flex items-center m-2 mt-12 text-white bg-orange-500 border-0 py-2 px-5 focus:outline-none hover:bg-orange-600 rounded-3xl text-lg font-semibold">Signup<BsArrowRightShort className='text-3xl '/></button>
            </div>
          </div>
        </section>
        {/* 
         */}
         <section className="text-gray-600 mt-10 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
              <h1 className="sm:text-4xl text-3xl font-bold mb-2 text-gray-900 mt-5">Discover more. <span className='text-orange-500'>Good things are waiting for you</span></h1>
              <p className="lg:w-1/2 w-full font-semibold text-xl leading-relaxed text-gray-500">In this season, find the best 🔥 Exclusive collection for everyone</p>
            </div>

            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 className="sm:text-3xl text-2xl font-semibold mb-2 text-gray-900">New Arrivals. <span className='text-orange-500'> REY backpacks & bags</span></h1>
                <div className="h-1 w-20 bg-orange-500 rounded"></div>
              </div>

            <div className="flex flex-wrap m-4">
            {Object.keys(products).map((item)=>{
              return (<div className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <img className="h-70 rounded w-full object-cover object-center mb-6" src={products[item].img} alt="content"/>
                  <h3 className="tracking-widest text-orange-500 text-sm font-medium title-font">{products[item].category.toUpperCase()}</h3>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{item}</h2>
                  <p className="leading-relaxed text-base">{`${products[item].desc.substring(0,100)} ...`}</p>
                  <div className='flex justify-center'>
                  <Link href={`/product/${products[item].slug}`}>
                    <button className="mt-3 text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded-3xl text-lg font-semibold">Check Out !</button>
                  </Link>
                  </div>
                </div>
              </div>
              )})
            }
            </div>
            
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 className="sm:text-3xl text-2xl font-semibold mb-2 text-gray-900">Best Sellers. <span className='text-orange-500'> Best selling of the month</span></h1>
                <div className="h-1 w-20 bg-orange-500 rounded"></div>
              </div>

            <div className="flex flex-wrap m-4">
              
            {Object.keys(products).map((item)=>{
              return (<div className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <img className="h-70 rounded w-full object-cover object-center mb-6" src={products[item].img} alt="content"/>
                  <h3 className="tracking-widest text-orange-500 text-sm font-medium title-font">{products[item].category.toUpperCase()}</h3>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{item}</h2>
                  <p className="leading-relaxed text-base">{`${products[item].desc.substring(0,100)} ...`}</p>
                  <div className='flex justify-center'>
                  <Link href={`/product/${products[item].slug}`}>
                    <button className="mt-3 text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded-3xl text-lg font-semibold">Check Out !</button>
                  </Link>
                  </div>
                </div>
              </div>
              )})
            }
              
              
            </div>
          </div>
        </section>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
              <h1 className="sm:text-4xl text-3xl font-bold mb-2 text-gray-900 mt-5">We are Here to <span className='text-orange-500'>Support</span></h1>
              <div className="h-1 w-20 bg-orange-500 rounded"></div>
            </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-7 rounded-lg">
                <div className="w-11 h-11 inline-flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-4">
                <BsTruck className='text-2xl'/>
                </div>
                <h2 className="text-orange-700 font-semibold text-lg mb-2">FREE SHIPPING</h2>
                <p className="leading-relaxed text-base">Free shipping on all US order or order above $99.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-7 rounded-lg">
                <div className="w-11 h-11 inline-flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-4">
                  <TfiHeadphoneAlt className='text-2xl'/>
                </div>
                <h2 className="text-orange-700 font-semibold text-lg mb-2">SUPPORT 24/7</h2>
                <p className="leading-relaxed text-base">Contact us 24 hours a day, 7 days a week.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-7 rounded-lg">
                <div className="w-11 h-11 inline-flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-4">
                  <GiReturnArrow className='text-2xl'/>
                </div>
                <h2 className="text-orange-700 font-semibold text-lg mb-2">30 DAYS RETURN</h2>
                <p className="leading-relaxed text-base">Simply return it within 24 days for an exchange.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </>
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