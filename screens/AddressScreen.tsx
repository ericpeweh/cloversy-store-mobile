// Dependencies
import React, { useMemo, useState } from "react";
import { StyleSheet } from "react-native";

// Types
import { Address, RootStackProps } from "../interfaces";

// Hooks
import { useDeleteAddressMutation, useGetAllAddressesQuery } from "../api/address.api";
import useSelector from "../hooks/useSelector";
import useHideHeaderTabbar from "../hooks/useHideHeaderTabbar";

// Icons
import { Ionicons } from "@expo/vector-icons";

// Components
import { Center, Icon, ScrollView } from "native-base";
import Button from "../components/Button/Button";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import AlertBox from "../components/AlertBox/AlertBox";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";
import AddressItem from "../components/AddressItem/AddressItem";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";

const AddressScreen = ({ navigation, route }: RootStackProps<"AccountAddress">) => {
	const isAuth = useSelector(state => state.auth.isAuth);

	// Delete address modal
	const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);
	const [isDeleteAddressModalOpen, setIsDeleteAddressModalOpen] = useState(false);

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

	const [
		deleteAddress,
		{
			isLoading: isDeleteAddressLoading,
			error: deleteAddressError,
			isSuccess: isDeleteAddressSuccess,
			reset: resetDeleteAddress
		}
	] = useDeleteAddressMutation();

	// Hide parent header and tabbar on mount
	useHideHeaderTabbar(navigation);

	const setAndOpenDeleteAddressModalHandler = (address: Address) => {
		setAddressToDelete(address);
		setIsDeleteAddressModalOpen(true);
	};

	const cancelDeleteAddressHandler = () => {
		setAddressToDelete(null);
		setIsDeleteAddressModalOpen(false);
	};

	return (
		<ScrollView style={styles.addressScreenContainer}>
			<ConfirmModal
				title="Remove product"
				description={`Are you sure you want to delete address with label of "${addressToDelete?.label}"?`}
				isOpen={isDeleteAddressModalOpen}
				onConfirm={() => {
					if (addressToDelete) deleteAddress(addressToDelete.id);
				}}
				onClose={() => setIsDeleteAddressModalOpen(false)}
			/>
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
					<AddressItem
						item={item}
						key={item.id}
						isDeleteAddressLoading={Boolean(
							isDeleteAddressLoading && addressToDelete && addressToDelete.id === item.id
						)}
						onPressDelete={setAndOpenDeleteAddressModalHandler}
					/>
				))}
			<Center my={5}>
				<Button
					startIcon={<Icon as={Ionicons} name="add" />}
					py={1.5}
					px={3}
					_text={{ fontWeight: "500", fontSize: "12px" }}
					_pressed={{ bg: "primary.500" }}
					onPress={() => navigation.navigate("AccountAddAddress")}
				>
					New Address
				</Button>
			</Center>
		</ScrollView>
	);
};

export default AddressScreen;

const styles = StyleSheet.create({
	addressScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
