// Dependencies
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "native-base";

// Types
import { RootStackParamList } from "../interfaces";

// Hooks
import { useGetAllTransactionsQuery } from "../api/transaction.api";
import useSelector from "../hooks/useSelector";

// Icons
import { Entypo, Ionicons } from "@expo/vector-icons";

// Components
import IconButton from "../components/IconButton/IconButton";

// Screens
import AccountScreen from "../screens/AccountScreen";
import MyOrdersScreen from "../screens/MyOrdersScreen";
import MyVouchersScreen from "../screens/MyVouchersScreen";
import PaymentScreen from "../screens/PaymentScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import AddressScreen from "../screens/AddressScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import EditAddressScreen from "../screens/EditAddressScreen";
import ProductScreen from "../screens/ProductScreen";
import AccountDetailsScreen from "../screens/AccountDetailsScreen";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import CreateReviewScreen from "../screens/CreateReviewScreen";
import LastSeenProductsScreen from "../screens/LastSeenProductsScreen";
import LiveChatScreen from "../screens/LiveChatScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AccountStack = () => {
	const isAuth = useSelector(state => state.auth.isAuth);
	const { isFetching: isFetchingTransactions, refetch: refetchTransactions } =
		useGetAllTransactionsQuery(isAuth, { skip: !isAuth });

	return (
		<Stack.Navigator
			screenOptions={({ navigation }) => ({
				animation: "fade",
				headerLeft: ({ canGoBack }) => (
					<IconButton
						onPress={() => {
							if (canGoBack) {
								navigation.goBack();
							} else {
								navigation.navigate("AccountDashboard");
							}
						}}
						size="sm"
						borderColor="gray.100"
						icon={<Icon as={Entypo} name="chevron-thin-left" color="gray.700" size="md" />}
					/>
				)
			})}
		>
			<Stack.Screen
				name="AccountDashboard"
				component={AccountScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="AccountMyOrders"
				component={MyOrdersScreen}
				options={{
					headerTitle: "My Orders",
					headerTitleAlign: "center",
					headerRight: () => (
						<IconButton
							icon={
								isFetchingTransactions ? (
									<LoadingSpinner size="sm" color="primary.400" />
								) : (
									<Icon as={Ionicons} name="refresh" color="gray.700" size="lg" />
								)
							}
							bg="white"
							disabled={isFetchingTransactions}
							onPress={() => refetchTransactions()}
							size="sm"
							borderColor="gray.100"
						/>
					)
				}}
			/>
			<Stack.Screen
				name="AccounPayment"
				component={PaymentScreen}
				options={{
					headerTitle: "Order Payment",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="AccountMyVouchers"
				component={MyVouchersScreen}
				options={{
					headerTitle: "My Vouchers",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="AccountOrderDetails"
				component={OrderDetailsScreen}
				options={{
					headerTitle: "Order Details",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="AccountAddress"
				component={AddressScreen}
				options={{
					headerTitle: "Shipping Address",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="AccountAddAddress"
				component={AddAddressScreen}
				options={{
					headerTitle: "Create Address",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="AccountEditAddress"
				component={EditAddressScreen}
				options={{
					headerTitle: "Update Address",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="AccountProduct"
				component={ProductScreen}
				options={{
					headerTitle: "Details",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="AccountDetails"
				component={AccountDetailsScreen}
				options={{
					headerTitle: "Account Details",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="AccountCreateReview"
				component={CreateReviewScreen}
				options={{
					headerTitle: "Leave a Review",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="AccountLastSeenProducts"
				component={LastSeenProductsScreen}
				options={{
					headerTitle: "Last Seen",
					headerTitleAlign: "center"
				}}
			/>
			<Stack.Screen
				name="AccountLiveChat"
				component={LiveChatScreen}
				options={{
					headerShown: false
				}}
			/>
		</Stack.Navigator>
	);
};

export default AccountStack;
