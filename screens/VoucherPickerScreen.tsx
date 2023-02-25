// Dependencies
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

// Types
import { RootStackProps } from "../interfaces";

// Hooks
import { useApplyVoucherMutation } from "../api/voucher.api";

// Utils
import formatToRupiah from "../utils/formatToRupiah";

// Components
import { Text, View } from "react-native";
import { ScrollView } from "native-base";

const VoucherPickerScreen = ({
	navigation,
	route
}: RootStackProps<"HomeCheckoutVoucherPicker">) => {
	const { state } = route.params;
	const [voucherCodeInput, setVoucherCodeInput] = useState(state.voucher_code);

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
	const discountFormat =
		voucher?.discount_type === "value"
			? formatToRupiah(voucher?.discount)
			: `${voucher?.discount}%`;

	// If voucher applied successfully, modify formik state
	useEffect(() => {
		if (voucher && isVoucherSuccess) {
			navigation.navigate("HomeCheckout", {
				state: {
					...state,
					voucher_code: voucher.code,
					voucher_discount: voucher.discount,
					voucher_type: voucher.discount_type as "default" | "value" | "percentage"
				}
			});
		}
	}, [isVoucherSuccess, voucher]);

	// If fail to apply voucher, reset formik voucher state
	useEffect(() => {
		if (voucherError) {
			navigation.navigate("HomeCheckout", {
				state: {
					...state,
					voucher_code: "",
					voucher_discount: 0,
					voucher_type: "default"
				}
			});
		}
	}, [voucherError]);

	const voucherCodeInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVoucherCodeInput(e.target.value);
	};

	const applyVoucherHandler = (code: string) => {
		if (!code) return;

		setVoucherCodeInput(code);
		resetApplyVoucher();
		applyVoucher(code);
	};

	return (
		<ScrollView style={styles.voucherPickerScreenContainer}>
			<Text>VoucherPickerScreen</Text>
		</ScrollView>
	);
};

export default VoucherPickerScreen;

const styles = StyleSheet.create({
	voucherPickerScreenContainer: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
