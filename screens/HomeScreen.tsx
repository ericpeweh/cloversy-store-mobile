// Dependencies
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";

// Types
import { RootStackProps, MainScreenProps } from "../interfaces/navigation.interface";

// Hooks
import { useFocusEffect } from "@react-navigation/native";
import { useGetBestSellerProductsQuery } from "../api/product.api";
import useDispatch from "../hooks/useDispatch";
import useSelector from "../hooks/useSelector";

// Actions
import { logoutUser } from "../store/slices/authSlice";

// Images
const Banner1Image = require("../assets/images/1.jpg");
const Banner2Image = require("../assets/images/2.jpg");
const Banner3Image = require("../assets/images/3.jpg");

// Components
import { FlatList, Text, View } from "native-base";
import BrandCardList from "../components/BrandCardList/BrandCardList";
import ProductCard from "../components/ProductCard/ProductCard";
import Banner from "../components/Banner/Banner";
import SearchBar from "../components/SearchBar/SearchBar";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import ErrorText from "../components/ErrorText/ErrorText";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

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

	// const { clearSession } = useAuth0();

	// const logoutHandler = async () => {
	// 	try {
	// 		await clearSession({ customScheme: "cloversy-store-auth0" });
	// 		dispatch(logoutUser());
	// 	} catch (error) {
	// 		console.log("Failed to logout");
	// 	}
	// };

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
					/>
					<View position="relative" key="searchBar">
						<View paddingX={4} paddingY={2} position="relative" zIndex={100} marginTop="-32px">
							<SearchBar />
						</View>
					</View>
					<View style={styles.contentContainer} key="brandCardList">
						<BrandCardList />
					</View>
					<Banner imageSrc={Banner2Image} title="Challenges Ventela V1" key="banner2" />
					<Banner imageSrc={Banner3Image} title="Yeezy Simplest" mt={3} key="banner3" />
					<View mt={4} width="100%" style={styles.contentContainer} key="bestSellerTitle">
						<Text fontWeight="500" fontSize={16}>
							Best Sellers
						</Text>
					</View>
					{!isGetProductsLoading && productsError && (
						<FallbackContainer mb={4} key="errorFallback">
							<ErrorText>{productsError?.data?.message || "Error while fetching data"} </ErrorText>
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
							<ErrorText color="black">No products found.</ErrorText>
						</FallbackContainer>
					)}
				</View>
			}
			// ListFooterComponent={<View height={6} key="homeFooter"></View>}
			data={isGetProductsSuccess ? productsData?.data.products : []}
			keyExtractor={(item, i) => {
				return `${item.id}-${i}`;
			}}
			renderItem={({ item, index }) => (
				<ProductCard index={index} productData={item} targetScreenName="HomeProduct" />
			)}
		>
			{/* <Button onPress={logoutHandler}>Logout</Button> */}
		</FlatList>
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
