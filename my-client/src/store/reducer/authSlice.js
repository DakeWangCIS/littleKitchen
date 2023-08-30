import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: () => {
        const token = localStorage.getItem('token');
        if(!token) {
            return {
                isLogged: false,
                token: null,
                user: null,
                is_admin: false
            };
        }
        return {
            isLogged: true,
            token,
            user: JSON.parse(localStorage.getItem('user')),
            is_admin: JSON.parse(localStorage.getItem('user')).is_admin
        }
    },
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

export const {login, logout} = authSlice.actions;