import * as React from "react";

export default function Welcome() {
  return (
    <div className="flex justify-center items-center px-16 py-20 border border-solid bg-indigo-950 border-white border-opacity-10 rounded-[40px] max-md:px-5">
      <div className="flex flex-col pb-8 mt-72 max-w-full w-[564px] max-md:mt-10">
        <div className="flex flex-col px-7 pb-6 leading-[150%] text-neutral-200 max-md:px-5 max-md:max-w-full">
          <div className="flex gap-4 text-5xl font-semibold tracking-wider max-md:flex-wrap max-md:text-4xl">
            <div className="flex-auto my-auto max-md:text-4xl">Welcome to </div>
            <div className="flex gap-1.5 max-md:text-4xl">
              <div className="shrink-0 border-solid bg-indigo-950 border-[3px] border-indigo-950 h-[72px] w-[3px]" />
              <div className="flex-auto my-auto max-md:text-4xl">LEO AI</div>
            </div>
          </div>
          <div className="self-center mt-4 text-xl">
            Log in with your LEO AI account to continue
          </div>
        </div>
        <div className="flex gap-4 items-start self-center mt-1.5 text-sm font-medium leading-7 text-center text-white">
          <div className="justify-center px-16 py-3 bg-pink-900 rounded-xl border border-solid border-white border-opacity-50 max-md:px-5">
            Log in
          </div>
          <div className="justify-center px-14 py-3 bg-pink-900 rounded-xl border border-solid border-white border-opacity-50 max-md:px-5">
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
}


