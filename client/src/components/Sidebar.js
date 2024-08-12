import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doSignOut } from '../firebase/auth';

function Sidebar({ resetChat }) {
  const navigate = useNavigate();

  const handleNewChat = () => {
    resetChat();
  };

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className="flex flex-col w-[23%] max-md:ml-0 max-md:w-full h-full">
      <div className="flex flex-col grow px-4 pt-8 pb-4 w-full rounded-3xl border-r border-solid bg-indigo-950 border-r-white border-r-opacity-10 max-md:pr-5 max-md:mt-8 overflow-auto">
        <div className="flex flex-col cursor-pointer">
          <div className="flex flex-col pb-4 text-3xl font-semibold leading-6 text-neutral-50">
            <div className="flex flex-col justify-center px-4 py-3 w-full rounded-xl bg-white bg-opacity-2">
              <div className="flex justify-center">
              <img
                  loading="lazy"
                  src="https://media.discordapp.net/attachments/1226859331098640446/1272501886473338931/leo-logo.webp?ex=66bb353b&is=66b9e3bb&hm=552fcc7972b10e18d4b78a0b71c97290ca3e25e42f2b31ca11460ad7b0f3aa64&=&format=webp&width=625&height=212"
                  className="object-contain w-[50%] h-auto"
                  alt="Leo Logo"
              />
              </div>
            </div>
          </div>
          <div className="flex z-10 flex-col -mt-4 text-base leading-6 text-neutral-200">
            <div className="flex flex-col">
              <div className="flex gap-3 px-4 py-3 rounded-xl shadow-sm">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3415f94d759050ebb1e94797edd04e7090640ade2e0df79d2b856e8326832677?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                  className="shrink-0 my-auto w-5 aspect-square"
                  alt=''
                />
                <div>How to write an impacting ...</div>
              </div>
              <div className="flex gap-3 px-4 py-3 mt-1 rounded-xl shadow-sm">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8747002c886561fe6eeeb0e87f1a4f3f53d518003eee30c1b9fbbbe657d30016?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                  className="shrink-0 my-auto w-5 aspect-square"
                  alt=''
                />
                <div>Web accessibility</div>
              </div>
              <div className="flex gap-3 px-4 py-3 mt-1 rounded-xl shadow-sm">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa20cd752807bdd975666312096c93ffb101d4c3783f54f1b4cd832035df4a1a?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                  className="shrink-0 my-auto w-5 aspect-square"
                  alt=''
                />
                <div>Design inspiration</div>
              </div>
              <div className="flex gap-3 px-4 py-3 mt-1 rounded-xl shadow-sm">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8efc6241736f05d408d82e03fcbf86ae39daecda1f1136ad15b63663f28fde6?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                  className="shrink-0 my-auto w-5 aspect-square"
                  alt=''
                />
                <div>What is machine learning</div>
              </div>
            </div>
            <div
              onClick={handleNewChat}
              className="flex gap-3 px-4 py-3 mt-4 font-medium bg-pink-800 rounded-xl shadow-sm cursor-pointer"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/680ccf037ae3324b37240a189f6910948d4861387c221cff6415294bfe79e299?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                className="shrink-0 w-6 aspect-square"
                alt=''
              />
              <div>Start a new chat</div>
            </div>
          </div>
          <div className="flex flex-col justify-center mt-10 text-base leading-6 text-neutral-200 max-md:mt-4">
            <div className="flex flex-col justify-center">
              <div className="flex flex-col pt-1.5">
                <div className="flex gap-3 px-4 py-3 rounded-xl shadow-sm">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/95104ea10286005fdd20849ea71461da3c49910312168d6ca7783cda6909cac5?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                    className="shrink-0 my-auto w-5 aspect-square"
                    alt=''
                  />
                  <div>Clear all conversations</div>
                </div>
                <div className="flex gap-3 px-4 py-3 mt-1 rounded-xl shadow-sm">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/52b5be7910d5bbaf066b7fe2921b6d14bf03f04e61f3a0a2d6d5e7e8d899ed92?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                    className="shrink-0 my-auto w-5 aspect-square"
                    alt=''
                  />
                  <div>Switch Light Mode</div>
                </div>
                <div className="flex gap-3 px-4 py-3 mt-1 rounded-xl shadow-sm">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/492ff50bc1a3acfb621a7b9b9d72d373d161c07ba723418cf9949ef20a3e38e7?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                    className="shrink-0 my-auto w-5 aspect-square"
                    alt=''
                  />
                  <div>Upgrade to Pro</div>
                </div>
                <div className="flex gap-3 px-4 py-3 mt-1 rounded-xl shadow-sm">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/79c1654f44627c6b0db56679b08e79147fd6de35a07bf126250abf1a88f2b548?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                    className="shrink-0 my-auto w-5 aspect-square"
                    alt=''
                  />
                  <div>Updates & FAQ</div>
                </div>
                <div
                  onClick={handleLogout}
                  className="flex gap-3 px-4 py-3 mt-1 text-rose-500 rounded-xl shadow-sm cursor-pointer"
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c84f30c054d44366b00df6b2494c7ffafbbd15234fc91f67f38efca58c3cf02?apiKey=b9e8a53434bd4901a8aa6b01f0bdd9a1&"
                    className="shrink-0 my-auto w-5 aspect-square"
                    alt=''
                  />
                  <div>Log out</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
