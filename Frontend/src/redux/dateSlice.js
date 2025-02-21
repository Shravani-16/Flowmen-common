import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status: false,
    dates: []
};

const dateSlice = createSlice({
    name: 'datePicker',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.status = true;
            state.dates = action.payload.dates;
        } 
    }
});

// Exporting the setDate action for use in components
export const { setDate } = dateSlice.actions;

// Exporting the reducer to be used in the store
export default dateSlice.reducer;
