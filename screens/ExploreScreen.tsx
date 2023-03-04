// Dependencies
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { shallowEqual } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

// Types
import { RootStackProps } from "../interfaces";

// Icons
import { FontAwesome } from "@expo/vector-icons";

// Utils
import { shadowProps } from "../themes/helpers";

// Hooks
import { useGetProductsQuery } from "../api/product.api";
import useSelector from "../hooks/useSelector";
import useDispatch from "../hooks/useDispatch";
import useDebounce from "../hooks/useDebounce";

// Actions
import {
	pushToProducts,
	resetProducts,
	setCurrentPage,
	setPage,
	setPriceFilter,
	setPriceRange,
	setSearchQuery
} from "../store/slices/productsSlice";

// Components
import { Badge, FlatList, Flex, Icon, Text, View, VStack } from "native-base";
import IconButton from "../components/IconButton/IconButton";
import SearchBar from "../components/SearchBar/SearchBar";
import ProductCard from "../components/ProductCard/ProductCard";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import AlertBox from "../components/AlertBox/AlertBox";

const ExploreScreen = ({ navigation }: RootStackProps<"Explore">) => {
	const dispatch = useDispatch();
	const isAuth = useSelector(state => state.auth.isAuth);
	const {
		brandFilter,
		priceFilter,
		isInitialized,
		priceRange,
		currentPage,
		page,
		products,
		searchQuery,
		sortBy
	} = useSelector(state => state.products, shallowEqual);

	const searchQueryDebounced = useDebounce(searchQuery, 500);

	const {
		data: productsData,
		isFetching: isGetProductsFetching,
		isLoading: isGetProductsLoading,
		isUninitialized: isGetProductsUninitialized,
		isSuccess: isGetProductsSuccess,
		error: getProductsError,
		refetch: refetchProducts
	} = useGetProductsQuery(
		{ q: searchQueryDebounced, page, brandFilter, sortBy, priceFilter },
		{ skip: !isAuth }
	);
	const productsError: any = getProductsError;
	const noDataFound = productsData?.data.products.length === 0;

	let filterCount = 0;
	if (brandFilter !== -1) filterCount += 1;
	if (priceFilter[0] !== priceRange[0] || priceFilter[1] !== priceRange[1]) filterCount += 1;
	if (sortBy !== "id") filterCount += 1;

	useEffect(() => {
		if (isGetProductsSuccess) {
			if (!isInitialized) {
				dispatch(setPriceFilter(productsData.data.priceRange));
				dispatch(setPriceRange(productsData.data.priceRange));
			}
		}
	}, [productsData, isGetProductsSuccess, dispatch, isInitialized]);

	useEffect(() => {
		dispatch(resetProducts());
		dispatch(setCurrentPage(0));
		dispatch(setPage(1));
	}, [brandFilter, sortBy, priceFilter, searchQueryDebounced]);

	useEffect(() => {
		if (productsData && isGetProductsSuccess && !isGetProductsFetching) {
			if (currentPage < productsData.page) {
				dispatch(pushToProducts(productsData.data.products));
				dispatch(setCurrentPage(productsData.page));
			}
		}
	}, [productsData, currentPage, isGetProductsSuccess, isGetProductsFetching]);

	const loadMoreHandler = () => {
		if (page < (productsData?.totalPages || 0)) {
			dispatch(setPage(page + 1));
		}
	};

	const isFilterApplied =
		brandFilter !== -1 ||
		(priceFilter[0] !== priceRange[0] && priceFilter[0] !== -1) ||
		(priceFilter[1] !== priceRange[1] && priceFilter[1] !== -1) ||
		sortBy !== "id";
	const isSearchApplied = searchQueryDebounced !== "";

	return (
		<SafeAreaView style={styles.exploreScreenContainer}>
			<View mb="56px">
				<Flex
					alignItems="center"
					px={4}
					py={2}
					bgColor="white"
					flexDir="row"
					width="100%"
					style={{ ...shadowProps.xs }}
				>
					<SearchBar
						height="40px"
						showResetButton={searchQuery !== ""}
						onResetSearch={() => dispatch(setSearchQuery(""))}
						value={searchQuery}
						onChangeText={query => dispatch(setSearchQuery(query))}
					/>
					<VStack>
						<Badge
							rounded="lg"
							mb={-4}
							mr={-1}
							bg="primary.400"
							zIndex={1}
							py={0.3}
							px={1.5}
							alignSelf="flex-end"
							_text={{ fontSize: 10, color: "white" }}
						>
							{filterCount}
						</Badge>
						<IconButton
							variant="outline"
							size="sm"
							height="40px"
							width="40px"
							borderColor="gray.100"
							bg="white"
							_pressed={{ bg: "gray.100" }}
							borderRadius="10px"
							icon={
								<Icon as={FontAwesome} name="sliders" color="secondary.400" size="md" mr={-0.5} />
							}
							ml={2}
							onPress={() => navigation.navigate("ExploreProductFilter")}
							disabled={!isGetProductsSuccess}
							style={{ ...shadowProps.xs }}
						/>
					</VStack>
				</Flex>
				<FlatList
					numColumns={2}
					columnWrapperStyle={{ marginHorizontal: 15, marginVertical: 5 }}
					overScrollMode="never"
					onEndReached={loadMoreHandler}
					onEndReachedThreshold={0.2}
					ListHeaderComponent={
						<>
							{(isSearchApplied || isFilterApplied) && !isGetProductsFetching && !noDataFound && (
								<Text fontSize="13px" mb={2} flex={2} mt={3} px={4} key="searchResultText">
									Search result
									{isSearchApplied && " for "}
									{isSearchApplied && (
										<Text color="primary.400" fontWeight="500" key="searchQuery">
											"{searchQueryDebounced}"
										</Text>
									)}
									{isSearchApplied ? ", " : ""}
									{isFilterApplied ? " with " : ""}
									{isFilterApplied && (
										<Text
											color="primary.400"
											fontWeight="500"
											underline
											onPress={() => navigation.navigate("ExploreProductFilter")}
											key="filterCount"
										>
											{filterCount} {filterCount > 1 ? "filters" : "filter"}
										</Text>
									)}
								</Text>
							)}
							{!isGetProductsLoading && productsError && (
								<FallbackContainer mb={4} mt={8} key="errorFallback">
									<AlertBox mb={3}>
										{productsError?.data?.message || "Error while fetching data"}{" "}
									</AlertBox>
									<TryAgainButton isLoading={isGetProductsLoading} onPress={refetchProducts}>
										Try again
									</TryAgainButton>
								</FallbackContainer>
							)}
							{(isGetProductsLoading || isGetProductsUninitialized || isGetProductsFetching) && (
								<FallbackContainer mb={10} key="loadingSpinner" size="lg" mt={10}>
									<LoadingSpinner />
								</FallbackContainer>
							)}
							{!isGetProductsLoading && noDataFound && !isGetProductsFetching && (
								<FallbackContainer mb={10} mt={8} key="noProductFallback" size="lg">
									<AlertBox status="info">No products found.</AlertBox>
								</FallbackContainer>
							)}
							{!isSearchApplied && !isFilterApplied && <View height={3} key="spacer"></View>}
						</>
					}
					ListFooterComponent={
						currentPage !== 0 && isGetProductsFetching ? (
							<View height={16} mb={3} justifyContent="center" key="infiniteLoader">
								<LoadingSpinner />
							</View>
						) : (
							<View height={3} key="exploreFooter"></View>
						)
					}
					data={isGetProductsSuccess ? products : []}
					keyExtractor={(item, i) => {
						return `${item.id}-${i}`;
					}}
					renderItem={({ item, index }) => {
						const isLengthOdd = products.length % 2 === 1;
						const isLastItem = products.length - 1 === index;

						return (
							<ProductCard
								index={index}
								productData={item}
								targetScreenName="ExploreProduct"
								shouldRunScreenHeaderFn={false}
								{...(isLengthOdd && isLastItem && { pr: 1 })}
							/>
						);
					}}
				></FlatList>
			</View>
		</SafeAreaView>
	);
};

export default ExploreScreen;

const styles = StyleSheet.create({
	exploreScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
