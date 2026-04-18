import {configureStore} from "@reduxjs/toolkit";
import AuthSlice from "./state/auth";

export const store = configureStore({
    reducer:{
        auth:AuthSlice
    },
    //  middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(authMiddlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
