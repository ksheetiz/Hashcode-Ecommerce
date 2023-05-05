import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {useEffect, useRef, useState} from 'react'
import {AiFillCloseCircle,AiOutlineShoppingCart, AiFillPlusCircle, AiFillMinusCircle,} from 'react-icons/ai'
import {BsFillBagCheckFill} from 'react-icons/bs'
import {MdAccountCircle} from 'react-icons/md';

function Navbar({logout,user, cart, addToCart, removeFromCart, clearCart, subTotal}) {

    const [dropdown, setDropdown] = useState(false);
    const [sidebar, setsidebar] = useState(false);
    const router = useRouter();

    useEffect(() => {
        Object.keys(cart).length !== 0 && setsidebar(true)
        let exempted = ['/ckeckout','/order','/orders','/myaccount']
        if(exempted.includes(router.pathname)){
            setsidebar(false);
        }
    }, [])
    

    const toggleCart = () => {
        setsidebar(!sidebar);
        // if(ref.current.classList.contains('translate-x-full')){
        //     ref.current.classList.remove('translate-x-full')
        //     ref.current.classList.add('translate-x-0')
        // }
        // else if(ref.current.classList.contains('translate-x-0')){
        //     ref.current.classList.remove('translate-x-0')
        //     ref.current.classList.add('translate-x-full')
        // }
    }
    const ref = useRef();
  return (
    <>
    {!sidebar && <span>
    {dropdown && <div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="profile-menu fixed right-14 mt-4 shadow-lg bg-orange-300 top-14 px-5 rounded-md w-32 z-20">
                <div className="triangle"></div>
                <ul>
                    <Link href={'/myaccount'}><li className='py-1 hover:text-orange-700 cursor-pointer font-semibold text-sm'>My Account</li></Link>
                    <Link href={'/orders'}><li className='py-1 hover:text-orange-700 cursor-pointer font-semibold text-sm'>Orders</li></Link>
                    <li className='py-1 hover:text-orange-700 cursor-pointer font-semibold text-sm' onClick={logout}>Logout</li>
                </ul>
            </div>}
    </span>}
    <span onMouseOver={() => {setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}></span>

    <div className={`flex flex-col py-2 md:flex-row md:justify-start bg-white justify-center items-center shadow-md sticky top-0 z-10 ${!sidebar && 'overflow-hidden'}`}>
        <div className="logo mr-auto md:mx-5">
            <Link href={'/'}>
                <Image src="/logo.svg" alt="logo" width={200} height={40}/>
            </Link>
        </div>
        <div className="nav">
            <ul className='flex space-x-8 font-bold md:text-md'>
               <Link href={'/tshirts'}> <li className='hover:text-orange-600'>T-Shirts</li> </Link>
               <Link href={'/stickers'}> <li className='hover:text-orange-600'>Stickers</li></Link>
               <Link href={'/hoodies'}> <li className='hover:text-orange-600'>Hoodies</li></Link>
               <Link href={'/mugs'}> <li className='hover:text-orange-600'>Mugs</li></Link>
            </ul>
        </div>
        <div  className="cart top-8 items-center absolute right-0 mx-5 flex">
            
            
            {user.value && <MdAccountCircle onMouseOver={()=>{setDropdown(true)}} className='text-xl md:text-3xl cursor-pointer mx-4'/>}
            
            {!user.value && <Link href={'/login'}>
                <button className='bg-orange-400 px-2 py-1 rounded-md text-sm text-white hover:bg-orange-600 mx-2'>Login</button>
            </Link>}
            
            <AiOutlineShoppingCart onClick={toggleCart} className='text-xl md:text-3xl cursor-pointer'/>
        </div>

        <div ref={ref} className={`w-72 h-[100vh] sidecart overflow-y-scroll z-30 absolute top-0 bg-orange-100 px-8 py-10 transition-all ${sidebar ? 'right-0' : '-right-96'} `}>
            <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
            <span onClick={toggleCart} className='absolute top-2 right-3 cursor-pointer text-2xl text-orange-700'><AiFillCloseCircle/></span>
            <ol className='list-decimal font-semibold'>
                {Object.keys(cart).length == 0 && <div className='text-md text-center my-4'>No Items added !</div>}
               { Object.keys(cart).map((item)=>{
                return (
                <li key={item}>
                    <div className="item flex my-3">
                        <div className='w-2/3 font-semibold'>{cart[item].name}({(cart[item].size).toUpperCase()}/{(cart[item].variant).toUpperCase()})</div>
                        <div className='flex items-center justify-center w-1/3 font-semibold'>
                        <AiFillMinusCircle onClick={()=>{removeFromCart(item,1,cart[item].price, cart[item].name, cart[item].size,cart[item].variant)}} className='mx-1 text-lg cursor-pointer text-orange-700'/>{cart[item].qty}<AiFillPlusCircle className='mx-1 text-lg cursor-pointer text-orange-700' onClick={()=>{addToCart(item,1,cart[item].price, cart[item].name, cart[item].size,cart[item].variant)}}/>
                        </div>
                    </div>
                </li>
                )})}
                
            </ol>
            <span className="total font-bold my-2 flex justify-center">SubTotal : ₹{subTotal}</span>
            <div className='flex'>
            <Link href={'/checkout'}>
                <button disabled={Object.keys(cart).length == 0 ? true : false} className="disabled:bg-orange-300 flex items-center mx-auto  text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-700 rounded text-sm"><BsFillBagCheckFill className='m-1'/>Checkout</button>
            </Link>
            <button disabled={Object.keys(cart).length == 0 ? true : false} onClick={clearCart} className="disabled:bg-orange-300 flex items-center mx-auto  text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-700 rounded text-sm">Clear Cart</button>
            </div>
        </div>
    </div> 
    </>
  )
}

export default Navbar
