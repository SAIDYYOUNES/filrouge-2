import { adminTypes } from "./actions";
const initialeState = {
    reports: [],
    users: [],
}

export const adminReducer = (state = initialeState, action) => {
    switch (action.type) {
        case adminTypes.GET_REPORTS:
            return { ...state, reports: action.payload };
        case adminTypes.GET_USERS:
            return { ...state, users: action.payload };
        case adminTypes.MARK_READ:
            return { ...state, reports: state.reports.map(report => report._id === action.payload ? { ...report, read: true } : report) }
        case adminTypes.BAN_USER:
            return { ...state, users: state.users.map(user => user._id === action.payload ? { ...user, banned: true } : user) }
            default:
            return state;
    }
}