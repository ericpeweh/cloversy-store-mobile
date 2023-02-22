// Dependencies
import React from "react";

// Icons
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

// Styles
import SearchBarStyles from "./SearchBar.styles";

// Components
import { Icon, Input, IInputProps, Box } from "native-base";

interface SearchBarProps extends IInputProps {
	showResetButton?: boolean;
	onFocusEffect?: boolean;
}

const SearchBar = ({ showResetButton = false, onFocusEffect = true, ...props }: SearchBarProps) => {
	return (
		<Box style={SearchBarStyles.searchBarContainer}>
			<Input
				placeholder="Search product"
				width="100%"
				borderRadius="10"
				borderColor="#fff"
				fontSize="14"
				focusOutlineColor="gray.300"
				_focus={{ bgColor: "white" }}
				InputLeftElement={
					<Icon m="2" ml="3" size="6" color="gray.400" as={<AntDesign name="search1" />} />
				}
				{...(showResetButton && {
					InputRightElement: (
						<Icon m="2" mr="3" size="6" color="gray.400" as={<MaterialIcons name="clear" />} />
					)
				})}
				{...props}
			/>
		</Box>
	);
};

export default SearchBar;
