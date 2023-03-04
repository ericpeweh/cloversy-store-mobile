// Dependencies
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

// Types
import { CartItemDetails, RootStackProps } from "../interfaces";

// Hooks
import useSelector from "../hooks/useSelector";
import { useGetCartItemsQuery } from "../api/cart.api";
import useCart from "../hooks/useCart";
import useHideHeaderTabbar from "../hooks/useHideHeaderTabbar";

// Components
import { FlatList, View } from "native-base";
import CartBottomTab from "../components/CartBottomTab/CartBottomTab";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";
import CartItem from "../components/CartItem/CartItem";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import AlertBox from "../components/AlertBox/AlertBox";

const _renderCartItem = ({
	item,
	onDelete,
	cartItemToDelete,
	isDeleteCartItemLoading
}: {
	item: CartItemDetails;
	onDelete: (cartItem: CartItemDetails) => void;
	cartItemToDelete: CartItemDetails | null;
	isDeleteCartItemLoading: boolean;
}) => (
	<CartItem
		key={item.id}
		itemData={item}
		onDelete={onDelete}
		isDeleteLoading={
			cartItemToDelete ? cartItemToDelete.id === item.id && isDeleteCartItemLoading : false
		}
	/>
);

const CartScreen = ({ navigation }: RootStackProps<"HomeCart">) => {
	const authStatus = useSelector(state => state.auth.status);
	const cartItems = useSelector(state => state.global.userCart);

	// Delete modal
	const [cartItemToDelete, setCartItemToDelete] = useState<CartItemDetails | null>(null);
	const [isDeleteCartItemModalOpen, setIsDeleteCartItemModalOpen] = useState(false);

	// Fetch cart data
	const {
		data: cartItemsData,
		isLoading: isGetCartItemsLoading,
		isSuccess: isGetCartItemsSuccess,
		error: getCartItemsErrorData,
		refetch: refetchCartItems
	} = useGetCartItemsQuery(authStatus, { skip: authStatus !== "fulfilled" });

	const getCartItemsError: any = getCartItemsErrorData;
	const noDataFound = cartItemsData?.data.cart.length === 0;

	const { deleteCartItemHandler, isDeleteCartItemLoading, isDeleteCartItemSuccess } = useCart();

	// Hide parent header and tabbar on mount
	useHideHeaderTabbar(navigation);

	const setAndOpenDeleteCartItemModalHandler = (cartItem: CartItemDetails) => {
		setCartItemToDelete(cartItem);
		setIsDeleteCartItemModalOpen(true);
	};

	const cancelDeleteCartItemHandler = () => {
		setIsDeleteCartItemModalOpen(false);
		setTimeout(() => {
			setCartItemToDelete(null);
		}, 500);
	};

	useEffect(() => {
		cancelDeleteCartItemHandler();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDeleteCartItemSuccess]);

	return (
		<View style={styles.cartScreenContainer}>
			<ConfirmModal
				title="Remove product"
				description={`${cartItemToDelete?.title} - EU ${cartItemToDelete?.size} will be deleted from your shopping cart, are you sure?`}
				isOpen={isDeleteCartItemModalOpen}
				onConfirm={() => {
					if (cartItemToDelete) deleteCartItemHandler(cartItemToDelete.id + "");
				}}
				onClose={cancelDeleteCartItemHandler}
			/>
			{isGetCartItemsLoading && (
				<FallbackContainer mt={10}>
					<LoadingSpinner />
				</FallbackContainer>
			)}
			{!isGetCartItemsLoading && getCartItemsErrorData && (
				<FallbackContainer mb={4} mt={10}>
					<AlertBox mb={3}>
						{getCartItemsError?.data?.message || "Error while fetching data"}{" "}
					</AlertBox>
					<TryAgainButton isLoading={isGetCartItemsLoading} onPress={refetchCartItems}>
						Try again
					</TryAgainButton>
				</FallbackContainer>
			)}
			{!isGetCartItemsLoading && isGetCartItemsSuccess && noDataFound && (
				<FallbackContainer mt={10}>
					<AlertBox mb={3} status="info">
						Your shopping cart is empty!
					</AlertBox>
					<TryAgainButton onPress={() => navigation.navigate("Home")}>Shop now</TryAgainButton>
				</FallbackContainer>
			)}
			<FlatList
				initialNumToRender={10}
				windowSize={6}
				maxToRenderPerBatch={10}
				removeClippedSubviews={false}
				data={cartItems}
				renderItem={({ item }) =>
					_renderCartItem({
						item,
						onDelete: setAndOpenDeleteCartItemModalHandler,
						cartItemToDelete,
						isDeleteCartItemLoading
					})
				}
				keyExtractor={item => `${item.id}`}
			/>
			<CartBottomTab />
		</View>
	);
};

export default CartScreen;

const styles = StyleSheet.create({
	cartScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
