import { usersTypes } from './actions';
import { decodeJwt } from 'jose';
const initialeState = { 
    user: localStorage.getItem('user') ? decodeJwt(localStorage.getItem('user')) : null,
    logged: localStorage.getItem('user'),
}
export const usersReducer = (state = initialeState, action) => {
    switch (action.type) {
        case usersTypes.LOGIN:
            return { ...state, user: action.payload, logged: true };
        case usersTypes.LOGOUT:
            return { ...state, user: null, logged: false };
        case usersTypes.REGISTER:
            return { ...state, user: action.payload, logged: true };
        case usersTypes.TOGGLE_SAVE:
            const updatedUser = { ...state.user, ...action.payload };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return { ...state, user: updatedUser };
        default:
            return state;
    }
}
