// Dependencies
import React from "react";

// Types
import { CartItemDetails } from "../../interfaces";

// Images
const ProductPlaceholderImage = require("../../assets/images/no-image.png");

// Utils
import formatToRupiah from "../../utils/formatToRupiah";

// Components
import { AspectRatio, HStack, Image, Text, View, VStack } from "native-base";

interface OrderDetailsItemProps {
	itemData: CartItemDetails;
}

const OrderDetailsItem = ({ itemData }: OrderDetailsItemProps) => {
	return (
		<View>
			<HStack
				bg="white"
				position="relative"
				py="10px"
				space={3}
				borderBottomWidth="1px"
				borderBottomColor="gray.100"
			>
				<AspectRatio w="20" ratio={1 / 1}>
					<Image
						source={itemData.images ? { uri: itemData.images[0] } : ProductPlaceholderImage}
						resizeMode="cover"
						width="100%"
						height="100%"
						alt={itemData.title}
						borderRadius="10px"
					/>
				</AspectRatio>
				<VStack>
					<Text fontSize="13px" fontWeight="500" pt={0} textTransform="uppercase" color="gray.700">
						{itemData.title}
					</Text>
					<Text fontSize="12px" fontWeight="400" pt={1} color="gray.500">
						Size: EU {itemData.size}
					</Text>
					<Text fontSize="12px" fontWeight="400" pt={1} pb={2} color="gray.500">
						Quantity: {itemData.quantity}
					</Text>
				</VStack>
				<Text fontSize="13px" fontWeight="500" pt={1} pb={2} alignSelf="center" ml="auto">
					{formatToRupiah(itemData.quantity * itemData.price)}
				</Text>
			</HStack>
		</View>
	);
};

export default OrderDetailsItem;
