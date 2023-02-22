// Dependencies
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Slices
import globalReducer from "./slices/globalSlice";
// import productsReducer from "./slices/productsSlice";
import authReducer from "./slices/authSlice";
// import chatReducer from "./slices/chatSlice";

// API
import API from "../api";

const store = configureStore({
	reducer: {
		global: globalReducer,
		// products: productsReducer,
		auth: authReducer,
		// chat: chatReducer,
		[API.reducerPath]: API.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(API.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
