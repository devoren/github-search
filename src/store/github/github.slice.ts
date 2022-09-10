import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LS_FAV_KEY = "rfk"; // react fav key

interface GithubState {
	favourites: string[];
}

const initialState: GithubState = {
	favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? "[]"),
};

export const gitHubSlice = createSlice({
	name: "github",
	initialState,
	reducers: {
		addFavourite(state, action: PayloadAction<string>) {
			state.favourites.push(action.payload);
			localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
		},
		removeFavourite(state, action: PayloadAction<string>) {
			state.favourites.filter((f) => f !== action.payload);
			localStorage.removeItem(LS_FAV_KEY);
		},
	},
});

export const { addFavourite, removeFavourite } = gitHubSlice.actions;
export const gitHubReducer = gitHubSlice.reducer;
