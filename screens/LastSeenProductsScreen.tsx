// Dependencies
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";

// Types
import { RootStackProps } from "../interfaces";

// Hooks
import { useGetUserLastSeenProductsQuery } from "../api/activity.api";
import useSelector from "../hooks/useSelector";
import useHideHeaderTabbar from "../hooks/useHideHeaderTabbar";

// Components
import ProductCard from "../components/ProductCard/ProductCard";
import { FlatList, View } from "native-base";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import AlertBox from "../components/AlertBox/AlertBox";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const LastSeenProductsScreen = ({ navigation }: RootStackProps<"AccountLastSeenProducts">) => {
	const isAuth = useSelector(state => state.auth.isAuth);

	// Hide parent header and tabbar on mount
	useHideHeaderTabbar(navigation);

	// Last seen products
	const {
		data: lastSeenProductsData,
		isLoading: isGetLastSeenProductsLoading,
		isUninitialized: isGetLastSeenProductsUninitialized,
		isSuccess: isGetLastSeenProductsSuccess,
		error: getLastSeenProductsErrorData,
		refetch: refetchLastSeenProducts
	} = useGetUserLastSeenProductsQuery(isAuth, { skip: !isAuth });
	const getLastSeenProductsError: any = getLastSeenProductsErrorData;
	const lastSeenProducts = useMemo(
		() => lastSeenProductsData?.data.products || [],
		[isGetLastSeenProductsSuccess]
	);

	return (
		<View style={styles.lastSeenProductsScreenContainer}>
			{!isGetLastSeenProductsLoading && getLastSeenProductsError && (
				<FallbackContainer mb={4} key="errorFallback">
					<AlertBox mb={3}>
						{getLastSeenProductsError?.data?.message || "Error while fetching last seen products"}{" "}
					</AlertBox>
					<TryAgainButton
						isLoading={isGetLastSeenProductsLoading}
						onPress={refetchLastSeenProducts}
					>
						Try again
					</TryAgainButton>
				</FallbackContainer>
			)}
			{(isGetLastSeenProductsLoading || isGetLastSeenProductsUninitialized) && (
				<FallbackContainer mt={10} key="loadingSpinner" size="md">
					<LoadingSpinner />
				</FallbackContainer>
			)}
			{!isGetLastSeenProductsLoading && lastSeenProductsData?.data?.products?.length === 0 && (
				<FallbackContainer mt={10} key="noProductFallback" size="md">
					<AlertBox status="info">You haven't seen any products yet!</AlertBox>
				</FallbackContainer>
			)}
			<FlatList
				numColumns={2}
				columnWrapperStyle={{ marginHorizontal: 15, marginVertical: 5 }}
				overScrollMode="never"
				data={isGetLastSeenProductsSuccess ? lastSeenProducts : []}
				keyExtractor={(item, i) => {
					return `${item.id}-${i}`;
				}}
				renderItem={({ item, index }) => (
					<ProductCard index={index} productData={item} targetScreenName="AccountProduct" />
				)}
			/>
		</View>
	);
};

export default LastSeenProductsScreen;

const styles = StyleSheet.create({
	lastSeenProductsScreenContainer: {
		flex: 1,
		paddingTop: 16,
		backgroundColor: "#fff"
	}
});
