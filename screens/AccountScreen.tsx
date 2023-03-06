// Dependencies
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

// Types
import { RootStackProps } from "../interfaces";

// Components
import { ScrollView } from "native-base";
import AccountHeader from "../components/AccountHeader/AccountHeader";
import AccountMenuList from "../components/AccountMenuList/AccountMenuList";

const AccountScreen = ({ navigation }: RootStackProps<"AccountDashboard">) => {
	// Show parent navigation header & tabbar on mount
	useEffect(() => {
		const onFocusHandler = () => {
			navigation.getParent()?.setOptions({
				headerShown: true,
				tabBarStyle: { display: "flex", height: 56, paddingTop: 5, paddingBottom: 7 }
			});
		};

		navigation.addListener("focus", onFocusHandler);

		return () => {
			navigation.removeListener("focus", onFocusHandler);
		};
	}, [navigation]);

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
