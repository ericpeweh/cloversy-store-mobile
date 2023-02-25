// Dependencies
import React from "react";
import { StyleSheet } from "react-native";

// Types
import { PaymentMethod, RootStackProps } from "../interfaces";

// Utils
import { paymentMethods } from "../utils/content";

// Icons
import { Feather } from "@expo/vector-icons";

// Components
import {
	AspectRatio,
	Divider,
	HStack,
	Icon,
	Image,
	Pressable,
	ScrollView,
	Text,
	View
} from "native-base";

const PaymentPickerScreen = ({
	navigation,
	route
}: RootStackProps<"HomeCheckoutPaymentPicker">) => {
	const { state } = route.params;

	const paymentMethodPressHandler = (paymentMethod: PaymentMethod) => {
		navigation.navigate("HomeCheckout", { state: { ...state, payment_method: paymentMethod } });
	};

	return (
		<ScrollView style={styles.addressPickerScreenContainer}>
			{paymentMethods.map(item => (
				<Pressable onPress={() => paymentMethodPressHandler(item.name)} key={item.name}>
					{({ isPressed, isHovered }) => {
						const isSelected = state.payment_method === item.name;

						return (
							<>
								<View
									px={4}
									py={5}
									bg={
										isSelected
											? "gray.100"
											: isPressed || isHovered
											? "primary.400:alpha.10"
											: "white"
									}
								>
									<HStack alignItems="center">
										<AspectRatio ratio={2 / 1} width="80px">
											<Image
												source={item.image}
												resizeMode="cover"
												width="100%"
												height="100%"
												alt={item.name}
											/>
										</AspectRatio>
										<Text fontWeight="500" fontSize="14px" ml={3}>
											{item.label}
										</Text>
										<View minWidth="30px" alignItems="flex-end" ml="auto">
											{isSelected && (
												<Icon as={Feather} name="check" size="md" color="primary.400" />
											)}
										</View>
									</HStack>
								</View>
								<Divider />
							</>
						);
					}}
				</Pressable>
			))}
		</ScrollView>
	);
};

export default PaymentPickerScreen;

const styles = StyleSheet.create({
	addressPickerScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
