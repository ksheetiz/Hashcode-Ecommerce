import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyAccount() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [password, setpassword] = useState("");
  const [npassword, setNpassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [user, setuser] = useState([{ value: null }]);

  useEffect(() => {
    if(!localStorage.getItem('myuser')){
      router.push('/');
    }
    const user = JSON.parse(localStorage.getItem("myuser"));
    if (user && user.token) {
      setuser(user);
      setEmail(user.email);
      fetchData(user.token);
    }
  }, [])
  
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
    setPhone(res.phone)
  }

  const handleChange = async (e) => {
    if (e.target.name == "pincode") {
      setPincode(e.target.value);
    }
  };

  const handleUserSubmit = async() => {
    let data = {token : user.token, address,name,pincode,phone}
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(data),
    })
    let Res = await a.json();
    if(Res.success){
      toast.success('Successfully Updated Details! 😎', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else{
      toast.error('Error Updating Details!', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  const handlePassSubmit = async() => {
    let Res;
    if(npassword == cpassword){
    let data = {token : user.token, password,cpassword,npassword}
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepass`,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(data),
    })
    Res = await a.json();
  }else{
    Res = {success : false};
  }
    if(Res.success){
      toast.success('Successfully Updated Password! 😎', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else{
      toast.error('Error Updating Password!', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    setpassword("");
    setNpassword("");
    setCpassword("");
  }

  return (
  <div className="mx-auto my-9 container">
    <ToastContainer />
    <h1 className="text-center text-3xl font-bold">Update your Account</h1>
    
        <h2 className="font-semibold text-xl">1. Delivery Details</h2>
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
                E-mail (cannot be updated)
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
        </div>
        <button
        onClick={handleUserSubmit}
            className="disabled:bg-orange-300 flex items-center mx-auto text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-700 rounded text-sm"
          >
            Submit
          </button>
        <h2 className="font-semibold text-xl">2. Update Password</h2>
        <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="password"
                className="leading-7 font-semibold text-md text-gray-600"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                placeholder="Enter your new Password"
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
            <label
                htmlFor="password"
                className="leading-7 font-semibold text-md text-gray-600"
              >
                New Password
              </label>
              <input
                value={npassword}
                onChange={(e) => {
                  setNpassword(e.target.value);
                }}
                placeholder="Re-Enter Password"
                type="password"
                id="npassword"
                name="npassword"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
            <label
                htmlFor="password"
                className="leading-7 font-semibold text-md text-gray-600"
              >
                Confirm Password
              </label>
              <input
                value={cpassword}
                onChange={(e) => {
                  setCpassword(e.target.value);
                }}
                placeholder="Re-Enter Password"
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          
        </div>
        <button
        onClick={handlePassSubmit}
            className="disabled:bg-orange-300 flex items-center mx-auto text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-700 rounded text-sm"
          >
            Submit
          </button>
  </div>);
}




export default MyAccount;
