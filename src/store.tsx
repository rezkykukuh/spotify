import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slice/token-slice";

export default configureStore({
    reducer: {
        token: tokenReducer,
    },
})