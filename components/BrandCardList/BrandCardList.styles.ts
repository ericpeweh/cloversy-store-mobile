// Dependencies
import { StyleSheet } from "react-native";
import { shadowProps } from "../../themes/helpers";

const BrandCardListStyles = StyleSheet.create({
	brandCard: {
		...shadowProps.xs,
		borderRadius: 10,
		width: 110,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column"
	}
});

export default BrandCardListStyles;
