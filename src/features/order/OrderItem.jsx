import { useState } from 'react';
import { deleteitem } from '../../services/apiRestaurant';
import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalprice , unique_id, id} = item;

  const handelDelete = async(unique_id,id)=>{
    try {
      const data = await deleteitem(unique_id,id);
      console.log("item page",data)
      if(!data.status){
        alert(data.msg);
      }else{
        alert(data.msg);
        window.location.reload();
      }
    } catch (error) {
      alert(error);
    }
  }
  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalprice)}</p>
        <p className="font-bold">
        <button 
        className="inline-block text-sm rounded-full bg-red-400 font-semibold uppercase tracking-wide transition-colors duration-300 hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 focus:ring-offset-2 disabled:cursor-not-allowed mx-2 px-4 py-2.5 md:px-4 md:py-2.5 text-lg text-white"
        onClick={()=>handelDelete(unique_id, id)}
        >
          X
          </button>
        </p>
      </div>
    </li>
  );
}

export default OrderItem;
