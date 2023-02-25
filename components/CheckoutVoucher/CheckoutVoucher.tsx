// Dependencies
import React from "react";

// Types
import { CheckoutFormValues, Voucher } from "../../interfaces";

// Hooks
import { useFormikContext } from "formik";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Components
import { Center, HStack, Icon, Text, View, VStack } from "native-base";
import formatToRupiah from "../../utils/formatToRupiah";

interface CheckoutVoucherProps {
	appliedVoucher: null | Voucher;
}

const CheckoutVoucher = ({ appliedVoucher }: CheckoutVoucherProps) => {
	const { values } = useFormikContext<CheckoutFormValues>();

	const isVoucherSelected =
		appliedVoucher && values.voucher_code && values.voucher_discount && values.voucher_type;

	return (
		<View>
			<HStack space={3} alignItems="center">
				<Center
					height="45px"
					width="45px"
					borderRadius="10px"
					bg={isVoucherSelected ? "primary.400" : "gray.100"}
				>
					<Icon
						as={AntDesign}
						name="tags"
						color={isVoucherSelected ? "white" : "gray.400"}
						size="md"
					/>
				</Center>
				<VStack>
					<Text fontSize="13px" fontWeight={isVoucherSelected ? 500 : 400}>
						{isVoucherSelected ? appliedVoucher.title : "No voucher applied."}
					</Text>
					{appliedVoucher && (
						<Text fontSize="12px" color="gray.500" letterSpacing={0.6}>
							{appliedVoucher.code}
						</Text>
					)}
				</VStack>
				{appliedVoucher && (
					<Text ml="auto" fontWeight="500" fontSize="13px">
						-{" "}
						{appliedVoucher?.discount_type === "value"
							? formatToRupiah(appliedVoucher?.discount)
							: `${appliedVoucher?.discount}%`}
					</Text>
				)}
			</HStack>
		</View>
	);
};

export default CheckoutVoucher;
