// Dependencies
import React from "react";

// Hooks
import useWishlist from "../../hooks/useWishlist";
import useCart from "../../hooks/useCart";
import usePopToast from "../../hooks/usePopToast";

// Types
import { Product } from "../../interfaces";

// Utils
import { shadowProps } from "../../themes/helpers";

// Icons
import { AntDesign, Feather } from "@expo/vector-icons";

// Components
import { HStack, Icon, Pressable, Text } from "native-base";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface ProductBottomBarProps {
	productData: Product;
	shoesSize: string;
	quantity: number;
}

const ProductBottomBar = ({ productData, shoesSize, quantity }: ProductBottomBarProps) => {
	const {
		isWishlisted,
		addToWishlistHandler,
		isAddToWishlistLoading,
		deleteFromWishlistHandler,
		isDeleteFromWishlistLoading
	} = useWishlist(productData);

	const { addToCartHandler, isAddToCartLoading } = useCart();
	const { showToastHandler: showAddToCartToastHandler } = usePopToast({
		id: "addToCart",
		text: "	Product successfully added to your shopping cart",
		showIcon: true
	});

	const addProductToCartHandler = () => {
		if (!productData?.sizes || !shoesSize || !quantity) return;

		const newCartItem = { product_id: productData.id, size: shoesSize, quantity };

		addToCartHandler(newCartItem, productData, showAddToCartToastHandler);
	};

	return (
		<HStack
			bg="white"
			borderTopColor="gray.100"
			borderTopWidth={0.6}
			height="56px"
			width="100%"
			alignItems="center"
			justifyContent="space-between"
			style={{ ...shadowProps.xl }}
		>
			<Pressable
				flex={1}
				alignSelf="stretch"
				alignItems="center"
				justifyContent="center"
				onPress={() =>
					isWishlisted
						? deleteFromWishlistHandler(productData.id)
						: addToWishlistHandler(productData.id)
				}
				disabled={isDeleteFromWishlistLoading || isAddToWishlistLoading}
			>
				{({ isHovered, isPressed }) =>
					isDeleteFromWishlistLoading || isAddToWishlistLoading ? (
						<LoadingSpinner size="sm" />
					) : (
						<HStack
							space={3}
							height="100%"
							width="100%"
							justifyContent="center"
							alignItems="center"
							bg={isHovered || isPressed ? "primary.400:alpha.10" : "white"}
						>
							<Text fontSize="13px" fontWeight="500" letterSpacing={0.5} textTransform="uppercase">
								{isWishlisted ? "Wishlisted" : "Wishlist"}
							</Text>
							<Icon
								as={AntDesign}
								name={isWishlisted ? "heart" : "hearto"}
								size="md"
								color={isWishlisted ? "rose.400" : "secondary.400"}
							/>
						</HStack>
					)
				}
			</Pressable>
			<Pressable
				flex={1}
				bg="primary.400"
				alignSelf="stretch"
				alignItems="center"
				justifyContent="center"
				onPress={addProductToCartHandler}
				disabled={isAddToCartLoading || Boolean(shoesSize) === false}
			>
				{({ isHovered, isPressed }) =>
					isAddToCartLoading ? (
						<LoadingSpinner size="sm" color="white" />
					) : (
						<HStack
							space={3}
							height="100%"
							width="100%"
							justifyContent="center"
							alignItems="center"
							bg={
								Boolean(shoesSize) === false
									? "#a9caa4"
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
								Add to cart
							</Text>
							<Icon as={Feather} name="shopping-bag" color="white" size="md" />
						</HStack>
					)
				}
			</Pressable>
		</HStack>
	);
};

export default ProductBottomBar;
