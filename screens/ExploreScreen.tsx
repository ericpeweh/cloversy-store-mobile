// Dependencies
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Types
import { MainScreenProps } from "../interfaces";

// Icons
import { FontAwesome } from "@expo/vector-icons";

// Hooks
import { useGetBestSellerProductsQuery } from "../api/product.api";
import useSelector from "../hooks/useSelector";

// Components
import { FlatList, Flex, Icon, View } from "native-base";
import IconButton from "../components/IconButton/IconButton";
import SearchBar from "../components/SearchBar/SearchBar";
import ProductCard from "../components/ProductCard/ProductCard";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import ErrorText from "../components/ErrorText/ErrorText";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const ExploreScreen = ({ navigation }: MainScreenProps<"ExploreTab">) => {
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

	// console.log(
	// 	isGetProductsSuccess,
	// 	productsData?.data.products,
	// 	isGetProductsSuccess ? productsData.data.products : []
	// );

	return (
		<SafeAreaView style={styles.exploreScreenContainer}>
			<FlatList
				numColumns={2}
				columnWrapperStyle={{ marginHorizontal: 15, marginVertical: 5 }}
				stickyHeaderIndices={[0]}
				overScrollMode="never"
				ListHeaderComponent={
					<>
						<Flex
							alignItems="center"
							px={4}
							py={2}
							borderBottomColor="gray.100"
							borderBottomWidth={1}
							bgColor="white"
							flexDir="row"
							width="100%"
							mb={4}
							key="exploreHeader"
						>
							<SearchBar height="40px" showResetButton={true} key="searchBar" />
							<IconButton
								variant="outline"
								size="sm"
								height="40px"
								width="40px"
								borderColor="transparent"
								bg="secondary.300"
								_pressed={{ bg: "gray.600" }}
								borderRadius="10px"
								icon={<Icon as={FontAwesome} name="sliders" color="white" size="md" mr={-0.5} />}
								ml={2}
								key="filterButton"
							/>
						</Flex>
						{!isGetProductsLoading && productsError && (
							<FallbackContainer mb={4} key="errorFallback">
								<ErrorText>
									{productsError?.data?.message || "Error while fetching data"}{" "}
								</ErrorText>
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
					</>
				}
				ListFooterComponent={<View height={6} key="exploreFooter"></View>}
				data={isGetProductsSuccess ? productsData.data.products : []}
				keyExtractor={(item, i) => {
					return `${item.id}-${i}`;
				}}
				renderItem={({ item, index }) => <ProductCard index={index} productData={item} />}
			></FlatList>
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
