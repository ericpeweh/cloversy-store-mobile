// Dependencies
import React from "react";
import { StyleSheet } from "react-native";

// Icons
import { AntDesign, FontAwesome } from "@expo/vector-icons";

// Styles
import SearchBarStyles from "./SearchBar.styles";

// Components
import { Icon, Input, IInputProps, Box } from "native-base";

interface SearchBarProps extends IInputProps {
	showSlider?: boolean;
}

const SearcBar = ({ showSlider = false, ...props }: SearchBarProps) => {
	return (
		<Box style={SearchBarStyles.searchBarContainer}>
			<Input
				placeholder="Search product"
				width="100%"
				borderRadius="10"
				borderColor="#fff"
				fontSize="14"
				InputLeftElement={
					<Icon m="2" ml="3" size="6" color="gray.400" as={<AntDesign name="search1" />} />
				}
				{...(showSlider && {
					InputRightElement: (
						<Icon m="2" mr="3" size="6" color="gray.400" as={<FontAwesome name="sliders" />} />
					)
				})}
				{...props}
			/>
		</Box>
	);
};

export default SearcBar;

const styles = StyleSheet.create({});
