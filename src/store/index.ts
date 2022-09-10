import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { githubApi } from "./github/github.api";
import { gitHubReducer } from "./github/github.slice";

export const store = configureStore({
	reducer: {
		[githubApi.reducerPath]: githubApi.reducer,
		github: gitHubReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(githubApi.middleware),
});

setupListeners(store.dispatch);

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
