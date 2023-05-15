// Dependencies
import { StyleSheet } from "react-native";
import { shadowProps } from "../../themes/helpers";

const SearcBarStyles = StyleSheet.create({
	searchBarContainer: {
		...shadowProps.xs,
		flex: 1,
		borderRadius: 10,
		backgroundColor: "#fff"
	}
});

export default SearcBarStyles;
