import { createSlice } from "@reduxjs/toolkit";

const initialGraphicState = {
    datas: []
};

const graphicSlice = createSlice({
    name: "graphic",
    initialState: initialGraphicState,
    reducers: {
       fetchGraphDatas(state, action) {
           state.datas = action.payload;
       } 
    }
});

export default graphicSlice;

export const graphicActions = graphicSlice.actions;