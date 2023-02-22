// Dependencies
import React from "react";
import { StyleSheet } from "react-native";

// Components
import { View, Text, ScrollView, HStack, Avatar } from "native-base";
import AccountHeader from "../components/AccountHeader/AccountHeader";
import AccountMenuList from "../components/AccountMenuList/AccountMenuList";

const AccountScreen = () => {
	return (
		<ScrollView style={styles.accountScreenContainer}>
			<AccountHeader />
			<AccountMenuList />
		</ScrollView>
	);
};

export default AccountScreen;

const styles = StyleSheet.create({
	accountScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
