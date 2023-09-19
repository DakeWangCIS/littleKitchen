import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/',
        prepareHeaders(headers) {
            const token = localStorage.getItem('token');
            if(token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints(build) {
        return {
            getUsers: build.query({
                query() {
                    return {
                        url: 'users',
                        method: 'GET'
                    }
                },
                transformResponse(baseQueryReturnValue, metaArg, baseQueryArg) {
                    return baseQueryReturnValue.data;
                }
            }),
            getUserById: build.query({
                query(id) {
                    return {
                        url: `users/${id}`,
                        method: 'GET'
                    }
                }
            }),
            updateUser: build.mutation({
                query({id, ...fields}) {
                    return {
                        url: `users/${id}`,
                        method: 'PUT',
                        body: fields
                    };
                },
                invalidatesTags: [{type: 'User', id: 'LIST'}]
            }),
            deleteUser: build.mutation({
                query(id) {
                    return {
                        url: `users/${id}`,
                        method: 'DELETE'
                    }
                }
            }),
        }
    }
});

export const {useGetUsersQuery, useGetUserByIdQuery, useUpdateUserMutation, useDeleteUserMutation} = userApi;