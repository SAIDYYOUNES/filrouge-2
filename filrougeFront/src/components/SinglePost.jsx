import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { readTime } from "../utils/helper";
import moment from "moment/moment";
import Actions from "./Actions/Actions";
import Like from "./Actions/Like";
import Comment from "./Actions/Comment";
import SharePost from "./Actions/SharePost";
import SavedPost from "./Actions/SavedPost";
import Comments from "./Comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../Redux/Posts/actions";

const SinglePost = () => {
    const { postId } = useParams();
    const { post, loading } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPost(postId));
    }, []);

    const { title, content, createdAt, image: postImg, _id, user ,likes} = post;

    const navigate = useNavigate();

    return (
        <>
            {loading && post? (
                <Loading />
            ) : (
                <>
                    <section className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
                        <h2 className="text-4xl font-extrabold capitalize">{title}</h2>
                        <div className="flex items-center gap-2 py-[2rem]">
                            <img
                                onClick={() => navigate(`/profile/${user._id}`)}
                                className="w-[3rem] h-[3rem] object-cover rounded-full cursor-pointer"
                                src={'https://impactplumbing.ca/wp-content/uploads/2015/03/no-profile-img.gif'}
                                alt="user-img"
                            />
                            <div>
                                <div className="capitalize">
                                    <span>{user?.name} .</span>
                                    {/* {currentUser && currentUser?.uid !== userId && (
                                        <FollowBtn userId={userId} />
                                    )} */}
                                </div>
                                <p className="text-sm text-gray-500">
                                    {readTime({ __html: content })} min read .
                                    <span className="ml-1">{moment(createdAt).fromNow()}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between border-b border-t border-gray-200 py-[0.5rem]">
                            <div className="flex items-center gap-5">
                                <Like  />
                                <Comment total={post.comments?.length} />
                            </div>
                            <div className="flex items-center pt-2 gap-5">
                                {post && <SavedPost post={post} />}
                                <SharePost />
                                {true && (
                                    <Actions postId={postId} title={title} desc={content} />
                                )}
                            </div>
                        </div>
                        <div className="mt-[3rem]">
                            {postImg && (
                                <img
                                    className="w-full h-[400px] object-cover"
                                    src={postImg}
                                    alt="post-img"
                                />
                            )}
                            <div
                                className="mt-6"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </div>
                    </section>
                    {/* {post && <Recommended post={post} />} */}
                    <Comments postId={postId} />
                </>
            )}
        </>
    );
};

export default SinglePost;
