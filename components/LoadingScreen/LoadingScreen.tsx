// Dependencies
import React from "react";

// Components
import { Spinner, View } from "native-base";

const LoadingScreen = () => {
	return (
		<View justifyContent="center" alignItems="center" height="100%" width="100%">
			<Spinner />
		</View>
	);
};

export default LoadingScreen;
