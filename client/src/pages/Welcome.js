import * as React from "react";
import { useNavigate } from "react-router-dom";
import { logo2 } from "../images";

export default function Welcome() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="bg-[#8B084E] flex justify-center items-center min-h-screen px-16 py-20 border border-solid border-white border-opacity-10 rounded-[40px] max-md:px-5">
      <div className="flex flex-col items-center pb-8 max-w-full w-[564px]">
        <img src={logo2} alt="Logo" className="h-16 mb-6" />
        <div className="flex flex-col px-7 pb-6 leading-[150%] text-indigo-950 max-md:px-5 max-md:max-w-full items-center">
          <div className="flex gap-4 text-5xl font-semibold tracking-wider max-md:flex-wrap max-md:text-4xl items-center justify-center">
            <div className="flex-auto my-auto max-md:text-4xl text-center text-white">Welcome to</div>
            <div className="flex gap-1.5 max-md:text-4xl items-center justify-center">
              <div className="shrink-0 border-solid bg-indigo-950 border-[3px] border-indigo-950 h-[72px] w-[3px]" />
              <div className="flex-auto my-auto max-md:text-4xl">LEO</div>
            </div>
          </div>
          <div className="self-center mt-4 text-xl text-center text-white">
            Log in with your LEO AI account to continue
          </div>
        </div>
        <div className="flex gap-4 items-start self-center mt-1.5 text-sm font-medium leading-7 text-center text-white">
          <div className="justify-center px-16 py-3 bg-gray-400 rounded-xl border border-solid border-indigo-950 text-indigo-950 border-opacity-50 max-md:px-5 cursor-pointer" onClick={handleLoginClick}>
            Log in
          </div>
          <div className="justify-center px-14 py-3 bg-gray-400 rounded-xl border border-solid border-indigo-950 text-indigo-950 border-opacity-50 max-md:px-5 cursor-pointer" onClick={handleLoginClick}>
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
}
