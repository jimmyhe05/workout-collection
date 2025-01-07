// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import userReducer from "./user/userSlice";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const rootReducer = combineReducers({
//   user: userReducer,
// });

// // Configuration for redux-persist
// const persistConfig = {
//   key: "root", // The key for the persisted state in storage
//   storage, // Specifies the storage engine (localStorage in this case)
//   version: 1, // Versioning for the persisted state
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // Disables checks for non-serializable values
//     }),
// });

// // Create a persistor instance for managing rehydration
// export const persistor = persistStore(store);

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
