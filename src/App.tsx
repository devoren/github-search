import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Favourites from "./pages/Favourites";
import Home from "./pages/Home";

function App() {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/favourites" element={<Favourites />} />
			</Routes>
		</>
	);
}

export default App;
