// Dependencies
import React from "react";
import * as Clipboard from "expo-clipboard";

// Types
import { Voucher } from "../../interfaces";

// Icons
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

// Utils
import { formatDateFullMonth } from "../../utils/formatDate";

// Components
import { Center, HStack, Icon, Text, View, VStack } from "native-base";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";

interface VoucherItemProps {
	voucherData: Voucher;
	isLoading?: boolean;
	isSelected?: boolean;
	onSelectVoucher?: (voucherCode: string) => void;
	readOnly?: boolean;
}

const VoucherItem = ({
	voucherData: voucher,
	onSelectVoucher,
	isLoading = false,
	isSelected = false,
	readOnly = false
}: VoucherItemProps) => {
	const copyVoucherCodeHandler = async () => {
		if (voucher.code) {
			console.log(voucher.code);
			await Clipboard.setStringAsync(voucher.code);
		}
	};

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
				<HStack space={1} alignItems="center" justifyContent="center" ml={-2}>
					{readOnly && (
						<IconButton
							icon={<Icon as={MaterialIcons} name="content-copy" size="sm" color="gray.400" />}
							onPress={copyVoucherCodeHandler}
						/>
					)}
					<Text fontSize="13px" letterSpacing={1} color="gray.600" textAlign="center">
						{voucher.code}
					</Text>
				</HStack>
			</VStack>
			{isSelected
				? !readOnly && <Icon as={Feather} name="check" size="md" color="primary.400" />
				: !readOnly && (
						<Button
							py={1.5}
							px={3}
							bg={isSelected ? "gray.400" : "primary.400"}
							_text={{ fontWeight: "500", fontSize: "12px" }}
							_pressed={{ bg: isSelected ? "gray.500" : "primary.500" }}
							onPress={() => !isLoading && onSelectVoucher && onSelectVoucher(voucher.code)}
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
