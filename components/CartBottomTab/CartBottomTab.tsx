// Dependencies
import React, { useMemo } from "react";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Hooks
import { useNavigation } from "@react-navigation/native";
import useSelector from "../../hooks/useSelector";

// Types
import { CartItemDetails, RootStackNavigationProp } from "../../interfaces";

// Components
import { HStack, Icon, Pressable, Text, View, VStack } from "native-base";

// Utils
import { shadowProps } from "../../themes/helpers";
import formatToRupiah from "../../utils/formatToRupiah";

const CartBottomTab = () => {
	const navigation = useNavigation<RootStackNavigationProp>();

	const cartItems = useSelector(state => state.global.userCart);

	const subtotal = useMemo(
		() =>
			cartItems?.reduce(
				(total: number, curr: CartItemDetails) => (total += curr.price * curr.quantity),
				0
			),
		[cartItems]
	);

	return (
		<VStack
			borderTopColor="gray.100"
			borderTopWidth={0.6}
			height="56px"
			width="100%"
			alignItems="center"
			justifyContent="space-between"
			style={{ ...shadowProps.xl }}
		>
			<HStack>
				<VStack flex={1} height="100%" width="100%" justifyContent="center" bg="white">
					<View px={4}>
						<Text fontWeight="500" fontSize="13px">
							Subtotal:
						</Text>
						<Text fontSize="14px">{formatToRupiah(subtotal)}</Text>
					</View>
				</VStack>
				<Pressable
					flex={1}
					bg="primary.400"
					alignSelf="stretch"
					alignItems="center"
					justifyContent="center"
					disabled={cartItems.length === 0}
					onPress={() => navigation.navigate("HomeCheckout", {})}
				>
					{({ isHovered, isPressed }) => (
						<HStack
							space={3}
							height="100%"
							width="100%"
							justifyContent="center"
							alignItems="center"
							bg={
								cartItems.length === 0
									? "gray.400"
									: isHovered || isPressed
									? "white:alpha.10"
									: "primary.400"
							}
						>
							<Text
								color="white"
								fontSize="13px"
								fontWeight="500"
								letterSpacing={0.5}
								textTransform="uppercase"
							>
								Checkout
							</Text>
							<Icon as={MaterialCommunityIcons} name="cart-check" color="white" size="md" />
						</HStack>
					)}
				</Pressable>
			</HStack>
		</VStack>
	);
};

export default CartBottomTab;
