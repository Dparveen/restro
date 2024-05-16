import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { loginAdmin } from "../../services/apiRestaurant";
import { Link } from "react-router-dom";


function Dashboard() {
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        let auth = await localStorage.getItem('token');
        // Additional asynchronous operations if needed
        let data = JSON.parse(auth);
        // console.log('token',data)
        if(data !== undefined && data !== null && data !==''){
          
        }else{
            window.location.href=`/admin/login`;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[])

  // const userName = useSelector((state) => state.user.userName);
  return (
    <>
      <div className="my-10 px-4 text-center sm:my-16">
        <div>
          <form >
            <p className="mb-4 text-sm text-stone-600 md:text-base">
              👋 Welcome! Please start by telling us your Authentication:
            </p>
            <div className="row mb-6">
              <div className="col-md-12">
                <input
                  type="text"
                  placeholder="Your Login ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input mb-8 w-72"
                />
              </div>
              <div className="col-md-12">
                <input
                  type="password"
                  placeholder="Your Password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="input mb-8 w-72"
                />
              </div>
              {error && errorMessage !== ''
              ? <p className="mb-4 text-sm text-red-700 md:text-base">{errorMessage}</p>
              : ''}
              <Button type={"danger"} children={'Login'} />
            </div>

            <div>

            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
