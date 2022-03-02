import { createSlice } from "@reduxjs/toolkit";

const initialWalletState = {
    value: {
        key: "",
        id: "",
        name: "",
        symbol: "",
        amount: 0,
        currentPrice: 0,
        totalValue: 0,
        percentage: "",
        history: [],
        image: "",
        priceChangeDay: 0,
        rank: 0
    },
    totalValue: 0,
    showValue: true,
    tokensList: []
};

const walletSlice = createSlice({
    name: "wallet",
    initialState: initialWalletState,
    reducers: {
        constructWallet(state, action) {
            state.value = action.payload;
        },
        showOrHideWallet(state) {
            state.showValue = !state.showValue;
        },
        constructTokenList(state, action) {
            state.tokensList = action.payload
        },
        defineTotalValue(state, action) {
            state.totalValue = action.payload;
        }
    }
});

export default walletSlice.reducer;

export const walletActions = walletSlice.actions;