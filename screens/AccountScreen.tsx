import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AccountScreen = () => {
	return (
		<View style={styles.accountScreenContainer}>
			<Text>AccountScreen</Text>
		</View>
	);
};

export default AccountScreen;

const styles = StyleSheet.create({
	accountScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
