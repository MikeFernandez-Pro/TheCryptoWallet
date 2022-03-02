import { configureStore } from "@reduxjs/toolkit";
import  walletReducer from "./wallet-slice";

const store = configureStore({
    reducer: {
        wallet: walletReducer
    }
});

export default store;


