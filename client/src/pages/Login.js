import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logo2 } from "../images";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/chat');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-950">
      <div className="flex flex-col justify-center items-center w-full max-w-lg bg-indigo-950 border-opacity-10 rounded-[40px] p-12">
        <img src={logo2} alt="Logo" className="h-16 mb-6" />
        <div className="flex flex-col items-center text-center text-neutral-50">
          <div className="text-4xl font-semibold tracking-wider mb-4">Login to your account</div>
          <div className="text-base font-bold text-pink-700">
            <span className="text-gray-500">Don’t have an account?</span>{" "}
            <span className="font-semibold text-pink-700 cursor-pointer">Sign Up</span>
          </div>
        </div>
        <form onSubmit={handleLogin} className="w-full mt-6">
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-3 bg-transparent border border-pink-700 rounded-2xl focus:outline-none text-neutral-50"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-3 bg-transparent border border-pink-800 rounded-2xl focus:outline-none text-neutral-50"
              required
            />
            <div className="text-right text-slate-50 font-semibold cursor-pointer">Forgot Password?</div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 px-6 py-3 text-gray-200 font-bold bg-pink-800 rounded-3xl focus:outline-none"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-gray-500">Or login with</div>
        <div className="flex gap-4 mt-4 w-full">
          <button className="flex-1 flex justify-center items-center text-neutral-50 px-4 py-3 bg-gray-500 bg-opacity-30 rounded-3xl focus:outline-none">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7bc554b6bd87d91e64db5140f7f4d9f77fe040ca86d2ada98ac738009046eb88?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
              alt="Google"
              className="w-6 mr-2"
            />
            Google
          </button>
          <button className="flex-1 flex justify-center items-center text-neutral-50 px-4 py-3 bg-gray-500 bg-opacity-30 rounded-3xl focus:outline-none">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2496f6becb45f85255fb30430205f9ff6ab25ab500bde4a4a107dff255ce0dd5?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
              alt="Facebook"
              className="w-6 mr-2"
            />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
