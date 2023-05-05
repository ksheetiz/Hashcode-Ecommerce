import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async(token) => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`,{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({token : token}),
      })
      let res = await a.json();
      setOrders(res.orders);
      //console.log(res);
    }
    if(!localStorage.getItem('myuser')){
      router.push('/');
    }
    else{
      const user = JSON.parse(localStorage.getItem("myuser"));
      fetchOrders(user.token);
    }
  }, [])
  

  return (
    <div className='min-h-screen'>
        <div className="container mx-auto">
            <h1 className="font-semibold text-xl text-center p-8">My Orders</h1>
            <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                        <th scope="col" className="px-6 py-4">Order Id</th>
                        <th scope="col" className="px-6 py-4">Status</th>
                        <th scope="col" className="px-6 py-4">Amount</th>
                        <th scope="col" className="px-6 py-4">Details</th>
                        </tr>
                    </thead>
                    <tbody>

                        {orders.map((item)=>{
                          return(
                            <tr key = {item._id}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{item.orderId}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.status === 'Payment Done' ? <p className='font-semibold text-green-600'>Payment Done</p> : <p className='font-semibold text-red-600'>Pending</p>}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.amount}</td>
                        <td className="whitespace-nowrap px-6 py-4"><Link href={'/order?id=' + item._id+'&clearCart=0'}>Details</Link></td>
                        </tr>
                          )
                        }) }
                        
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}


export default Orders;
