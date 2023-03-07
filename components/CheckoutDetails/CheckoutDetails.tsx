// Dependencies
import React from "react";

// Hooks
import { useGetCheckoutCartItemsQuery } from "../../api/cart.api";
import useSelector from "../../hooks/useSelector";

// Types
import { CartItemDetails } from "../../interfaces";

// Components
import { Text, View } from "native-base";
import FallbackContainer from "../FallbackContainer/FallbackContainer";
import AlertBox from "../AlertBox/AlertBox";
import TryAgainButton from "../TryAgainButton/TryAgainButton";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import OrderDetailsItem from "../OrderDetailsItem/OrderDetailsItem";

const CheckoutDetails = () => {
	const isAuth = useSelector(state => state.auth.isAuth);

	const {
		data: cartItemsData,
		isFetching: isGetCartItemsFetching,
		isLoading: isGetCartItemsLoading,
		isSuccess: isGetCartItemsSuccess,
		error: getCartItemsErrorData,
		refetch: refetchCartItems
	} = useGetCheckoutCartItemsQuery(isAuth, { skip: !isAuth });

	const getCartItemsError: any = getCartItemsErrorData;
	const noCartItemsDataFound = cartItemsData?.data.cart.length === 0;

	return (
		<View mb={8}>
			{!isGetCartItemsLoading && getCartItemsErrorData && (
				<FallbackContainer size="md">
					<AlertBox width="100%" mb={3}>
						{getCartItemsError?.data?.message || "Error occured while fetching cart items data."}
					</AlertBox>
					<TryAgainButton onPress={refetchCartItems}>Try again</TryAgainButton>
				</FallbackContainer>
			)}
			{(isGetCartItemsLoading || isGetCartItemsFetching) && (
				<FallbackContainer size="md" flexDir="row" justifyContent="center" mt={2}>
					<LoadingSpinner size="sm" />
					<Text ml={2} fontSize="13px">
						Fetching order details...
					</Text>
				</FallbackContainer>
			)}
			{!isGetCartItemsLoading && isGetCartItemsSuccess && noCartItemsDataFound && (
				<FallbackContainer>
					<AlertBox status="info" width="100%">
						You have no item in your cart!
					</AlertBox>
				</FallbackContainer>
			)}
			{cartItemsData &&
				isGetCartItemsSuccess &&
				!noCartItemsDataFound &&
				!isGetCartItemsLoading &&
				cartItemsData?.data.cart.map((item: CartItemDetails, i: number) => (
					<OrderDetailsItem itemData={item} key={item.id} />
				))}
		</View>
	);
};

export default CheckoutDetails;
