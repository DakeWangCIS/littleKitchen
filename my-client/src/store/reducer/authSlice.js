import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged: false,
    token: null,
    user: null,
    is_admin: false
};

// 将localStorage的操作移到外部函数
const loadStateFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    if (!token) return initialState;

    return {
        isLogged: true,
        token,
        user: JSON.parse(localStorage.getItem('user')),
        is_admin: JSON.parse(localStorage.getItem('user')).is_admin
    };
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: loadStateFromLocalStorage(),
    reducers: {
        login(state, action) {
            state.isLogged = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.is_admin = action.payload.user.is_admin;
            localStorage.setItem('token', state.token);
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        logout(state) {
            state.isLogged = false;
            state.token = null;
            state.user = null;
            state.is_admin = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
});

export const { login, logout } = authSlice.actions;