import { useParams } from "react-router-dom";
import Loading from "./Loading";
import PostsCard from "./PostsCard";
import { useSelector ,useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../Redux/Posts/actions";
import Discover from "./Discover";


const SavedPosts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  const { posts } = useSelector((state) => state.posts);
  const {user }= useSelector((state)=>state.users)

  const filteredData = posts.filter((post) =>user.savedPosts.includes(post._id) );

  return (
    <section className="size my-[2rem]">
      <div>
        <h3 className="text-3xl pb-6 border-b border-black mb-[3rem]">
          {filteredData.length
            ? "Your Saved Posts :"
            : "There is no saved posts yet "}
        </h3>
       
      </div>
      <div className="size py-7 flex flex-col-reverse md:flex-row gap-[7rem]">
        <div className="flex-[3]">
        {posts.length ==0? (
          <Loading />
        ) : (
          <div className="lg:max-w-[60%] flex flex-col gap-[2rem]">
            {filteredData &&
              filteredData.map((post, i) => <PostsCard post={post} key={i} />)}
          </div>
        )}
        </div>
        <div className="flex-[1] relative">
          <Discover />
        </div>
      </div>
    </section>
  );
};

export default SavedPosts;
