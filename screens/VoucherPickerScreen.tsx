// Dependencies
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

// Types
import { RootStackProps } from "../interfaces";

// Hooks
import { useApplyVoucherMutation, useGetVouchersQuery } from "../api/voucher.api";
import useSelector from "../hooks/useSelector";

// Components
import { View } from "react-native";
import { HStack, Input, ScrollView, VStack } from "native-base";
import Button from "../components/Button/Button";
import FallbackContainer from "../components/FallbackContainer/FallbackContainer";
import AlertBox from "../components/AlertBox/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import TryAgainButton from "../components/TryAgainButton/TryAgainButton";
import VoucherItem from "../components/VoucherItem/VoucherItem";
import SingleButtonTab from "../components/SingleBottomTab/SingleButtonTab";

const VoucherPickerScreen = ({
	navigation,
	route
}: RootStackProps<"HomeCheckoutVoucherPicker">) => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const { state } = route.params;
	const [voucherCodeInput, setVoucherCodeInput] = useState(state.voucher_code);

	const {
		data: vouchersData,
		isLoading: isGetVouchersLoading,
		isSuccess: isGetVouchersSuccess,
		error: getVouchersError,
		refetch: refetchVouchers
	} = useGetVouchersQuery(isAuth, { skip: !isAuth });
	const vouchersError: any = getVouchersError;
	const noVouchersDataFound = vouchersData?.data.vouchers.length === 0;

	const [
		applyVoucher,
		{
			data: voucherData,
			isLoading: isVoucherLoading,
			isSuccess: isVoucherSuccess,
			error: voucherErrorData,
			reset: resetApplyVoucher
		}
	] = useApplyVoucherMutation();
	const voucherError: any = voucherErrorData;
	const voucher = voucherData?.data.voucher;

	// If voucher applied successfully, modify formik state
	useEffect(() => {
		if (voucher && isVoucherSuccess) {
			navigation.navigate("HomeCheckout", {
				state: {
					...state,
					voucher_code: voucher.code,
					voucher_discount: voucher.discount,
					voucher_type: voucher.discount_type as "default" | "value" | "percentage"
				},
				appliedVoucher: voucher
			});
		}
	}, [isVoucherSuccess, voucher]);

	const voucherCodeInputChangeHandler = (voucherCode: string) => {
		setVoucherCodeInput(voucherCode.toUpperCase());
	};

	const applyVoucherHandler = (code: string) => {
		if (!code) return;

		setVoucherCodeInput(code.toUpperCase());
		resetApplyVoucher();
		applyVoucher(code.toUpperCase());
	};

	const clearVoucherHandler = () => {
		navigation.navigate("HomeCheckout", {
			state: {
				...state,
				voucher_code: "",
				voucher_discount: 0,
				voucher_type: "default"
			},
			appliedVoucher: null
		});
	};

	return (
		<View style={styles.voucherPickerScreenContainer}>
			<VStack px={4}>
				<HStack py={2} mt={1}>
					<Input
						py={1.5}
						_invalid={{ borderColor: "error.500" }}
						_focus={{ bgColor: "white" }}
						_input={{ fontSize: "14px", textTransform: "uppercase" }}
						focusOutlineColor="primary.400"
						textTransform="uppercase"
						placeholder="Voucher code"
						flex={1}
						borderRadius="10px"
						borderTopRightRadius="0"
						borderBottomRightRadius="0"
						value={voucherCodeInput}
						onChangeText={voucherCodeInputChangeHandler}
					/>
					<Button
						_pressed={{ bg: "primary.500" }}
						borderRadius="0"
						borderTopRightRadius="10px"
						borderBottomRightRadius="10px"
						_text={{ fontSize: "13px" }}
						onPress={() => applyVoucherHandler(voucherCodeInput)}
						isLoading={isVoucherLoading}
						minWidth="70px"
					>
						APPLY
					</Button>
				</HStack>
				{voucherError && <AlertBox width="100%">{voucherError.data.message}</AlertBox>}
			</VStack>
			<ScrollView>
				{!isGetVouchersLoading && isGetVouchersSuccess && noVouchersDataFound && (
					<FallbackContainer size="md">
						<AlertBox status="info">You have no voucher.</AlertBox>
					</FallbackContainer>
				)}
				{isGetVouchersLoading && (
					<FallbackContainer size="md" mt={10}>
						<LoadingSpinner size="lg" />
					</FallbackContainer>
				)}
				{!isGetVouchersLoading && vouchersError && (
					<FallbackContainer size="md">
						<AlertBox>{vouchersError?.data?.message}</AlertBox>
						<TryAgainButton onPress={refetchVouchers}>Try again</TryAgainButton>
					</FallbackContainer>
				)}
				{vouchersData &&
					isGetVouchersSuccess &&
					vouchersData.data.vouchers.map(voucher => (
						<VoucherItem
							key={voucher.code}
							voucherData={voucher}
							onSelectVoucher={applyVoucherHandler}
							isLoading={isVoucherLoading && voucherCodeInput === voucher.code}
							isSelected={state.voucher_code === voucher.code}
						/>
					))}
			</ScrollView>
			{state.voucher_code && (
				<SingleButtonTab text="Clear Voucher" onPress={() => clearVoucherHandler()} type="cancel" />
			)}
		</View>
	);
};

export default VoucherPickerScreen;

const styles = StyleSheet.create({
	voucherPickerScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
