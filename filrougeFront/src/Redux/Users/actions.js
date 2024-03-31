import { toast } from 'react-toastify';
import axios from '../../config'
export const usersTypes = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    REGISTER: "REGISTER",
    TOGGLE_SAVE: "TOGGLE_SAVE"
};
export const login = (user) => {
    return async (dispatch) => {
        const { data } = await axios.post("/Auth/login", user);
        if (data.err) {
            toast.error(data.message)
        }
        else {
            toast.success("Welcome back!")
            dispatch({ type: usersTypes.LOGIN, payload: data.data });
            localStorage.setItem("user", JSON.stringify(data.data));
        }

    };
};
export const register = (user) => {
    const {confirmPassword,firstName ,lastName,...rest} = user
    return async (dispatch) => {
        const { data } = await axios.post("/Auth/register", { ...rest, name: `${firstName} ${lastName}` });

    };
};
export const logout = () => {
    return async (dispatch) => {
        localStorage.removeItem("user");
        dispatch({ type: usersTypes.LOGOUT });
    };
};
export const toggleSave = (id) => {
    return async (dispatch) => {
        const { data } = await axios.post(`/Auth/savePost/${id}`);
        dispatch({ type: usersTypes.TOGGLE_SAVE, payload: data });
    };
}