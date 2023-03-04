// Dependencies
import React from "react";
import { StyleSheet } from "react-native";

// Types
import { RootStackProps } from "../interfaces";

// Hooks
import useSelector from "../hooks/useSelector";
import useHideHeaderTabbar from "../hooks/useHideHeaderTabbar";
import { useGetVouchersQuery } from "../api/voucher.api";

// Components
import { FlatList, View } from "native-base";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";
import VoucherItem from "../components/VoucherItem/VoucherItem";
import AlertBox from "../components/AlertBox/AlertBox";

const MyVouchersScreen = ({ navigation }: RootStackProps<"AccountMyVouchers">) => {
	const isAuth = useSelector(state => state.auth.isAuth);

	const {
		data: vouchersData,
		isLoading: isGetVouchersLoading,
		isSuccess: isGetVouchersSuccess,
		error: getVouchersError,
		refetch: refetchVouchers
	} = useGetVouchersQuery(isAuth, { skip: !isAuth });
	const vouchersError: any = getVouchersError;
	const noDataFound = vouchersData?.data.vouchers.length === 0;

	// Hide parent header and tabbar on mount
	useHideHeaderTabbar(navigation);

	return (
		<View style={styles.myVouchersScreenContainer}>
			{isGetVouchersLoading && (
				<FallbackContainer mt={10}>
					<LoadingSpinner />
				</FallbackContainer>
			)}
			{!isGetVouchersLoading && vouchersError && (
				<FallbackContainer mb={4} mt={10}>
					<AlertBox mb={3}>
						{vouchersError?.data?.message || "Error while fetching voucher data"}{" "}
					</AlertBox>
					<TryAgainButton isLoading={isGetVouchersLoading} onPress={refetchVouchers}>
						Try again
					</TryAgainButton>
				</FallbackContainer>
			)}
			{!isGetVouchersLoading && isGetVouchersSuccess && noDataFound && (
				<FallbackContainer mt={10}>
					<AlertBox status="info" mb={2}>
						You have no voucher.
					</AlertBox>
				</FallbackContainer>
			)}
			<FlatList
				initialNumToRender={10}
				windowSize={6}
				maxToRenderPerBatch={10}
				removeClippedSubviews={false}
				data={vouchersData?.data.vouchers || []}
				renderItem={({ item }) => <VoucherItem voucherData={item} readOnly />}
				keyExtractor={item => `${item.code}`}
			/>
		</View>
	);
};

export default MyVouchersScreen;

const styles = StyleSheet.create({
	myVouchersScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
