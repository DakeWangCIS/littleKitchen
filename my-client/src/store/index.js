import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "./api/authApi";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authSlice} from "./reducer/authSlice";
import {userSlice} from "./reducer/userSlice";
import {userApi} from "./api/userApi";

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        auth: authSlice.reducer,
        users: userSlice.reducer,

    },
    middleware: (getDefaultMiddleware) => {
       return getDefaultMiddleware()
           .concat(authApi.middleware)
           .concat(userApi.middleware)
    }
})

setupListeners(store.dispatch);

export default store;