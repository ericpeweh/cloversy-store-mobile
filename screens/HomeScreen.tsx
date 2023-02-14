// Dependencies
import React from "react";
import { StyleSheet } from "react-native";

// Types
import { MainScreenProps } from "../interfaces/navigation.interface";

// Components
import { ScrollView, View } from "native-base";
import MainCarousel from "../components/MainCaousel/MainCarousel";
import BrandCardList from "../components/BrandCardList/BrandCardList";

const HomeScreen = ({ navigation }: MainScreenProps<"Home">) => {
	return (
		<ScrollView style={styles.homeScreenContainer}>
			<MainCarousel />
			<View style={styles.contentContainer}>
				<BrandCardList />
			</View>
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
