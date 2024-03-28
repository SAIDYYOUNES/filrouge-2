import axios from "../../config"
export const postsTypes = {
    GET_POSTS: 'GET_POSTS',
    LOADING_FALSE: 'LOADING_FALSE',
    LOADING_TRUE: 'LOADING_TRUE',
    CREATE_POST: 'CREATE_POST',
    DELETE_POST: 'DELETE_POST',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
    GET_TAGS: 'GET_TAGS',
    LIKE_POST: 'LIKE_POST',
    COMMENT_POST: 'COMMENT_POST',

}
export const getPosts = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: postsTypes.LOADING_TRUE });
            const { data } = await axios.get('/posts');
            dispatch({ type: postsTypes.GET_POSTS, payload: data })
        } catch (err) {
            console.log(err)
        }
    };
}
export const createPost = (post) => {
    return async (dispatch) => {
        const { data } = await axios.post('/posts', post);
        dispatch({ type: postsTypes.CREATE_POST, payload: data });
    };
}
export const deletePost = (id) => {
    return async (dispatch) => {
        await axios.delete(`/posts/${id}`);
        dispatch({ type: postsTypes.DELETE_POST, payload: id });
    };
}
export const updatePost = (id, post) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.put(`/posts/${id}`, post);
            dispatch({ type: postsTypes.UPDATE_POST, payload: data });
        }
        catch (err) {
            console.log(err)
        }
    };
}
export const getPost = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: postsTypes.LOADING_TRUE });
            const { data } = await axios.get(`/posts/${id}`);
            dispatch({ type: postsTypes.GET_POST, payload: data });
        } catch (err) {
            console.log(err)
        }
    };
}
export const getTags = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('posts/tags');
            dispatch({ type: postsTypes.GET_TAGS, payload: data });
        } catch (err) {
            console.log(err)
        }
    };
}
export const likePost = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.patch(`/posts/${id}`);
            dispatch({ type: postsTypes.LIKE_POST, payload: data });
        } catch (err) {
            console.log(err)
        }
    };
}
export const addComment = (id, comment, user) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`/comments`, {
                user: user._id,
                post: id,
                content: comment
            });
            const {token,...owner} = user
            console.log({
                ...data,
                user: owner
            })
            dispatch({ type: postsTypes.COMMENT_POST, payload: {
                ...data,
                user: owner
            } });
        } catch (err) {
            console.log(err)
        }
    };
}