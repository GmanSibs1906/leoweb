import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-700">
      <div className="flex flex-col justify-center items-center w-full max-w-lg bg-indigo-950 border border-solid border-white border-opacity-10 rounded-[40px] p-8">
        <div className="flex flex-col px-8 pt-16 mt-2 mb-11 max-w-full w-[763px] max-md:px-5 max-md:mb-10">
          <div className="flex flex-col max-md:max-w-full">
            <div className="flex gap-4 self-start text-3xl font-semibold leading-6 text-neutral-50">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/cb6332f575121e953596ef88905e5cbc83fee640ad4d9c44fb529e9301e22acb?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/cb6332f575121e953596ef88905e5cbc83fee640ad4d9c44fb529e9301e22acb?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cb6332f575121e953596ef88905e5cbc83fee640ad4d9c44fb529e9301e22acb?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/cb6332f575121e953596ef88905e5cbc83fee640ad4d9c44fb529e9301e22acb?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/cb6332f575121e953596ef88905e5cbc83fee640ad4d9c44fb529e9301e22acb?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cb6332f575121e953596ef88905e5cbc83fee640ad4d9c44fb529e9301e22acb?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/cb6332f575121e953596ef88905e5cbc83fee640ad4d9c44fb529e9301e22acb?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/cb6332f575121e953596ef88905e5cbc83fee640ad4d9c44fb529e9301e22acb?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                className="shrink-0 w-14 aspect-[1.41]"
                alt="Logo"
              />
              <div className="flex-1 justify-center my-auto text-ellipsis">
                LEO AI
              </div>
            </div>
            <div className="flex flex-col justify-center mt-6 max-md:max-w-full">
              <div className="text-4xl tracking-tighter leading-10 text-neutral-50 max-md:max-w-full">
                Create a new account
              </div>
              <div className="mt-4 text-base font-bold leading-5 text-center text-pink-700 max-md:max-w-full">
                <span className="leading-6 text-gray-500 ">
                  Already have an account?
                </span>{" "}
                <span
                  className="font-semibold text-pink-700 cursor-pointer"
                  onClick={() => navigate('/login')}
                >
                  Login
                </span>
              </div>
            </div>
          </div>
          <form className="flex flex-col mt-10 max-md:max-w-full" onSubmit={handleSignUp}>
            <div className="flex flex-col text-base leading-5 text-neutral-50 max-md:max-w-full">
              <input
                type="text"
                placeholder="Full Name"
                className="justify-center px-4 py-5 text-lg leading-5 rounded-2xl border border-pink-700 border-solid max-md:pr-5 max-md:max-w-full"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="justify-center px-4 py-5 mt-6 whitespace-nowrap rounded-2xl border border-pink-700 border-solid max-md:pr-5 max-md:max-w-full"
                required
              />
              <input
                type="email"
                placeholder="Confirm Email"
                className="justify-center px-4 py-5 mt-6 rounded-2xl border border-pink-700 border-solid max-md:pr-5 max-md:max-w-full"
                required
              />
              <div className="flex gap-2 justify-center px-4 py-3.5 mt-6 whitespace-nowrap rounded-2xl border border-pink-800 border-solid max-md:flex-wrap">
                <input
                  type="password"
                  placeholder="Password"
                  className="flex-1 my-auto max-md:max-w-full bg-transparent border-none focus:outline-none text-neutral-50"
                  required
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3764e0037156513098f716d12d66560e191c604ce0a3ed96ecdb2e8c20588f52?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                  className="shrink-0 w-7 aspect-square"
                  alt="Password Icon"
                />
              </div>
            </div>
            <button
              type="submit"
              className="justify-center items-center px-6 py-5 mt-8 text-base font-bold bg-pink-800 rounded-[36px] text-neutral-50 max-md:px-5 max-md:max-w-full"
            >
              Sign Up
            </button>
          </form>
          <div className="justify-center items-center px-16 mt-8 text-sm leading-5 text-neutral-50 max-md:px-5 max-md:max-w-full">
            Or Sign Up with
          </div>
          <div className="flex flex-col justify-center mt-8 max-md:max-w-full">
            <div className="shrink-0 h-1 bg-gray-500 bg-opacity-30 rounded-[36px] max-md:max-w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
