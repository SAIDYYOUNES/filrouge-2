import { postsTypes } from "./actions";
const initialeState = {
    posts: [],
    loading: true,
    post: {},
    tags: [],
    selectedPost: null,
}

export const postsReducer = (state = initialeState, action) => {
    switch (action.type) {
        case postsTypes.GET_POSTS:
            return { ...state, posts: action.payload.posts, pages: action.payload.pages, loading: false };
        case postsTypes.CREATE_POST:
            return { ...state, posts: [...state.posts, action.payload] };
        case postsTypes.DELETE_POST:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        case postsTypes.UPDATE_POST:
            return {
                ...state,
                selectedPost : null,
            };
        case postsTypes.GET_POST:
            return { ...state, post: action.payload, loading: false , selectedPost: action.payload};
        case postsTypes.GET_TAGS:
            return { ...state, tags: action.payload };
        case postsTypes.LIKE_POST:
            return {
                ...state, post: { ...state.post, likes: action.payload.likes }
            };
        case postsTypes.COMMENT_POST:
            return {
                ...state,
                post: { ...state.post, comments: [...state.post.comments, action.payload] }
            };
        case postsTypes.DELETE_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: state.post.comments.filter((comment) => comment._id !== action.payload) }
            };
        case postsTypes.SELECT_POST:
            return { ...state, selectedPost: action.payload , loading: false};
        default:
            return state;
    }
}