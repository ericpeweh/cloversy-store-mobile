// Dependencies
import { useEffect, useState } from "react";

// Hooks
import {
	useAddProductToCartMutation,
	useUpdateCartItemMutation,
	useDeleteCartItemMutation
} from "../api/cart.api";
import useDispatch from "./useDispatch";

// Hooks
import { CartItem, CartItemDetails, Product } from "../interfaces";

// Actions
import { openCartSnackbar, setUserCart } from "../store/slices/globalSlice";

const useCart = () => {
	const [itemData, setItemData] = useState<Partial<CartItemDetails> | null>(null);
	const dispatch = useDispatch();

	const [
		addToCart,
		{
			data: addToCartData,
			isLoading: isAddToCartLoading,
			isSuccess: isAddToCartSuccess,
			reset: resetAddToCart,
			error: addToCartErrorData
		}
	] = useAddProductToCartMutation();
	const addToCartError: any = addToCartErrorData;

	const [
		updateCartItem,
		{
			data: updateCartItemData,
			isLoading: isUpdateCartItemLoading,
			isSuccess: isUpdateCartItemSuccess,
			reset: resetUpdateCartItem,
			error: updateCartItemErrorData
		}
	] = useUpdateCartItemMutation();
	const updateCartItemError: any = updateCartItemErrorData;

	const [
		deletCartItem,
		{
			data: deleteCartItemData,
			isLoading: isDeleteCartItemLoading,
			isSuccess: isDeleteCartItemSuccess,
			reset: resetDeleteCartItem,
			error: deleteCartItemErrorData
		}
	] = useDeleteCartItemMutation();
	const deleteCartItemError: any = deleteCartItemErrorData;

	// Handler
	const addToCartHandler = async (
		data: Partial<CartItem>,
		productData: Product,
		successCallback?: Function
	) => {
		setItemData({ ...productData, size: data.size!, quantity: data.quantity! });
		const result = await addToCart(data).unwrap();

		if (result.status === "success" && result.data) {
			successCallback && successCallback();
		}
	};

	const updateCartItemHandler = (data: Partial<CartItem>) => updateCartItem(data);

	const deleteCartItemHandler = (cartItemId: string) => deletCartItem(cartItemId);

	// Manage after actions of mutation
	useEffect(() => {
		if (addToCartData && isAddToCartSuccess && itemData) {
			dispatch(openCartSnackbar(itemData));
			dispatch(setUserCart(addToCartData?.data));
			resetAddToCart();
		}
	}, [isAddToCartSuccess, resetAddToCart, dispatch, itemData, addToCartData]);

	useEffect(() => {
		if (isUpdateCartItemSuccess) {
			resetUpdateCartItem();
		}
	}, [isUpdateCartItemSuccess, resetUpdateCartItem]);

	useEffect(() => {
		if (deleteCartItemData && isDeleteCartItemSuccess) {
			dispatch(setUserCart(deleteCartItemData?.data));
			resetDeleteCartItem();
		}
	}, [isDeleteCartItemSuccess, resetDeleteCartItem, deleteCartItemData, dispatch]);

	return {
		addToCartData,
		updateCartItemData,
		deleteCartItemData,
		addToCartHandler,
		updateCartItemHandler,
		deleteCartItemHandler,
		isAddToCartLoading,
		isUpdateCartItemLoading,
		isDeleteCartItemLoading,
		addToCartError,
		updateCartItemError,
		deleteCartItemError,
		isDeleteCartItemSuccess
	};
};

export default useCart;
