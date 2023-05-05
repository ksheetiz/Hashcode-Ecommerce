import React, { useEffect, useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import Head from "next/head";

function Checkout({ cart, removeFromCart, subTotal, addToCart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [item, setitem] = useState();
  const [user, setuser] = useState([{ value: null }]);

  useEffect(() => {
    setitem(JSON.stringify(cart));
    const user = JSON.parse(localStorage.getItem("myuser"));
    if (user && user.token) {
      setuser(user);
      setEmail(user.email);
      fetchData(user.token);
    }
  }, []);

  const fetchData = async (token) => {
    let data = {token : token};
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(data),
    })
    let res = await a.json();
    setName(res.username);
    setPhone(res.phone);
    setAddress(res.address);
    setPincode(res.pincode);
    getpincode(res.pincode)
  }

  const getpincode = async(pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinJson = await pins.json();
        if (Object.keys(pinJson).includes(pin)) {
          setstate(pinJson[pin][1]);
          setcity(pinJson[pin][0]);
        }
        else{
          setstate("");
        setcity("");
        }
  }

  const handleChange = async (e) => {
    if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        getpincode(e.target.value);
      } else {
        setstate("");
        setcity("");
      }
    }
  };

  const handleCart = () => {setitem(JSON.stringify(cart));};

  let oid = String(Math.floor(Math.random() * Date.now()));

  return (
    <div className="container px-2 sm:m-auto">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <h1 className="font-bold text-3xl text-center my-8">Checkout</h1>
      <h2 className="font-bold text-xl">1. Delivery Details</h2>
      <form action="/api/checkout" method="POST">
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="leading-7 font-semibold text-md text-gray-600"
              >
                Name
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                placeholder="Name Here !"
                type="name"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="leading-7 font-semibold text-md text-gray-600"
              >
                E-mail
              </label>
              {user && user.token ? (
                <input
                  value={user.email}
                  readonly
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              ) : (
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              )}
            </div>
          </div>
        </div>
        <div className="px-2 w-full">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="leading-7 font-semibold text-md text-gray-600"
            >
              Address
            </label>
            <textarea
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
              placeholder="Your Full address Here !"
              id="address"
              name="address"
              className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              cols="30"
              rows="2"
            ></textarea>
          </div>
        </div>
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="pincode"
                className="leading-7 font-semibold text-md text-gray-600"
              >
                Pincode
              </label>
              <input
                value={pincode}
                onChange={handleChange}
                placeholder="Enter your pincode"
                type="pincode"
                id="pincode"
                name="pincode"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="state"
                className="leading-7 font-semibold text-md text-gray-600"
              >
                State
              </label>
              <input
                value={state}
                onChange={handleChange}
                disabled
                placeholder="It will be filled on entering pincode"
                type="state"
                id="state"
                name="state"
                className="w-full disabled:bg-gray-200 bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="leading-7 font-semibold text-md text-gray-600"
              >
                Phone
              </label>
              <input
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="Enter your 10 digit number"
                type="phone"
                id="phone"
                name="phone"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="city"
                className="leading-7 font-semibold text-md text-gray-600"
              >
                City
              </label>
              <input
                value={city}
                onChange={handleChange}
                disabled
                type="city"
                placeholder="It will be filled on entering pincode"
                id="city"
                name="city"
                className="w-full disabled:bg-gray-200 bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              <input
                readOnly
                type="cart"
                className="hidden"
                name="cart"
                value={item}
              />
              <input
                readOnly
                type="oid"
                className="hidden"
                name="oid"
                value={oid}
              />
              <input
                readOnly
                type="number"
                className="hidden"
                name="subTotal"
                value={subTotal}
              />
            </div>
          </div>
        </div>

        <h2 className="font-bold text-xl">2. Review Cart Items</h2>
        <div className="bg-orange-200 p-6 m-2 rounded-md">
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length == 0 && (
              <div className="text-md text-center my-4">No Items added !</div>
            )}
            {Object.keys(cart).map((item) => {
              return (
                <li key={item}>
                  <div className="item flex my-3">
                    <div className="font-semibold">
                      {cart[item].name} ({cart[item].size.toUpperCase()}/
                      {cart[item].variant.toUpperCase()})
                    </div>
                    <div className="flex items-center justify-center w-1/3 font-semibold">
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            item,
                            1,
                            cart[item].price,
                            cart[item].name,
                            cart[item].size,
                            cart[item].variant
                          );
                          handleCart();
                        }}
                        className="mx-1 text-lg cursor-pointer text-orange-700"
                      />
                      {cart[item].qty}
                      <AiFillPlusCircle
                        className="mx-1 text-lg cursor-pointer text-orange-700"
                        onClick={() => {
                          addToCart(
                            item,
                            1,
                            cart[item].price,
                            cart[item].name,
                            cart[item].size,
                            cart[item].variant
                          );
                          handleCart();
                        }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <span className="total font-bold my-2 flex justify-center">
            SubTotal : ₹{subTotal}
          </span>
        </div>
        <div className="flex">
          <button
            type="submit"
            disabled={
              pincode.length > 3 &&
              address.length > 3 &&
              name.length > 0 &&
              subTotal > 0
                ? false
                : true
            }
            className="disabled:bg-orange-300 flex items-center mx-auto text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-700 rounded text-sm"
          >
            <BsFillBagCheckFill className="m-1" />
            Pay : ₹{subTotal}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
