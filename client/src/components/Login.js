// Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logo } from "../images";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
   
    navigate('/chat');
  };

  return (
      <div className="flex flex-col justify-center px-16 bg-pink-700 max-md:pl-5">
        <div className="flex overflow-hidden relative flex-col justify-center items-start py-7 max-w-full min-h-[1024px] w-[1376px] max-md:pr-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb277a7687009cb8cbec68c30e386abe93d94db7ce903780ca6c4f414e2fc9bb?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
            className="object-cover absolute inset-0 size-full"
          />
          <div className="flex relative justify-center items-center px-16 py-20 border border-solid bg-indigo-950 border-white border-opacity-10 rounded-[40px] max-md:px-5 max-md:max-w-full">
            <div className="flex flex-col px-8 py-14 mt-11 mb-5 max-w-full w-[763px] max-md:px-5 max-md:mt-10">
              <div className="flex flex-col max-md:max-w-full">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ea0dc34b389e0ee56042d7362ef5e3502dc37811dabc874895ff7af123c689f5?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea0dc34b389e0ee56042d7362ef5e3502dc37811dabc874895ff7af123c689f5?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea0dc34b389e0ee56042d7362ef5e3502dc37811dabc874895ff7af123c689f5?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea0dc34b389e0ee56042d7362ef5e3502dc37811dabc874895ff7af123c689f5?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea0dc34b389e0ee56042d7362ef5e3502dc37811dabc874895ff7af123c689f5?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea0dc34b389e0ee56042d7362ef5e3502dc37811dabc874895ff7af123c689f5?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea0dc34b389e0ee56042d7362ef5e3502dc37811dabc874895ff7af123c689f5?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ea0dc34b389e0ee56042d7362ef5e3502dc37811dabc874895ff7af123c689f5?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                  className="w-16 aspect-square"
                />
                <div className="flex flex-col justify-center mt-6 max-md:max-w-full">
                  <div className="text-4xl tracking-tighter leading-10 text-neutral-50 max-md:max-w-full">
                    Login to your account
                  </div>
                  <div className="mt-4 text-base font-bold leading-5 text-center text-pink-700 max-md:max-w-full">
                    <span className="leading-6 text-gray-500 ">
                      Don’t have an account?
                    </span>{" "}
                    <span className="font-semibold text-pink-700">Sign Up</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-10 text-sm text-neutral-50 max-md:max-w-full">
                <div className="flex flex-col leading-[129%] max-md:max-w-full">
                  <div className="flex gap-2 justify-center px-4 py-3.5 whitespace-nowrap rounded-2xl border border-pink-700 border-solid max-md:flex-wrap">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a99731288c1a75fc89114372e4c44899efa848e22057d4eb0d70d3e96120790?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                      className="shrink-0 w-7 aspect-square"
                    />
                    <div className="flex-1 my-auto max-md:max-w-full">Email</div>
                  </div>
                  <div className="flex gap-2 justify-between px-4 py-3.5 mt-6 whitespace-nowrap rounded-2xl border border-pink-800 border-solid max-md:flex-wrap">
                    <div className="flex gap-2 max-md:flex-wrap">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/aecfbbbf90a7982a35a885a164cc0cc3c16d68c5877874b15920f717dfbd652d?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                        className="shrink-0 w-7 aspect-square"
                      />
                      <div className="flex-1 my-auto max-md:max-w-full">
                        Password
                      </div>
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/7091fb591e247cbe4d2d4fb4f668303084eec4119d3ca239ef533ecd242d8539?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                      className="shrink-0 w-7 aspect-square"
                    />
                  </div>
                  <div className="justify-center px-4 mt-6 font-semibold text-right text-slate-50 max-md:max-w-full">
                    Forgot Password?
                  </div>
                </div>
                <div className="justify-center items-center px-6 py-5 mt-8 text-base font-bold whitespace-nowrap bg-pink-800 rounded-[36px] max-md:px-5 max-md:max-w-full">
                  Login
                </div>
                <div className="justify-center items-center px-16 mt-8 text-gray-500 leading-[129%] max-md:px-5 max-md:max-w-full">
                  Or login with
                </div>
                <div className="flex gap-4 justify-center mt-8 text-base font-bold whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                  <div className="flex flex-1 justify-center items-center px-6 py-4 bg-gray-500 bg-opacity-30 rounded-[36px] max-md:px-5">
                    <div className="flex gap-2">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7bc554b6bd87d91e64db5140f7f4d9f77fe040ca86d2ada98ac738009046eb88?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                        className="shrink-0 w-6 aspect-square"
                      />
                      <div className="my-auto">Google</div>
                    </div>
                  </div>
                  <div className="flex flex-1 justify-center items-center px-6 py-4 bg-gray-500 bg-opacity-30 rounded-[36px] max-md:px-5">
                    <div className="flex gap-2">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2496f6becb45f85255fb30430205f9ff6ab25ab500bde4a4a107dff255ce0dd5?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                        className="shrink-0 w-6 aspect-square"
                      />
                      <div className="my-auto">Facebook</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
