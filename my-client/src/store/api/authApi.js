import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/',
        prepareHeaders(headers) {
            if(!localStorage.getItem('token')) {
                headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
            }
            return headers;
        }
    }),
    endpoints(build) {
        return {
            register: build.mutation({
                query(user) {
                    return {
                        url: 'users/register',
                        method: 'POST',
                        body: user
                    }
                }
            }),
            login: build.mutation({
                query(user) {
                    return {
                        url: 'login',
                        method: 'POST',
                        body: user
                    }
                }
            }),
        }
    }
});

export const {useRegisterMutation, useLoginMutation} = authApi;