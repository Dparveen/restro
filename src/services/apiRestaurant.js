// const API_URL = "https://react-fast-pizza-api.onrender.com/api";
export const API_URL = "http://localhost:5000";

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting menu");
  const { data } = await res.json();
  console.log(data)
  return data;
}


export async function getCat() {
  const res = await fetch(`${API_URL}/cats`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting Cats");
  const { data } = await res.json();
  console.log(data)
  return data;
}

export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);
  
  if (!res.ok) throw Error(`Couldn't find order #${id}`);
  const { data } = await res.json();
  console.log("get order data",data)
  return data;
}

export async function handeladd(orderid){
  
  localStorage.setItem('order_id',orderid)
  console.log("here aal stored data", orderid)
  window.location.href = '/menu';
}

export async function handelNew(){
  localStorage.setItem('order_id','')
  console.log("New Order")
  window.location.href = '/99999/1';
}

export async function deleteitem(id,orderid){
  console.log(`${API_URL}/deleteItem/${id}`);
  const res = await fetch(`${API_URL}/deleteItem/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw Error();
  const { data } = await res.json();
  // console.log(data)
  if(!data.status){
    return data;
  }else{
    return data;
  }
}


export async function checkOrderId(orderid){
  let res = await fetch(`${API_URL}/orderidcheck/${orderid}`);
  const { data } = await res.json();
  // console.log(data)
  if(!data.is_order){
    localStorage.setItem('order_id','')
  }
}

export async function createOrder(newOrder) {
  try {
    const table = JSON.parse(localStorage.getItem('table'));
    const where = JSON.parse(localStorage.getItem('where'));
// Use storedUrlParams as needed
    console.log(newOrder,table, where )
    newOrder.table = table;
    newOrder.where = where;
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    console.log('Responce from new server data',data)
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(id, updateObj) {
  console.log('update order');
  try {
    const table = JSON.parse(localStorage.getItem('table'));
    const where = JSON.parse(localStorage.getItem('where'));
// Use storedUrlParams as needed
    console.log(updateObj,table, where )
    updateObj.table = table;
    updateObj.where = where;
    const res = await fetch(`${API_URL}/updateOrder/${id}`, {
      method: "POST",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("Failed updating your order");
  }
}



export async function loginAdmin(userName, pass) {
  console.log('admin Login');
  try {
    const res = await fetch(`${API_URL}/loginAdmin`, {
      method: "POST",
      body: JSON.stringify({userName: userName, pass: pass}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    console.log(data);
    if(data.status){
      return ({status:true,name:data.user_id,token:data.token,msg:'Authentication successful'});
    }else{
      return ({status:false,msg:'Authentication failed'});
    }
  } catch (err) {
    throw Error("Failed updating your order");
  }  
}
