// Dependencies
import React from "react";
import { StyleSheet } from "react-native";

// Types
import { MainScreenProps } from "../interfaces/navigation.interface";

// Hooks
import { useAuth0 } from "react-native-auth0";
import useDispatch from "../hooks/useDispatch";

// Actions
import { logoutUser } from "../store/slices/authSlice";

// Components
import { Button, ScrollView, View } from "native-base";
import MainCarousel from "../components/MainCaousel/MainCarousel";
import BrandCardList from "../components/BrandCardList/BrandCardList";

const HomeScreen = ({ navigation }: MainScreenProps<"Home">) => {
	const dispatch = useDispatch();
	const { clearSession } = useAuth0();

	const logoutHandler = async () => {
		try {
			await clearSession();
			dispatch(logoutUser());
		} catch (error) {
			console.log("Failed to logout");
		}
	};

	return (
		<ScrollView style={styles.homeScreenContainer}>
			<MainCarousel />
			<View style={styles.contentContainer}>
				<BrandCardList />
			</View>
			<Button onPress={logoutHandler}>Logout</Button>
		</ScrollView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	homeScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	},
	contentContainer: {
		paddingHorizontal: 12,
		paddingVertical: 10
	}
});
