// Dependencies
import React from "react";

// Types
import { Address, RootStackNavigationProp } from "../../interfaces";

// Hooks
import { useNavigation } from "@react-navigation/native";
import { useUpdateAddressMutation } from "../../api/address.api";

// Icons
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// Components
import StatusBadge from "../StatusBadge/StatusBadge";
import Button from "../Button/Button";
import { Text, View, HStack, Icon, Divider } from "native-base";
import AlertBox from "../AlertBox/AlertBox";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface AddressItemProps {
	item: Address;
	isDeleteAddressLoading: boolean;
	onPressDelete: (addressToDelete: Address) => void;
}

const AddressItem = ({ item, isDeleteAddressLoading, onPressDelete }: AddressItemProps) => {
	const navigation = useNavigation<RootStackNavigationProp>();

	const [setAddressAsDefault, { isLoading: isSetAddressAsDefaultLoading, error }] =
		useUpdateAddressMutation();
	const setAsDefaultError: any = error;

	const setAsDefaultHandler = async () => {
		setAddressAsDefault({ id: item.id, is_default: true });
	};

	return (
		<View key={item.id}>
			<View px={4} py={5} bg={"white"}>
				{item?.is_default && (
					<StatusBadge color="primary.400" alignSelf="flex-start" mb={2}>
						Default
					</StatusBadge>
				)}
				<HStack justifyContent="space-between" alignItems="center">
					<Text fontWeight="700">{item.recipient_name}</Text>
					<HStack space={1} alignItems="center">
						<Icon as={Ionicons} name="location-outline" size="16px" color="gray.500" />
						<Text letterSpacing={0.4} fontSize="13px" color="gray.500">
							{item.label}
						</Text>
					</HStack>
				</HStack>
				<Text fontSize="13px" mt={1}>
					{item.contact}
				</Text>
				<HStack justifyContent="space-between">
					<View flex={1}>
						<Text fontSize="13px">
							{item.province}, {item.city}, {item.subdistrict}, {item.postal_code}
						</Text>
						<Text fontSize="13px">{item.address}</Text>
					</View>
				</HStack>
				<HStack space={2} mt={4}>
					{!item.is_default && (
						<Button
							onPress={() => setAsDefaultHandler()}
							_pressed={{ bg: "primary.500" }}
							py={1.5}
							px={3}
							_text={{ fontWeight: "500", fontSize: "12px" }}
							isLoading={isSetAddressAsDefaultLoading}
						>
							Set as Default
						</Button>
					)}
					<Button
						borderColor="secondary.300"
						borderWidth={1}
						bg="white"
						_text={{ color: "secondary.300", fontWeight: "500", fontSize: "12px" }}
						_pressed={{ bg: "gray.100" }}
						onPress={() => navigation.navigate("AccountEditAddress", { addressData: item })}
						py={1.5}
						px={3}
						startIcon={<Icon as={MaterialIcons} name="edit" color="secondary.300" size="sm" />}
					>
						Update
					</Button>
					<Button
						borderColor="error.500"
						borderWidth={1}
						bg="white"
						_pressed={{ bg: "error.100:alpha.50" }}
						onPress={() => !isDeleteAddressLoading && onPressDelete(item)}
						py={1.5}
						px={3}
						_text={{ color: "error.500", fontWeight: "500", fontSize: "12px" }}
						startIcon={
							isDeleteAddressLoading ? (
								<></>
							) : (
								<Icon as={MaterialIcons} name="close" color="error.500" size="sm" />
							)
						}
					>
						{isDeleteAddressLoading ? <LoadingSpinner size={12} color="error.500" /> : "Delete"}
					</Button>
				</HStack>
				{setAsDefaultError && (
					<AlertBox width="100%" mt={4}>
						{setAsDefaultError?.data?.message || "Error occured setting address as default."}
					</AlertBox>
				)}
			</View>
			<Divider />
		</View>
	);
};

export default AddressItem;
