// Dependencies
import React from "react";
import { TouchableWithoutFeedback } from "react-native";

// Icons
import { Ionicons } from "@expo/vector-icons";

// Components
import { Text, View, Input, HStack, Icon } from "native-base";

interface QuantityInputProps {
	value: number;
	onChangeQuantity: React.Dispatch<React.SetStateAction<number>>;
	onChangeCallback?: Function;
}

const QuantityInput = ({ value, onChangeQuantity, onChangeCallback }: QuantityInputProps) => {
	const quantityIncrementHandler = () => {
		if (value >= 99) return;

		onChangeQuantity(prevQty => {
			if (onChangeCallback) onChangeCallback(prevQty + 1);
			return prevQty + 1;
		});
	};

	const quantityDecrementHandler = () => {
		onChangeQuantity(prevQty => {
			if (onChangeCallback) onChangeCallback(prevQty > 0 ? prevQty - 1 : prevQty);
			return prevQty > 0 ? prevQty - 1 : prevQty;
		});
	};

	const quantityChangeHandler = (quantityText: string) => {
		if (+quantityText >= 100 || +quantityText < 0) return;

		if (isNaN(+quantityText)) return onChangeQuantity(0);

		onChangeQuantity(_ => +quantityText);
		if (onChangeCallback) onChangeCallback(+quantityText.toString());
	};

	return (
		<HStack
			alignItems="center"
			borderRadius="10px"
			borderColor="primary.400"
			borderWidth="1"
			alignSelf="flex-start"
		>
			<TouchableWithoutFeedback onPress={quantityDecrementHandler}>
				<View
					px={2}
					height="100%"
					flexDir="row"
					alignItems="center"
					borderRightColor="gray.100"
					borderRightWidth={1}
				>
					<Icon
						as={Ionicons}
						name="remove"
						size="md"
						color={value === 0 ? "gray.400" : "primary.400"}
					/>
				</View>
			</TouchableWithoutFeedback>
			<Input
				variant="unstyled"
				value={value + ""}
				width="30px"
				onChangeText={quantityChangeHandler}
				textAlign="center"
				fontSize="13px"
				p={0}
				py={1}
				keyboardType="numeric"
			/>
			<TouchableWithoutFeedback onPress={quantityIncrementHandler}>
				<View
					px={2}
					height="100%"
					flexDir="row"
					alignItems="center"
					borderLeftColor="gray.100"
					borderLeftWidth={1}
				>
					<Icon
						as={Ionicons}
						name="add"
						size="md"
						color={value >= 99 ? "gray.400" : "primary.400"}
					/>
				</View>
			</TouchableWithoutFeedback>
		</HStack>
	);
};

export default QuantityInput;
