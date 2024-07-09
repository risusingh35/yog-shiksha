// store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};

// export const persistedReducer = persistReducer(persistConfig, rootReducer);

const appReducer = (state, action) => {
  if (action.type === 'RESET') {
    localStorage.clear();
    return rootReducer(undefined, action);
  }

  return rootReducer(state, action);
};
export const persistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

const persistor = persistStore(store);

export { store, persistor };