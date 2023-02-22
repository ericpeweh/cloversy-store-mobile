// Hooks
import { useEffect, useMemo } from "react";
import useDispatch from "./useDispatch";
import useSelector from "./useSelector";
import {
	useAddProductToWishlistMutation,
	useDeleteProductFromWishlistMutation,
	useEmptyWishlistMutation
} from "../api/wishlist.api";

// Types
import { Product } from "../interfaces";

// Actions
import { setUserWishlist } from "../store/slices/globalSlice";

const useWishlist = (productData?: Product) => {
	const dispatch = useDispatch();
	const userWishlist = useSelector(state => state.global.userWishlist);

	const isWishlisted = useMemo(() => {
		if (productData) {
			return userWishlist.includes(productData?.id);
		}
	}, [productData, userWishlist]);

	const [
		addToWishlist,
		{
			data: addWishlistData,
			isLoading: isAddToWishlistLoading,
			isSuccess: isAddToWishlistSuccess,
			reset: resetAddToWishlist
		}
	] = useAddProductToWishlistMutation();

	const [
		deleteFromWishlist,
		{
			data: deleteWishlistData,
			isLoading: isDeleteFromWishlistLoading,
			isSuccess: isDeleteFromWishlistSuccess,
			reset: resetDeleteFromWishlist
		}
	] = useDeleteProductFromWishlistMutation();

	const [
		emptyWishlist,
		{
			data: emptyWishlistData,
			isLoading: isEmptyWishlistLoading,
			isSuccess: isEmptyWishlistSuccess,
			reset: resetEmptyWishlist
		}
	] = useEmptyWishlistMutation();

	// Handler
	const addToWishlistHandler = (productId: number) => {
		dispatch(setUserWishlist([...userWishlist, productId]));
		addToWishlist(productId);
	};

	const deleteFromWishlistHandler = (productId: number) => {
		dispatch(setUserWishlist(userWishlist.filter(id => id !== productId)));
		deleteFromWishlist(productId);
	};

	const emptyWishlistHandler = () => {
		dispatch(setUserWishlist([]));
		emptyWishlist();
	};

	// Change wishlist data in global store
	useEffect(() => {
		if (isAddToWishlistSuccess && addWishlistData) {
			dispatch(setUserWishlist(addWishlistData.data.wishlist.map(wishlist => wishlist.product_id)));
			resetAddToWishlist();
		}
	}, [addWishlistData, dispatch, isAddToWishlistSuccess, resetAddToWishlist]);

	useEffect(() => {
		if (isDeleteFromWishlistSuccess && deleteWishlistData) {
			dispatch(
				setUserWishlist(deleteWishlistData.data.wishlist.map(wishlist => wishlist.product_id))
			);
			resetDeleteFromWishlist();
		}
	}, [deleteWishlistData, dispatch, isDeleteFromWishlistSuccess, resetDeleteFromWishlist]);

	useEffect(() => {
		if (isEmptyWishlistSuccess && emptyWishlistData) {
			dispatch(
				setUserWishlist(emptyWishlistData.data.wishlist.map(wishlist => wishlist.product_id))
			);
			resetEmptyWishlist();
		}
	}, [emptyWishlistData, dispatch, isEmptyWishlistSuccess, resetEmptyWishlist]);

	return {
		isWishlisted,
		userWishlist,
		addToWishlistHandler,
		isAddToWishlistLoading,
		deleteFromWishlistHandler,
		isDeleteFromWishlistLoading,
		emptyWishlistHandler,
		isEmptyWishlistLoading
	};
};

export default useWishlist;
