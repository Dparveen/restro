import Header from './Header';
import Loader from './Loader';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_URL } from '../services/apiRestaurant';
function AppLayout() {
  const [desk, setDesk]=useState(true);
  const params = useParams();
  useEffect(() => {
    if(params.id==='9999'){
      checkPermission();
    }
      
  },[params.id,params.where])

  const checkPermission = async() =>{
    console.log(params)
    // try {
    //   const res = await fetch(`${API_URL}/tablePremission`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
      
    //   if (!res.ok) throw Error();
    //   const { data } = await res.json();
    //     // console.log(data)
    //   if(!data.status){
    //     return data;
    //   }else{
    //     return data;
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      {!desk
      ?''
      :<>
          <Header />
          <div className="overflow-scroll">
            <main className="mx-auto max-w-3xl">
              <Outlet />
            </main>
          </div>
          <CartOverview />
        </>
      }
    </div>
  );
}

export default AppLayout;
