import { useNavigation } from "react-router-dom";
import axios from "../../config"
import { toast } from "react-toastify";
export const adminTypes = {
    GET_REPORTS: 'GET_REPORTS',
    GET_USERS: 'GET_USERS',
    BAN_USER: 'BAN_USER',
    MARK_READ: 'MARK_READ'

}
export const markRead = (id) => {
    return async (dispatch) => {
        try {
            await axios.patch(`/reports/${id}`);
            dispatch({ type: adminTypes.MARK_READ, payload: id })
        } catch (err) {
            console.log(err)
        }
    };
}

export const getReports = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('/reports');
            dispatch({ type: adminTypes.GET_REPORTS, payload: data })
        } catch (err) {
            console.log(err)
        }
    };
}
export const getUsers = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('/admin/users');
            dispatch({ type: adminTypes.GET_USERS, payload: data })
        } catch (err) {
            console.log(err)
        }
    };
}
export const ban = (id) => {
    return async (dispatch) => {
        try {
            await axios.post(`/admin/banne/${id}`);
            dispatch({ type: adminTypes.BAN_USER, payload: id })
        } catch (err) {
            console.log(err)
        }
    };
}