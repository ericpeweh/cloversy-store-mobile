import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CartScreen = () => {
	return (
		<View style={styles.cartScreenContainer}>
			<Text>CartScreen</Text>
		</View>
	);
};

export default CartScreen;

const styles = StyleSheet.create({
	cartScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
