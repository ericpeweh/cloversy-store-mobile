// Dependencies
import React, { useState } from "react";

// Icons
import { MaterialIcons, Ionicons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

// Utils
import { myOrderMenuList } from "../../utils/content";

// Actions
import { logoutUser } from "../../store/slices/authSlice";

// Types
import { RootStackNavigationProp } from "../../interfaces";

// Hooks
import { useAuth0 } from "react-native-auth0";
import { useGetAllTransactionsQuery } from "../../api/transaction.api";
import { useNavigation } from "@react-navigation/native";
import useSelector from "../../hooks/useSelector";
import useDispatch from "../../hooks/useDispatch";

// Components
import { HStack, Icon, Pressable, Text, View, VStack, Badge, Image } from "native-base";
import AccountMenuListItem from "../AccountMenuListItem/AccountMenuListItem";
import FallbackContainer from "../FallbackContainer/FallbackContainer";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { setOrdersTabIndex } from "../../store/slices/globalSlice";

const AccountMenuList = () => {
	const navigation = useNavigation<RootStackNavigationProp>();
	const dispatch = useDispatch();
	const { clearSession } = useAuth0();
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
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

	const logoutHandler = async () => {
		try {
			await clearSession({ customScheme: "cloversy-store-auth0" });
			dispatch(logoutUser());
		} catch (error) {
			console.log("Failed to logout");
		}
	};

	const orderCardClickHandler = (tabIndex: number) => {
		dispatch(setOrdersTabIndex(tabIndex + 1));
		navigation.navigate("AccountMyOrders");
	};

	return (
		<View mt={2}>
			<ConfirmModal
				title="Confirm Logout"
				description="Are you sure you want to log out?"
				confirmText="Logout"
				isOpen={isLogoutModalOpen}
				onConfirm={() => logoutHandler()}
				onClose={() => setIsLogoutModalOpen(false)}
			/>
			<AccountMenuListItem
				icon={MaterialIcons}
				iconName="list-alt"
				label="My Orders"
				onPress={() => navigation.navigate("AccountMyOrders")}
			/>
			{isGetTransactionsLoading && (
				<FallbackContainer size="lg">
					<LoadingSpinner size="sm" />
				</FallbackContainer>
			)}
			{isGetTransactionsSuccess && transactions && (
				<HStack borderBottomWidth="1px" borderBottomColor="gray.100">
					{myOrderMenuList.map((menu, index) => (
						<Pressable flex="1" key={menu.value} onPress={() => orderCardClickHandler(index)}>
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
													item.order_status === "success"
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
			<AccountMenuListItem
				icon={AntDesign}
				iconName="hearto"
				label="Wishlist"
				onPress={() => navigation.navigate("WishlistTab")}
			/>
			<AccountMenuListItem
				icon={MaterialCommunityIcons}
				iconName="ticket-confirmation-outline"
				label="My Vouchers"
				onPress={() => navigation.navigate("AccountMyVouchers")}
			/>
			<AccountMenuListItem
				icon={Ionicons}
				iconName="location-outline"
				label="Shipping Address"
				onPress={() => navigation.navigate("AccountAddress")}
			/>
			<AccountMenuListItem
				icon={MaterialCommunityIcons}
				iconName="message-text-outline"
				label="Live Chat"
				onPress={() => navigation.navigate("AccountLiveChat")}
			/>
			<AccountMenuListItem
				icon={MaterialCommunityIcons}
				iconName="account-outline"
				label="Account Details"
				onPress={() => navigation.navigate("AccountDetails")}
			/>
			<AccountMenuListItem
				icon={AntDesign}
				iconName="eyeo"
				label="Seen Products"
				onPress={() => navigation.navigate("AccountLastSeenProducts")}
			/>
			<AccountMenuListItem
				icon={MaterialIcons}
				iconName="logout"
				label="Logout"
				hideArrow
				onPress={() => setIsLogoutModalOpen(true)}
			/>
		</View>
	);
};

export default AccountMenuList;
