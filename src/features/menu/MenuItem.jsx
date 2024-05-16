import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem } from "../cart/cartSlice";
import DeleteButton from "../../ui/DeleteButton";
import ButtonQuantity from "../../ui/ButtonQuantity";
import { useEffect } from "react";
import { checkOrderId } from "../../services/apiRestaurant";

function MenuItem({ pizza, filter }) {
  const dispatch = useDispatch();
  const { id, name, price, unitPrice, ingredients, soldOut, imageUrl, cat_id } = pizza;
  const currentquantity = useSelector((state) =>
    state.cart.cart.find((item) => (item.pizzaId === id ? item.quantity : 0)),
  );

  
  useEffect(()=>{

    localOrderID()

  },[])

  const localOrderID = async() => { 
    let order = await localStorage.getItem('order_id');
    if(order !== undefined && order !== '' && order !== null){
    checkOrderId(order)
    }
};

  const isInCart = currentquantity;
  console.log(filter, cat_id)
  const shouldDisplay = 
    filter === '' || cat_id === parseInt(filter);
  if (!shouldDisplay) {
    return null;
  }

  function onClickHandle() {
    const cartNewItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalprice: 1 * unitPrice,
    };
    dispatch(addItem(cartNewItem));
  }

  //const isinCart=

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {/* {ingredients.join(", ")} */}
          {ingredients}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <>
            <p className="text-sm opacity-70 grayscale" style={{ textDecoration: 'line-through' }}>Price {formatCurrency(price)}</p>
            <p className="text-sm">Offer Price {formatCurrency(unitPrice)}</p>
            </>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && (
            <div>
              <ButtonQuantity pizzaId={id} />
              <DeleteButton pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={onClickHandle}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
