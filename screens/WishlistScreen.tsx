// Dependencies
import React from "react";

// Types
import { RootStackProps } from "../interfaces";

// Components
import { FlatList, View } from "native-base";
import WishlistItem from "../components/WishlistItem/WishlistItem";
import { StyleSheet } from "react-native";
import { useGetWishlistQuery } from "../api/wishlist.api";
import useSelector from "../hooks/useSelector";
import useWishlist from "../hooks/useWishlist";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ErrorText from "../components/ErrorText/ErrorText";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";

const WishlistScreen = ({}: RootStackProps<"Wishlist">) => {
	const isAuth = useSelector(state => state.auth.isAuth);

	const { emptyWishlistHandler, isEmptyWishlistLoading } = useWishlist();

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
						<FallbackContainer key="loadingSpinner">
							<ErrorText>{getWishlistError.data?.message}</ErrorText>
							<TryAgainButton onPress={refetchWishlist}>Try again</TryAgainButton>
						</FallbackContainer>
					)}

					{!isGetWishlistLoading && isGetWishlistSuccess && noDataFound && (
						<FallbackContainer key="noProductFallback" size="lg">
							<ErrorText color="black">You have no items in your wishlist.</ErrorText>
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

const styles = StyleSheet.create({
	wishlistScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
