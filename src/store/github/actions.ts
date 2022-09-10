import { bindActionCreators, createAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addFavourite, removeFavourite } from "./github.slice";

export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators({ addFavourite, removeFavourite }, dispatch);
};

// export const setFavourite = (favourite: string) => {
// 	const dispatch = useDispatch();
// 	dispatch(addFavourite(favourite));
// };
