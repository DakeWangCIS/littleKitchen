import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useGetUsersQuery, useGetUserByIdQuery, useUpdateUserMutation, useDeleteUserMutation } from "../api/userApi";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, { dispatch }) => {
        const { data } = await useGetUsersQuery().unwrap();
        return data;
    }
);

export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (id, { dispatch }) => {
        const { data } = await useGetUserByIdQuery(id).unwrap();
        return data;
    }
);

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        selectedUser: null,
        status: 'idle',
    },
    reducers: {
        updateUserState(state, action) {
            const userIndex = state.users.findIndex(user => user.id === action.payload.id);
            if (userIndex >= 0) {
                state.users[userIndex] = action.payload;
            }
        },
        deleteUserState(state, action) {
            const userIndex = state.users.findIndex(user => user.id === action.payload);
            if (userIndex >= 0) {
                state.users.splice(userIndex, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'idle';
                state.users = action.payload;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.selectedUser = action.payload;
            });
    },
});

export const { updateUserState, deleteUserState } = userSlice.actions;

export default userSlice.reducer;
