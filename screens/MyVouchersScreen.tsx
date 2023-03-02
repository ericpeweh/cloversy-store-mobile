// Dependencies
import React from "react";
import { StyleSheet } from "react-native";
import * as Clipboard from "expo-clipboard";

// Types
import { RootStackProps } from "../interfaces";

// Hooks
import useSelector from "../hooks/useSelector";
import useHideHeaderTabbar from "../hooks/useHideHeaderTabbar";

// Components
import { FlatList, View, Text } from "native-base";
import WishlistItem from "../components/WishlistItem/WishlistItem";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ErrorText from "../components/ErrorText/ErrorText";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";
import { useGetVouchersQuery } from "../api/voucher.api";
import VoucherItem from "../components/VoucherItem/VoucherItem";

const MyVouchersScreen = ({ navigation, route }: RootStackProps<"AccountMyVouchers">) => {
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

	const copyVoucherCodeHandler = async (voucherCode: string) => {
		await Clipboard.setStringAsync(voucherCode);
	};

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
					<ErrorText>
						{vouchersError?.data?.message || "Error while fetching voucher data"}{" "}
					</ErrorText>
					<TryAgainButton isLoading={isGetVouchersLoading} onPress={refetchVouchers}>
						Try again
					</TryAgainButton>
				</FallbackContainer>
			)}
			{!isGetVouchersLoading && isGetVouchersSuccess && noDataFound && (
				<FallbackContainer mt={10}>
					<Text mb={2}>You have no voucher.</Text>
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
