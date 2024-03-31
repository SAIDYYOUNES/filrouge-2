import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import DropDown from "../../utils/DropDown";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deletePost, selectPost } from "../../Redux/Posts/actions";

const Actions = ({ postId }) => {
  const dispatch = useDispatch();
  const [showDrop, setShowDrop] = useState(false);
  const handleClick = () => {
    setShowDrop(!showDrop);
  };

  const navigate = useNavigate(null);

  const handleEdit = () => {
    navigate(`/editPost/${postId}`);
    dispatch(selectPost(postId));
  };

  const handleRemove = async () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
     
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(postId))
        Swal.fire("Deleted!", "", "success");
      }
    });
  };
  return (
    <div className="relative">
      <button onClick={handleClick}>
        <BsThreeDots className="text-2xl" />
      </button>
      <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[7rem]">
        <Button click={handleEdit} title="Edit Story" />
        <Button click={handleRemove} title="Delete Story" />
      </DropDown>
    </div>
  );
};

export default Actions;

const Button = ({ click, title }) => {
  return (
    <button
      onClick={click}
      className={`p-2 hover:bg-gray-100 hover:text-black/80 w-full text-sm text-left
    ${title === "Delete Story" ? "text-red-600" : ""}
    `}>
      {title}
    </button>
  );
};
