// Test ID: IIDSAT

import OrderItem from "./OrderItem";
import {useEffect, useState} from 'react';
import { json, useLoaderData } from "react-router-dom";
import { getOrder , handeladd, handelNew} from "../../services/apiRestaurant";
import {
  formatCurrency,
} from "../../utils/helpers";
// import Button from "../../ui/Button";

function Order() {
  const order = useLoaderData();
  const [billSts, setbillSts]=useState(true);
  const [pay, setpay]=useState(1);
  const [Errors, setError]=useState(false);
  const [ErrorMessage, setErrorMessage]=useState(null);
  const [where, setWhere]=useState(1);
  const [table, setTable]=useState(1);
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {id,status,orderPrice,cart,} = order;

    useEffect(()=>{
      getItem();
      checkBill(id)
    },[id])
    const getItem=async () =>{
      setWhere(JSON.parse(localStorage.getItem('where')));
      setTable(JSON.parse(localStorage.getItem('table')));
    }

    const checkBill = async(id) => {
      console.log("here aal stored data", id)
      try {
        console.log(id)
        const res = await fetch(`http://localhost:5000/billcheck/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw Error();
        const { data } = await res.json();
        console.log('Responce from new server data',data)
        if(data.status){
          // alert(data.msg);
          setbillSts(!data.status)
          setpay(data.data.status)
        }
      } catch {
        throw Error("Failed creating your order");
      }
    }

  const handelBill = async(id) => {
    console.log("here aal stored data", id)
    try {
      console.log(id)
      const res = await fetch(`http://localhost:5000/billRequest/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw Error();
      const { data } = await res.json();
      console.log('Responce from new server data',data)
          setbillSts(!data.status);
          data.data !== undefined ? setpay(data.data.status):setpay(1);
          setError(true);
          setErrorMessage(data.msg)
    } catch {
      throw Error("Failed creating your order");
    }
  }
  const download = async () => {
    console.log('Downloading');
    setErrorMessage("Get from the desk");
    setError(true)
  }
  if(Errors){
    setTimeout(() => {
      setErrorMessage(null);
      setError(false)
    }, 2000);
  }
  return (
    <div className="space-y-6 px-4 py-6">
      <h2 className="inline-block text-sm bg-blue-700 font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-green-300 focus:bg-blue-900 focus:outline-none focus:ring focus:ring-green-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-2 md:py-1 text-xl w-full text-center">{`${where===1 ?'Table':'Room'} No:-${table}`}</h2>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold sm:text-xl">
          {" "}
          NOTE This Order Id <span className="bg-yellow-500">#{id}</span> To
          Search Later
        </h2>

        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <span>STATUS:</span>
          {pay===1
          ?<span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            Pending
          </span>
          :<span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            Paid
          </span>}
        </div>
      </div>

      <ul className="dive-stone-200 divide-y border-b border-t">
        {console.log("my page",cart)}
        {cart.map((item, i) => (
          <OrderItem item={item} key={item.unique_id} />
        ))}
      </ul>
          {Errors ?<div className="flex item-center space-y-2 bg-stone-200 px-6 py-5"><span ><b>{ErrorMessage}</b></span></div>:''}
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price: {formatCurrency(orderPrice)}
        </p>
        {billSts ?
          <>
        <button 
        className="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed mx-2 px-4 py-2.5 md:px-4 md:py-2.5 text-xs"
        onClick={()=>handelBill(id)}>
          Genrate Bill
          </button>

          <button 
        className="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed mx-2 px-4 py-2.5 md:px-4 md:py-2.5 text-xs"
        onClick={()=>handeladd(id)}>
          Add More
          </button>
          </> 
          : <><p>Bill Genrated if want to update then contact Cash Desk</p> <br />
            {pay === 1 ? <span style={{color: 'red'}}>Bill Payment Pending</span>
                      :<><span style={{color: 'green'}}>Bill Paid Successfully</span><hr /><button className="inline-block text-sm bg-blue-700 font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-green-300 focus:bg-blue-900 focus:outline-none focus:ring focus:ring-green-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-4 md:py-2.5 text-xl" onClick={(e)=>download()}>Download Invoice</button></>
            }
            </>
            }

          <span style={{float:'right'}}>
            <button 
        className="inline-block text-sm bg-blue-700 font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-green-300 focus:bg-blue-900 focus:outline-none focus:ring focus:ring-green-300 focus:ring-offset-2 disabled:cursor-not-allowed mx-2 px-4 py-2.5 md:px-4 md:py-2.5 text-xl"
        onClick={()=>handelNew()}>
          New Order
          </button>
          </span>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
