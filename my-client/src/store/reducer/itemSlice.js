import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {itemApi} from "../api/itemApi";


//get all items
export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async (_, { dispatch }) => {
        const result = await dispatch(itemApi.endpoints.getItems.initiate());
        if (result.error) {
            throw result.error;
        }
        return result.data;
    }
);

//get item by id
export const fetchItemById = createAsyncThunk(
    'items/fetchItemById',
    async (id, { dispatch }) => {
        const result = await dispatch(itemApi.endpoints.getItemById.initiate(id));
        console.log("Response from fetchItemById:", result); // Add this line
        if (result.error) {
            throw result.error;
        }
        return result.data;
    }
);

//get item by name
export const fetchItemByName = createAsyncThunk(
    'items/fetchItemByName',
    async (name, { dispatch }) => {
        const result = await dispatch(itemApi.endpoints.getItemByName.initiate(name));
        console.log("Response from fetchItemByName:", result); // Add this line
        if (result.error) {
            throw result.error;
        }
        return result.data;
    }
);

//create item
export const createItem = createAsyncThunk(
    'items/createItem',
    async (item, { dispatch }) => {
        const result = await dispatch(itemApi.endpoints.createItem.initiate(item));
        console.log("Response from createItem:", result); // Add this line
        if (result.error) {
            throw result.error;
        }
        return result.data;
    }
);

//update item
export const updateItem = createAsyncThunk(
    'items/updateItem',
    async (item, { dispatch }) => {
        const result = await dispatch(itemApi.endpoints.updateItem.initiate(item));
        console.log("Response from updateItem:", result); // Add this line
        if (result.error) {
            throw result.error;
        }
        return result.data;
    }
);

//delete item
export const deleteItem = createAsyncThunk(
    'items/deleteItem',
    async (id, { dispatch }) => {
        const result = await dispatch(itemApi.endpoints.deleteItem.initiate(id));
        console.log("Response from deleteItem:", result); // Add this line
        if (result.error) {
            throw result.error;
        }
        return result.data;
    }
);

// define itemSlice
export const itemSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        selectedItem: null,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload;
            })
            .addCase(fetchItemById.fulfilled, (state, action) => {
                state.selectedItem = action.payload;
            })
            .addCase(fetchItemByName.fulfilled, (state, action) => {
                state.selectedItem = action.payload;
            })
            .addCase(createItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
                if (itemIndex >= 0) {
                    state.items[itemIndex] = action.payload;
                }
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
                if (itemIndex >= 0) {
                    state.items.splice(itemIndex, 1);
                }
            });
    },
});

// Export the reducer
export const itemReducer = itemSlice.reducer;