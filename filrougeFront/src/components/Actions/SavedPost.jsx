import React, { useEffect, useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import { Blog } from "../../Context/Context";
import { toast } from "react-toastify";
import { use } from "express/lib/router";
import { useDispatch, useSelector } from "react-redux";
import { toggleSave } from "../../Redux/Users/actions";



const SavedPost = ({ post }) => {
  const dispatch = useDispatch();
  const { setAuthModel } = Blog();
  const { logged, user } = useSelector((state) => state.users);

  const handleSave = async () => {
    if (logged) {
      dispatch(toggleSave(post._id))
      if(user.savedPosts.includes(post._id)){
        toast.success("Post removed from saved")
      }
      else{
        toast.success("Post saved")
      }
    } else {
      setAuthModel(true)
    }
  };
  return (
    <div>
      <button onClick={handleSave} className="hover:opacity-60">
        <CiSaveDown2
          className={`text-2xl pointer-event-none
        ${user?.savedPosts.includes(post._id) ? "text-yellow-600" : ""}
        `}
        />
      </button>
    </div>
  );
};

export default SavedPost;
