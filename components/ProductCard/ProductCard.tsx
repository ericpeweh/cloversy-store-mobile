// Dependencies
import React from "react";

// Types
import { Product, RootStackNavigationProp, RootStackParamList } from "../../interfaces";

// Styles
import ProductCardStyles from "./ProductCard.styles";

// Hooks
import { useNavigation } from "@react-navigation/native";
import useWishlist from "../../hooks/useWishlist";

// Utils
import formatToRupiah from "../../utils/formatToRupiah";

// Icons
import { AntDesign, Feather } from "@expo/vector-icons";

// Types
import { InterfacePressableProps } from "native-base/lib/typescript/components/primitives/Pressable/types";

// Images
const ProductPlaceholderImage = require("../../assets/images/no-image.png");

// Components
import { AspectRatio, Box, Icon, IconButton, Image, Pressable, Text } from "native-base";

interface ProductCardProps extends InterfacePressableProps {
	index: number;
	productData: Product;
	targetScreenName: keyof RootStackParamList;
	size?: "small" | "large";
	onPressCallback?: Function;
	shouldRunScreenHeaderFn?: boolean;
}

const ProductCard = ({
	index,
	productData,
	size = "large",
	targetScreenName,
	onPressCallback,
	shouldRunScreenHeaderFn = true,
	...props
}: ProductCardProps) => {
	const navigation = useNavigation<RootStackNavigationProp>();
	const isIndexEven = index % 2 === 0;
	const isLarge = size === "large";

	const {
		isWishlisted,
		addToWishlistHandler,
		deleteFromWishlistHandler,
		isAddToWishlistLoading,
		isDeleteFromWishlistLoading
	} = useWishlist(productData);

	const productPressHandler = () => {
		if (productData) {
			navigation.navigate(targetScreenName as any, {
				productSlug: productData.slug,
				runHeaderFn: shouldRunScreenHeaderFn
			});
			onPressCallback && onPressCallback();
		}
	};

	return (
		<Pressable
			style={{
				...ProductCardStyles.productCardContainer,
				marginRight: isIndexEven ? 4 : 0,
				marginLeft: isIndexEven ? 0 : 4
			}}
			onPress={productPressHandler}
			{...props}
		>
			{({ isHovered, isPressed }) => (
				<Box
					bg={isHovered || isPressed ? "gray.100:alpha.50" : "white"}
					minH={isLarge ? 260 : 160}
					maxH={280}
					position="relative"
				>
					<AspectRatio w="100%" ratio={1 / 1}>
						<Image
							source={productData.images ? { uri: productData.images[0] } : ProductPlaceholderImage}
							resizeMode="cover"
							width="100%"
							height="100%"
							alt={productData.title}
							borderTopLeftRadius="10px"
							borderTopRightRadius="10px"
						/>
					</AspectRatio>
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
								size={isLarge ? "18px" : "12px"}
							/>
						}
						bg="white"
						_pressed={{
							bg: "white",
							borderColor: "gray.300"
						}}
						padding={isLarge ? 2 : 1.5}
						borderRadius="full"
						borderColor="gray.200"
						borderWidth={1}
						position="absolute"
						top={1.5}
						right={1.5}
						onPress={() => {
							if (isAddToWishlistLoading || isDeleteFromWishlistLoading) return;

							isWishlisted
								? deleteFromWishlistHandler(productData.id)
								: addToWishlistHandler(productData.id);
						}}
					/>
					<Text
						fontSize={isLarge ? "14px" : "12px"}
						fontWeight="500"
						pt={3}
						pl={1}
						textTransform="uppercase"
						color="gray.700"
					>
						{productData.title}
					</Text>
					<Text
						fontSize={isLarge ? "13px" : "12px"}
						fontWeight="400"
						pt={1}
						pl={1}
						pb={2}
						color="gray.500"
					>
						{formatToRupiah(productData.price)}
					</Text>
				</Box>
			)}
		</Pressable>
	);
};

export default ProductCard;
