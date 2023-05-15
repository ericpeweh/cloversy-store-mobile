// Dependencies
import React, { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { shallowEqual } from "react-redux";

// Hooks
import { useCallback, useLayoutEffect } from "react";
import { useGetBrandsQuery } from "../api/brand.api";
import useSelector from "../hooks/useSelector";
import useDispatch from "../hooks/useDispatch";

// Icons
import { Entypo, MaterialIcons } from "@expo/vector-icons";

// Actions
import { applyProductFilter, resetFilter } from "../store/slices/productsSlice";

// Utils
import { productSortOptions } from "../utils/content";
import { shadowProps } from "../themes/helpers";

// Types
import { Brand, ProductsSortValues, RootStackProps } from "../interfaces";

// Components
import { HStack, Icon, Pressable, Text, View, VStack } from "native-base";
import FormControlSelect from "../components/FormControlSelect/FormControlSelect";
import RangeSlider from "../components/RangeSlider/RangeSlider";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";

const ProductFilterScreen = ({ navigation }: RootStackProps<"ExploreProductFilter">) => {
	const dispatch = useDispatch();
	const { brandFilter, priceFilter, priceRange, sortBy } = useSelector(
		state => state.products,
		shallowEqual
	);

	const [priceFilterLowInput, setPriceFilterLowInput] = useState(priceFilter[0]);
	const [priceFilterHighInput, setPriceFilterHighInput] = useState(priceFilter[1]);
	const [brandFilterInput, setBrandFilterInput] = useState(brandFilter);
	const [sortByInput, setSortByInput] = useState<ProductsSortValues>(sortBy);

	// Hide parent tabbar
	useLayoutEffect(
		useCallback(() => {
			navigation?.getParent()?.setOptions({
				tabBarStyle: { display: "none" }
			});

			// Cleanup function (revert tabbar style changes)
			return () => {
				navigation?.getParent()?.setOptions({
					tabBarStyle: { display: "flex", height: 56, paddingTop: 5, paddingBottom: 7 }
				});
			};
		}, [])
	);

	const { data: brandsData, isLoading: isGetBrandsLoading } = useGetBrandsQuery();

	const brandOptions = useMemo<{ label: string; value: number }[]>(() => {
		const availableOptions =
			brandsData?.data.brands
				?.filter((brand: Brand) => +brand.product_amount > 0)
				.map((brand: Brand) => ({
					label: `${brand.name} (${brand.product_amount})`,
					value: brand.id
				})) || [];

		return [{ label: "All brands", value: -1 }, ...availableOptions];
	}, [brandsData?.data.brands]);

	const changePriceFilterHandler = useCallback((newLow: number, newHigh: number) => {
		setPriceFilterLowInput(newLow);
		setPriceFilterHighInput(newHigh);
	}, []);

	const applyFilterHandler = () => {
		dispatch(
			applyProductFilter({
				priceFilter: [priceFilterLowInput, priceFilterHighInput],
				brandFilter: brandFilterInput,
				sortBy: sortByInput
			})
		);
		navigation.navigate("Explore");
	};

	const resetFilterHandler = () => {
		dispatch(resetFilter());
		navigation.navigate("Explore");
	};

	return (
		<View style={styles.productFilterScreenContainer}>
			<View p={4} flex={1}>
				<VStack space={3} mb={6} mt={2}>
					{isGetBrandsLoading ? (
						<FallbackContainer flexDir="row" justifyContent="center" size="md">
							<LoadingSpinner size="sm" />
							<Text ml={2} fontSize="13px">
								Fetching brands data...
							</Text>
						</FallbackContainer>
					) : (
						<FormControlSelect
							label="Select Brand"
							options={brandOptions}
							selectedValue={brandFilterInput}
							onValueChange={newValue => setBrandFilterInput(+newValue)}
						/>
					)}
					<FormControlSelect
						label="Sort Product"
						options={productSortOptions}
						selectedValue={sortByInput}
						onValueChange={newValue => setSortByInput(newValue as ProductsSortValues)}
					/>
					<VStack space={3} mt={2}>
						<Text fontWeight="500" fontSize="15px">
							Price Filter
						</Text>
						<RangeSlider
							min={priceRange[0]}
							max={priceRange[1]}
							lowValue={priceFilterLowInput}
							highValue={priceFilterHighInput}
							onTouchEnd={changePriceFilterHandler}
						/>
					</VStack>
				</VStack>
			</View>
			<HStack
				bg="white"
				borderTopColor="gray.100"
				borderTopWidth={0.6}
				height="56px"
				width="100%"
				alignItems="center"
				justifyContent="space-between"
				style={{ ...shadowProps.xl }}
			>
				<Pressable
					flex={1}
					alignSelf="stretch"
					alignItems="center"
					justifyContent="center"
					onPress={resetFilterHandler}
				>
					{({ isHovered, isPressed }) => (
						<HStack
							space={3}
							height="100%"
							width="100%"
							justifyContent="center"
							alignItems="center"
							bg={isHovered || isPressed ? "primary.400:alpha.10" : "white"}
						>
							<Text fontSize="13px" fontWeight="500" letterSpacing={0.5} textTransform="uppercase">
								Reset Filters
							</Text>
							<Icon as={Entypo} name="cycle" size="md" color="secondary.400" />
						</HStack>
					)}
				</Pressable>
				<Pressable
					flex={1}
					bg="primary.400"
					alignSelf="stretch"
					alignItems="center"
					justifyContent="center"
					onPress={applyFilterHandler}
				>
					{({ isHovered, isPressed }) => (
						<HStack
							space={3}
							height="100%"
							width="100%"
							justifyContent="center"
							alignItems="center"
							bg={isHovered || isPressed ? "white:alpha.10" : "primary.400"}
						>
							<Text
								color="white"
								fontSize="13px"
								fontWeight="500"
								letterSpacing={0.5}
								textTransform="uppercase"
							>
								Apply Filters
							</Text>
							<Icon as={MaterialIcons} name="done" color="white" size="md" />
						</HStack>
					)}
				</Pressable>
			</HStack>
		</View>
	);
};

export default ProductFilterScreen;

const styles = StyleSheet.create({
	productFilterScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
