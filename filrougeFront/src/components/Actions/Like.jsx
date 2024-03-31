import React, { useEffect, useState } from "react";
import { PiHandsClappingDuotone } from "react-icons/pi";
import { useSelector ,useDispatch } from "react-redux";
import { likePost } from "../../Redux/Posts/actions";
import { Blog } from "../../Context/Context";
const Like = () => {
 const {user,logged} = useSelector(state => state.users)
 const {post:{likes ,_id:postId}} = useSelector(state => state.posts)
 const {setAuthModel}=Blog()
 const dispatch = useDispatch()
  const handleLike =  () => {
    if(!logged) setAuthModel(true)
  dispatch(likePost(postId))
      
  };
  return (
    <button onClick={handleLike} className="flex items-center gap-1 text-sm">
      <PiHandsClappingDuotone
        className={`text-xl ${likes?.includes(user?._id) ? "text-black" : "text-gray-500"}`}
      />
      <span>{likes?.length}</span>
    </button>
  );
};

export default Like;
