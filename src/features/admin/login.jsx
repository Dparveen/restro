import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { loginAdmin } from "../../services/apiRestaurant";


function Login() {
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
          window.location.href=`/dashboard`;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[])

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (username !== '' && pass !== '') {

     let resp = await loginAdmin(username, pass);
     if(resp.status){
      setError(true);
      setErrorMessage('wait for dataCollector');
      localStorage.setItem('token', JSON.stringify({token:resp.token}));
     }else{
      setError(true);
      setErrorMessage('Authentication failed');
     }
      // console.log(username, "username ", pass, "pass");
    } else if (username === '') {
      setError(true);
      setErrorMessage("Please Enter Username")
      console.log("Enter Username");
    } else if (pass === '') {
      setError(true);
      setErrorMessage("Please Enter Password");
      console.log("Enter Password");
    }

    setTimeout(() => {
      setError(false);
      setErrorMessage('');
    }, 1000);
  }

  // const userName = useSelector((state) => state.user.userName);
  return (
    <>
      <div className="my-10 px-4 text-center sm:my-16">
        <div>
          <h1 className="mb-8  text-xl font-semibold md:text-3xl">
            OH TEN SPOON HOTEL.
            <hr />
            Login
          </h1>
          <form onSubmit={handleSubmit}>
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

export default Login;
