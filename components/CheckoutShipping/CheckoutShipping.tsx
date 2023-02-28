// Dependencies
import React, { useEffect, useMemo, useState } from "react";

// Types
import { CheckoutFormValues, ShippingCost } from "../../interfaces";

// Hooks
import { useFormikContext } from "formik";
import { useGetShippingCostByAddressIdQuery } from "../../api/data.api";

// Utils
import { courierImages } from "../../utils/content";
import formatToRupiah from "../../utils/formatToRupiah";

// Components
import { AspectRatio, HStack, Image, InfoIcon, Text, View, VStack } from "native-base";
import FallbackContainer from "../FallbackContainer/FallbackContainer";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import AlertBox from "../AlertBox/AlertBox";
import TryAgainButton from "../TryAgainButton/TryAgainButton";
import CheckoutSectionTitle from "../CheckoutSectionTitle/CheckoutSectionTitle";

interface CheckoutShippingProps {
	setFormInitialValues: React.Dispatch<React.SetStateAction<CheckoutFormValues>>;
}

const CheckoutShipping = ({ setFormInitialValues }: CheckoutShippingProps) => {
	const { values } = useFormikContext<CheckoutFormValues>();

	const {
		data: shippingCostsData,
		isLoading: isGetShippingCostsLoading,
		isFetching: isGetShippingCostsFetching,
		isSuccess: isGetShippingCostsSuccess,
		error: getShippingCostsErrorData,
		refetch: refetchShippingCosts
	} = useGetShippingCostByAddressIdQuery(values.address_id, { skip: values.address_id === -1 });
	const getShippingCostsError: any = getShippingCostsErrorData;
	const noShippingCostsDataFound = shippingCostsData?.data.costs.length === 0;

	const selectedShipping = useMemo(
		() =>
			shippingCostsData?.data.costs.filter(
				(cost: ShippingCost) =>
					values.shipping_courier === `${cost.courier} ${cost.service} ${cost.value}`
			)[0],
		[values.shipping_courier]
	);

	useEffect(() => {
		if (
			shippingCostsData &&
			isGetShippingCostsSuccess &&
			!noShippingCostsDataFound &&
			values.shipping_courier === "default" &&
			values.address_id === shippingCostsData.data.query.addressId
		) {
			const shippingItem = shippingCostsData.data.costs[0];

			setFormInitialValues({
				...values,
				shipping_courier: `${shippingItem.courier} ${shippingItem.service} ${shippingItem.value}`
			});
		}
	}, [
		isGetShippingCostsSuccess,
		noShippingCostsDataFound,
		setFormInitialValues,
		shippingCostsData,
		values
	]);

	return (
		<View>
			<CheckoutSectionTitle
				title="Shipping Method"
				navigateScreenName="HomeCheckoutShippingPicker"
				buttonText="Change method"
				isDisabled={isGetShippingCostsFetching || isGetShippingCostsLoading}
			/>
			{(isGetShippingCostsLoading ||
				isGetShippingCostsFetching ||
				(shippingCostsData && isGetShippingCostsSuccess && !selectedShipping)) && (
				<FallbackContainer size="md" flexDir="row" justifyContent="center" mt={4}>
					<LoadingSpinner size="sm" />
					<Text ml={2} fontSize="13px">
						Fetching shipping method...
					</Text>
				</FallbackContainer>
			)}
			{!isGetShippingCostsLoading && getShippingCostsError && (
				<FallbackContainer size="md">
					<AlertBox mb={3} width="100%">
						{getShippingCostsError?.data?.message}
					</AlertBox>
					<TryAgainButton onPress={refetchShippingCosts}>Try again</TryAgainButton>
				</FallbackContainer>
			)}
			{!isGetShippingCostsFetching &&
				shippingCostsData &&
				isGetShippingCostsSuccess &&
				selectedShipping && (
					<VStack>
						<HStack alignItems="center">
							<AspectRatio ratio={2 / 1} width="80px">
								<Image
									source={courierImages[selectedShipping.courier]}
									resizeMode="cover"
									width="100%"
									height="100%"
									alt={selectedShipping.courier}
									key={selectedShipping.courier}
								/>
							</AspectRatio>
							<VStack ml={3}>
								<Text
									fontWeight="500"
									textTransform="uppercase"
									fontSize="13px"
								>{`${selectedShipping.courier} ${selectedShipping.service}`}</Text>
								<Text fontSize="12px" color="gray.500">
									{selectedShipping.etd} days
								</Text>
							</VStack>
							<Text ml="auto" fontWeight="500" fontSize="13px">
								{formatToRupiah(selectedShipping.value)}
							</Text>
						</HStack>

						<HStack alignItems="center" mt={3} space={2}>
							<InfoIcon size="xs" color="gray.400" />
							<Text fontSize="12px" color="gray.500">
								Estimated time doesn't include processing time (pre-order)
							</Text>
						</HStack>
					</VStack>
				)}
		</View>
	);
};

export default CheckoutShipping;
