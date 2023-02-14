import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ExploreScreen = () => {
	return (
		<View style={styles.exploreScreenContainer}>
			<Text>ExploreScreen</Text>
		</View>
	);
};

export default ExploreScreen;

const styles = StyleSheet.create({
	exploreScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
