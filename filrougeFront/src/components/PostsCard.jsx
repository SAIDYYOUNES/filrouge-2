
import moment from "moment/moment";
import SavedPost from "./Actions/SavedPost";
import Actions from "./Actions/Actions";
import { useNavigate } from "react-router-dom";
import { readTime } from "../utils/helper";
import { useSelector } from "react-redux";


const PostsCard = ({ post }) => {
  const { user, logged } = useSelector((state) => state.users);
  const { title, content, createdAt, image: postImg, _id: postId, user: { name, _id: userId } } = post;

  const navigate = useNavigate();

  return (
    <section className="border-b pt-2">
      <div
        onClick={() => navigate(`/post/${postId}`)}
        className="flex flex-col sm:flex-row gap-4 cursor-pointer  mb-6 pb-4">
        <div className="flex-[2.5]">
          <div className="flex items-center mb-3 gap-2">
            <img
              onClick={() => navigate(`/profile/${user._id}`)}
              className="w-[2rem] h-[2rem] object-cover rounded-full cursor-pointer"
              src={'https://impactplumbing.ca/wp-content/uploads/2015/03/no-profile-img.gif'}
              alt="user-img"
            />
            <p className=" font-semibold capitalize">{name}</p>
          </div>
          <h2 className="text-xl font-bold line-clamp-2 leading-6 capitalize">
            {title}
          </h2>
          <div
            className="py-1 text-gray-500 line-clamp-2 leading-5"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        {postImg && (
          <div className="flex-[1]">
            <img
              src={'http://localhost:5000/uploads/'+postImg}
              alt="postImg"
              className="w-[10rem] h-[8rem] object-cover"
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between w-full md:w-[70%] mt-[2rem] md:mt-0">
        <p className="text-xs text-gray-600">
          {readTime({ __html: content })} min read .
          {moment(createdAt).format("MMM DD")}
        </p>
        <div className="flex items-center gap-3">
          <SavedPost post={post} />
          
        </div>
      </div>
    </section>
  );
};

export default PostsCard;
