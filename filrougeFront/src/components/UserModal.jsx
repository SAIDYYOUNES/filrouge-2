import React, { useEffect } from "react";
import { LiaUserSolid } from "react-icons/lia";
import { MdOutlineLocalLibrary } from "react-icons/md";
import { BiSpreadsheet } from "react-icons/bi";
import { HiOutlineChartBar } from "react-icons/hi";
import { LiaEditSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { logout } from "../Redux/Users/actions";
import { useDispatch } from "react-redux";


const UserModal = ({ setModal }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.users);
  const userModal = [
    {
      title: "Profile",
      icon: <LiaUserSolid />,
      path: `/profile/${user?._id}`,
    },
    {
      title: "Saves",
      icon: <MdOutlineLocalLibrary />,
      path: "/saved",
    },
    {
      title: "Stories",
      icon: <BiSpreadsheet />,
      path: "/stories",
    }
   
  ];

  const navigate = useNavigate(null);
  const logoff = async () => {
    try {
      dispatch(logout()); 
      navigate("/demo");
      toast.success("User has be logged out");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section
      className="absolute w-[18rem] p-6 bg-white right-0 top-[100%]
    shadows rounded-md z-50 text-gray-500">
      <Link
        to="/write"
        className="flex md:hidden items-center gap-1 text-gray-500">
        <span className="text-3xl">
          <LiaEditSolid />
        </span>
        <span className="text-sm mt-2">Write</span>
      </Link>
      <div className="flex flex-col gap-4 border-b border-gray-300 pb-5">
        
        {userModal.map((link, i) => (
          <Link
            onClick={() => setModal(false)}
            className="flex items-center gap-2 text-gray-500 hover:text-black/70"
            key={i}
            to={link.path}>
            <span className="text-2xl">{link.icon}</span>
            <h2 className="text-md">{link.title}</h2>
          </Link>
        ))}
      </div>
      <button
        onClick={logoff}
        className="flex flex-col pt-5 cursor-pointer hover:text-black/70">
        Sign Out
        <span className="text-sm">{user.email}</span>
      </button>
    </section>
  );
};

export default UserModal;
