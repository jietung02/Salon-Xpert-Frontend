import { useContext, useEffect, useState } from "react";
import { Button, } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogin, useGuest } from "../hooks/useLogin";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  let location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, role, isLoggedOut, dispatch, } = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { guestAuth } = useGuest();
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'RESETLOGOUT' });
    const authData = await login({ username, password });
    if (authData !== undefined) {
      dispatch({ type: 'LOGIN', payload: authData });
    }
    sessionStorage.setItem('authData', JSON.stringify(authData));
  }

  const handleGuestMode = () => {

    const fetchGuestData = async () => {
      const guestData = await guestAuth();

      if (guestData !== undefined) {
        dispatch({ type: 'GUESTLOGIN', payload: guestData });
      }
      sessionStorage.setItem('authData', JSON.stringify(guestData));
    }
    fetchGuestData();
  }

  useEffect(() => {

    if (isAuthenticated === true) {

      if (role === 'admin') {
        navigate('/admin');
      }
      else if (role === 'staff') {
        navigate('/staff')
      }
      else if (role === 'customer') {
        navigate('/customer');
      }
      else if (role === 'guest') {
        navigate('/guest/feedback-ratings');
      }

    }
    else if (isAuthenticated === 'guest') {
      navigate('/guest/new-appointment');
    }

  }, [isAuthenticated]);

  useEffect(() => {
    if (location.state) {
      const { successMessage: msg } = location.state;
      setSuccessMessage(msg);
    }
    const timer = setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

    if (isAuthenticated === true) {
      console.log(role);
      if (role === 'admin') {
        navigate('/admin');
      }
      else if (role === 'staff') {
        navigate('/staff')
      }
      else if (role === 'customer') {
        navigate('/customer');
      }
      else if (role === 'guest') {
        navigate('/guest/feedback-ratings');
      }
    }
    else if (isAuthenticated === 'guest') {
      navigate('/guest/new-appointment');
    }
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-5xl font-semibold text-gray-900 dark:text-white">
          Salon Xpert
        </a>
        {successMessage && (
          <div class="flex w-8/12 md:w-3/12 mx-auto items-center p-4 md:mt-10 mb-4 text-sm text-white rounded-lg bg-green-500 text-green-400" role="alert">
            <InformationCircleIcon className="h-5 w-5" />
            <span class="sr-only">Info</span>
            <div>
              <span className="pl-2">{successMessage}</span>
            </div>
          </div>
        )}
        <div className="w-full bg-gray-800 rounded-lg shadow dark:border md:mt-0 md:w-1/2 2xl:w-1/3 xl:p-0 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
              Sign in to your account
            </h1>

            <form className="space-y-4 md:space-y-6" action="/sign-up" method="post" onSubmit={handleSubmit}>
              {error && (
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                  <span class="block sm:inline text-xl 2xl:text-2xl">{error}</span>
                </div>
              )}
              {isLoggedOut && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative" role="alert">
                  <span className="block sm:inline text-xs">You have been successfully logged out.</span>
                </div>
              )}
              <div>
                <label htmlFor="username" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white">Your Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 md:text-xl sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  autocomplete="one-time-code"
                  required=""
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                  placeholder="••••••••"
                  autocomplete="one-time-code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 md:text-xl sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              
              <Button disabled={loading} variant="outlined" size="xl" fullWidth="true" className="text-white" type="submit" >Sign in</Button>
              {/* <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button> */}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                Don't have an account yet? <Link to="/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
              </p>
              <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                <a onClick={handleGuestMode} className="font-medium text-primary-600 hover:underline dark:text-primary-500" style={{ cursor: 'pointer' }}>Continue as Guest</a>
              </p>

            </form>
          </div>
        </div>
      </div>
    </section>
  );

}