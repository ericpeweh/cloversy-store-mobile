// Dependencies
import React from "react";

// Types
import { Voucher } from "../../interfaces";

// Icons
import { AntDesign, Feather } from "@expo/vector-icons";

// Utils
import { formatDateFullMonth } from "../../utils/formatDate";

// Components
import { Center, HStack, Icon, Text, View, VStack } from "native-base";
import Button from "../Button/Button";

interface VoucherItemProps {
	voucherData: Voucher;
	isLoading: boolean;
	isSelected: boolean;
	onSelectVoucher: (voucherCode: string) => void;
}

const VoucherItem = ({
	voucherData: voucher,
	onSelectVoucher,
	isLoading = false,
	isSelected = false
}: VoucherItemProps) => {
	return (
		<HStack
			p={4}
			borderBottomWidth={1}
			borderBottomColor="gray.100"
			borderRadius="15px"
			alignItems="center"
		>
			<Center height="80px" width="81px" borderRadius="10px" bg="primary.400" position="relative">
				<Icon as={AntDesign} name="tags" color="white" size="lg" />
				<View
					borderRadius="full"
					bg="white"
					position="absolute"
					left="0"
					borderColor="white"
					borderWidth="1px"
					borderStyle="dashed"
					height="80px"
				></View>
			</Center>
			<VStack flex={1}>
				<Text fontWeight="500" fontSize="14px" ml={3}>
					{voucher.title}
				</Text>
				<Text fontSize="13px" color="gray.500" ml={3}>
					Valid till {formatDateFullMonth(voucher.expiry_date)}
				</Text>
				<View
					borderTopWidth={1}
					borderTopColor="primary.400"
					borderStyle="dashed"
					my={2}
					mr={3}
				></View>
				<Text fontSize="13px" letterSpacing={1} color="gray.600" textAlign="center">
					{voucher.code}
				</Text>
			</VStack>
			{isSelected ? (
				<Icon as={Feather} name="check" size="md" color="primary.400" />
			) : (
				<Button
					py={1.5}
					px={3}
					bg={isSelected ? "gray.400" : "primary.400"}
					_text={{ fontWeight: "500", fontSize: "12px" }}
					_pressed={{ bg: isSelected ? "gray.500" : "primary.500" }}
					onPress={() => !isLoading && onSelectVoucher(voucher.code)}
					minWidth="70px"
					isLoading={isLoading}
				>
					Select
				</Button>
			)}
		</HStack>
	);
};

export default VoucherItem;
