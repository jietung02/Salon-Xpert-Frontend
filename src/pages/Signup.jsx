
import { useState } from "react";
import {
  Button,
} from "@material-tailwind/react";
import { useRegister } from '../hooks/useRegister';

export default function Signup() {
  const { userData, loading, error, handleChange, handleSubmit } = useRegister();

  // const handleSubmit = async (e) => {


  //   // const navigate = useNavigate();
  //   // navigate('/sign-up');
  // }

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 text-white">
          SalonXpert
        </a>
        <div className="w-full bg-gray-800 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
              Create Your Account
            </h1>
            <form className="space-y-4 md:space-y-6" action="/sign-up" method="post" onSubmit={(e) => handleSubmit(e)}>
              {error && (
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                  <span class="block sm:inline text-xs">{error}</span>
                </div>
              )}
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 text-white">Your Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={(e) => handleChange(e)}
                  value={userData.username}
                  id="username"
                  pattern="^[a-zA-Z0-9_]{3,20}$"
                  title="Please enter a username between 3 and 20 characters, using only letters (both lowercase and uppercase), digits, or underscores."
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Username"
                  autocomplete="one-time-code"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  value={userData.password}
                  id="password"
                  placeholder="••••••••"
                  autocomplete="one-time-code"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                  title="Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  value={userData.email}
                  id="email"
                  placeholder="example@gmail.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-white">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => handleChange(e)}
                  value={userData.name}
                  id="name"
                  placeholder="Your Name"
                  pattern="[a-zA-Z\s]{2,50}"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 text-white">Gender</label>
                <select
                  name="gender"
                  onChange={(e) => handleChange(e)}
                  value={userData.gender}
                  id="gender"
                  placeholder="Select your gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value=""></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900 text-white">Birthdate</label>
                <input
                  type="date"
                  name="birthdate"
                  onChange={(e) => handleChange(e)}
                  value={userData.birthdate}
                  id="birthdate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-900 text-white">Contact Number (with -)</label>
                <input
                  type="tel"
                  name="contact"
                  onChange={(e) => handleChange(e)}
                  value={userData.contact}
                  id="contact"
                  placeholder="Your Contact Number"
                  pattern="[0-9]{1,3}-[0-9]{7,8}"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <Button disabled={loading} variant="outlined" size="sm" fullWidth="true" className="text-white" type="submit" >Sign Up</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}