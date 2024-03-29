import React from "react";
import { FaRegComment } from "react-icons/fa";
import { Blog } from "../../Context/Context";

const Comment = ({total}) => {
  const { setShowComment } = Blog();
  return (
    <button
      onClick={() => setShowComment(true)}
      className="flex items-center gap-1 text-sm">
      <FaRegComment className="text-lg" />
      <span>{total}</span>
    </button>
  );
};

export default Comment;
