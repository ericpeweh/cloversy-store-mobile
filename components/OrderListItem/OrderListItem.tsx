// Dependencies
import React from "react";

// Types
import { RootStackNavigationProp, TransactionListItem } from "../../interfaces";

// Utils
import getOrderStatus from "../../utils/getOrderStatus";
import { formatDateFullMonth } from "../../utils/formatDate";
import formatToRupiah from "../../utils/formatToRupiah";

// Icons
import { Ionicons } from "@expo/vector-icons";

// Hooks
import { useCancelTransactionMutation } from "../../api/transaction.api";
import { useNavigation } from "@react-navigation/native";

// Components
import { Text, VStack, HStack, Icon } from "native-base";
import StatusBadge from "../StatusBadge/StatusBadge";
import OrderDetailsItem from "../OrderDetailsItem/OrderDetailsItem";
import Button from "../Button/Button";
import AlertBox from "../AlertBox/AlertBox";

interface OrderListItemProps {
	orderData: TransactionListItem;
}

const OrderListItem = ({ orderData }: OrderListItemProps) => {
	const navigation = useNavigation<RootStackNavigationProp>();
	const orderStatus = getOrderStatus(orderData?.order_status || "pending");

	const [
		cancelTransaction,
		{
			isLoading: isCancelTransactionLoading,
			error: cancelTransactionErrorData,
			reset: resetCancelTransaction
		}
	] = useCancelTransactionMutation();
	const cancelTransactionError: any = cancelTransactionErrorData;

	const cancelTransactionHandler = async () => {
		if (!orderData?.id) return;

		await cancelTransaction(orderData.id);
		resetCancelTransaction();
	};

	return (
		<VStack bg="white" mb={2}>
			<HStack
				justifyContent="space-between"
				alignItems="center"
				px={4}
				py={3}
				bg="white"
				borderBottomColor="gray.300"
				borderBottomWidth={1}
			>
				<HStack space={2} alignItems="center">
					<StatusBadge color={orderStatus.color}>{orderStatus.label}</StatusBadge>
					<Text fontWeight="500" fontSize="14px">
						{orderData.id}
					</Text>
				</HStack>
				<Text fontSize="13px" color="gray.600">
					{formatDateFullMonth(orderData.created_at)}
				</Text>
			</HStack>
			<VStack px={4} py={2} bg="white">
				{orderData.item_details.map(item => (
					<OrderDetailsItem itemData={item} key={`${item.product_id} ${item.product_size}`} />
				))}
			</VStack>
			<HStack bg="gray.100:alpha.50" justifyContent="flex-end" px={4} py={2}>
				<Text ml="auto" fontWeight="500">
					Total Order:{"   "}
					<Text color="primary.400" fontWeight="700">
						{formatToRupiah(+orderData.total)}
					</Text>
				</Text>
			</HStack>
			<VStack space={2} px={4} py={2} bg="white">
				<Button
					bg="gray.100:alpha.50"
					borderColor="gray.200"
					borderWidth="1px"
					_pressed={{ bg: "gray.100" }}
					_text={{ color: "black" }}
					endIcon={<Icon as={Ionicons} name="document-text-outline" color="black" />}
					onPress={() =>
						navigation.navigate("AccountOrderDetails", { transactionId: orderData.id })
					}
				>
					Order Details
				</Button>
				{orderData.order_status === "pending" && (
					<HStack space={2}>
						<Button
							bg="error.500"
							_pressed={{ bg: "error.600" }}
							isLoading={isCancelTransactionLoading}
							onPress={cancelTransactionHandler}
							flex={1}
						>
							Cancel Order
						</Button>
						<Button
							onPress={() => navigation.navigate("AccounPayment", { transactionId: orderData.id })}
							flex={1}
							_pressed={{ bg: "primary.500" }}
						>
							Pay Now
						</Button>
					</HStack>
				)}
				{(orderData.order_status === "process" || orderData.order_status === "sent") && (
					<>
						<Button
							bg="secondary.300"
							_text={{ color: "white" }}
							_pressed={{ bg: "secondary.400" }}
							onPress={() => {
								// Navigate to chatting screen
							}}
						>
							Contact Admin
						</Button>
					</>
				)}
				{orderData.order_status === "success" && (
					<>
						{!orderData.is_reviewed && (
							<Button
								bg="secondary.300"
								_text={{ color: "white" }}
								_pressed={{ bg: "secondary.400" }}
								onPress={() =>
									navigation.navigate("AccountCreateReview", { transactionId: orderData.id })
								}
							>
								Leave a Review
							</Button>
						)}
						<Button
							flex={1}
							_pressed={{ bg: "primary.500" }}
							onPress={() =>
								navigation.navigate("AccountProduct", {
									productSlug: orderData.item_details[0].slug
								})
							}
						>
							Buy Again
						</Button>
					</>
				)}
				{cancelTransactionError && (
					<AlertBox status="error" width="100%" mt={2}>
						{cancelTransactionError?.data?.message || "Error occured while cancelling transaction."}
					</AlertBox>
				)}
			</VStack>
		</VStack>
	);
};

export default OrderListItem;
