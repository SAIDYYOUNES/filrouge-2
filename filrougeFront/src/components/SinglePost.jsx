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
    const { logged, user: currentUser } = useSelector(state => state.users)
    const { post, loading } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPost(postId));
    }, []);
    const copyId = async () => {
        try {
    await navigator.clipboard.writeText(user._id);
            toast.success("user Id has been copied");

        } catch (error) {
            toast.error(error.message);
        }
    };
    const { title, content, createdAt, image: postImg, _id, user, likes, links } = post;

    const navigate = useNavigate();

    return (
        <>
            {loading && post ? (
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

                                </div>
                                <p className="text-sm text-gray-500">
                                    {readTime({ __html: content })} min read .
                                    <span className="ml-1">{moment(createdAt).fromNow()}</span>
                                </p>
                            </div>
                            {logged && currentUser?.role == 'admin' &&
                                    <button onClick={copyId} 
                                    className="inline-flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600"
                                    >Copy Id</button>
                                    
                                }
                        </div>
                        <div className="flex items-center justify-between border-b border-t border-gray-200 py-[0.5rem]">
                            <div className="flex items-center gap-5">
                                <Like />
                                <Comment total={post.comments?.length} />
                            </div>
                            <div className="flex items-center pt-2 gap-5">
                                {post && <SavedPost post={post} />}
                                <SharePost />
                                {logged && currentUser._id == user?._id &&
                                    <Actions postId={postId} title={title} desc={content} />
                                }
                               
                            </div>
                        </div>
                        <div className="mt-[3rem]">
                            {postImg && (
                                <img
                                    className="w-full h-[400px] object-cover"
                                    src={'http://localhost:5000/uploads/' + postImg}
                                    alt="post-img"
                                />
                            )}
                            <div
                                className="mt-6"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                            <div className="mt-12">
                                <div className="border-b border-gray-400 pb-7">
                                    <h2 className="font-semibold">Links</h2>
                                    <div className="my-2 flex flex-col items-center gap-3 ">
                                        {links?.map((item, i) => (
                                            <button
                                                onClick={() => window.open(item, '_blank')}
                                                key={i}
                                                className="bg-gray-200 py-2 px-3 text-sm rounded-full">
                                                {item}
                                            </button>
                                        ))}
                                    </div>

                                </div>
                                <div className="flex items-center flex-wrap gap-3 leading-3 pt-8">

                                </div>
                            </div>
                        </div>
                    </section>
                    <Comments postId={postId} />
                </>
            )}
        </>
    );
};

export default SinglePost;
