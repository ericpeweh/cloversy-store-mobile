// Dependencies
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

// Initial values
const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

const useDimensions = () => {
	const [dimensions, setDimensions] = useState({
		window: windowDimensions,
		screen: screenDimensions
	});

	useEffect(() => {
		const dimensionChangeHandler = Dimensions.addEventListener("change", ({ window, screen }) => {
			setDimensions({ window, screen });
		});

		return () => dimensionChangeHandler.remove();
	});

	return { window: dimensions.window, screen: dimensions.screen };
};

export default useDimensions;
