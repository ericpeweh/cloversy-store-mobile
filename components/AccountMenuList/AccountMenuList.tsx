// Dependencies
import React from "react";

// Icons
import { MaterialIcons, Ionicons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

// Utils
import { myOrderMenuList } from "../../utils/content";

// Hooks
import { useGetAllTransactionsQuery } from "../../api/transaction.api";
import useSelector from "../../hooks/useSelector";

// Components
import { HStack, Icon, Pressable, Text, View, VStack, Badge, Image } from "native-base";
import AccountMenuListItem from "../AccountMenuListItem/AccountMenuListItem";
import FallbackContainer from "../FallbackContainer/FallbackContainer";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const AccountMenuList = () => {
	const isAuth = useSelector(state => state.auth.isAuth);

	// Transactions
	const {
		data: transactionsData,
		isLoading: isGetTransactionsLoading,
		isUninitialized: isGetTransactionsUninitialized,
		isSuccess: isGetTransactionsSuccess,
		error: getTransactionsErrorData,
		refetch: refetchTransactions
	} = useGetAllTransactionsQuery(isAuth, { skip: !isAuth });
	const getTransactionsError: any = getTransactionsErrorData;
	const transactions = transactionsData?.data.transactions;

	return (
		<View mt={2}>
			<AccountMenuListItem icon={MaterialIcons} iconName="list-alt" label="My Orders" />
			{isGetTransactionsLoading && (
				<FallbackContainer size="lg">
					<LoadingSpinner size="sm" />
				</FallbackContainer>
			)}
			{isGetTransactionsSuccess && transactions && (
				<HStack borderBottomWidth="1px" borderBottomColor="gray.100">
					{myOrderMenuList.map(menu => (
						<Pressable flex="1" key={menu.value}>
							{({ isHovered, isPressed }) => (
								<View bg={isHovered || isPressed ? "gray.100:alpha.50" : "white"} py={4}>
									<VStack alignItems="center" space={3}>
										<VStack>
											<Badge
												rounded="full"
												mb={-4}
												mr={-1}
												bg="primary.400"
												zIndex={1}
												py={0}
												px={1.5}
												alignSelf="flex-end"
												_text={{ fontSize: 10, color: "white" }}
											>
												{transactions.filter(item =>
													item.order_status === "sent"
														? item.order_status === menu.value && !item.is_reviewed
														: item.order_status === menu.value
												).length || 0}
											</Badge>
											<View height="40px">{menu.icon}</View>
										</VStack>
										<Text fontSize="11px">{menu.label}</Text>
									</VStack>
								</View>
							)}
						</Pressable>
					))}
				</HStack>
			)}
			<VStack p={4} borderBottomWidth="1px" borderBottomColor="gray.100">
				<HStack space={5} alignItems="center">
					<Icon as={MaterialIcons} name="loyalty" color="gray.600" size="20px" />
					<Text>Cloversy Credits:</Text>
					<Badge borderRadius="10px">0</Badge>
				</HStack>
			</VStack>
			<AccountMenuListItem icon={AntDesign} iconName="hearto" label="Wishlist" />
			<AccountMenuListItem
				icon={MaterialCommunityIcons}
				iconName="ticket-confirmation-outline"
				label="My Vouchers"
			/>
			<AccountMenuListItem icon={Ionicons} iconName="location-outline" label="Shipping Address" />
			<AccountMenuListItem
				icon={MaterialCommunityIcons}
				iconName="message-text-outline"
				label="Live Chat"
			/>
			<AccountMenuListItem
				icon={MaterialCommunityIcons}
				iconName="account-outline"
				label="Account Details"
			/>
			<AccountMenuListItem icon={AntDesign} iconName="eyeo" label="Seen Products" />
			<AccountMenuListItem icon={MaterialIcons} iconName="logout" label="Logout" hideArrow />
		</View>
	);
};

export default AccountMenuList;
