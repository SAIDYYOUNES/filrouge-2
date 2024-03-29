import React, { useState } from "react";
import { Blog } from "../../Context/Context";
import moment from "moment";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import DropDown from "../../utils/DropDown";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const Comment = ({ item: comment, postId }) => {
  const{user:currentUser , logged}=useSelector(state=>state.users)
  const [drop, setDrop] = useState(false);
  const [more, setMore] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editComment, setEditComment] = useState("");

  const {content, createdAt ,likes,user } = comment;
  const removeComment = () => {
    console.log("remove");
  }
 return (
    <section className="border-b">
      {!isEdit ? (
        <>
          <div className="flex items-center gap-5">
            <img
              className="w-[2rem] h-[2rem] object-cover rounded-full"
              src={"https://impactplumbing.ca/wp-content/uploads/2015/03/no-profile-img.gif"}
              alt="user-img"
            />
            <div className="flex-1 flex justify-between">
              <div>
                <h2 className="text-sm capitalize">{user.name}</h2>
                <p className="text-sm text-gray-400">
                  {moment(createdAt).fromNow()}
                </p>
              </div>
              <div className="relative">
                {
                logged && currentUser?._id === user._id
                && (
                  <>
                    <button
                      onClick={() => setDrop(!drop)}
                      className="text-2xl hover:opacity-70">
                      <BiDotsHorizontalRounded />
                    </button>
                    <DropDown
                      showDrop={drop}
                      setShowDrop={setDrop}
                      size="w-[10rem]">
                      <Button click={removeComment} title="Delete" />
                    </DropDown>
                  </>
                )}
              </div>
            </div>
          </div>
          <p className="py-4 text-sm">
            {more ? content : content.substring(0, 100)}
            {content.length > 100 && (
              <button onClick={() => setMore(!more)}>
                {more ? "...less" : "...more"}
              </button>
            )}
          </p>
        </>
      ) : (
        <div className="bg-white shadows p-4">
          <textarea
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            placeholder="Write your update text..."
            className="w-full resize-none outline-none text-sm"></textarea>
          <div className="flex items-center justify-end gap-2">
            <button onClick={() => setIsEdit(false)} className="w-fit text-sm">
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="btn !text-white !bg-green-700 !rounded-full !text-xs">
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Comment;

const Button = ({ click, title }) => {
  return (
    <button
      onClick={click}
      className="p-2 hover:bg-gray-200 text-black/80 w-full text-sm text-left">
      {title}
    </button>
  );
};
