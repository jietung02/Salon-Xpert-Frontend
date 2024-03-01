import { useContext, useEffect, useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import { Link, useNavigate } from "react-router-dom";
import { useLogin, useGuest } from "../hooks/useLogin";
import { AuthContext } from "../context/AuthContext";
export default function Login() {

  const navigate = useNavigate();
  const { isAuthenticated,
    name,
    email,
    gender,
    age,
    contact,
    role,
    permissions,
    token,
    isLoggedOut,
    dispatch,
  } = useContext(AuthContext);
  // const { isAuthenticated, role, permissions, isLoggedOut, dispatch } = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

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
      console.log(guestData)
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

    }
    else if (isAuthenticated === 'guest') {
      navigate('/guest');
    }

  }, [isAuthenticated]);

  useEffect(() => {
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
    }
    else if (isAuthenticated === 'guest') {
      navigate('/guest');
    }
  }, []);

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Salon Xpert
        </a>
        <div className="w-full bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="/sign-up" method="post" onSubmit={handleSubmit}>
              {error && (
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                  <span class="block sm:inline text-xs">{error}</span>
                </div>
              )}
              {isLoggedOut && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative" role="alert">
                  <span className="block sm:inline text-xs">You have been successfully logged out.</span>
                </div>
              )}
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required=""
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-gray-300">Forgot password?</a>
              </div>
              <Button disabled={loading} variant="outlined" size="sm" fullWidth="true" className="text-white" type="submit" >Sign in</Button>
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