import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    status : false,
    data : null
};

const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        plantId:(state, action)=>{
            state.status = true;
            state.data = action.payload.data;
        },
        lineId:(state, action)=>{
            state.status = true;
            state.data = action.payload.data;
        },
        machineId:(state, action)=>{
            state.status = true;
            state.data = action.payload.data;
        },
        mouldId:(state, action)=>{
            state.status = true;
            state.data = action.payload.data;
        },
        productId:(state, action)=>{
            state.status = true;
            state.data = action.payload.data;
        },
        
    }
})

export const {plantId, lineId, machineId, mouldId, productId} = filterSlice.actions;
export default filterSlice.reducer;