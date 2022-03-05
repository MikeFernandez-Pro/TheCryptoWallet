import { configureStore } from "@reduxjs/toolkit";
import graphicSlice from "./Graphic/graphic-slice";
import  walletReducer from "./Wallet/wallet-slice";

const store = configureStore({
    reducer: {
        wallet: walletReducer,
        graphic: graphicSlice.reducer
    }
});

export default store;


