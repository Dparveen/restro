import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";

function Home() {
  const params = useParams();
  useEffect(()=>{
    console.log(params)
    localStorage.setItem('table', JSON.stringify(params.id));
    localStorage.setItem('where', JSON.stringify(params.where));
  })
  const userName = useSelector((state) => state.user.userName);
  return (
    <>
      <div className="my-10 px-4 text-center sm:my-16">
        <div>
          <h1 className="mb-8  text-xl font-semibold md:text-3xl">
            My Restaurant and Hotel
            <br />
            <span className="text-yellow-500 text-sm">
              Marrige Party, Kitty Party, B'day Party, Aniversery and Many More.
            </span>
            <hr />
            {params.id === '99999' ?
            <span className="text-red-500">
                Please Scan The Qr Code to Continue The Order
            </span>
            :
            <span className="text-yellow-500">
              {params.where ==='1' ?'Table' : 'Room'} Number: {params.id}
            </span>
            }
          </h1>
        </div>

        {params.id === '99999' ? '' : userName === ""  ? (
          <CreateUser />
        ) : (
          <Button to="/menu" type="primary">
            Continue Ordering, {userName}
          </Button>
        )}
      </div>
    </>
  );
}

export default Home;
