import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authSlice} from "./reducer/authSlice";
import {userReducer} from "./reducer/userSlice";
import {itemReducer} from "./reducer/itemSlice";
import {authApi} from "./api/authApi";
import {userApi} from "./api/userApi";
import {itemApi} from "./api/itemApi";

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        auth: authSlice.reducer,
        users: userReducer,
        items: itemReducer,
    },
    middleware: (getDefaultMiddleware) => {
       return getDefaultMiddleware()
           .concat(authApi.middleware)
           .concat(userApi.middleware)
           .concat(itemApi.middleware)
    }
})

setupListeners(store.dispatch);

export default store;