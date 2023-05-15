// Dependencies
import React from "react";

// Utils
import formatToRupiah from "../../utils/formatToRupiah";

// Types
import { Product, RootStackNavigationProp } from "../../interfaces";

// Hooks
import useWishlist from "../../hooks/useWishlist";
import { useNavigation } from "@react-navigation/native";

// Icons
import { AntDesign, Octicons, Feather } from "@expo/vector-icons";

// Images
const ProductPlaceholderImage = require("../../assets/images/no-image.png");

// Components
import IconButton from "../IconButton/IconButton";
import { Text, Pressable, Image, AspectRatio, Icon, HStack, VStack } from "native-base";

interface WishlistItemProps {
	productData: Product;
}

const WishlistItem = ({ productData }: WishlistItemProps) => {
	const navigation = useNavigation<RootStackNavigationProp>();

	const {
		isWishlisted,
		addToWishlistHandler,
		deleteFromWishlistHandler,
		isAddToWishlistLoading,
		isDeleteFromWishlistLoading
	} = useWishlist(productData);

	const wishlistItemPressHandler = () => {
		if (productData) {
			navigation.navigate("WishlistProduct", { productSlug: productData.slug });
		}
	};

	return (
		<Pressable onPress={wishlistItemPressHandler}>
			{({ isHovered, isPressed }) => (
				<HStack
					bg={isHovered || isPressed ? "gray.100:alpha.50" : "gray.100:alpha.20"}
					position="relative"
					p="15px"
					space={3}
					borderBottomWidth="1px"
					borderBottomColor="gray.100"
				>
					<AspectRatio w="20" ratio={1 / 1}>
						<Image
							source={productData.images ? { uri: productData.images[0] } : ProductPlaceholderImage}
							resizeMode="cover"
							width="100%"
							height="100%"
							alt={productData.title}
							borderRadius="10px"
						/>
					</AspectRatio>
					<VStack>
						<Text
							fontSize="14px"
							fontWeight="500"
							pt={0}
							textTransform="uppercase"
							color="gray.700"
						>
							{productData.title}
						</Text>
						<Text fontSize="13px" fontWeight="400" pt={1} pb={2} color="gray.500">
							{formatToRupiah(productData.price)}
						</Text>
						<HStack alignItems="center" space={2} pt={1}>
							<Icon as={Octicons} name="tag" color="gray.400" size="14px" />
							<Text fontSize="12px" fontWeight="400" color="gray.400">
								{productData.brand}
							</Text>
						</HStack>
					</VStack>
					<IconButton
						icon={
							<Icon
								as={isAddToWishlistLoading || isDeleteFromWishlistLoading ? Feather : AntDesign}
								name={
									isAddToWishlistLoading || isDeleteFromWishlistLoading
										? "loader"
										: isWishlisted
										? "heart"
										: "hearto"
								}
								color={
									isAddToWishlistLoading || isDeleteFromWishlistLoading ? "gray.300" : "rose.400"
								}
								size="18px"
							/>
						}
						bg="white"
						_pressed={{
							bg: "white",
							borderColor: "gray.300"
						}}
						padding={2}
						alignSelf="center"
						borderWidth="1px"
						borderColor="gray.200"
						borderRadius="full"
						ml="auto"
						onPress={() => {
							if (isAddToWishlistLoading || isDeleteFromWishlistLoading) return;

							isWishlisted
								? deleteFromWishlistHandler(productData.id)
								: addToWishlistHandler(productData.id);
						}}
					/>
				</HStack>
			)}
		</Pressable>
	);
};

export default WishlistItem;
