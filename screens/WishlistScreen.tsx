// Dependencies
import React from "react";

// Types
import { RootStackProps } from "../interfaces";

// Hooks
import useSelector from "../hooks/useSelector";
import { useGetWishlistQuery } from "../api/wishlist.api";

// Components
import { FlatList, View } from "native-base";
import WishlistItem from "../components/WishlistItem/WishlistItem";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";
import AlertBox from "../components/AlertBox/AlertBox";

const WishlistScreen = ({}: RootStackProps<"Wishlist">) => {
	const isAuth = useSelector(state => state.auth.isAuth);

	const {
		data: wishlistData,
		isLoading: isGetWishlistLoading,
		isSuccess: isGetWishlistSuccess,
		error: getWishlistErrorData,
		refetch: refetchWishlist
	} = useGetWishlistQuery(isAuth, {
		skip: !isAuth
	});
	const getWishlistError: any = getWishlistErrorData;
	const noDataFound = wishlistData?.data.wishlist.length === 0;

	return (
		<FlatList
			bg="white"
			ListHeaderComponent={
				<>
					{isGetWishlistLoading && (
						<FallbackContainer size="lg" key="errorFallback" mt={10}>
							<LoadingSpinner />
						</FallbackContainer>
					)}
					{!isGetWishlistLoading && !isGetWishlistSuccess && getWishlistError && (
						<FallbackContainer key="loadingSpinner" mt={8}>
							<AlertBox mb={3}>{getWishlistError?.data?.message}</AlertBox>
							<TryAgainButton onPress={refetchWishlist}>Try again</TryAgainButton>
						</FallbackContainer>
					)}
					{!isGetWishlistLoading && isGetWishlistSuccess && noDataFound && (
						<FallbackContainer key="noProductFallback" size="lg" mt={8}>
							<AlertBox status="info">You have no items in your wishlist.</AlertBox>
						</FallbackContainer>
					)}
				</>
			}
			ListFooterComponent={<View height={6}></View>}
			data={wishlistData?.data.wishlist || []}
			keyExtractor={(item, i) => {
				return `${item.id}-${i}`;
			}}
			renderItem={({ item }) => <WishlistItem productData={item} />}
		></FlatList>
	);
};

export default WishlistScreen;
