import React, { useEffect, useState } from "react";
import { BsMedium } from "react-icons/bs";
import { LiaEditSolid } from "react-icons/lia";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link} from "react-router-dom";
import Search from "./Search";
import Modal from "../utils/Modal";
import UserModal from "./UserModal";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { MdOutlineDashboard } from "react-icons/md";


const HomeHeader = () => {
  const [modal, setModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);

  const { user ,logged } = useSelector(state => state.users);

  return (
    <header className="border-b border-gray-200">
      {!user && <Loading />}
      <div className="size h-[60px] flex items-center justify-between">
        {/* left side  */}
        <div className="flex items-center gap-3">
        <Link to={"/"}>
          <img
            className="h-[4rem]"
            src="./back.webp"
            alt="logo"
          />
        </Link>
        </div>
          <Search modal={searchModal} setModal={setSearchModal} />
        {/* right side  */}
        <div className="flex items-center gap-3 sm:gap-7">
          <span
            onClick={() => setSearchModal(true)}
            className="flex sm:hidden text-3xl text-gray-300 cursor-pointer">
            {/* <CiSearch /> */}
          </span>

          <Link
            to="/write"
            className="hidden md:flex items-center gap-1 text-gray-500">
            <span className="text-3xl">
              <LiaEditSolid />
            </span>
            <span className="text-sm mt-2">Write</span>
          </Link>
          {logged && user.role=='admin'
               &&<Link
            to="/dashboard"
            className="hidden md:flex items-center gap-1 text-gray-500">
            <span className="text-3xl">
            <MdOutlineDashboard />
            </span>
            <span className="text-sm mt-2">Dashboard</span>
          </Link>}
          <div className="flex items-center relative">
            <img
              onClick={() => setModal(true)}
              className="w-[2.3rem] h-[2.3rem] object-cover rounded-full cursor-pointer"
              src={"https://impactplumbing.ca/wp-content/uploads/2015/03/no-profile-img.gif"}
              alt="profile-img"
              />
            <span
              onClick={() => setModal(true)}
             className="text-gray-500 cursor-pointer">
              <MdKeyboardArrowDown />
            </span>
            <Modal modal={modal} setModal={setModal}>
              <div
                className={`${
                  modal ? "visible opacity-100%" : "invisible opacity-0"
                } transition-all duration-100`}>
                <UserModal setModal={setModal} />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
