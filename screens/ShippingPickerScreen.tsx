// Dependencies
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";

// Types
import { RootStackProps } from "../interfaces";

// Hooks
import useSelector from "../hooks/useSelector";
import { useGetShippingCostByAddressIdQuery } from "../api/data.api";

// Utils
import { courierImages } from "../utils/content";
import formatToRupiah from "../utils/formatToRupiah";

// Icons
import { Feather } from "@expo/vector-icons";

// Components
import {
	AspectRatio,
	Divider,
	HStack,
	Icon,
	Image,
	Pressable,
	ScrollView,
	Text,
	View,
	VStack
} from "native-base";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import AlertBox from "../components/AlertBox/AlertBox";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";

const ShippingPickerScreen = ({
	navigation,
	route
}: RootStackProps<"HomeCheckoutShippingPicker">) => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const { state } = route.params;

	const {
		data: shippingCostsData,
		isLoading: isGetShippingCostsLoading,
		isSuccess: isGetShippingCostsSuccess,
		error: getShippingCostsErrorData,
		refetch: refetchShippingCosts
	} = useGetShippingCostByAddressIdQuery(state.address_id, {
		skip: state.address_id === -1 || !isAuth
	});
	const getShippingCostsError: any = getShippingCostsErrorData;
	const noShippingCostsDataFound = shippingCostsData?.data.costs.length === 0;

	const shippingCosts = useMemo(() => shippingCostsData?.data.costs, [shippingCostsData]);

	const shippingMethodPressHandler = (shippingMethod: string) => {
		navigation.navigate("HomeCheckout", { state: { ...state, shipping_courier: shippingMethod } });
	};

	return (
		<ScrollView style={styles.addressPickerScreenContainer}>
			{!isGetShippingCostsLoading && isGetShippingCostsSuccess && noShippingCostsDataFound && (
				<FallbackContainer size="md">
					<AlertBox status="info">Shipping method not available.</AlertBox>
				</FallbackContainer>
			)}
			{isGetShippingCostsLoading && (
				<FallbackContainer size="md" mt={10}>
					<LoadingSpinner size="sm" />
				</FallbackContainer>
			)}
			{!isGetShippingCostsLoading && getShippingCostsErrorData && (
				<FallbackContainer size="md">
					<AlertBox>{getShippingCostsError?.data?.message}</AlertBox>
					<TryAgainButton onPress={refetchShippingCosts}>Try again</TryAgainButton>
				</FallbackContainer>
			)}
			{shippingCosts &&
				isGetShippingCostsSuccess &&
				shippingCosts.map(item => (
					<Pressable
						onPress={() =>
							shippingMethodPressHandler(`${item.courier} ${item.service} ${item.value}`)
						}
						key={`${item.courier} ${item.service}`}
					>
						{({ isPressed, isHovered }) => {
							const isSelected =
								state.shipping_courier === `${item.courier} ${item.service} ${item.value}`;

							return (
								<>
									<View
										px={4}
										py={5}
										bg={
											isSelected
												? "gray.100"
												: isPressed || isHovered
												? "primary.400:alpha.10"
												: "white"
										}
									>
										<HStack alignItems="center">
											<AspectRatio ratio={2 / 1} width="80px">
												<Image
													source={courierImages[item.courier]}
													resizeMode="cover"
													width="100%"
													height="100%"
													alt={item.courier}
												/>
											</AspectRatio>
											<VStack ml={4}>
												<Text
													fontWeight="500"
													textTransform="uppercase"
													fontSize="13px"
												>{`${item.courier} ${item.service}`}</Text>
												<Text fontSize="12px" color="gray.500">
													{item.etd} days
												</Text>
											</VStack>
											<HStack ml="auto" space={3}>
												<View minWidth="30px" alignItems="flex-end">
													{isSelected && (
														<Icon as={Feather} name="check" size="md" color="primary.400" />
													)}
												</View>
												<Text ml="auto" fontWeight="500" fontSize="13px">
													{formatToRupiah(item.value)}
												</Text>
											</HStack>
										</HStack>
									</View>
									<Divider />
								</>
							);
						}}
					</Pressable>
				))}
		</ScrollView>
	);
};

export default ShippingPickerScreen;

const styles = StyleSheet.create({
	addressPickerScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
