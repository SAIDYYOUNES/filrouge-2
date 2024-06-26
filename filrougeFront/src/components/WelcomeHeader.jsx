import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Blog } from "../Context/Context";
import { LiaEditSolid } from "react-icons/lia";
import { useSelector } from "react-redux";

const WelcomeHeader = () => {
  const { logged } = useSelector((state) => state.users)
  const [isActive, setIsActive] = useState(false);
  const { authModel, setAuthModel } = Blog();

  useEffect(() => {
    const scrollMe = () => {
      window.scrollY > 50 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener("scroll", scrollMe);
  }, []);
  return (
    <header
      className={`border-b border-black sticky top-0 z-50 
    ${isActive ? "bg-white" : "bg-banner"}
    transition-all duration-500`}>
      <div className="size h-[70px] flex items-center justify-between">
        <Link to={"/"}>
          <img
            className="h-[4rem]"
            src="./back.webp"
            alt="logo"
          />
        </Link>
        <div className="flex items-center gap-5">
          <div className="hidden text-sm sm:flex items-center gap-5">
            {
              !logged ?
                <button
                onClick={() => setAuthModel(true)}
                 className="hidden md:flex items-center gap-1 mb-[9px]">
                  <span className="text-3xl">
                    <LiaEditSolid />
                  </span>
                  <span className="text-sm mt-2">Write</span>
                </button> :
                <Link
                  to="/write"
                  className="hidden md:flex items-center gap-1  mb-[9px]">
                  <span className="text-3xl">
                    <LiaEditSolid />
                  </span>
                  <span className="text-sm mt-2">Write</span>
                </Link>
            }

          </div>
          <div className="relative">
            <button
              onClick={() => setAuthModel(true)}
              className="hidden text-sm sm:flex items-center gap-5">
              Sign In
            </button>
            <Auth modal={authModel} setModal={setAuthModel} />
          </div>
          <button
            onClick={() => setAuthModel(true)}
            className={`text-white rounded-full px-3 p-2 text-sm font-medium
            ${isActive ? "bg-green-700" : "bg-black"}
            `}>
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default WelcomeHeader;
