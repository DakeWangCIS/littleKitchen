import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {userApi} from "../api/userApi";

// get all users
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, { dispatch }) => {
        const result = await dispatch(userApi.endpoints.getUsers.initiate());
        if (result.error) {
            throw result.error;
        }
        return result.data;
    }
);

// get user by id
export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (id, { dispatch }) => {
        const result = await dispatch(userApi.endpoints.getUserById.initiate(id));
        console.log("Response from fetchUserById:", result); // Add this line
        if (result.error) {
            throw result.error;
        }
        return result.data;
    }
);

// update user
export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (user, { dispatch }) => {
        const result = await dispatch(userApi.endpoints.updateUser.initiate(user));
        if (result.error) {
            throw result.error;
        }
        return result.data;
    }
);

// delete user
export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id, { dispatch }) => {
        const result = await dispatch(userApi.endpoints.deleteUser.initiate(id));
        if (result.error) {
            throw result.error;
        }
        return id;
    }
);

// define userSlice
export const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        selectedUser: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'idle';
                state.users = action.payload;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.selectedUser = action.payload;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const userIndex = state.users.findIndex(user => user.id === action.payload.id);
                if (userIndex >= 0) {
                    state.users[userIndex] = action.payload;
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const userIndex = state.users.findIndex(user => user.id === action.payload);
                if (userIndex >= 0) {
                    state.users.splice(userIndex, 1);
                }
            });
    },
});

// Export the reducer
export const userReducer = userSlice.reducer;