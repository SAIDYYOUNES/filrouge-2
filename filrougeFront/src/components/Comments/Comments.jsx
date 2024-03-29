import React, { useEffect, useState } from "react";
import Modal from "../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { Blog } from "../../Context/Context";
import { toast } from "react-toastify";
import Loading from "./../Loading";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { addComment } from "../../Redux/Posts/actions";
import { useDispatch } from "react-redux";

const Comments = ({ postId }) => {
  const { logged , user } = useSelector((state) => state.users);
  const {
    showComment,
    setShowComment,
  } = Blog();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const { post:{comments}, loading } = useSelector((state) => state.posts);

const writeComment = () => {
    if (!comment) return toast.error("Comment can't be empty");
    dispatch(addComment(postId, comment ,user));
    setComment("");

  }



  return (
    <Modal setModal={setShowComment} modal={showComment}>
      <section
        className={`fixed top-0 right-0 bottom-0 z-50 bg-white w-[22rem] shadows p-5
        overflow-y-auto transition-all duration-500
        ${showComment ? "translate-x-0" : "translate-x-[23rem]"}
      `}>
        {/* header  */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Responses({comments?.length})</h3>
          <button onClick={() => setShowComment(false)} className="text-xl">
            <LiaTimesSolid />
          </button>
        </div>
        {logged && (
          <div className="shadows p-3 my-5 overflow-hidden">
            <div className="flex items-center gap-2 mb-5">
              <img
                className="w-[2rem] h-[2rem] object-cover rounded-full"
                src={ "https://impactplumbing.ca/wp-content/uploads/2015/03/no-profile-img.gif"}
                alt="user-img"
              />
              <h3 className="capitalize text-sm">{user.name}</h3>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What are your thoughts?"
              className="w-full outline-none resize-none text-sm border px-2 pt-4"></textarea>
            <div className="flex items-center justify-end gap-4 mt-[1rem]">
              <button onClick={() => setComment("")} className="text-sm">
                Cancel
              </button>
              <button
                onClick={writeComment}
                className="btn !text-xs !bg-green-700 !text-white !rounded-full">
                Response
              </button>
            </div>
          </div>
        )}
        {comments && comments.length === 0 ? (
          <p>This post has no comments</p>
        ) : (
          <div className="border-t py-4 mt-8 flex flex-col gap-8">
            {comments &&
              comments.map((item, i) =>
                loading ? (
                  <Loading />
                ) : (
                  <Comment item={item} postId={postId} key={i} />
                )
              )}
          </div>
        )}
      </section>
    </Modal>
  );
};

export default Comments;
