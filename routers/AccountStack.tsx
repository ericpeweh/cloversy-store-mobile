// Dependencies
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "native-base";

// Types
import { RootStackParamList } from "../interfaces";

// Icons
import { Entypo } from "@expo/vector-icons";

// Components
import IconButton from "../components/IconButton/IconButton";

// Screens
import AccountScreen from "../screens/AccountScreen";
import MyOrdersScreen from "../screens/MyOrdersScreen";
import MyVouchersScreen from "../screens/MyVouchersScreen";
import PaymentScreen from "../screens/PaymentScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AccountStack = () => {
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
					headerTitleAlign: "center"
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
		</Stack.Navigator>
	);
};

export default AccountStack;
