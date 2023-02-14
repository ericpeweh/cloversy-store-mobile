import React from "react";
import { StyleSheet, Text, View } from "react-native";

const WishlistScreen = () => {
	return (
		<View style={styles.wishlistScreenContainer}>
			<Text>WishlistScreen</Text>
		</View>
	);
};

export default WishlistScreen;

const styles = StyleSheet.create({
	wishlistScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
