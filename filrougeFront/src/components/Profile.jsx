import React, { useEffect, useState } from "react";
import Modal from "../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { IoSettingsSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Redux/Posts/actions";
import Loading from "./Loading";
import PostsCard from "./PostsCard";

import { useParams } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.users);
  const { posts, loading } = useSelector(state => state.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  const { userId } = useParams();
  const userPosts = posts.filter((post) => post.user._id === userId);
  const [modal, setModal] = useState(false);
return (
    <section className="size flex gap-[4rem] relative">
      <div className="mt-[9rem] flex-[2]">
        <div className="flex items-end gap-4">
          <h2 className="text-3xl sm:text-5xl font-bold capitalize">
            {user?.name}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            Followers({0})
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            Followings({5})
          </p>
        </div>
        <div className="flex items-center gap-5 mt-[1rem] border-b border-gray-300 mb-[3rem]">

        </div>
        <section className="flex flex-col gap-[2.5rem]">
          {loading ? (
            <Loading />
          ) : (
            userPosts &&
            userPosts.map((post, i) => <PostsCard post={post} key={i} />)
          )}
        </section>

      </div>
      {/* button to open the side bar  */}
      <button
        onClick={() => setModal(true)}
        className="fixed top-[8rem] right-0 w-[2rem] h-[2rem] bg-black text-white
        grid place-items-center md:hidden">
        <IoSettingsSharp />
      </button>
      {/* user details  */}
      <Modal modal={modal} setModal={setModal}>
        <div
          className={`flex-[1] border-l border-gray-300 p-[2rem] 
        fixed right-0 bottom-0 top-0 w-[18rem] bg-white md:sticky
        ${modal ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"}
        transition-all duration-500`}>
          {/* icons to close out modal  */}
          <div className="pb-4 text-right">
            <button
              onClick={() => setModal(false)}
              className="inline-block md:hidden">
              <LiaTimesSolid />
            </button>
          </div>
          {/* profile details  */}
          <div className="sticky top-7 flex flex-col justify-between">
            <img
              className="w-[3.5rem] h-[3.5rem] object-cover rounded-full"
              src={'https://impactplumbing.ca/wp-content/uploads/2015/03/no-profile-img.gif'}
              alt="profile-img"
            />
            <h2 className="py-2 font-bold capitalize">
              {user?.name}
            </h2>
            <p className="text-gray-500 first-letter:uppercase text-sm">
              {user?.bio}
            </p>
            {
              // currentUser?.uid === getUserData?.userId
              false
              && (
                <button
                  onClick={() => setEditModal(true)}
                  className="text-green-700 pt-6 text-sm w-fit">
                  Edit Profile
                </button>
              )}
            <div className="flex-[1] flex items-center flex-wrap gap-3 pt-8">
             
            </div>
          </div>
        </div>
      </Modal>
     
    </section>
  );
};

export default Profile;