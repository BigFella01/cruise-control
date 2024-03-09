import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./slices/bookingSlice";
import userReducer from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// ALL OF THIS BELOW IS FOR REDUX PERSIST

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  booking: bookingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//     booking: bookingReducer
//   }
// })

// export default store
