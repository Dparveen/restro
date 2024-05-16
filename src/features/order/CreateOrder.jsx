import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder, updateOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";
import { useEffect, useState } from "react";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const userName = useSelector((state) => state.user.userName);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [localOrder, setLocalOrder]=useState('')
  const formErrors = useActionData();
  const cart = useSelector((state) => state.cart.cart);

  useEffect(()=>{

    localOrderID()

  },[])

  const localOrderID = async() => { 
    let order = await localStorage.getItem('order_id');
    setLocalOrder(order);
};
console.log("local order", localOrder)
  // const [withPriority, setWithPriority] = useState(false);
  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        {localOrder === undefined || localOrder ==='' || localOrder === null?
        <>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            defaultValue={userName}
            className="input grow"
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" maxLength="10" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>
        </>
        :''}

        {/* <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div> */}

        {/* <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div> */}

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? "Placing order...." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const orderid = localStorage.getItem('order_id');
  // console.log("get order from local storeage",orderid)
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };
if(orderid === undefined || orderid ==='' || orderid === null) {
  const errors = {};
  if(order.phone.length !== 10){
    errors.phone =
      "Phone Number Must be 10 digit.";
  if (Object.keys(errors).length > 0) return errors;
  }
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;
}
  
  
  let newOrder = [];
  //If everything is okay, create new order and redirect
  console.log("order id at order page " + orderid)
  if(orderid=== undefined || orderid ==='' || orderid === null){
    newOrder = await createOrder(order);
    store.dispatch(clearCart());
  return redirect(`/order/${newOrder[0].id}`);
  }else{
    newOrder = await updateOrder(orderid, order);
    console.log("new order call",newOrder)
    store.dispatch(clearCart());
  return redirect(`/order/${orderid}`);
  }
  
  // console.log(" revert order",newOrder[0])
  
}

export default CreateOrder;
