import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


export const itemApi = createApi({
    reducerPath: 'itemApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/',
        prepareHeaders(headers, {query}) {
            if(query.requiresAuth) {
                const token = localStorage.getItem('token');
                if (token) {
                    headers.set('authorization', `Bearer ${token}`);
                }
            }
            return headers;
        }
    }),
    endpoints(build) {
        return {
            getItems: build.query({
                query() {
                    return {
                        url: 'items',
                        method: 'GET',
                    }
                },
                transformResponse(baseQueryReturnValue, metaArg, baseQueryArg) {
                    return baseQueryReturnValue.data;
                }
            }),
            getItemById: build.query({
                query(id) {
                    return {
                        url: `items/${id}`,
                        method: 'GET',
                    }
                }
            }),
            getItemByName: build.query({
                query(name) {
                    return {
                        url: `items/${name}`,
                        method: 'GET',
                    }
                }
            }),
            createItem: build.mutation({
                query(fields) {
                    return {
                        url: 'items',
                        method: 'POST',
                        body: fields,
                        requiresAuth: true
                    };
                },
            }),
            updateItem: build.mutation({
                query({id, ...fields}) {
                    return {
                        url: `items/${id}`,
                        method: 'PUT',
                        body: fields,
                        requiresAuth: true
                    };
                },
                invalidatesTags: [{type: 'Item', id: 'LIST'}]
            }),
            deleteItem: build.mutation({
                query(id) {
                    return {
                        url: `items/${id}`,
                        method: 'DELETE',
                        requiresAuth: true
                    }
                },
            }),
        }
    }
})