import { configureStore } from "@reduxjs/toolkit";
import graphicSlice from "./graphic-slice";
import  walletReducer from "./wallet-slice";

const store = configureStore({
    reducer: {
        wallet: walletReducer,
        graphic: graphicSlice.reducer
    }
});

export default store;


