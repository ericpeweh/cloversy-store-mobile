// Dependencies
import React from "react";
import { NativeSyntheticEvent, StyleSheet, TextInputSubmitEditingEventData } from "react-native";

// Types
import { RootStackProps } from "../interfaces/navigation.interface";

// Hooks
import { useGetBestSellerProductsQuery } from "../api/product.api";
import useDispatch from "../hooks/useDispatch";
import useSelector from "../hooks/useSelector";

// Actions
import { setSearchQuery } from "../store/slices/productsSlice";

// Images
const Banner1Image = require("../assets/images/carousel-1.webp");
const Banner2Image = require("../assets/images/carousel-2.webp");
const Banner3Image = require("../assets/images/carousel-3.webp");

// Components
import { FlatList, Text, View } from "native-base";
import BrandCardList from "../components/BrandCardList/BrandCardList";
import ProductCard from "../components/ProductCard/ProductCard";
import Banner from "../components/Banner/Banner";
import SearchBar from "../components/SearchBar/SearchBar";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import AlertBox from "../components/AlertBox/AlertBox";

const HomeScreen = ({ navigation }: RootStackProps<"Home">) => {
	const isAuth = useSelector(state => state.auth.isAuth);

	const {
		data: productsData,
		isUninitialized: isGetProductsUninitialized,
		isLoading: isGetProductsLoading,
		isSuccess: isGetProductsSuccess,
		error: getProductsError,
		refetch: refetchProducts
	} = useGetBestSellerProductsQuery(null, { skip: !isAuth });
	const productsError: any = getProductsError;
	const noDataFound = productsData?.data.products.length === 0;

	const dispatch = useDispatch();

	const searchBarEndEditingHandler = (
		event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
	) => {
		// Change store search query value to input value
		dispatch(setSearchQuery(event.nativeEvent.text));

		// Clear input value
		event.currentTarget.setNativeProps({ text: "" });

		// Navigate user to explore screen
		navigation.navigate("Explore");
	};

	return (
		<FlatList
			style={styles.homeScreenContainer}
			numColumns={2}
			columnWrapperStyle={{ marginHorizontal: 15, marginVertical: 5 }}
			overScrollMode="never"
			ListHeaderComponent={
				<View>
					<Banner
						imageSrc={Banner1Image}
						title="Nike AF1 Homesick"
						zIndex={10}
						buttonText="Details"
						key="banner1"
						productSlug="nike-af1-low-homesick-special-edition"
					/>
					<View position="relative" key="searchBar">
						<View paddingX={4} paddingY={2} position="relative" zIndex={100} marginTop="-32px">
							<SearchBar onSubmitEditing={searchBarEndEditingHandler} />
						</View>
					</View>
					<View style={styles.contentContainer} key="brandCardList">
						<BrandCardList />
					</View>
					<Banner
						imageSrc={Banner2Image}
						title="Super Mario Series"
						key="banner2"
						productSlug="ventela-basic-super-mario-bros-series"
					/>
					<Banner
						imageSrc={Banner3Image}
						title="Lukisan Alam"
						mt={3}
						key="banner3"
						productSlug="ventela-basic-lukisan-alam"
					/>
					<View mt={4} width="100%" style={styles.contentContainer} key="bestSellerTitle">
						<Text fontWeight="500" fontSize={16}>
							Best Sellers
						</Text>
					</View>
					{!isGetProductsLoading && productsError && (
						<FallbackContainer mb={4} key="errorFallback">
							<AlertBox mb={3}>
								{productsError?.data?.message || "Error occured while fetching products data."}
							</AlertBox>
							<TryAgainButton isLoading={isGetProductsLoading} onPress={refetchProducts}>
								Try again
							</TryAgainButton>
						</FallbackContainer>
					)}
					{(isGetProductsLoading || isGetProductsUninitialized) && (
						<FallbackContainer mb={10} key="loadingSpinner" size="md">
							<LoadingSpinner />
						</FallbackContainer>
					)}
					{!isGetProductsLoading && noDataFound && (
						<FallbackContainer mb={10} key="noProductFallback" size="md">
							<AlertBox status="info">No products found.</AlertBox>
						</FallbackContainer>
					)}
				</View>
			}
			data={isGetProductsSuccess ? productsData?.data.products : []}
			keyExtractor={(item, i) => {
				return `${item.id}-${i}`;
			}}
			renderItem={({ item, index }) => (
				<ProductCard index={index} productData={item} targetScreenName="HomeProduct" />
			)}
		></FlatList>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	homeScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	},
	contentContainer: {
		paddingHorizontal: 12,
		paddingVertical: 10,
		marginBottom: 15
	}
});
