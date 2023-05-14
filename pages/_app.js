import '@/styles/globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({value : null })
  const [key, setKey] = useState()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    router.events.on('routeChangeStart', ()=>{
      setProgress(40);
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100);
    })
    try{
      if(localStorage.getItem("cart")){
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    }
    catch(err){
      //console.log(err);
      localStorage.clear();
    }
    const myuser = JSON.parse(localStorage.getItem('myuser'));
    if(myuser){
      setUser({value : myuser.token, email : myuser.email, admin : myuser.admin});
    }
    else{
      setUser({value : null });
    }
    setKey(Math.random());
  }, [router.query])

  const saveCart = (myCart) =>{
    localStorage.setItem("cart",JSON.stringify(myCart));
    let currTotal = 0;
    let keys = Object.keys(cart);
    for (let i = 0; i < keys.length; i++) {
      currTotal += myCart[keys[i]]['price'] * myCart[keys[i]].qty;
    }
    setSubTotal(currTotal)
  }

  const addtoCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }
    else {
      newCart[itemCode] = {qty : 1, price, name, size, variant}
    }
    setCart(newCart);
    saveCart(newCart);
  }

  const buyNow = (itemCode, qty, price, name, size, variant)=>{
    let newCart = {};
    newCart[itemCode] = {qty : 1, price, name, size, variant}
    setCart({});
    setCart(newCart);
    saveCart(newCart);
    router.push('/checkout')
  }

  const clearCart = () =>{
    setCart({});
    localStorage.setItem("cart",{});
    setSubTotal(0);
  }

  const remmoveFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if(newCart[itemCode]["qty"] <= 0){
      delete newCart[itemCode]
    }
    setCart(newCart);
    saveCart(newCart);
  }

  const logout = ()=>{
    localStorage.removeItem("myuser");
    setKey(Math.random());
    setUser({value : null });
    router.push('/');
  }

  return (
  <>
    <LoadingBar
        color='#e74c3c'
        progress={progress}
        waitingTime={500}
        onLoaderFinished={() => setProgress(0)}
      />
   {key && <Navbar key={key} logout = {logout} user = {user} cart = {cart} addToCart={addtoCart} removeFromCart={remmoveFromCart} clearCart={clearCart} subTotal={subTotal} />}
    
    <Component user={user} buyNow = {buyNow} cart = {cart} addToCart={addtoCart} removeFromCart={remmoveFromCart} clearCart={clearCart} {...pageProps} subTotal={subTotal}  />
    <Footer/>
  </>
  )
}
