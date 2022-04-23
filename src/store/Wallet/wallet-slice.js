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
        image: "",
        priceChangeDay: 0,
        rank: 0
    },
    totalValue: 0,
    showValue: true,
    isLoading: true,
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
        constructAllowedItemsList(state, action) {
            state.tokensList = action.payload
        },
        defineTotalValue(state, action) {
            state.totalValue = action.payload;
        },
        datasLoaded(state) {
            state.isLoading = false;
        }
    }
});

export default walletSlice.reducer;

export const walletActions = walletSlice.actions;