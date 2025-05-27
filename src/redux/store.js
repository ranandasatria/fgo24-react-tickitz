import { persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";

export const store = configureStore({
    reducer,
    middleware: (defaultMiddleware) => {
        return defaultMiddleware({
            serializableCheck: {
                ignoreActions: ['persist/PERSIST']
            }
        })
    }
})

export const persistor = persistStore(store)