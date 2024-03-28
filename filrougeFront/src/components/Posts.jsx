import React, { useEffect } from "react";
import PostsCard from "./PostsCard";
import Loading from "./Loading";
import { useDispatch ,useSelector } from "react-redux";
import { getPosts } from "../Redux/Posts/actions";

const Posts = () => {
  const disppatch = useDispatch();
  const {posts , loading} = useSelector(state => state.posts);
  useEffect(() => {
    disppatch(getPosts());
  }, []);
  return (
    <section className="flex flex-col gap-[2.5rem]">
      {loading ? (
        <Loading />
      ) : (
        posts &&
        posts.map((post, i) => <PostsCard post={post} key={i} />)
      )}
    </section>
  );
};

export default Posts;
