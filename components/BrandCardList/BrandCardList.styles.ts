// Dependencies
import { StyleSheet } from "react-native";

const BrandCardListStyles = StyleSheet.create({
	brandCard: {
		borderRadius: 10,
		width: 110,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column"
	}
});

export default BrandCardListStyles;
