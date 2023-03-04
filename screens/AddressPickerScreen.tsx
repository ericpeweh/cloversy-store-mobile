// Dependencies
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";

// Types
import { RootStackProps } from "../interfaces";

// Hooks
import { useGetAllAddressesQuery } from "../api/address.api";
import useSelector from "../hooks/useSelector";

// Icons
import { Ionicons, Feather } from "@expo/vector-icons";

// Components
import { Center, Divider, HStack, Icon, Pressable, ScrollView, Text, View } from "native-base";
import Button from "../components/Button/Button";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import AlertBox from "../components/AlertBox/AlertBox";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";

const AddressPickerScreen = ({
	navigation,
	route
}: RootStackProps<"HomeCheckoutAddressPicker">) => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const { state } = route.params;

	const {
		data: addressData,
		isLoading: isGetAddressLoading,
		isSuccess: isGetAddressSuccess,
		error: getAddressError,
		refetch: refetchAddress
	} = useGetAllAddressesQuery(isAuth, {
		skip: !isAuth
	});
	const addressError: any = getAddressError;
	const noAddressDataFound = addressData?.data.address.length === 0;

	const address = useMemo(() => addressData?.data.address, [addressData]);

	const addressPressHandler = (newAddressId: number) => {
		navigation.navigate("HomeCheckout", {
			state: { ...state, address_id: newAddressId, shipping_courier: "default" }
		});
	};

	return (
		<ScrollView style={styles.addressPickerScreenContainer}>
			{!isGetAddressLoading && isGetAddressSuccess && noAddressDataFound && (
				<FallbackContainer size="md">
					<AlertBox status="info">You have no address. Please create one!</AlertBox>
				</FallbackContainer>
			)}
			{isGetAddressLoading && (
				<FallbackContainer size="md" mt={10}>
					<LoadingSpinner size="sm" />
				</FallbackContainer>
			)}
			{!isGetAddressLoading && getAddressError && (
				<FallbackContainer size="md">
					<AlertBox mb={3}>{addressError?.data?.message}</AlertBox>
					<TryAgainButton onPress={refetchAddress}>Try again</TryAgainButton>
				</FallbackContainer>
			)}
			{address &&
				isGetAddressSuccess &&
				address.map(item => (
					<Pressable onPress={() => addressPressHandler(item.id)} key={item.id}>
						{({ isPressed, isHovered }) => {
							const isSelected = state.address_id === item.id;

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
										<HStack justifyContent="space-between" alignItems="center">
											<Text fontWeight="700">{item.recipient_name}</Text>
											<HStack space={1} alignItems="center">
												<Icon as={Ionicons} name="location-outline" size="16px" color="gray.500" />
												<Text letterSpacing={0.4} fontSize="13px" color="gray.500">
													{item.label}
												</Text>
											</HStack>
										</HStack>
										<Text fontSize="13px" mt={1}>
											{item.contact}
										</Text>
										<HStack justifyContent="space-between">
											<View flex={1}>
												<Text fontSize="13px">
													{item.province}, {item.city}, {item.subdistrict}, {item.postal_code}
												</Text>
												<Text fontSize="13px">{item.address}</Text>
											</View>
											<View minWidth="30px" alignItems="flex-end">
												{isSelected && (
													<Icon as={Feather} name="check" size="md" color="primary.400" />
												)}
											</View>
										</HStack>
									</View>
									<Divider />
								</>
							);
						}}
					</Pressable>
				))}
			<Center my={5}>
				<Button
					startIcon={<Icon as={Ionicons} name="add" />}
					py={1.5}
					px={3}
					_text={{ fontWeight: "500", fontSize: "12px" }}
					_pressed={{ bg: "primary.500" }}
					onPress={() => navigation.navigate("HomeCheckoutAddAddress", { state })}
				>
					New Address
				</Button>
			</Center>
		</ScrollView>
	);
};

export default AddressPickerScreen;

const styles = StyleSheet.create({
	addressPickerScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
