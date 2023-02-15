// Dependencies
import React from "react";

// Components
import { Spinner, View } from "native-base";

const LoadingScreen = () => {
	return (
		<View justifyContent="center" alignItems="center" height="100%" width="100%">
			<Spinner size="lg" color="primary.400" />
		</View>
	);
};

export default LoadingScreen;
