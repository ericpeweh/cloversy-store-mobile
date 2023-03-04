// Dependencies
import React, { useEffect } from "react";

// Types
import { CheckoutFormValues, RootStackNavigationProp } from "../../interfaces";

// Hooks
import { useGetAllAddressesQuery } from "../../api/address.api";
import { useFormikContext } from "formik";
import { useNavigation } from "@react-navigation/native";
import useSelector from "../../hooks/useSelector";

// Icons
import { Ionicons } from "@expo/vector-icons";

// Components
import { HStack, Icon, Text, VStack } from "native-base";
import FallbackContainer from "../FallbackContainer/FallbackContainer";
import Button from "../Button/Button";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import TryAgainButton from "../TryAgainButton/TryAgainButton";
import AlertBox from "../AlertBox/AlertBox";

interface CheckoutInfoProps {
	setFormInitialValues: React.Dispatch<React.SetStateAction<CheckoutFormValues>>;
}

const CheckoutInfo = ({ setFormInitialValues }: CheckoutInfoProps) => {
	const navigation = useNavigation<RootStackNavigationProp>();
	const isAuth = useSelector(state => state.auth.isAuth);
	const { values } = useFormikContext<CheckoutFormValues>();

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
	const selectedAddress = addressData?.data.address.filter(
		(address: { id: number }) => address.id === +values.address_id
	)[0];

	useEffect(() => {
		if (isGetAddressSuccess && !noAddressDataFound && values.address_id === -1) {
			const defaultAddress = addressData.data.address.find(item => item.is_default === true)?.id;

			setFormInitialValues({
				...values,
				address_id: defaultAddress ?? addressData.data.address[0].id
			});
		}
	}, [addressData, isGetAddressSuccess, noAddressDataFound, setFormInitialValues, values]);

	return (
		<VStack borderRadius="10px" borderColor="primary.400" borderWidth="1" px={4} py={3}>
			{!isGetAddressLoading && isGetAddressSuccess && noAddressDataFound && (
				<FallbackContainer size="md">
					<Text>You have no address. Please create one!</Text>
					<Button
						mt={2}
						_text={{ fontWeight: "500", fontSize: "13px" }}
						_pressed={{ bg: "primary.500" }}
						onPress={() => navigation.navigate("HomeCheckoutAddAddress", { state: values })}
					>
						Create address
					</Button>
				</FallbackContainer>
			)}
			{(isGetAddressLoading || (addressData && isGetAddressSuccess && !selectedAddress)) && (
				<FallbackContainer size="md" flexDir="row" justifyContent="center">
					<LoadingSpinner size="sm" />
					<Text ml={2} fontSize="13px">
						Fetching shipping address...
					</Text>
				</FallbackContainer>
			)}
			{!isGetAddressLoading && getAddressError && (
				<FallbackContainer size="md">
					<AlertBox width="100%" mb={3}>
						{addressError?.data?.message}
					</AlertBox>
					<TryAgainButton onPress={refetchAddress}>Try again</TryAgainButton>
				</FallbackContainer>
			)}
			{addressData && isGetAddressSuccess && selectedAddress && (
				<>
					<HStack justifyContent="space-between" alignItems="center">
						<Text fontWeight="700">{selectedAddress.recipient_name}</Text>
						<HStack space={1} alignItems="center">
							<Icon as={Ionicons} name="location-outline" size="16px" color="gray.500" />
							<Text letterSpacing={0.4} fontSize="13px" color="gray.500">
								{selectedAddress.label}
							</Text>
						</HStack>
					</HStack>
					<Text fontSize="13px" mt={1}>
						{selectedAddress.contact}
					</Text>
					<Text fontSize="13px">
						{selectedAddress.province}, {selectedAddress.city}, {selectedAddress.postal_code}
					</Text>
					<Text fontSize="13px">{selectedAddress.address}</Text>
				</>
			)}
		</VStack>
	);
};

export default CheckoutInfo;
