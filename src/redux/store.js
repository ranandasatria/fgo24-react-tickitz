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
  },
  // preloadedState: {
  //   users: {
  //     users: [
  //       {
  //         id: 1,
  //         email: 'admin@example.com',
  //         password: btoa('admin123'),
  //         role: 'admin',
  //         phone: '',
  //       },
  //     ],
  //   },
  // },
});

export const persistor = persistStore(store);