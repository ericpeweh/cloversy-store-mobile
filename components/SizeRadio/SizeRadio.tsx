// Dependencies
import React, { Dispatch, SetStateAction } from "react";

// Components
import { ScrollView, Text, View } from "native-base";
import { TouchableWithoutFeedback } from "react-native";

interface SizeRadioProps {
	value: string;
	onChange: Dispatch<SetStateAction<string>>;
	sizeOptions: string[];
}

const SizeRadio = ({ value, onChange, sizeOptions }: SizeRadioProps) => {
	const sizeButtonClickHandler = (newSize: string) => {
		if (newSize === value) return;
		onChange(newSize);
	};

	return (
		<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
			{sizeOptions.map(size => (
				<TouchableWithoutFeedback onPress={() => sizeButtonClickHandler(size)} key={size}>
					<View
						px={3}
						py={2}
						mr={2}
						borderRadius="10px"
						bg={value === size ? "primary.400" : "white"}
						borderColor="primary.400"
						borderWidth="1"
					>
						<Text fontWeight="500" color={value === size ? "white" : "gray.700"} fontSize="13px">
							{size}
						</Text>
					</View>
				</TouchableWithoutFeedback>
			))}
		</ScrollView>
	);
};

export default SizeRadio;
